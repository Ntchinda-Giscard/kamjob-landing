# Landing page audit — KamJob (localhost:3123, `app/page.tsx`)

**Looked at:** the running dev build at 1280×800 (17 screens, 12,836px tall) and 390×844 (23 screens, 19,205px tall), plus `app/page.tsx`, `app/globals.css`, `lib/translations.ts` and the shared components.
**Benchmarks:** 8 live pricing sections, 8 testimonial sections and 5 split product-UI heroes from Landingfolio (free tier shows the newest 40 per category).

**What the page is:** a consumer job app for Cameroon (swipe to apply, then an AI interview coach). The page runs header → hero with two real phone screens → ink stats bar → offer ticker → testimonials → problem (ink) → sticky scroll tour of four app screens and three extras → coach (ink, three phones) → how it works → four pricing cards → trust row → FAQ → employers (ink) → contact form → final CTA → footer (ink). The look is "Ink & Paper": warm paper, near-black green slabs, and the Cameroon tricolour used as rules.

The base is solid. Nothing stops the page from doing its job, so there's no Critical finding. The problems are about meaning, ordering and length.

## Critical

None. The product and the primary CTA are clear on the first screen at both widths, body text passes AA, and there's no horizontal scroll at 390px.

## Major

### 1. The tricolour cycle paints "Postuler" in the app's reject red
**Where:** `app/page.tsx:82-89` (`FLAG`/`flagAt`), used 12 times: tour kicker "02 — POSTULER" and its rail bar (`:256`, `:312`), How-it-works numeral "02" (`:1129`), the trust row's shield icon "Vos documents restent à vous" (`:1310`), testimonial quote marks (`:873`), the ticker diamonds and the claim dots. On top of that, 20 `tricolor` rules (header, every eyebrow, every slab edge, contact card, pricing card, sticky bar, footer ×3).
**Violates:** color.md › Accents ("Semantic colors keep their meaning: red for errors and destructive actions"; "the brand color is used sparingly enough to mean something"), consistency.md › Finishing details ("Accents are used sparingly… on every card it becomes noise").
**Why it matters:** the file's own header says red is the app's "Ignorer" colour, yet the cycle puts it on the positive action (Apply), on the data-safety promise and on a neutral step number. The green/red/gold rotation then runs through almost every section, so the flag stops marking anything and reads as decoration. The gold variant fails as an icon colour too: `--gold-solid` on paper is **1.89:1** (color.md asks for ≥ 3:1 for icons that carry meaning).
**Fix:** keep the tricolour as a signature in 2–3 places only (header rule, the footer, one hero mark). Give items a single accent: brand green for steps, numerals and positive states. Keep red strictly for "reject / problem" (the problem section already does this well). Drop the per-item `flagAt` colouring and use `--gold-text` (6.55:1), never `--gold-solid`, for any gold that sits on paper.

### 2. Proof is parked in one block, far from both decision points
**Where:** hero CTA (`:752-766`) has only the claim line next to it. Testimonials are section "01" (`:847`), ~6,000px above pricing (`:1148`), and nothing proof-like sits near pricing or the final CTA. The stats bar right after the hero (`:776-800`) shows "12 domaines / 10 villes / 1 geste / 0 FCFA": product facts, two of which repeat the claim line just above it.
**Violates:** landing-page.md › Proof ("Proof sits near the decision points: logos or a rating near the hero CTA, testimonials near pricing").
**Why it matters:** trust is needed at the moment of commitment. Right now the loudest post-hero block (56px white numerals on a full-bleed slab) carries no evidence that anyone uses the product.
**Benchmark:** 3 of 5 live split product-UI heroes put proof directly under the CTA ([beehiiv](https://www.landingfolio.com/inspiration/post/beehiiv) rating + customer count, [Lexboost](https://www.landingfolio.com/inspiration/post/lexboost) trust badges, [Dico](https://www.landingfolio.com/inspiration/post/dico) Product Hunt badge). [Orshot](https://www.landingfolio.com/inspiration/post/orshot) and [Agiloft](https://www.landingfolio.com/inspiration/post/agiloft) pair their quote with a CTA or metrics instead of isolating it.
**Fix:** put one real traction line under the hero CTA (active offers this week, applications sent, or a rating). Move testimonials to sit directly before pricing. Turn the stats bar into traction numbers, or drop it. **Check that the three testimonials are real users.** The code comment at `:884` reads as if they may be placeholders, and fabricated quotes are a trust and legal risk.

### 3. Pricing hides the free plan and lifts the most expensive one with four signals
**Where:** `app/page.tsx:1148-1285`, `lib/translations.ts:225-282`.
**Violates:** surfaces.md › Cards ("Cards in one row share padding, radius, elevation and height… align their CTAs to the bottom"; "the recommended plan is lifted by one clear signal… not four at once"), typography.md › Alignment ("mixed sizes on one line share a baseline"), consistency.md ("same component, same look").
**Why it matters:**
- The page's whole promise is "postuler est gratuit", but free only appears as a footnote under four paid cards.
- The highlight goes to the 16,999 FCFA tier ("Le plus complet") with an ink fill, a tricolour cap, a gold badge, an upward offset and the only solid button: four signals.
- `items-start` leaves four card heights and four CTA heights (y = 477 / 514 / 598 / 618 at 1280px). Plan names wrap to one or two lines, so prices start at two different heights, and the unit sits inline on two cards but drops below the price on the other two.
- Prices are formatted inconsistently: "1550", "2500" vs "7 699", "16 999" (FR), and "7699" in EN.
**Benchmark:** 7 of 8 live pricing sections show the free tier as a full card beside the paid ones ([ProIntro](https://www.landingfolio.com/inspiration/post/prointro) "Free. No trial, no card.", [Lindy](https://www.landingfolio.com/inspiration/post/lindy), [Heyo](https://www.landingfolio.com/inspiration/post/heyo)). None of the 8 uses four tiers, and none highlights the most expensive tier: the lift goes to the middle or first paid plan, with one signal (a coloured border or a tinted header).
**Fix:** make "Gratuit · pour toujours" the first card. Show 3 paid passes (or keep 4 but group the short passes) with one recommended plan, the monthly one, marked by a single brand border and a badge. Stretch the cards to equal height with CTAs pinned to the bottom, reserve the same space for every plan name, and format every price with a narrow no-break space ("7 699").

### 4. A support form, with the primary button style, sits inside the closing sequence
**Where:** `components/contact-section.tsx` rendered at `app/page.tsx:1433`, between the employer pitch and the final CTA. Its submit button is `btn btn-brand` (`contact-section.tsx:290`), the same solid green as "Créer mon profil gratuit".
**Violates:** landing-page.md › CTAs ("one primary button style, used for the same action everywhere"), hierarchy.md › Button tiers.
**Why it matters:** the last ~1,500px before the close ask the visitor to write a bug report, and the screen shows two identical solid green buttons for two different jobs ("Envoyer le message" and, one screen later, "Commencer maintenant").
**Fix:** take the form out of the conversion path: give it its own `/contact` route or a compact row above the footer (email + "Écrire à l'équipe" link). Style its submit as the ink button so green only ever means "sign up".

### 5. On a phone the page is 23 screens long, mostly single-column card stacks
**Where:** at 390px: testimonials (3 stacked cards ≈ 1.5 screens), "Et aussi" (3 cards), How it works (3 steps under 72px outline numerals, `:1117`), trust (3), pricing (4 cards ≈ 3 screens), FAQ (10 rows). How it works repeats the tour and coach in shorter form ("créez votre profil / glissez / préparez l'entretien").
**Violates:** landing-page.md › Mobile ("Rows of 3+ peer cards don't turn into a very long single-column stack; consider a swipe row or a 2-column grid"; "sections aren't separated by a screen of empty space").
**Why it matters:** most of this audience is on a phone and on mobile data. Every extra screen between the hero and pricing is a screen where they can leave, and the sticky CTA is carrying the whole page.
**Fix:** cut How it works (fold its "moins de cinq minutes" line into the final CTA) and merge trust into the pricing footer. Turn testimonials and the extras into swipe rows like the coach section already does (`snap-row`). Keep pricing to 3–4 compact cards. Target ≤ 14 screens at 390px.

## Minor

### 6. Ten different section-title sizes, and one-off text sizes throughout
**Where:** ten distinct `text-[clamp(...)]` values for h1/h2 (`SectionHeading` 2→3.25rem, problem 2.25→3.5rem, trust 1.75→2.75rem, FAQ 2→3rem, employers 2.25→4rem, final 2.4→4.5rem…). Body and label sizes include `text-[9px]`, `[10px]` ×5, `[11px]` ×10, `[13px]`, `[15px]` ×2, `[1.0625rem]`. Section numbers run 01–08 but skip trust and employers, and number content that isn't a sequence ("01 TÉMOIGNAGES").
**Violates:** typography.md › Type scale ("13px, 15px, 17px all in use means there's no scale"), landing-page.md › Section rhythm ("each section has one heading level that's consistent across the page").
**Fix:** use one h2 token (e.g. `clamp(2rem, 4.6vw, 3.25rem)`) for every section title, one display token for the hero and the close, and snap labels to 11/12px and body to 14/16/18px. Drop the section index numbers.

### 7. The hero headline wraps to four lines
**Where:** `app/page.tsx:721` at `clamp(2.6rem, 6.8vw, 4.75rem)` in a 1.12fr column: "Glissez pour / postuler. / Décrochez / l'entretien." With the four-line subtitle, the primary CTA lands at y ≈ 664 of 800px, and on a 1280×720 laptop the claim line falls below the fold. On mobile the subtitle runs to 6 lines and pushes the phone below the first screen.
**Violates:** typography.md › Line length ("Headlines in the hero wrap to 2–3 lines on desktop").
**Fix:** cap the display size around 4.1rem and widen the text column, so each sentence sits on one line (2 lines total). Shorten the subtitle to two sentences (copy pass) and move the coach mention into the tour.

### 8. Cards are styled three or four times over
**Where:** testimonial, extras and pricing cards: 1px border + raised fill + 3px coloured top spine + hover lift, and testimonials add a 60px coloured quote mark.
**Violates:** surfaces.md › Separation without clutter ("A card with a border, a shadow and a different background all at once is usually doing triple work").
**Fix:** keep the raised fill and the hairline border, drop the coloured spines (they're part of finding 1), and render the quote mark in the muted ink tone.

## What's working
- **Real product, shown well.** Real screenshots in one consistent CSS device frame, and the hero's 7-second swipe-to-"Candidature envoyée" loop explains the product with no words (images.md).
- **A real system underneath.** Warm token palette with light/dark ramps, AA contrast on body and muted text (5.58:1 on paper, 7.32:1 on ink), a visible `:focus-visible` ring, a skip link, and every animation stops under `prefers-reduced-motion`.
- **Mobile basics are right.** No horizontal scroll, full-width primary CTA, a sticky "Créer mon compte" bar after the hero, and the coach section already uses a swipe row.

## Status after the rebuild (2026-11-23)

Rebuilt in the existing Ink & Paper system (same tokens, fonts and screenshots), with the sections re-ordered and cut. `tsc` and `next build` both pass.

| # | Finding | Status |
|---|---------|--------|
| 1 | Red on "Postuler", tricolour everywhere | **Fixed.** `FLAG` cycling removed. Items use brand green, red appears only in the problem section, and the tricolour is kept to the masthead rule, the wordmark and the footer bar. No gold on paper. |
| 2 | Proof far from decisions | **Fixed.** Initials + an exact quote excerpt sit under the hero CTA, testimonials sit directly before pricing, and the stats bar became a quiet coverage band with the ticker. **Still open:** a real traction number (e.g. applications sent) would beat a quote, and the testimonials still need confirming as real users. |
| 3 | Pricing | **Fixed.** The free plan is a full-width ink band with the green CTA. The four passes share one baseline (unit on its own line), CTAs are pinned to the bottom, and the monthly pass is "Recommandé" with one brand border. Prices go through `Intl.NumberFormat` (7 699 / 7,699), and "usage équitable" is one footnote. |
| 4 | Contact form in the close | **Fixed.** Moved to `/contact` (in the sitemap; the submit button is ink). The FAQ links to it, and the employer pitch moved into the footer. |
| 5 | Mobile length | **Improved, short of target.** 19,205 → 13,884px at 390px (22.8 → 16.4 screens; the target was ≤ 14). How it works and the trust section are gone; extras, testimonials and passes are swipe rows; the footer links sit two-up. The four-step tour is still the longest stretch: making it a swipe row would get under 14 screens, but at the cost of the main "how it works" story. |
| 6 | Type scale | **Fixed.** `t-hero` / `t-h2` / `t-h3` tokens for every heading, section numbers removed, and the 9/10/13/15px one-offs snapped to 11/14/16px. |
| 7 | Four-line hero headline | **Fixed.** Two lines at 1280px (one sentence per line). The subtitle is shortened, and the secondary action is a text link ("Voir comment ça marche"). |
| 8 | Over-styled cards | **Fixed.** No coloured spines; the quote mark is a single green glyph on the featured quote only. |

Also fixed along the way: French no-break spaces before `? ! : ;` and inside `« »` (57 strings), the 🇨🇲 emoji that rendered as "CM" on Windows, and the hero CTA plus final CTA button wrapping on phones.
