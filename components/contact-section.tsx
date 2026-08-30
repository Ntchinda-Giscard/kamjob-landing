"use client";

import { useState, type SyntheticEvent } from "react";
import { CheckCircle2, Mail, Send } from "lucide-react";
import { Reveal } from "@/components/reveal";
import { SectionHeading } from "@/components/section-heading";
import { useLanguage } from "@/lib/i18n";
import { CONTACT_EMAIL, LEGAL_ROUTES } from "@/lib/site";

const TOPICS = ["suggestion", "bug", "account", "employer", "other"] as const;
type Topic = (typeof TOPICS)[number];

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[a-z]{2,}$/i;
const MIN_MESSAGE = 10;

/** `unavailable` also covers a failed send: either way the visitor should be
 *  handed the mailto: fallback rather than told to try again later. */
type ErrorCode = "invalid" | "rateLimited" | "unavailable";

const FIELD_CLASS =
  "w-full rounded-2xl border border-border bg-background px-4 py-3 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-[var(--brand-solid)] focus:border-transparent transition-shadow";

export function ContactSection() {
  const { t, lang } = useLanguage();
  const c = t.contact;

  const [form, setForm] = useState({
    name: "",
    email: "",
    topic: "suggestion" as Topic,
    message: "",
    company: "", // honeypot
  });
  const [status, setStatus] = useState<"idle" | "sending" | "sent">("idle");
  const [error, setError] = useState<ErrorCode | null>(null);

  const set = (patch: Partial<typeof form>) =>
    setForm((prev) => ({ ...prev, ...patch }));

  // Pre-filled so a visitor hitting the fallback does not retype their message.
  const mailtoHref = () => {
    const subject = `[KamJob] ${c.topics[form.topic]}`;
    const body = `${form.name}\n${form.email}\n\n${form.message}`;
    return `mailto:${CONTACT_EMAIL}?subject=${encodeURIComponent(
      subject,
    )}&body=${encodeURIComponent(body)}`;
  };

  const handleSubmit = async (e: SyntheticEvent) => {
    e.preventDefault();
    if (status === "sending") return;

    // The server validates the same rules; this only saves a round trip.
    if (
      !form.name.trim() ||
      !EMAIL_RE.test(form.email.trim()) ||
      form.message.trim().length < MIN_MESSAGE
    ) {
      setError("invalid");
      return;
    }

    setStatus("sending");
    setError(null);

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...form, lang }),
      });

      if (res.ok) {
        setStatus("sent");
        return;
      }

      const data = (await res.json().catch(() => ({}))) as { error?: string };
      setError(
        data.error === "invalid"
          ? "invalid"
          : data.error === "rate_limited"
            ? "rateLimited"
            : "unavailable",
      );
    } catch {
      // Offline, or the endpoint is not deployed at all.
      setError("unavailable");
    } finally {
      setStatus((s) => (s === "sending" ? "idle" : s));
    }
  };

  return (
    <section
      id="contact"
      className="border-t border-border bg-card/50 scroll-mt-20"
    >
      <div className="max-w-3xl mx-auto px-5 py-20">
        <SectionHeading
          eyebrow={c.eyebrow}
          title={c.title}
          subtitle={c.subtitle}
        />

        <Reveal>
          <div className="rounded-3xl border border-border bg-card p-6 sm:p-8 shadow-[var(--shadow-card)]">
            {status === "sent" ? (
              <div className="text-center py-6" role="status">
                <div
                  className="w-14 h-14 mx-auto rounded-2xl flex items-center justify-center mb-5"
                  style={{ backgroundColor: "var(--brand-pale)" }}
                >
                  <CheckCircle2
                    className="w-7 h-7"
                    style={{ color: "var(--brand-text)" }}
                    aria-hidden
                  />
                </div>
                <p className="text-lg font-bold text-foreground mb-2">
                  {c.successTitle}
                </p>
                <p className="text-sm text-muted-foreground leading-relaxed max-w-md mx-auto">
                  {c.successText}
                </p>
                <button
                  type="button"
                  onClick={() => {
                    setForm({
                      name: "",
                      email: "",
                      topic: "suggestion",
                      message: "",
                      company: "",
                    });
                    setStatus("idle");
                  }}
                  className="btn-press mt-6 text-sm font-semibold"
                  style={{ color: "var(--brand-text)" }}
                >
                  {c.again}
                </button>
              </div>
            ) : (
              <form
                onSubmit={handleSubmit}
                noValidate
                className="relative space-y-5"
              >
                <div className="grid gap-5 sm:grid-cols-2">
                  <div>
                    <label
                      htmlFor="contact-name"
                      className="block text-sm font-semibold text-foreground mb-2"
                    >
                      {c.nameLabel}
                    </label>
                    <input
                      id="contact-name"
                      name="name"
                      type="text"
                      autoComplete="name"
                      maxLength={80}
                      required
                      value={form.name}
                      onChange={(e) => set({ name: e.target.value })}
                      placeholder={c.namePlaceholder}
                      className={FIELD_CLASS}
                    />
                  </div>

                  <div>
                    <label
                      htmlFor="contact-email"
                      className="block text-sm font-semibold text-foreground mb-2"
                    >
                      {c.emailLabel}
                    </label>
                    <input
                      id="contact-email"
                      name="email"
                      type="email"
                      autoComplete="email"
                      maxLength={160}
                      required
                      value={form.email}
                      onChange={(e) => set({ email: e.target.value })}
                      placeholder={c.emailPlaceholder}
                      className={FIELD_CLASS}
                    />
                  </div>
                </div>

                <div>
                  <label
                    htmlFor="contact-topic"
                    className="block text-sm font-semibold text-foreground mb-2"
                  >
                    {c.topicLabel}
                  </label>
                  <select
                    id="contact-topic"
                    name="topic"
                    value={form.topic}
                    onChange={(e) => set({ topic: e.target.value as Topic })}
                    className={FIELD_CLASS}
                  >
                    {TOPICS.map((key) => (
                      <option key={key} value={key}>
                        {c.topics[key]}
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label
                    htmlFor="contact-message"
                    className="block text-sm font-semibold text-foreground mb-2"
                  >
                    {c.messageLabel}
                  </label>
                  <textarea
                    id="contact-message"
                    name="message"
                    rows={5}
                    maxLength={4000}
                    required
                    value={form.message}
                    onChange={(e) => set({ message: e.target.value })}
                    placeholder={c.messagePlaceholder}
                    className={`${FIELD_CLASS} resize-y min-h-32`}
                  />
                </div>

                {/* Bot bait: hidden from people, so anything typed here is a
                    script. Not `display:none` — some bots skip those. */}
                <div className="absolute left-[-9999px] top-auto w-px h-px overflow-hidden">
                  <label htmlFor="contact-company">{c.honeypotLabel}</label>
                  <input
                    id="contact-company"
                    name="company"
                    type="text"
                    tabIndex={-1}
                    autoComplete="off"
                    value={form.company}
                    onChange={(e) => set({ company: e.target.value })}
                  />
                </div>

                {error && (
                  <div
                    role="alert"
                    className="rounded-2xl px-4 py-3 text-sm leading-relaxed"
                    style={{
                      backgroundColor: "var(--red-pale)",
                      color: "var(--red-text)",
                    }}
                  >
                    {c.errors[error]}
                    {error === "unavailable" && (
                      <>
                        {" "}
                        <a
                          href={mailtoHref()}
                          className="font-semibold underline underline-offset-2"
                        >
                          {CONTACT_EMAIL}
                        </a>
                      </>
                    )}
                  </div>
                )}

                <button
                  type="submit"
                  disabled={status === "sending"}
                  aria-busy={status === "sending"}
                  className="btn-brand btn-press w-full sm:w-auto inline-flex items-center justify-center gap-2 px-8 py-3.5 rounded-full font-semibold disabled:opacity-70"
                >
                  {status === "sending" ? (
                    c.sending
                  ) : (
                    <>
                      {c.send}
                      <Send className="w-4 h-4" aria-hidden />
                    </>
                  )}
                </button>

                <p className="text-xs text-muted-foreground leading-relaxed">
                  {c.privacyNote}{" "}
                  <a
                    href={LEGAL_ROUTES.privacy}
                    className="underline underline-offset-2 hover:text-foreground transition-colors"
                  >
                    {c.privacyLink}
                  </a>
                </p>
              </form>
            )}
          </div>
        </Reveal>

        <p className="mt-6 text-center text-sm text-muted-foreground flex flex-wrap items-center justify-center gap-1.5">
          <Mail className="w-4 h-4" aria-hidden />
          {c.directLabel}{" "}
          <a
            href={`mailto:${CONTACT_EMAIL}`}
            className="font-semibold hover:text-foreground transition-colors"
            style={{ color: "var(--brand-text)" }}
          >
            {CONTACT_EMAIL}
          </a>
        </p>
      </div>
    </section>
  );
}
