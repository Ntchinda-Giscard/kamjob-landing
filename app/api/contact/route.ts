import { NextResponse } from "next/server";

/**
 * Contact form endpoint. Delivers one message to the team mailboxes through
 * Resend's HTTP API — called with `fetch` rather than the SDK so the landing
 * page keeps its zero-runtime-dependency footprint.
 *
 * This module is never imported by a client component: the recipient addresses
 * stay on the server instead of being shipped in the browser bundle, where
 * address harvesters would find them. The form's fallback link only ever shows
 * the public `support@` address.
 */

export const runtime = "nodejs";

/** Comma-separated in `CONTACT_TO`. Both mailboxes receive every message. */
const RECIPIENTS = (
  process.env.CONTACT_TO ?? "support@kamjob.com,willyzogoakouma@gmail.com"
)
  .split(",")
  .map((address) => address.trim())
  .filter(Boolean);

/** Must be on a domain verified in Resend, otherwise the send is rejected. */
const FROM = process.env.CONTACT_FROM ?? "KamJob <contact@kamjob.com>";

const LIMITS = { name: 80, email: 160, subject: 120, message: 4000 } as const;
const MIN_SUBJECT = 3;
const MIN_MESSAGE = 10;

// Deliberately loose: the point is to catch typos, not to police the RFC.
const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[a-z]{2,}$/i;

// Best-effort throttle. Serverless means one bucket per warm instance rather
// than one per site, which is enough to blunt a form-spam script; a determined
// flood is a job for the platform's own rate limiting.
const WINDOW_MS = 10 * 60 * 1000;
const MAX_PER_WINDOW = 3;
const hits = new Map<string, number[]>();

function rateLimited(ip: string) {
  const now = Date.now();
  const recent = (hits.get(ip) ?? []).filter((at) => now - at < WINDOW_MS);
  if (recent.length >= MAX_PER_WINDOW) return true;
  recent.push(now);
  hits.set(ip, recent);
  // The map would otherwise grow for the life of the instance.
  if (hits.size > 5000) hits.clear();
  return false;
}

function clientIp(req: Request) {
  const forwarded = req.headers.get("x-forwarded-for");
  return (
    forwarded?.split(",")[0].trim() || req.headers.get("x-real-ip") || "unknown"
  );
}

/** Strips CR/LF so a visitor-supplied name or subject cannot inject extra mail
 *  headers — both of them land in the header block of the outgoing message. */
const oneLine = (value: string) => value.replace(/[\r\n]+/g, " ").trim();

const escapeHtml = (value: string) =>
  value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");

export async function POST(req: Request) {
  let body: Record<string, unknown>;
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ error: "invalid" }, { status: 400 });
  }

  // Honeypot: a real visitor never sees this field, so anything in it is a bot.
  // Answer 200 so the script believes it succeeded and does not retry.
  if (typeof body.company === "string" && body.company.trim() !== "") {
    return NextResponse.json({ ok: true });
  }

  const name = oneLine(String(body.name ?? "")).slice(0, LIMITS.name);
  const email = oneLine(String(body.email ?? "")).slice(0, LIMITS.email);
  const subject = oneLine(String(body.subject ?? "")).slice(0, LIMITS.subject);
  const message = String(body.message ?? "")
    .trim()
    .slice(0, LIMITS.message);
  const lang = body.lang === "en" ? "en" : "fr";

  if (
    !name ||
    !EMAIL_RE.test(email) ||
    subject.length < MIN_SUBJECT ||
    message.length < MIN_MESSAGE
  ) {
    return NextResponse.json({ error: "invalid" }, { status: 400 });
  }

  if (rateLimited(clientIp(req))) {
    return NextResponse.json({ error: "rate_limited" }, { status: 429 });
  }

  const apiKey = process.env.RESEND_API_KEY;
  if (!apiKey || RECIPIENTS.length === 0) {
    // The form falls back to a mailto: link rather than losing the message.
    return NextResponse.json({ error: "not_configured" }, { status: 503 });
  }

  // The `[KamJob]` prefix is ours, so the subject stays filterable in the inbox
  // however the visitor phrased theirs.
  const mailSubject = `[KamJob] ${subject}`;
  const text = [
    `Sujet  : ${subject}`,
    `Nom    : ${name}`,
    `Email  : ${email}`,
    `Langue : ${lang}`,
    "",
    message,
  ].join("\n");

  try {
    const res = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${apiKey}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        from: FROM,
        to: RECIPIENTS,
        // Replying in the mail client answers the visitor directly.
        reply_to: email,
        subject: mailSubject,
        text,
        html: `<p><strong>${escapeHtml(subject)}</strong> — ${escapeHtml(name)} &lt;${escapeHtml(email)}&gt; (${lang})</p><hr /><p style="white-space:pre-wrap">${escapeHtml(message)}</p>`,
      }),
    });

    if (!res.ok) {
      // Body may name a misconfigured sender domain — useful in the logs, never
      // in the response.
      console.error(
        "[contact] Resend rejected the send",
        res.status,
        await res.text(),
      );
      return NextResponse.json({ error: "send_failed" }, { status: 502 });
    }
  } catch (err) {
    console.error("[contact] could not reach Resend", err);
    return NextResponse.json({ error: "send_failed" }, { status: 502 });
  }

  return NextResponse.json({ ok: true });
}
