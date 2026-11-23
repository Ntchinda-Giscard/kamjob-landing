"use client";

import { ContactSection } from "@/components/contact-section";
import { SiteFooter } from "@/components/site-footer";
import { SubpageHeader } from "@/components/subpage-header";
import { useLanguage } from "@/lib/i18n";

/** Body of /contact. The form used to sit inside the landing page's closing
 *  sequence, where its submit button competed with the sign-up CTA. */
export function ContactPage() {
  const { t } = useLanguage();

  return (
    <div className="min-h-screen bg-background">
      <SubpageHeader backLabel={t.nav.backHome} />
      <main id="main">
        <ContactSection />
      </main>
      <SiteFooter />
    </div>
  );
}
