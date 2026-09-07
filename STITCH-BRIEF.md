# KamJob — Stitch Design Brief

**The "Ink & Paper" design language, re-expressed as prompts for Google Stitch.**

| | |
|---|---|
| **Version** | 1.0 |
| **Target** | KamJob candidate app (iOS + Android) · Stitch **Mobile** canvas |
| **Design language** | "Ink & Paper" — defined in `MOBILE-DESIGN-SYSTEM.md`, originated in `app/globals.css` |
| **Role of this file** | Prompt source. Nothing here is a new design decision. |

---

## §0 · What this file is

`MOBILE-DESIGN-SYSTEM.md` is written for an implementing agent: tokens, file layout,
thread discipline, `borderCurve`. Stitch cannot read any of it. It takes plain English
and hex codes, and it has confident defaults that overwrite everything you leave unsaid.

This file is the same design language translated into that vocabulary. Every value traces
back to a token in the mobile system; nothing is invented. **When the two disagree, the
mobile system wins** — Stitch output is a mockup, not a spec.

### The one rule

> Stitch designs what you describe and templates whatever you don't.

"Ink & Paper" is defined as much by its refusals as by its palette — no pure white, no
pastel pills, no centred headings, no soft glowing buttons, no circular stock-photo
avatars. A prompt that lists only colours and fonts comes back as a generic Material job
board in green. **Every prompt has to carry the refusals.** That is why §1 repeats them
and why §3 exists.

---

## §0.1 · Workflow

1. **New project → Mobile.**
2. **Set the theme panel** (§2), if your build of Stitch exposes one. If it doesn't, the
   same values live in the style block and nothing is lost.
3. **Upload the reference images** (§6). A style reference outperforms a style
   description, every time.
4. **Generate screen 06 — the swipe feed — first.** Not onboarding. It carries the most
   signature elements (tricolour spine, ink poster block, mono tags, hard-shadow
   buttons). If it comes back right, the rest of the project inherits the look. If it
   comes back generic, fix it there before spending generations anywhere else.
5. **One screen per prompt.** Paste the §1.1 short block, then the screen block from §4.
   Never batch two screens into one prompt — Stitch averages them.
6. **Refine with §5.** One change per turn. Two changes per turn and it re-rolls the
   whole screen.
7. **Run the §7 checklist** before exporting.
8. **Export** (Copy to Figma / code) and hand off using §8's framing — as a picture, not
   as a source of truth.

**Mode:** use the higher-fidelity (experimental) mode for the first pass on screens
**06, 12 and 14** — the three with real art direction. Standard mode is fine for forms,
lists and settings, and it is the one you have generations to spend.

---

## §1 · The style block

### §1.1 Short block — prepend to **every** screen prompt

```
STYLE — KamJob "Ink & Paper": an editorial poster look for a Cameroonian job app.
Background is warm paper #F7F4EC — never pure white. Cards #FDFBF6. Sunken bands #EFEBE0.
Text #101A14, secondary text #5C6459. Hairline 1px borders #DED8C8.
Green #167A3E for buttons and active states, deep green #0E5A2C for links, gold #E9A81C, red #CB3A2A.
Green, red and gold appear together ONLY as a tricolour rule: a 36x3px bar split in exact thirds, used as a section marker or as a 5px vertical spine on the left edge of one card.
Fonts: Bricolage Grotesque ExtraBold for headlines and numbers with tight negative letter-spacing; Public Sans for all body text; JetBrains Mono 11px UPPERCASE with wide +2 letter-spacing for eyebrow labels and tags.
Buttons: full pill, green #167A3E, white label, 48px tall, resting on a HARD 3px solid dark-green offset shadow directly below — zero blur, no glow, no gradient.
Cards: 12px corners, 1px border, almost no shadow. Tags: 3px corners, rectangular outline in the tag colour, uppercase monospace, transparent fill — NOT pastel rounded chips.
All headings left-aligned, never centred. Avatars are rounded squares with initials, never circles, never photos.
No gradients, no glassmorphism, no emoji, no stock photos of people. Line icons only, 1.5px stroke, no coloured circle backgrounds.
Screen edge padding 16px.
```

### §1.2 Full block — for the very first prompt of a project, or a theme reset

Use once to establish the project. After that the short block is enough.

```
Design system for KamJob, a job-search app for Cameroon. The look is called "Ink & Paper": an editorial printed poster, not a SaaS dashboard. Five rules govern every screen.

1. PAPER, NEVER WHITE. The ground is warm paper #F7F4EC. Cards and inputs are #FDFBF6. Alternating bands and grouped lists are #EFEBE0. Pure #FFFFFF appears nowhere.

2. INK SLABS PUNCTUATE. A near-black green #0D1712 surface, full-bleed edge to edge, breaks the page roughly every third section. Text on it is #F1EEE4, secondary #9BA79D, green accents #6FD494, gold #F6C85C. One ink surface per screen at most — it is punctuation, not decoration.

3. THE TRICOLOUR IS STRUCTURAL. Cameroon's green #167A3E, red #CB3A2A and gold #E9A81C are used as drawn rules, spines and markers — never as pastel tints or coloured backgrounds. The canonical form is a 36x3px horizontal bar divided in exact thirds, sitting above a section heading; the second form is a 5px vertical band on a card's left edge. It appears once or twice per screen and nowhere else.

4. EVERY SECTION CHANGES SHAPE. Two adjacent blocks must not share a layout skeleton. Rotate between: full-bleed ink slab, two-column split, offset card, numbered list, horizontal ticker.

5. PHYSICAL PRESS, NOT SOFT GLOW. Buttons are pills sitting on a hard 3px solid offset shadow with zero blur — a printed object that can be pushed down into the page. Never a blurred drop shadow, never a glow, never a gradient fill.

TYPOGRAPHY — three voices, three jobs.
Bricolage Grotesque ExtraBold: headlines, screen titles, numerals, card titles. Tight negative tracking. 40px hero / 32px screen title / 24px section title / 19px card title.
Public Sans: every paragraph, label and list row. 16px body / 15px secondary / 14px label / 13px caption. Regular, Medium and SemiBold only.
JetBrains Mono Medium: eyebrows, tags, prices, timestamps, data. 11px UPPERCASE with +2 letter-spacing for eyebrows; 13px for prices and data; 10px for tag labels.

SPACING — a 4-point scale: 4, 8, 12, 16, 24, 32, 48, 64. Screen edge padding is 16px everywhere, no exceptions. Cards are padded 16px. Sections are 48px apart.

CORNERS are deliberately mixed, never uniform. Buttons: full pill. Cards and sheets: 12px. The swipe card and large panels: 16px. Inputs and alerts: 8px. Avatars and chips: 5px. Tags, stamps and badges: 3px. Uniform 16px corners on everything is the single clearest sign of a generated layout — avoid it.

COLOUR ROLES. Green #167A3E fills primary buttons and active states; #0F642F is its offset shadow and pressed fill; #0E5A2C is green text on paper. Gold #E9A81C marks stamps and "most complete" badges; text on gold is #241700. Red #CB3A2A is reject and destructive only. Borders #DED8C8, emphasised #C6BFAC.

BANNED, on every screen: pure white surfaces, gradients, glassmorphism on content, blurred glowing shadows, pastel rounded chips, circular avatars, stock photos of people, emoji, icons inside coloured circles, centred body headings, Material blue or purple, Roboto or Inter.
```

---

## §2 · Theme panel values

If your build of Stitch exposes a theme / customise panel, set these. It keeps the
palette from drifting across generations, which is the most common failure over a long
session.

| Control | Value |
|---|---|
| Primary colour | `#167A3E` |
| Background / surface | `#F7F4EC` |
| Secondary surface | `#FDFBF6` |
| Text | `#101A14` |
| Display / heading font | **Bricolage Grotesque** |
| Body font | **Public Sans** |
| Mono font | **JetBrains Mono** |
| Corner radius | `12px` |
| Border style | Hairline / 1px |

All three families are on Google Fonts, which is what Stitch draws from — they will
resolve. **If the panel applies one radius globally**, accept 12px here and correct the
exceptions with the §5.3 prompt: buttons must become full pills and tags 3px, or the
screen loses two of its signature moves at once.

### Dark theme

Generate the light screens first and get them right; only then ask for dark variants.

| Role | Light | Dark |
|---|---|---|
| Background | `#F7F4EC` | `#0A110D` |
| Card | `#FDFBF6` | `#111A14` |
| Sunken band | `#EFEBE0` | `#0D150F` |
| Ink slab | `#0D1712` | `#1C2C23` |
| Text | `#101A14` | `#EDEAE0` |
| Secondary text | `#5C6459` | `#99A398` |
| Border | `#DED8C8` | `#26332B` |
| Green | `#167A3E` | `#229950` |
| Green text | `#0E5A2C` | `#6FD494` |
| Red | `#CB3A2A` | `#D9503F` |

> **The dark-mode trap.** In dark mode the ink slab *lifts above* the card colour
> (`#1C2C23` over `#111A14`) instead of sinking below it. If Stitch returns a dark screen
> where the ink surfaces have vanished into the background, that is the bug — say so
> explicitly: *"in dark mode the ink slab must be lighter than the cards, #1C2C23 on
> #0A110D."*

---

## §3 · The refusal table

Stitch's defaults, what "Ink & Paper" needs instead, and the phrase that reliably flips
it. When a screen comes back wrong, find the row and paste the phrase — do not
re-describe the whole screen.

| Stitch will default to | Ink & Paper requires | Phrase that fixes it |
|---|---|---|
| Pure white `#FFFFFF` surfaces | Warm paper `#F7F4EC` | "The background is warm off-white #F7F4EC, never pure white. Cards are #FDFBF6." |
| Soft blurred drop shadows, glow | Hard 3px offset, zero blur | "Replace all blurred shadows. Buttons sit on a hard 3px solid #0F642F offset shadow directly below, zero blur radius." |
| Pastel rounded chips | Squared mono outline tags | "Tags are rectangles with 3px corners, 1px outline in the tag colour, transparent fill, uppercase 10px monospace. Not pastel pills." |
| Centred headings | Left-aligned | "All headings and eyebrows are left-aligned." |
| Circular photo avatars | Square initials | "Avatars are 5px-rounded squares filled dark green #0D1712 with white monospace initials. No photos, no circles." |
| One uniform radius everywhere | Mixed by role | "Corners vary by role: buttons are full pills, cards 12px, tags 3px, inputs 8px." |
| Material blue / purple accents | Cameroon green | "The only accent is green #167A3E. No blue, no purple." |
| Gradient hero banners | Flat ink slab | "No gradients anywhere. The dark section is a flat #0D1712 fill edge to edge." |
| Icons in coloured circles | Bare line icons | "Line icons, 1.5px stroke, in #101A14, with no background shape behind them." |
| Sentence-case section labels | Mono uppercase eyebrows | "Section labels are 11px JetBrains Mono, UPPERCASE, +2 letter-spacing, colour #5C6459." |
| Roboto / Inter / system sans | The three voices | "Headlines in Bricolage Grotesque ExtraBold, body in Public Sans, labels in JetBrains Mono." |
| Emoji as illustration | None | "No emoji anywhere in the interface." |
| Photo-collage empty states | Rule + text + one button | "Empty state is a 36x3px tricolour bar, a headline, one line of body text and a single green pill button. No illustration." |
| Grab handles on every panel | One sheet pattern | "Only the offer detail and the filters are sheets. Everything else is a full screen." |

---

## §4 · Screen prompts

Each block is complete: paste §1.1, then the block. Copy is French — the app is
French-first, and generating in English then translating loses the layout consequence
(French runs 15–20% longer, which is exactly what you need to see in the mockup).

> **Confirm before generating:** the tab bar below is proposed from the landing copy, not
> read from the app's routes. If the real app has different tabs, change them once here
> and the whole set stays consistent.
>
> **Tab bar (5 max):** `Offres` · `Candidatures` · `Bilan` · `Alertes` · `Profil`

---

### 06 · Feed d'offres — the swipe deck ⭐ generate this first

The signature screen. Everything else inherits from whether this comes back right.

```
Mobile screen: the offer feed of KamJob, a Cameroonian job app where you apply by swiping right.

Layout top to bottom:
- Status bar, then a slim header row: the wordmark "KamJob" left in Bricolage Grotesque ExtraBold 20px, and a line icon filter button right, 44x44px, 8px corners, 1px border #DED8C8.
- A left-aligned section header: a 36x3px tricolour bar (green #167A3E, red #CB3A2A, gold #E9A81C in exact thirds), then below it "OFFRES POUR TOI" in 11px JetBrains Mono uppercase +2 letter-spacing #5C6459, then "Pour toi" in Bricolage Grotesque ExtraBold 24px #101A14.
- The card deck, filling the rest of the screen. Two cards fan out behind the top card, rotated 3 and 6 degrees, filled #EFEBE0, only their edges visible.

The top card: #FDFBF6, 16px corners, 1px border #DED8C8, a very soft shadow, 16px inner padding, and a 5px vertical tricolour spine running the full height of its left edge.
Inside the card, top to bottom:
- A row: a 32x32px rounded-square avatar filled #0D1712 with "ST" in white 10px monospace, then "ST Digital" in Public Sans SemiBold 15px with a small green check icon after it. At the top-right corner of the card, a gold #E9A81C rectangular stamp rotated 8 degrees, 3px corners, reading "POSTULER" in 10px monospace uppercase, text #241700.
- "Head of Business Desk" in Bricolage Grotesque ExtraBold 24px #101A14, tight tracking.
- A row of three tags: "CDI", "DOUALA", "BAC+5". Each is a rectangle with 3px corners, transparent fill, 1px outline, label in 10px JetBrains Mono uppercase. First tag outlined green #167A3E, second red #CB3A2A, third gold #E9A81C.
- A recruitment poster block: a flat #0D1712 rectangle, 12px corners, filling the card width, about 180px tall. Inside it left-aligned: "NOUS" then "RECRUTONS" in Bricolage Grotesque ExtraBold 28px #F1EEE4 on two lines, a 36x3px tricolour bar under them, and "Postulez avant le 31 juillet" in 13px #9BA79D.
- A bottom row inside the card: a 56x56px circular outline button with an X icon in red #CB3A2A on the left, a thin #DED8C8 rule across the middle, and a 56x56px green #167A3E filled circular button with a check icon in white on the right, resting on a hard 3px #0F642F offset shadow.

Bottom tab bar on warm paper, 1px top border #DED8C8: Offres (active, green #167A3E), Candidatures, Bilan, Alertes, Profil. Line icons 1.5px stroke, labels 10px Public Sans Medium.
```

**Check:** the tricolour spine is present and vertical · the poster block is a real flat
dark rectangle, not an image placeholder · tags are squared outlines, not chips · the
accept button has a hard offset shadow.

---

### 01 · Onboarding

```
Mobile onboarding screen for KamJob. Bold and typographic, almost no chrome.

The top 55% of the screen is a full-bleed flat #0D1712 ink block reaching all four edges at the top. Inside it, bottom-left aligned with 24px padding: a 36x3px tricolour bar, then "L'EMPLOI AU CAMEROUN" in 11px JetBrains Mono uppercase +2 letter-spacing #9BA79D, then a three-line headline in Bricolage Grotesque ExtraBold 40px #F1EEE4 with very tight tracking and 0.95 line height: "Trouve ton emploi idéal en un swipe". The words "en un swipe" sit on their own line in green #6FD494.

Below, on warm paper #F7F4EC, 16px edge padding:
- A paragraph in Public Sans 16px #5C6459: "Swipe les offres de ton domaine. Un geste à droite et ta candidature part chez le recruteur."
- A full-width green #167A3E pill button 56px tall, white Public Sans SemiBold 16px label "Créer mon compte gratuit", resting on a hard 3px #0F642F offset shadow below it, no blur.
- A full-width pill button below it, fill #FDFBF6, 1px border #C6BFAC, label "J'ai déjà un compte" in #101A14.
- A centred caption in 13px #5C6459: "Gratuit pour postuler · Sans engagement · Mobile Money".
- Three page-indicator dashes at the bottom, 24x3px, the first green #167A3E and the others #DED8C8. Rectangles, not dots.
```

---

### 02 · Inscription

```
Mobile sign-up screen for KamJob on warm paper #F7F4EC, 16px edge padding.

- A back arrow line icon top-left, 44x44px tap area.
- A left-aligned header: 36x3px tricolour bar, "ÉTAPE 1 SUR 3" in 11px JetBrains Mono uppercase +2 tracking #5C6459, then "Crée ton compte" in Bricolage Grotesque ExtraBold 32px #101A14.
- Four stacked fields, 24px apart. Each field has its label ABOVE it in 11px JetBrains Mono uppercase #5C6459 — never a placeholder acting as the label. The input itself is #FDFBF6, 48px tall, 8px corners, 1px border #DED8C8, 16px horizontal padding, placeholder text #5C6459.
  NOM COMPLET — placeholder "Ton nom et prénom"
  EMAIL — placeholder "ton@email.com"
  TÉLÉPHONE — a fixed "+237" prefix in JetBrains Mono inside the field on the left, separated by a 1px vertical rule, then "6 XX XX XX XX"
  MOT DE PASSE — with a line-icon eye toggle on the right
- Show the email field in its focused state: 1px border green #167A3E.
- A checkbox row, 5px-rounded square checkbox: "J'accepte les conditions générales et la politique de confidentialité" in 13px #5C6459 with the two document names in green #0E5A2C.
- A full-width green #167A3E pill button, 56px, white label "Continuer", on a hard 3px #0F642F offset shadow.
- A footer line 13px: "Déjà inscrit ? Se connecter" with the last two words green #0E5A2C.
```

---

### 03 · Connexion

```
Mobile login screen for KamJob on warm paper #F7F4EC, 16px edge padding. Deliberately sparser than the sign-up screen — this is a returning user.

- Back arrow top-left.
- Left-aligned: 36x3px tricolour bar, then "Content de te revoir" in Bricolage Grotesque ExtraBold 32px #101A14, then "Reprends là où tu t'es arrêté." in Public Sans 16px #5C6459.
- Two fields with labels above in 11px mono uppercase: EMAIL, MOT DE PASSE. Fields #FDFBF6, 48px, 8px corners, 1px border #DED8C8.
- A right-aligned link "Mot de passe oublié ?" in 13px green #0E5A2C.
- A full-width green pill button "Se connecter", 56px, on a hard 3px #0F642F offset shadow.
- Below it an inline error alert, 8px corners, background a very light red wash, a 3px solid red #CB3A2A rule on its left edge only, text in 15px #A32418: "Email ou mot de passe incorrect."
- At the bottom: "Pas encore de compte ? S'inscrire", the last word green #0E5A2C.
```

---

### 04 · Profil — CV et lettre

```
Mobile profile-setup screen for KamJob: uploading a CV and a cover letter. Warm paper #F7F4EC, 16px edge padding.

- Header: 36x3px tricolour bar, "ÉTAPE 3 SUR 3" in 11px mono uppercase #5C6459, "Tes documents" in Bricolage Grotesque ExtraBold 32px, then in 15px #5C6459: "Ajoute-les une seule fois — ils accompagnent chaque candidature."

- An uploaded-file card: #FDFBF6, 12px corners, 1px border #DED8C8, 16px padding, with a 5px vertical tricolour spine on its left edge. A line document icon, then "CV_Aicha_Ngo.pdf" in Public Sans SemiBold 15px, "342 Ko · ajouté aujourd'hui" in 13px #5C6459 underneath, and a small line trash icon on the right in #CB3A2A. A small green check icon marks it complete.

- An empty upload target below it: a 12px-corner rectangle with a 1px DASHED border #C6BFAC, transparent fill, 120px tall, containing a centred line upload icon in #5C6459, "Lettre de motivation" in Public Sans Medium 15px #101A14, and "PDF ou DOCX, 5 Mo maximum" in 13px #5C6459.

- A grouped list block on #EFEBE0, 12px corners, three rows separated by 1px #DED8C8 hairlines. Each row: a label on the left in Public Sans 15px, a value on the right in 13px JetBrains Mono, and a chevron. Rows: "Domaine — INFORMATIQUE", "Ville — DOUALA", "Niveau — BAC+5".

- A full-width green pill button "Terminer mon profil", 56px, on a hard 3px #0F642F offset shadow. Below it a ghost text button "Passer pour l'instant" in green #0E5A2C, no fill, no border.
```

---

### 07 · Détail d'une offre (sheet)

```
Mobile bottom sheet showing a full job offer in KamJob, presented over a dimmed feed behind it. The scrim is #0D1712 at 50% opacity.

The sheet: #FDFBF6, 16px corners on the top two edges only, covering about 92% of the screen height, with a small grey grabber bar centred at the top. 16px edge padding.

Content top to bottom:
- A row: a 40x40px rounded-square avatar filled #0D1712 with "ST" in white monospace, "ST Digital" in Public Sans SemiBold 16px with a green verified check, "Douala · Publié il y a 2 jours" in 13px #5C6459 beneath.
- "Head of Business Desk" in Bricolage Grotesque ExtraBold 28px #101A14, tight tracking.
- A row of squared outline tags in 10px mono uppercase, 3px corners, transparent fill, cycling green / red / gold outlines: "CDI", "DOUALA", "BAC+5", "3 ANS D'EXPÉRIENCE".
- A compatibility strip on a flat #0D1712 block, 12px corners, 16px padding: "COMPATIBILITÉ" in 11px mono uppercase #9BA79D on the left, "82%" in Bricolage Grotesque ExtraBold 32px green #6FD494 on the right, and under them a 4px full-width track in #24352B with 82% of it filled green #6FD494. A small gold #F6C85C "PREMIUM" tag sits in the corner.
- "MISSIONS" as an 11px mono uppercase eyebrow with a 36x3px tricolour bar above it, then four bullet lines in Public Sans 15px #101A14, each preceded by a small green square marker rather than a round bullet.
- "PROFIL RECHERCHÉ" as a second eyebrow with the same treatment, three lines beneath.
- The employer's poster: a flat #0D1712 block, 12px corners, full width, 200px tall, with "NOUS RECRUTONS" in Bricolage Grotesque ExtraBold #F1EEE4 and a tricolour bar under it.

A pinned bottom action bar on #FDFBF6 with a 1px top border #DED8C8, 16px padding: a 48x48px outline button with an X icon in red #CB3A2A on the left, and beside it a full-width green #167A3E pill button "Postuler maintenant" in white Public Sans SemiBold, 56px tall, on a hard 3px #0F642F offset shadow.
```

---

### 08 · Candidature envoyée

```
Mobile confirmation screen after applying in KamJob. Restrained and typographic — a printed receipt, not a celebration screen. No confetti, no illustration, no emoji.

Warm paper #F7F4EC, content vertically centred, 16px edge padding.
- A 64x64px square with 5px corners, filled green #167A3E, with a white check line icon inside, 2px stroke.
- A 36x3px tricolour bar below it.
- "Candidature envoyée" in Bricolage Grotesque ExtraBold 32px #101A14, left-aligned.
- "Ton CV et ta lettre de motivation viennent de partir chez ST Digital. Tu recevras une confirmation par email." in Public Sans 16px #5C6459.
- A receipt card: #FDFBF6, 12px corners, 1px border #DED8C8, 16px padding, with three rows separated by 1px hairlines. Each row has a mono uppercase label 11px #5C6459 on the left and a value on the right: "POSTE — Head of Business Desk", "ENTREPRISE — ST Digital", "ENVOYÉ — 14:32, aujourd'hui". Values in 13px JetBrains Mono, right-aligned, tabular figures.
- A full-width green pill button "Continuer à swiper", 56px, on a hard 3px #0F642F offset shadow.
- A ghost text button "Voir mes candidatures" in green #0E5A2C below it.
```

---

### 09 · Mes candidatures

```
Mobile list screen: application history in KamJob. Warm paper #F7F4EC, 16px edge padding.

- A large screen title "Candidatures" in Bricolage Grotesque ExtraBold 32px #101A14, left-aligned, in a collapsing native header.
- A horizontal row of filter tags: "TOUTES", "EN ATTENTE", "VUES", "REFUSÉES". Squared 3px corners, 10px mono uppercase. The active one is filled #0D1712 with #F1EEE4 text; the others are transparent with a 1px #C6BFAC outline and #5C6459 text.
- A stats strip on a flat #0D1712 block, 12px corners, 16px padding, three columns separated by 1px #24352B vertical rules. Each column: a number in Bricolage Grotesque ExtraBold 28px #F1EEE4 and a label in 11px mono uppercase #9BA79D beneath. "12 / ENVOYÉES", "5 / VUES", "2 / ENTRETIENS".
- A list of application cards, 12px apart. Each: #FDFBF6, 12px corners, 1px border #DED8C8, 16px padding. Inside — a 32x32px rounded-square initials avatar filled #0D1712, the job title in Public Sans SemiBold 15px #101A14, the company and city in 13px #5C6459 beneath, a status tag on the right (3px corners, outline only: "EN ATTENTE" outlined gold #E9A81C, "VUE" outlined green #167A3E, "REFUSÉE" outlined red #CB3A2A), and a timestamp in 13px JetBrains Mono #5C6459 at the bottom right.
- The first card in the list carries a 5px vertical tricolour spine on its left edge; the others do not.
```

---

### 10 · État vide

```
Mobile empty state for the application list in KamJob. Warm paper #F7F4EC, content centred vertically, 16px edge padding. No illustration, no emoji, no stock image.

- A 36x3px tricolour bar.
- "Aucune candidature pour l'instant" in Bricolage Grotesque ExtraBold 24px #101A14, left-aligned.
- "Swipe une offre à droite et ta candidature apparaîtra ici, avec son statut." in Public Sans 15px #5C6459, maximum two lines.
- One green #167A3E pill button "Voir les offres", 48px tall, sized to its label rather than full width, on a hard 3px #0F642F offset shadow.
- Behind everything, very faintly: a 72x72px engineering graph-paper grid in #101A14 at 7% opacity, fading out towards the bottom of the screen.
```

---

### 11 · Candidature spontanée

```
Mobile form screen in KamJob for sending a spontaneous application to a company that has no open offer. Warm paper #F7F4EC, 16px edge padding.

- Header: 36x3px tricolour bar, "CANDIDATURE SPONTANÉE" in 11px mono uppercase +2 tracking #5C6459, "Écris à l'entreprise de ton choix" in Bricolage Grotesque ExtraBold 28px #101A14.
- A company search field: #FDFBF6, 48px, 8px corners, 1px border #DED8C8, a line search icon on the left, placeholder "Nom de l'entreprise".
- Three result rows below it in a grouped block on #EFEBE0 with 12px corners and 1px hairline separators. Each row: a rounded-square initials avatar, the company name in Public Sans Medium 15px, the sector in 13px #5C6459, and a 5px-rounded square radio control on the right. The second row is selected: its background is a very light green wash #E4EFE4 and its radio is filled green #167A3E.
- A label "OBJET" in 11px mono uppercase, then an input.
- A label "TON MESSAGE" in 11px mono uppercase, then a multiline textarea 140px tall, #FDFBF6, 8px corners, 1px border #DED8C8, with a character counter "0 / 800" in 13px JetBrains Mono, right-aligned beneath it.
- An attachments row: two squared tags with 3px corners and 1px #C6BFAC outlines showing "CV.PDF" and "LETTRE.PDF" in 10px mono uppercase, each with a small paperclip line icon.
- A full-width green pill button "Envoyer ma candidature", 56px, on a hard 3px #0F642F offset shadow.
```

---

### 12 · Premium ⭐ generate in high-fidelity mode

```
Mobile paywall screen for KamJob Premium. Editorial and confident, not a pastel pricing table. Warm paper #F7F4EC, 16px edge padding.

- A close X line icon top-right.
- Header: 36x3px tricolour bar, "TARIFS" in 11px mono uppercase +2 tracking #5C6459, "Des prix pensés pour toi" in Bricolage Grotesque ExtraBold 32px #101A14, then "Postuler reste 100 % gratuit, pour toujours." in Public Sans 15px #5C6459.
- A horizontally scrolling row of four plan cards, the second and third partly visible at the edges.

Ordinary plan card: #FDFBF6, 12px corners, 1px border #DED8C8, 16px padding, 280px wide. Inside — the plan name in Bricolage Grotesque Bold 19px #101A14; the price on one baseline as "1 550" in Bricolage Grotesque ExtraBold 40px with "FCFA" in 13px JetBrains Mono #5C6459 beside it; the duration "3 jours" in 11px mono uppercase #5C6459; a 1px #DED8C8 hairline; then three feature lines in Public Sans 15px, each preceded by a small green square marker, not a round check; and a pill button at the bottom filled #FDFBF6 with a 1px #C6BFAC border and label "Commencer".

The highlighted plan card is different in kind, not just in colour: a flat #0D1712 fill, 12px corners, no border, text #F1EEE4, secondary text #9BA79D, feature markers green #6FD494, its price in #F1EEE4, and a gold #E9A81C rectangular tag with 3px corners in its top-right reading "LE PLUS COMPLET" in 10px mono uppercase with #241700 text. Its button is filled green #167A3E with a white label, on a hard 3px #0F642F offset shadow.

- Below the row: a payment note in 13px #5C6459 — "Paiement unique par MTN MoMo ou Orange Money — aucun renouvellement automatique." — with two small squared logo tiles beside it, 5px corners, 1px #DED8C8 border.
```

---

### 13 · Paiement Mobile Money

```
Mobile payment screen in KamJob for a Mobile Money purchase. Warm paper #F7F4EC, 16px edge padding.

- Back arrow top-left, "Paiement" as a small centred navigation title in Public Sans SemiBold 16px.
- An order summary card: #FDFBF6, 12px corners, 1px border #DED8C8, 16px padding, with a 5px vertical tricolour spine on its left edge. Rows with mono uppercase 11px labels on the left and values right-aligned in 13px JetBrains Mono with tabular figures: "PASS — Premium Hebdo", "DURÉE — 7 jours". A 1px hairline, then a total row: "TOTAL" in 11px mono uppercase and "2 500 FCFA" in Bricolage Grotesque ExtraBold 24px #101A14.
- An operator choice: two side-by-side selectable tiles, each #FDFBF6, 8px corners, 88px tall, containing a squared logo placeholder and a name in Public Sans Medium 15px — "MTN MoMo" and "Orange Money". The selected tile has a 2px green #167A3E border and a small green check in its top-right corner; the unselected one has a 1px #DED8C8 border.
- A phone field with the label "NUMÉRO DE TÉLÉPHONE" above it in 11px mono uppercase, a fixed "+237" prefix in JetBrains Mono separated by a 1px vertical rule, and the number in JetBrains Mono 16px.
- An informational alert: 8px corners, a very light gold wash background, a 3px solid gold #E9A81C rule on the left edge only, text in 15px #7A4E00 — "Tu recevras une demande de confirmation sur ton téléphone."
- A full-width green pill button "Payer 2 500 FCFA", 56px, on a hard 3px #0F642F offset shadow.
- Below it, a caption in 13px #5C6459 with a small line padlock icon: "Paiement unique · Aucun renouvellement automatique".
```

---

### 14 · Bilan intelligent ⭐ generate in high-fidelity mode

```
Mobile report screen in KamJob: the weekly AI report of jobs it applied to on the user's behalf. It should read like a printed dossier.

The top third is a full-bleed flat #0D1712 ink block reaching the screen edges, with 24px padding and left-aligned content: a 36x3px tricolour bar, "BILAN INTELLIGENT" in 11px JetBrains Mono uppercase +2 tracking #9BA79D, "Semaine du 3 mars" in Bricolage Grotesque ExtraBold 28px #F1EEE4, and beneath it a three-column row separated by 1px #24352B vertical rules — each column a number in Bricolage Grotesque ExtraBold 32px #F1EEE4 over a label in 11px mono uppercase #9BA79D: "38 / OFFRES SCANNÉES", "7 / RETENUES", "7 / CANDIDATURES".

Below it, on warm paper #F7F4EC with 16px edge padding:
- A left-aligned eyebrow "OFFRES RETENUES" in 11px mono uppercase #5C6459 with a 36x3px tricolour bar above it.
- A list of report cards, 12px apart, each #FDFBF6 with 12px corners, a 1px #DED8C8 border and 16px padding. Inside: a two-digit index "01" in 10px JetBrains Mono #5C6459 in the top-left corner; the job title in Public Sans SemiBold 15px; the company in 13px #5C6459; a compatibility figure on the right as "91%" in Bricolage Grotesque ExtraBold 24px green #0E5A2C; a thin 3px full-width track in #EFEBE0 at the bottom of the card with 91% filled green #167A3E; and a squared 3px-corner tag outlined green reading "CV OPTIMISÉ" in 10px mono uppercase.
- One card in the list is the exception: filled #0D1712 with #F1EEE4 text and a green #6FD494 percentage, marking the strongest match.
- A closing full-width pill button, fill #FDFBF6 with a 1px #C6BFAC border, label "Télécharger le rapport PDF" with a small line download icon.
```

---

### 15 · Notifications

```
Mobile notifications screen for KamJob. Warm paper #F7F4EC, 16px edge padding.

- Screen title "Alertes" in Bricolage Grotesque ExtraBold 32px #101A14, left-aligned, with a small text button "Tout marquer comme lu" on the right in 13px green #0E5A2C.
- A date group header "AUJOURD'HUI" in 11px JetBrains Mono uppercase +2 tracking #5C6459, left-aligned, with a 1px #DED8C8 hairline running from the end of the label to the right edge of the screen.
- Notification rows on paper, separated by 1px #DED8C8 hairlines, each 16px vertical padding. Each row: a 32x32px 5px-rounded square icon tile on the left with a 1px border and a line icon inside — no coloured circle; the message in Public Sans 15px #101A14 with the company name in SemiBold; a timestamp in 13px JetBrains Mono #5C6459 on the right.
- Unread rows are marked by a 3px vertical green #167A3E rule at the far left edge of the row plus a very light #E4EFE4 background wash. Read rows have neither.
- A second date group "CETTE SEMAINE" with three more rows.
- Sample messages: "ST Digital a consulté ta candidature", "Nouvelle offre dans ton domaine à Douala", "Ton pass Premium expire dans 2 jours".
```

---

### 16 · Profil et réglages

```
Mobile profile and settings screen for KamJob. Warm paper #F7F4EC, 16px edge padding.

- A profile header block: a 64x64px rounded-square avatar with 5px corners, filled #0D1712, initials "AN" in white 19px JetBrains Mono. Beside it "Aïcha Ngo" in Bricolage Grotesque ExtraBold 24px #101A14 and "Développeuse web · Douala" in 15px #5C6459. On the right, a 44x44px outline icon button with a pencil icon, 8px corners, 1px #DED8C8 border.
- A premium status card: flat #0D1712, 12px corners, 16px padding, containing "PASS ACTIF" in 11px mono uppercase gold #F6C85C, "Premium Hebdo" in Bricolage Grotesque ExtraBold 19px #F1EEE4, "Expire dans 4 jours" in 13px #9BA79D, and a small gold #E9A81C rectangular stamp with 3px corners in the corner.
- Grouped settings lists on #EFEBE0 blocks with 12px corners and 1px #DED8C8 hairline separators. Each row is 48px tall with a line icon on the left, a label in Public Sans 15px, and either a chevron or a native switch on the right.
  Group "MON PROFIL": Documents (CV, lettre), Domaine et ville, Niveau d'études.
  Group "PRÉFÉRENCES": Notifications (switch on), Langue — with the value "FRANÇAIS" in 13px mono on the right, Thème sombre (switch off).
  Group "COMPTE": Conditions générales, Confidentialité, Nous écrire.
- Each group is preceded by its name as an 11px JetBrains Mono uppercase +2 tracking label in #5C6459, left-aligned above the block.
- A final destructive text row "Se déconnecter" in Public Sans Medium 15px red #A32418, left-aligned, with no fill and no border.
```

---

### 17 · Filtres (sheet)

```
Mobile filter sheet for the KamJob offer feed, presented over a dimmed feed. Scrim #0D1712 at 50% opacity.

The sheet: #FDFBF6, 16px corners on the top two edges, about 70% of the screen height, a small grabber bar at the top, 16px padding.
- A header row: "Filtres" in Bricolage Grotesque ExtraBold 24px #101A14 on the left, "Réinitialiser" as a 13px green #0E5A2C text button on the right.
- "DOMAINE" as an 11px mono uppercase label, then a wrapping group of squared selectable tags with 3px corners: "INFORMATIQUE", "FINANCE", "SANTÉ", "ÉDUCATION", "AGRONOMIE", "MARKETING", "JURIDIQUE". Unselected tags are transparent with a 1px #C6BFAC outline and #5C6459 label; selected tags are filled #0D1712 with #F1EEE4 label. Two are selected.
- "VILLE" as a second label, with the same tag treatment: "DOUALA", "YAOUNDÉ", "BUÉA", "BAFOUSSAM", "GAROUA", "LIMBÉ".
- "TYPE DE CONTRAT" with tags "CDI", "CDD", "STAGE", "FREELANCE".
- "NIVEAU" with tags "BAC", "BAC+2", "BAC+3", "BAC+5".
- A pinned bottom bar with a 1px top border: a full-width green #167A3E pill button "Voir 34 offres", 56px, white label, on a hard 3px #0F642F offset shadow.
```

---

### 18 · Bandeau hors ligne (variant instruction)

Not a screen — a modifier. Append to any generated screen.

```
Add a persistent offline banner pinned directly below the status bar, above all screen content: full width, 36px tall, background #0D1712, a small line cloud-off icon in #F6C85C, and the text "Hors ligne — tes actions seront envoyées à la reconnexion" in 13px Public Sans #F1EEE4. It pushes the content down rather than covering it, and it has no close button.
```

---

## §5 · Refinement prompts

Paste one at a time as a follow-up on a generated screen. One change per turn.

**§5.1 — The palette drifted**
```
Keep the layout exactly as it is. Change only the colours: background to warm paper #F7F4EC, cards to #FDFBF6, all borders to 1px #DED8C8, body text to #101A14, secondary text to #5C6459, and every accent to green #167A3E. Remove any blue, purple or grey-blue tint.
```

**§5.2 — The buttons look generic**
```
Keep everything else. Redraw the primary buttons only: full pill shape, filled #167A3E, white Public Sans SemiBold label, 56px tall, sitting on a hard 3px solid #0F642F offset shadow directly below the button with zero blur radius. Remove all blurred shadows, glows and gradients from them.
```

**§5.3 — Every corner is the same**
```
Keep the layout. Vary the corner radii by role: buttons become full pills, cards and sheets 12px, the swipe card 16px, inputs and alerts 8px, avatars 5px, and tags and badges 3px. Nothing keeps a uniform radius.
```

**§5.4 — Tags came back as pastel chips**
```
Redraw the tags: rectangles with 3px corners, fully transparent fill, a 1px outline, and a label in 10px JetBrains Mono uppercase in the outline colour. The outlines cycle green #167A3E, red #CB3A2A, gold #E9A81C by position. No pill shapes, no filled pastel backgrounds.
```

**§5.5 — No tricolour anywhere**
```
Add a 36x3px horizontal bar above the section heading, divided into exact thirds: green #167A3E, red #CB3A2A, gold #E9A81C, with hard edges and no gradient between them. Add a 5px vertical band in the same three colours running down the full left edge of the first card only.
```

**§5.6 — Everything is centred**
```
Left-align all headings, eyebrows and body text. Only the empty state and the confirmation screen keep centred content.
```

**§5.7 — The typography is flat**
```
Keep the layout. Headlines and numbers become Bricolage Grotesque ExtraBold with tight negative letter-spacing; body text becomes Public Sans; and every small label, tag, price and timestamp becomes JetBrains Mono — uppercase with +2 letter-spacing when it is a section label.
```

**§5.8 — The screen reads as a template**
```
Break the uniformity: turn exactly one block on this screen into a full-bleed flat #0D1712 panel reaching both screen edges, with #F1EEE4 text, #9BA79D secondary text and green #6FD494 accents. It should be the block that carries the numbers or the summary. Everything else stays on warm paper.
```

**§5.9 — French copy overflowed**
```
Keep the design. Make every button, label and tag size itself to its text and wrap onto a second line rather than truncating. French labels run 15 to 20 percent longer than English and must not be clipped.
```

---

## §6 · Reference images to upload

Stitch follows a picture more faithfully than a paragraph. Two minutes of screenshots is
worth more than another round of prompt tuning.

```bash
npm run dev     # then screenshot http://localhost:3000
```

| Upload | Crop | Say when uploading |
|---|---|---|
| Landing hero | Full width, top viewport | "Match this palette, typography and button treatment exactly. Adapt the layout to mobile." |
| The card deck mockup | Just the phone mockup | "This is the card the swipe feed is built on. Reproduce its structure: tricolour spine, gold rotated stamp, squared tags, dark poster block." |
| The pricing section | The highlighted plan | "Note how the emphasised card is a dark fill, not a coloured border." |
| A section header | Eyebrow + rule + title | "This is the section-header pattern used on every screen." |

**Do not** upload a competitor's app screenshot as reference. It transfers their layout
conventions along with the style, and undoes the point of the whole system.

---

## §7 · Acceptance checklist

Run before exporting anything. Each is a yes or no.

- [ ] No pure `#FFFFFF` anywhere. The ground is `#F7F4EC`.
- [ ] The tricolour appears **1–2 times** on the screen — as a rule or a spine — and never as a background tint.
- [ ] Primary buttons are pills on a hard 3px offset shadow, zero blur.
- [ ] Corners are mixed by role. Nothing is uniformly rounded.
- [ ] Tags are squared outlines in mono uppercase, not pastel chips.
- [ ] Headings are left-aligned.
- [ ] Exactly one ink `#0D1712` surface per screen, at most.
- [ ] Avatars are rounded squares with initials. No photos of people.
- [ ] All three fonts are present and doing their own job.
- [ ] Screen edge padding is 16px, consistently.
- [ ] No gradients, no glass, no glow, no emoji, no icons in coloured circles.
- [ ] The copy is French, and no label is truncated.
- [ ] Placed beside the previous screen, the two do **not** share a layout skeleton.

The last check is the one that gets skipped and matters most. Generate screens in pairs
and compare them side by side.

---

## §8 · Handing the export back to code

Export **Copy to Figma** for design review, or the code export for reference. Then, when
the export goes to the implementing agent, frame it exactly this way:

> These Stitch screens are **layout and hierarchy reference only**. `MOBILE-DESIGN-SYSTEM.md`
> is the source of truth for every value. Take the composition, the content order and the
> copy. Take nothing else.

**Keep from the export:** screen composition, content order, hierarchy, what sits above
the fold, the French strings, and any empty or error state you hadn't thought of.

**Discard from the export:** its CSS and Tailwind classes, its exact radii and shadows,
its font weights, any colour that drifted, its spacing values, its icon set, its
component boundaries. Stitch does not know about `borderCurve: 'continuous'`, the 44pt
touch target, `allowFontScaling`, the press mechanic, or the dark-mode inversion rule —
and its output will quietly contradict all five.

A screen is done when it satisfies `MOBILE-DESIGN-SYSTEM.md` §11's self-critique pass —
not when it matches the Stitch mockup.

---

## Appendix A · Employer web dashboard

The employer portal is web, not mobile. Switch Stitch to the **Web** canvas, use the same
§1.1 style block with the adaptation below, and generate two screens.

```
Adapt for desktop web at 1440px: a max content width of 1200px centred, edge padding 32px, and a persistent left sidebar 240px wide on #EFEBE0 with a 1px right border #DED8C8. Hover states exist here — buttons darken to #0F642F on hover, cards lift 3px and their border sharpens to #C6BFAC. Everything else in the style block is unchanged.
```

**A.1 — Publier une offre**
```
Web screen: the KamJob employer form for publishing a job offer. Left sidebar with the KamJob wordmark, then nav rows: Tableau de bord, Mes offres, Candidatures, Entreprise. The active row has a 3px green #167A3E rule on its left edge.
Main area: a 36x3px tricolour bar, "NOUVELLE OFFRE" in 11px mono uppercase, "Publier une offre" in Bricolage Grotesque ExtraBold 40px. A two-column layout — the form on the left at two thirds width with labelled fields above their inputs (Intitulé du poste, Type de contrat, Ville, Niveau requis, Email de réception des candidatures, Date d'expiration), and on the right a sticky preview card showing how the offer will appear in the mobile app, complete with its tricolour spine and dark poster block. A dashed 1px #C6BFAC upload target for the offer poster image. A green pill button "Publier l'offre" on a hard 3px #0F642F offset shadow.
```

**A.2 — Candidatures reçues**
```
Web screen: the KamJob employer applications table. Same sidebar. A 36x3px tricolour bar, "Candidatures reçues" in Bricolage Grotesque ExtraBold 40px, and a stats strip on a flat #0D1712 block with four columns separated by 1px #24352B rules — numbers in Bricolage Grotesque ExtraBold #F1EEE4 over 11px mono uppercase labels #9BA79D.
Below, a table on #FDFBF6 with 12px corners and 1px #DED8C8 hairline rows. Columns: candidate (rounded-square initials avatar plus name), poste, ville, statut as a squared outline tag, reçu le as 13px JetBrains Mono with tabular figures, and a right-hand actions cell with two line icon buttons for downloading the CV and the cover letter. Column headers in 11px JetBrains Mono uppercase +2 tracking #5C6459. Rows alternate #FDFBF6 and #F7F4EC. No zebra blue, no coloured status pills.
```

---

## Appendix B · Copy source

Every French string in §4 is either lifted from `lib/translations.ts` or written in its
register. If you need copy for a screen not covered here, take it from that file rather
than letting Stitch invent it — generated French drifts into the formal *vous*, and the
app is consistently *tu*.

| Screen | Strings live in |
|---|---|
| Onboarding, feed, offer | `translations.ts` → `hero`, `mockup`, `features` |
| Premium, payment | `translations.ts` → `pricing` |
| Bilan intelligent | `translations.ts` → `features.items[4]`, `faq.items[3]` |
| Employer screens | `translations.ts` → `spaces`, `employers` |
| Legal and settings rows | `lib/legal.ts` |

---

## Appendix C · Quick reference

Everything Stitch needs in one block, for when you are prompting from your phone.

```
Paper #F7F4EC · Card #FDFBF6 · Sunk #EFEBE0 · Ink #0D1712 · Ink text #F1EEE4
Text #101A14 · Muted #5C6459 · Border #DED8C8 · Strong border #C6BFAC
Green #167A3E · Green shadow #0F642F · Green text #0E5A2C · Green on ink #6FD494
Gold #E9A81C · Red #CB3A2A
Bricolage Grotesque ExtraBold / Public Sans / JetBrains Mono
Radius: pill buttons · 12 cards · 16 swipe card · 8 inputs · 5 avatars · 3 tags
Spacing: 4 8 12 16 24 32 48 64 · edge padding 16 · buttons 48-56 tall
Never: white, gradients, glow, pastel chips, circles, centred headings, emoji
```
