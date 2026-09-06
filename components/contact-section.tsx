"use client";

import { useState, type SyntheticEvent } from "react";
import { CheckCircle2, Mail, Send } from "lucide-react";
import { Reveal } from "@/components/reveal";
import { SectionHeading } from "@/components/section-heading";
import { useLanguage } from "@/lib/i18n";
import { CONTACT_EMAIL, LEGAL_ROUTES } from "@/lib/site";

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[a-z]{2,}$/i;
const MIN_SUBJECT = 3;
const MIN_MESSAGE = 10;

/** `unavailable` also covers a failed send: either way the visitor should be
 *  handed the mailto: fallback rather than told to try again later. */
type ErrorCode = "invalid" | "rateLimited" | "unavailable";

const FIELD_CLASS =
  "w-full rounded-lg border bg-[var(--paper)] px-4 py-3 text-sm text-foreground placeholder:text-muted-foreground border-[var(--border)] focus:outline-none focus:border-[var(--brand-solid)] focus:ring-1 focus:ring-[var(--brand-solid)] transition-colors";

const LABEL_CLASS = "eyebrow mb-2.5 block text-[var(--muted-foreground)]";

export function ContactSection() {
  const { t, lang } = useLanguage();
  const c = t.contact;

  const [form, setForm] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
    company: "", // honeypot
  });
  const [status, setStatus] = useState<"idle" | "sending" | "sent">("idle");
  const [error, setError] = useState<ErrorCode | null>(null);

  const set = (patch: Partial<typeof form>) =>
    setForm((prev) => ({ ...prev, ...patch }));

  // Pre-filled so a visitor hitting the fallback does not retype their message.
  const mailtoHref = () => {
    const subject = `[KamJob] ${form.subject}`;
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
      form.subject.trim().length < MIN_SUBJECT ||
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
      className="scroll-mt-24 border-t"
      style={{
        borderColor: "var(--border)",
        backgroundColor: "var(--paper-sunk)",
      }}
    >
      <div className="mx-auto max-w-3xl px-5 py-20 sm:py-24">
        {/* One of only two centred axes on the page: a single form column has
            no second element to be asymmetric against. */}
        <SectionHeading
          index="07"
          align="center"
          eyebrow={c.eyebrow}
          title={c.title}
          subtitle={c.subtitle}
        />

        <Reveal>
          <div
            className="relative overflow-hidden rounded-2xl border p-6 sm:p-9"
            style={{
              borderColor: "var(--border)",
              backgroundColor: "var(--paper-raised)",
            }}
          >
            <span aria-hidden className="tricolor absolute inset-x-0 top-0 h-1" />
            {status === "sent" ? (
              <div className="text-center py-6" role="status">
                <div
                  className="mx-auto mb-6 flex h-14 w-14 items-center justify-center rounded-full"
                  style={{ backgroundColor: "var(--brand-solid)" }}
                >
                  <CheckCircle2 className="h-7 w-7 text-white" aria-hidden />
                </div>
                <p className="display mb-3 text-2xl font-extrabold">
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
                      subject: "",
                      message: "",
                      company: "",
                    });
                    setStatus("idle");
                  }}
                  className="link-rule mt-7 text-sm font-semibold"
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
                      className={LABEL_CLASS}
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
                      className={LABEL_CLASS}
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
                    htmlFor="contact-subject"
                    className={LABEL_CLASS}
                  >
                    {c.subjectLabel}
                  </label>
                  <input
                    id="contact-subject"
                    name="subject"
                    type="text"
                    maxLength={120}
                    required
                    value={form.subject}
                    onChange={(e) => set({ subject: e.target.value })}
                    placeholder={c.subjectPlaceholder}
                    className={FIELD_CLASS}
                  />
                </div>

                <div>
                  <label
                    htmlFor="contact-message"
                    className={LABEL_CLASS}
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
                    className="rounded-lg border-l-[3px] px-4 py-3 text-sm leading-relaxed"
                    style={{
                      backgroundColor: "var(--red-pale)",
                      borderColor: "var(--red-solid)",
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
                  className="btn btn-brand w-full px-8 py-3.5 disabled:opacity-70 sm:w-auto"
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

                <p className="text-xs leading-relaxed text-muted-foreground">
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

        <p className="mono mt-7 flex flex-wrap items-center justify-center gap-2 text-center text-xs uppercase tracking-wider text-muted-foreground">
          <Mail className="h-3.5 w-3.5" strokeWidth={1.5} aria-hidden />
          {c.directLabel}{" "}
          <a
            href={`mailto:${CONTACT_EMAIL}`}
            className="link-rule font-bold normal-case tracking-normal"
            style={{ color: "var(--brand-text)" }}
          >
            {CONTACT_EMAIL}
          </a>
        </p>
      </div>
    </section>
  );
}
