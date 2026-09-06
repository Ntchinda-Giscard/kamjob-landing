# KamJob Mobile — "Ink & Paper" Design System

**Single source of truth for the KamJob React Native app.**
Ported from the `kamjob-landing` web design language (`app/globals.css`).

| | |
|---|---|
| **Version** | 1.0 |
| **Platform** | Expo SDK 57 · React Native 0.86 · React 19.2.3 |
| **Styling** | NativeWind v4 (Tailwind CSS 3.4.x) |
| **Motion** | React Native Reanimated 4.5 + Gesture Handler |
| **Status** | Adoption target for an existing app with drifted screens |

---

## §0 · How to use this document

### For the implementing agent

Read this file **before** writing or changing any screen. It is the authority. If a
screen needs a value that is not in here, the value does not get invented in the screen —
it gets added to `theme/tokens.ts` and to this document, or the screen uses the nearest
existing token.

**The three laws that make this work:**

1. **Components import tokens. Screens import components.** A screen importing `space`
   for layout padding is fine. A screen defining a button colour is drift.
2. **A literal that appears twice is a token.** No exceptions for "just this one place".
3. **If the same component appears on two screens, it is one component.** Not two that
   look alike.

### Skills to load, in order

| Order | Skill | Why |
|---|---|---|
| 1 | `expo:expo-overview` | Mandatory router hop for any Expo work. Enforces shared setup rules (SDK detection, `npx expo install`, version-pinned docs). |
| 2 | `expo:expo-design-system` | Owns token layout, the component contract, and the drift audit in §12. **The primary skill for this document.** |
| 3 | `expo:expo-native-ui` | Platform styling: what values look native, `borderCurve`, `boxShadow` syntax, semantic colours, SF Symbols. |
| 4 | `expo:expo-ui` | **Check before building any control.** `@expo/ui` has native BottomSheet, Picker, Switch, Slider, Menu, FieldGroup. Native beats hand-rolled. |
| 5 | `expo:expo-router` | Navigation, `NativeTabs`, `presentation: 'formSheet'`, `Link.Menu` / `Link.Preview`. |
| 6 | `expo:expo-animation` | Reanimated, gestures, haptics, the frequency gate in §7. **Required for the SwipeCard (§6.14).** |
| 7 | `expo:expo-tailwind-setup` | NativeWind wiring only. |

Situational: `ui-ux-pro-max:ui-ux-pro-max` (accessibility and UX rule lookup),
`expo:expo-upgrade` (never bump the SDK by hand), `expo:eas-app-stores` (shipping).

### Component selection rule

Before building **any** control — list rows, sheets, pickers, sliders, menus, segmented
controls, toggles — check `@expo/ui` for a native equivalent first. Native components
*are* the design system for their category; do not wrap them just to route them through
this one.

One trap: `@expo/ui` `List` renders native grouped rows (an iOS Settings screen). It is
**not** virtualised. Use `FlatList` / `FlashList` for the offer feed.

---

## §1 · Stack & version contract

```jsonc
{
  "expo": "~57.0.0",
  "react": "19.2.3",
  "react-native": "0.86.x",
  "react-native-reanimated": "~4.5.0",
  "react-native-worklets": "*",          // peer of Reanimated 4
  "react-native-gesture-handler": "*",
  "nativewind": "^4.x",                  // NOT v5 — see the warning below
  "tailwindcss": "3.4.17",               // pinned; NativeWind v4 requires Tailwind 3
  "expo-glass-effect": "~57.0.1",
  "expo-blur": "*",                      // Liquid Glass fallback
  "expo-haptics": "*",
  "expo-font": "*"
}
```

Install with `npx expo install <pkg>`, never bare `npm install` — it resolves the version
matching SDK 57.

### ⚠ Two version facts to verify before you start

**1. NativeWind v4 pins Tailwind CSS 3.** The landing page runs Tailwind **v4** with the
`@theme` CSS block. That syntax does not transfer. On mobile the tokens live in a
`tailwind.config.ts` `theme.extend` object (Tailwind 3 format). The *values* port
verbatim; the *file format* does not. §3.7 shows the exact bridge.

**2. NativeWind v4 on RN 0.86 is unverified.** NativeWind v5 is the version aligned with
Tailwind 4, RN 0.81+, Reanimated 4+ and the New Architecture — but it is **pre-release
and explicitly "not intended for production use"**. v4 is the stable track and the right
production call, which is why this document targets it. I could not find a maintainer
statement confirming v4 against RN 0.86 specifically.

> **First task for the implementing agent:** stand up a throwaway screen with a
> `className`-styled `View`, a `dark:` variant and an `active:` variant, and confirm all
> three compile and render on SDK 57. If v4 is broken on RN 0.86, stop and report — do
> not silently migrate to v5, and do not hand-roll a styling layer. Everything else in
> this document is styling-library-agnostic and survives that decision.

### 120fps

ProMotion caps third-party animation at 60fps without this. Recent SDKs set it by
default — confirm, and add if missing:

```json
{ "expo": { "ios": { "infoPlist": { "CADisableMinimumFrameDurationOnPhone": true } } } }
```

---

## §2 · The design language

Five laws. Every visual decision in this document derives from one of them. When a new
situation is not covered, decide by these.

### Law 1 — Paper, never white

The ground is warm paper (`#F7F4EC`), not `#FFFFFF`. A pure-white surface is the single
loudest tell of a generated layout. Six points of warmth cost nothing and read as a
printed object.

### Law 2 — Ink slabs punctuate, they don't decorate

Contrast rhythm comes from full-bleed near-black panels dropped into the paper flow —
the stats bar, the primary CTA panel, the tab bar. **Ink is a structural beat, not a card
style.** If a slab is not marking a section boundary or an inverted moment, it should be
paper.

In dark mode the slab **inverts direction**: it becomes the surface that *lifts*, not the
one that sinks. It must clear `paper.raised` by a visible margin or the whole rhythm
collapses into one flat tone. (This exact bug shipped on the web build and had to be
fixed — see §3.1.)

### Law 3 — The tricolour is structural

Green · red · gold, in Cameroon flag order, used as **rules, spines, markers and outlined
numerals**. Never as pastel icon tiles, never as decorative confetti, never as a
background wash behind text.

This is the one thing no template can borrow. It is also the thing most likely to be
misapplied: the moment the tricolour becomes a gradient background or a coloured chip
fill, the identity is gone.

| Correct | Wrong |
|---|---|
| 3px rule under a section eyebrow | Tricolour gradient as a card background |
| Vertical spine on the left edge of a card | Three coloured dots as decoration |
| Single flag hue as a card's top edge, cycling by index | Rainbow text |
| Outlined numerals, one hue per step | Tricolour behind body copy |

### Law 4 — Every section changes shape

Six sections built from one repeated unit is what makes a product feel generated. Rotate
the structural device: indexed rule → ink data bar → ticker → outlined numerals →
asymmetric split → hairline row. **Two adjacent screens must not use the same layout
skeleton.**

### Law 5 — Physical press, not soft glow

Buttons sit on a hard 3px offset shadow and **travel down into it** on press. No blurred
glow, no scale-and-fade. It is a printed-object affordance and it is the opposite of the
default pill every generated app ships.

---

## §3 · Tokens

### §3.1 Colour

Static hex throughout. **Deliberately not `PlatformColor` / semantic colours** — this is a
strong brand palette, not a system-styled app, and Reanimated cannot animate
`PlatformColor` values (see §7.6). Semantic colours stay available for genuinely
system-owned chrome only.

#### Light (default)

| Token | Value | Use |
|---|---|---|
| `paper.DEFAULT` | `#F7F4EC` | App background. **Never `#FFFFFF`.** |
| `paper.sunk` | `#EFEBE0` | Alternating section band, grouped list background |
| `paper.raised` | `#FDFBF6` | Cards, sheets, input fields |
| `ink.DEFAULT` | `#0D1712` | Slab surfaces, primary text |
| `ink.raised` | `#16241C` | Card on a slab |
| `ink.fg` | `#F1EEE4` | Text on ink |
| `ink.muted` | `#9BA79D` | Secondary text on ink |
| `ink.border` | `#24352B` | Hairline on ink |
| `fg.DEFAULT` | `#101A14` | Body text on paper |
| `fg.muted` | `#5C6459` | Secondary text on paper |
| `border.DEFAULT` | `#DED8C8` | Hairlines, input borders |
| `border.strong` | `#C6BFAC` | Emphasised borders, pressed input |
| `brand.solid` | `#167A3E` | Button fills, active states |
| `brand.hover` | `#0F642F` | Button offset shadow, pressed fill |
| `brand.text` | `#0E5A2C` | Brand-coloured text on paper |
| `brand.onInk` | `#6FD494` | Brand-coloured text on ink |
| `brand.pale` | `#E4EFE4` | Selected row wash *(sparingly — Law 3)* |
| `gold.solid` | `#E9A81C` | Tricolour member, stamps, "most complete" badge |
| `gold.text` | `#7A4E00` | Gold text on paper |
| `gold.onInk` | `#F6C85C` | Gold text on ink |
| `onGold` | `#241700` | Text on a gold fill |
| `red.solid` | `#CB3A2A` | Tricolour member, reject action, destructive |
| `red.text` | `#A32418` | Error text on paper |
| `red.onInk` | `#FF9482` | Error text on ink |

#### Dark

Only these change. Everything else resolves from the same names.

| Token | Value | Note |
|---|---|---|
| `paper.DEFAULT` | `#0A110D` | |
| `paper.sunk` | `#0D150F` | |
| `paper.raised` | `#111A14` | Cards |
| `ink.DEFAULT` | `#1C2C23` | **Lifts above `paper.raised`** — Law 2 |
| `ink.raised` | `#24362B` | |
| `ink.muted` | `#9EA99D` | |
| `ink.border` | `#33473A` | |
| `fg.DEFAULT` | `#EDEAE0` | |
| `fg.muted` | `#99A398` | |
| `border.DEFAULT` | `#26332B` | |
| `border.strong` | `#3A4A40` | |
| `brand.solid` | `#229950` | |
| `brand.hover` | `#2CB160` | |
| `brand.text` | `#6FD494` | |
| `brand.pale` | `rgba(34,153,80,0.16)` | |
| `gold.text` | `#F6C85C` | |
| `red.solid` | `#D9503F` | |
| `red.text` | `#FF9482` | |

> **The dark-mode trap, stated explicitly.** On the web build `ink` and `paper.raised`
> both resolved to `#121C16`, and every ink surface — the stats bar, the lead feature
> tile, the highlighted plan — vanished into its background. `ink.DEFAULT` must always
> clear `paper.raised` by a visible margin in dark mode. Verify with a side-by-side
> screenshot, not by reading the hex.

#### Verified contrast (WCAG AA)

| Pair | Ratio | Verdict |
|---|---|---|
| `brand.solid` #167A3E ← white | **5.40** | AA ✅ (primary button label) |
| `brand.text` #0E5A2C ← `paper` | **7.60** | AAA ✅ |
| `fg.muted` #5C6459 ← `paper.raised` | **5.88** | AA ✅ |
| `ink.fg` #F1EEE4 ← `ink` (light) | **15.19** | AAA ✅ |
| `ink.muted` #9EA99D ← `ink` (dark) | **6.01** | AA ✅ |
| `brand.onInk` #6FD494 ← `ink` (dark) | **8.04** | AAA ✅ |

Any new colour pair must be measured before it ships. `brand.solid` on white is the
tightest pair in the system at 5.40 — do not lighten it.

### §3.2 Typography

Three voices, three jobs.

| Role | Family | Used for |
|---|---|---|
| **Display** | Bricolage Grotesque | Headlines, numerals, wordmark, card titles |
| **Body** | Public Sans | Every paragraph, label, list row |
| **Mono** | JetBrains Mono | Eyebrows, data, tags, prices, timestamps, tickers |

#### Font loading — weights via `fontFamily`, never `fontWeight`

Variable-font axis selection is unreliable in React Native. Bundle **static instances**
and address them by family name. Setting `fontWeight` alongside a static family makes iOS
synthesise the weight or fall back to the system font.

Ship six files:

```
assets/fonts/
  BricolageGrotesque-Bold.ttf         → "Bricolage-Bold"
  BricolageGrotesque-ExtraBold.ttf    → "Bricolage-ExtraBold"
  PublicSans-Regular.ttf              → "PublicSans-Regular"
  PublicSans-Medium.ttf               → "PublicSans-Medium"
  PublicSans-SemiBold.ttf             → "PublicSans-SemiBold"
  JetBrainsMono-Medium.ttf            → "JetBrainsMono-Medium"
```

`JetBrainsMono-Bold` is the only optional seventh — add it only if a mono element needs
genuine bold. Mono is used at small sizes where Medium reads as bold already.

#### The ramp

Sizes mirror the Apple text-style ramp so they feel native. **Screens never touch
`fontSize` — they use `<Text variant="…">` (§6.1).**

| Variant | Size | Family | Line height | Tracking | Use |
|---|---|---|---|---|---|
| `hero` | 40 | Bricolage-ExtraBold | 40 | -1.4 | Onboarding / empty-state headline |
| `largeTitle` | 32 | Bricolage-ExtraBold | 34 | -1.1 | Screen headline (non-stack) |
| `title` | 24 | Bricolage-ExtraBold | 28 | -0.7 | Section heading, card deck job title |
| `heading` | 19 | Bricolage-Bold | 24 | -0.4 | Card title, list group header |
| `body` | 16 | PublicSans-Regular | 24 | 0 | Default paragraph |
| `bodyStrong` | 16 | PublicSans-SemiBold | 24 | 0 | Emphasised body, button label |
| `callout` | 15 | PublicSans-Regular | 21 | 0 | Secondary paragraph |
| `label` | 14 | PublicSans-Medium | 18 | 0 | Form labels, list row titles |
| `caption` | 13 | PublicSans-Regular | 17 | 0 | Helper text, timestamps |
| `eyebrow` | 11 | JetBrainsMono-Medium | 14 | +2.0 | **UPPERCASE** section markers |
| `mono` | 13 | JetBrainsMono-Medium | 17 | +0.3 | Prices, data, tags |
| `monoSmall` | 10 | JetBrainsMono-Medium | 13 | +1.2 | Tag labels, card indices |

**Never** set `fontSize` below 13 for anything a user reads as content. `eyebrow` and
`monoSmall` are labels, uppercase, and always paired with a larger element.

**`allowFontScaling` stays on.** Consequence: never animate to a hardcoded height, and
never give a text container a fixed height. Measure with `onLayout` or animate a
transform. At 200% type the eyebrow row wraps — design for it.

### §3.3 Spacing

One 4-point scale. Named by size, never by use.

| Token | Value | Typical |
|---|---|---|
| `space.xs` | 4 | Icon-to-label gap |
| `space.sm` | 8 | Tag gaps, tight stacks |
| `space.md` | 12 | Input inner padding |
| `space.lg` | 16 | **Screen edge padding.** Card inner padding |
| `space.xl` | 24 | Card-to-card, group gaps |
| `space['2xl']` | 32 | Section inner padding |
| `space['3xl']` | 48 | Section-to-section |
| `space['4xl']` | 64 | Slab vertical padding |

Rules:
- **Screen edge padding is `space.lg` (16).** One value, everywhere, no exceptions.
- Use `gap` for rhythm, not margin.
- A layout needing a between-step value uses the nearest step. If the same off-scale
  multiple of 4 keeps recurring, add it as a named step and update the §12 audit
  whitelist — do not scatter literals.

### §3.4 Radius

The web build deliberately mixes sharp structural corners with full pills. Preserve that
— uniform `rounded-2xl` on everything is a template tell.

| Token | Value | Use |
|---|---|---|
| `radius.xs` | 3 | Mono tags, stamps, badges |
| `radius.sm` | 5 | Avatar squares, small chips |
| `radius.md` | 8 | Inputs, alerts, inner blocks |
| `radius.lg` | 12 | Cards, sheets |
| `radius.xl` | 16 | Swipe card, large panels |
| `radius.pill` | 9999 | **Buttons only** |

**Pair every non-pill radius with `borderCurve: 'continuous'`.** Without it iOS draws a
circular corner and the shape reads subtly cheaper than the design.

Radius discipline: pills are reserved for buttons. A pill-shaped card or input is drift.

### §3.5 Elevation

`boxShadow` strings only. **Legacy `shadowColor` / `shadowOffset` / `shadowOpacity` /
`shadowRadius` / `elevation` props are banned** — they are inconsistent across platforms
and the audit greps for them.

| Token | Value | Use |
|---|---|---|
| `shadow.card` | `0 1px 2px rgba(28,34,24,0.05)` | Resting card |
| `shadow.raised` | `0 2px 4px rgba(28,34,24,0.07), 0 18px 34px -14px rgba(28,34,24,0.20)` | Swipe card, floating panel |
| `shadow.overlay` | `0 8px 24px rgba(28,34,24,0.24)` | Sheet, dialog |
| `shadow.pressBrand` | `0 3px 0 0 {brand.hover}` | **Primary button rest state** |
| `shadow.pressInk` | `0 3px 0 0 #000000` | **Ink button rest state** |

Dark mode swaps the tint to `rgba(0,0,0,0.45)` at the same geometry.

The `pressBrand` / `pressInk` tokens are Law 5 — a hard offset, zero blur, that the button
travels into. Do not blur them.

**Never animate Android `elevation`** — it re-renders the shadow every frame. Crossfade a
pre-shadowed layer instead.

### §3.6 Motion

| Token | Value | Use |
|---|---|---|
| `motion.press` | 120ms | Press feedback |
| `motion.fast` | 180ms | Toggle, chip, small state change |
| `motion.base` | 260ms | Element enter/exit |
| `motion.slow` | 340ms | Sheets, large surfaces |

```ts
// theme/motion.ts
import { Easing } from 'react-native-reanimated';

export const ease = {
  out:   Easing.bezier(0.23, 1, 0.32, 1),      // default for UI
  inOut: Easing.bezier(0.77, 0, 0.175, 1),     // on-screen movement
  sheet: Easing.bezier(0.32, 0.72, 0, 1),      // iOS sheet curve
  linear: Easing.linear,                        // tickers only
} as const;

export const spring = {
  settle:   { duration: 400, dampingRatio: 1 },
  snapBack: { duration: 400, dampingRatio: 0.8 },   // + velocity
  sheet:    { duration: 300, dampingRatio: 0.8 },   // + velocity
} as const;
```

**Never `ease-in` on UI.** It starts slow, delaying the exact moment the user is watching.

**If a finger was involved, use a spring** and pass the gesture velocity. Springs carry
velocity through an interruption; timing curves restart.

### §3.7 Where tokens live — the single-source bridge

The hard part of "one source of truth" with NativeWind is that **two consumers need the
same values**: Tailwind classes, and plain JS (Reanimated configs, glass tints,
navigation options, canvas). Duplicating them is exactly the drift this document exists
to prevent.

**One file. Tailwind imports it.**

```
theme/
  tokens.ts       ← THE source of truth. Exports color, space, radius, shadow, motion, type.
  motion.ts       ← Easing/spring objects (needs the Reanimated import, so kept separate)
  index.ts        ← re-exports both
tailwind.config.ts ← imports from theme/tokens.ts. Defines NO values of its own.
global.css        ← Tailwind directives only.
```

```ts
// theme/tokens.ts — abridged
export const color = {
  paper:  { DEFAULT: '#F7F4EC', sunk: '#EFEBE0', raised: '#FDFBF6' },
  ink:    { DEFAULT: '#0D1712', raised: '#16241C', fg: '#F1EEE4',
            muted: '#9BA79D', border: '#24352B' },
  brand:  { solid: '#167A3E', hover: '#0F642F', text: '#0E5A2C',
            onInk: '#6FD494', pale: '#E4EFE4' },
  gold:   { solid: '#E9A81C', text: '#7A4E00', onInk: '#F6C85C' },
  red:    { solid: '#CB3A2A', text: '#A32418', onInk: '#FF9482' },
  fg:     { DEFAULT: '#101A14', muted: '#5C6459' },
  border: { DEFAULT: '#DED8C8', strong: '#C6BFAC' },
} as const;

export const space  = { xs:4, sm:8, md:12, lg:16, xl:24, '2xl':32, '3xl':48, '4xl':64 } as const;
export const radius = { xs:3, sm:5, md:8, lg:12, xl:16, pill:9999 } as const;
```

```ts
// tailwind.config.ts — consumes, never defines
import { color, space, radius } from './theme/tokens';

export default {
  content: ['./app/**/*.{ts,tsx}', './components/**/*.{ts,tsx}'],
  presets: [require('nativewind/preset')],
  darkMode: 'class',
  theme: {
    extend: {
      colors: color,
      spacing: space,
      borderRadius: radius,
      fontFamily: {
        display: ['Bricolage-ExtraBold'],
        displayBold: ['Bricolage-Bold'],
        body: ['PublicSans-Regular'],
        bodyMed: ['PublicSans-Medium'],
        bodySemi: ['PublicSans-SemiBold'],
        mono: ['JetBrainsMono-Medium'],
      },
    },
  },
};
```

> Tailwind 3 resolves a `.ts` config via jiti. If that misbehaves under NativeWind v4's
> Metro transformer, rename both to `.js` with `module.exports` / `require` — the
> single-source principle is what matters, not the file extension. **Never** solve it by
> pasting the hex values into `tailwind.config`.

**Dark mode.** NativeWind `dark:` variants read the class strategy. Drive it from
`useColorScheme()` at the root and use `dark:` in `className`. For values consumed in JS
(glass tint, Reanimated colours), read the scheme and pick from a light/dark pair —
`useColorScheme()` at render time, never inside a worklet.

---

## §4 · Liquid Glass

Liquid Glass is a **surface treatment for floating chrome**, not a card style and not a
theme. It is applied by exactly one component (`<GlassSurface>`) and nothing else in the
app imports `expo-glass-effect` directly.

### §4.1 Availability

```ts
import { isLiquidGlassAvailable, isGlassEffectAPIAvailable } from 'expo-glass-effect';
```

| Gate | Meaning |
|---|---|
| `isGlassEffectAPIAvailable()` | The iOS 26+ glass API exists at runtime. Some iOS 26 betas ship without it and **crash** if you skip this check. |
| `isLiquidGlassAvailable()` | The app is actually running the Liquid Glass design. |

**Check both.** `GlassView` is iOS 26+ only. Android and older iOS never get glass.

### §4.2 The fallback ladder

Every glass surface degrades through the same three rungs. This is the whole component:

```tsx
// components/ui/glass-surface.tsx
import { View, type ViewProps } from 'react-native';
import { BlurView } from 'expo-blur';
import { GlassView, isLiquidGlassAvailable, isGlassEffectAPIAvailable } from 'expo-glass-effect';
import { useColorScheme } from 'nativewind';
import { color, radius } from '@/theme';

const GLASS_OK = isGlassEffectAPIAvailable() && isLiquidGlassAvailable();

type Props = ViewProps & {
  /** 'regular' for chrome over content; 'clear' only over imagery. */
  tone?: 'regular' | 'clear';
  /** Set true ONLY inside a React Native <Modal>. See §4.4. */
  forceFallback?: boolean;
};

export function GlassSurface({ tone = 'regular', forceFallback, style, children, ...rest }: Props) {
  const { colorScheme } = useColorScheme();
  const dark = colorScheme === 'dark';

  // Rung 1 — real Liquid Glass (iOS 26+)
  if (GLASS_OK && !forceFallback) {
    return (
      <GlassView
        glassEffectStyle={tone}
        isInteractive
        style={[{ borderRadius: radius.lg, borderCurve: 'continuous' }, style]}
        {...rest}
      >
        {children}
      </GlassView>
    );
  }

  // Rung 2 — blur (iOS < 26, and inside Modals)
  if (!forceFallback) {
    return (
      <BlurView
        intensity={dark ? 40 : 60}
        tint={dark ? 'dark' : 'light'}
        style={[{ borderRadius: radius.lg, borderCurve: 'continuous', overflow: 'hidden' }, style]}
        {...rest}
      >
        {children}
      </BlurView>
    );
  }

  // Rung 3 — opaque token surface (Android, Modals, reduced transparency)
  return (
    <View
      style={[
        {
          borderRadius: radius.lg,
          borderCurve: 'continuous',
          backgroundColor: dark ? color.paper.raised : color.paper.raised,
          borderWidth: 1,
          borderColor: dark ? color.ink.border : color.border.DEFAULT,
        },
        style,
      ]}
      {...rest}
    >
      {children}
    </View>
  );
}
```

**Rung 3 must be a designed state, not a degraded one.** Most KamJob users are on
Android. The opaque paper surface is what the majority actually sees — it gets the same
design attention as the glass rung, and no layout may depend on translucency to be
legible.

### §4.3 Where glass goes

| Surface | Glass? | Why |
|---|---|---|
| Tab bar background | ✅ Yes | Floating chrome over scrolling content. The canonical use. |
| Floating swipe-action bar over the card deck | ✅ Yes | Chrome over moving content — glass earns its keep. |
| Header background on scroll | ✅ Yes | Content passes under it. |
| Floating filter / sort pill | ✅ Yes | Small, floating, over a feed. |
| **Inside a React Native `<Modal>`** | ❌ **Never** | **Breaks touch — see §4.4.** |
| The swipe card itself | ❌ No | It *is* the content. Glass over moving content is mud. Use `paper.raised`. |
| Form inputs | ❌ No | Legibility. Inputs need an opaque field. |
| List rows | ❌ No | Cost per row, and rows are content. |
| Any surface carrying body copy | ❌ No | Text on glass fails contrast unpredictably against scrolling content. |
| Alerts / toasts | ❌ No | Must be legible instantly against anything. |
| Ink slabs | ❌ No | Law 2 — a slab is opaque by definition. |

**The rule in one line:** glass is for chrome that floats *over* content. If the surface
*is* content, it is paper or ink.

### §4.4 Hard constraints

**1. Never put glass inside a React Native `<Modal>`.**
Documented failure: `Pressable` children register `onPressIn` but `onPress` **never
fires**. The modal is unusable and the bug looks like a logic error. Pass
`forceFallback` to drop straight to rung 3, or build the sheet as a route
(`presentation: 'formSheet'`, §6.9) instead of a `<Modal>` — which is the better answer
anyway.

**2. Never animate a glass surface with `opacity`.**
Setting `opacity: 0` on a `GlassView` *or any parent* disables the effect entirely — and
it does not come back. Use `glassEffectStyle={{ animate: true, animationDuration }}`, or
animate `transform` only.

**3. Never animate `BlurView` intensity.**
On Android it re-renders the blur every frame. Crossfade the opacity of a static
`BlurView` instead.

**4. Watch for first-frame transparency and scroll-off hangs.**
SDK 55 shipped a `didMoveToWindow` race where glass painted transparent on cold open and
never recovered, plus a JS-thread freeze when glass scrolled offscreen. These were SDK 55
regressions and may be fixed in 57 — **verify on a release build before shipping glass in
a scrolling context.** If they reproduce, the escape hatch is `@expo/ui/swift-ui` `Host`
in `wrap` mode for static surfaces and `background` mode for dynamic ones. Do not adopt
that complexity pre-emptively.

**5. `GlassContainer spacing`** controls when adjacent glass elements merge. Use it for
the swipe-action bar's grouped buttons; do not nest `GlassView`s without it.

### §4.5 Respect the accessibility setting

iOS "Reduce Transparency" must drop to rung 3. Read it and force the fallback:

```ts
import { AccessibilityInfo } from 'react-native';
// isReduceTransparencyEnabled() → force rung 3 app-wide
```

---

## §5 · The component contract

Every primitive in `components/ui/` defines these four things explicitly. A component
missing any of them is not done.

| | Rule |
|---|---|
| **Variants** | Visual intent as a `variant` prop. Never boolean soup (`isPrimary`, `isGhost`). Add a variant only when a real screen needs it. |
| **Sizes** | `sm` / `md` / `lg`, default `md`. Sizes map to spacing and type tokens — never to fresh numbers. |
| **States** | default · **pressed** · disabled · loading. There is no hover. No tappable element ships without pressed feedback. |
| **Style override** | Accept `style` / `className` and merge it **last**. Callers may override *layout* (margin, flex), never *identity*. A caller overriding colours means the variant set is incomplete — fix the component. |

### Composition over configuration

When props start describing **content** (`leftIcon`, `subtitle`, `footerText`,
`badgeCount`), stop adding props and accept `children`. A `Card` that renders `children`
with token padding outlives any `Card` with twelve content props.

### When to extract

Promote into `components/ui/` only when **all three** hold:

1. It appears in **two or more screens**.
2. It has a **nameable role** ("Card", "EmptyState") — not "the thing on the profile screen".
3. Its **API is smaller than its implementation**. If props would just re-expose every
   internal style, it is a screen fragment, not a primitive.

Path: inline JSX → `screens/<name>/` → `components/ui/`. One step at a time, when the
trigger fires, never speculatively. **A second copy of a view is cheaper than a primitive
with a bad API.**

### Do not wrap native components

`Switch`, `DateTimePicker`, stack headers, `@expo/ui` views already carry the platform
design language. Do not wrap them to route them through this system. Native styling *is*
the design system for those.

---

## §6 · Component catalogue

File layout:

```
components/ui/          ← primitives. Screens import ONLY from here.
  text.tsx  button.tsx  icon-button.tsx  input.tsx  card.tsx  tag.tsx
  glass-surface.tsx  sheet.tsx  dialog.tsx  toast.tsx  accordion.tsx
  avatar.tsx  empty-state.tsx  skeleton.tsx  tricolor-rule.tsx  section-header.tsx
components/swipe/       ← the signature surface
  swipe-card.tsx  card-deck.tsx  swipe-actions.tsx
```

### §6.1 `Text`

The only component that touches `fontSize`. **No screen imports `Text` from
`react-native`.**

```tsx
<Text variant="title">Head of Business Desk</Text>
<Text variant="eyebrow" tone="muted">EN 3 ÉTAPES</Text>
<Text variant="mono" tone="brand">1 550 FCFA</Text>
```

| Prop | Values | Default |
|---|---|---|
| `variant` | any key of the §3.2 ramp | `body` |
| `tone` | `default` `muted` `brand` `gold` `danger` `onInk` `onInkMuted` | `default` |
| `align` | `left` `center` `right` | `left` |

`eyebrow` uppercases its content automatically — callers pass normal-case strings so
translations stay readable in the dictionary.

### §6.2 `Button` — Law 5 made concrete

The signature interaction. It rests on a hard offset shadow and travels into it.

| Variant | Fill | Label | Rest shadow |
|---|---|---|---|
| `brand` | `brand.solid` | white | `shadow.pressBrand` |
| `ink` | `ink` | `ink.fg` | `shadow.pressInk` |
| `paper` | `paper.raised` | `fg` | none, `border.strong` 1px |
| `ghost` | transparent | `brand.text` | none |
| `danger` | `red.solid` | white | `0 3px 0 0 {red darker}` |

| Size | Height | Padding X | Label variant |
|---|---|---|---|
| `sm` | 36 | `space.lg` | `label` |
| `md` | 48 | `space.xl` | `bodyStrong` |
| `lg` | 56 | `space['2xl']` | `bodyStrong` |

**All sizes clear the 44pt minimum target except `sm` — `sm` must carry `hitSlop`.**

```tsx
// components/ui/button.tsx — the press mechanic
import { Pressable } from 'react-native';
import Animated from 'react-native-reanimated';
import { motion } from '@/theme';

<Pressable
  accessibilityRole="button"
  accessibilityState={{ disabled, busy: loading }}
  disabled={disabled || loading}
  pressRetentionOffset={8}          // a drifting finger shouldn't cancel
  onPress={onPress}
>
  {({ pressed }) => (
    <Animated.View
      style={[
        base,
        {
          // Reanimated 4 CSS transition — state-driven, no gesture, no shared value.
          transitionProperty: ['transform', 'boxShadow'],
          transitionDuration: motion.press,          // 120ms
          transitionTimingFunction: 'ease-out',
          transform: [{ translateY: pressed ? 3 : 0 }],
          boxShadow: pressed ? 'none' : restShadow,
          opacity: disabled ? 0.4 : 1,
        },
      ]}
    >
      {loading ? <ActivityIndicator color={labelColor} /> : <Text …>{title}</Text>}
    </Animated.View>
  )}
</Pressable>
```

Notes:
- A press is a **two-state change with no finger tracking** → CSS transition, not a shared
  value. Reaching for `useSharedValue` here is the mobile equivalent of installing a
  motion library for a fade.
- `translateY` + `boxShadow`, never `scale`. Scale is the generic mobile press; travelling
  into the shadow is *this* design language.
- Loading replaces the label in place — the button must not resize, or the layout jumps.

### §6.3 `IconButton`

Square, `radius.md`, 44×44 minimum. Same press mechanic without the offset shadow.
`accessibilityLabel` is **required** — enforce it in the type signature.

### §6.4 `Input`

| | |
|---|---|
| Field | `paper.raised`, `radius.md`, `borderCurve: 'continuous'`, 1px `border` |
| Focus | border → `brand.solid`, 1px ring. Never remove the focus indicator. |
| Error | border → `red.solid`, message below in `caption` + `tone="danger"` |
| Label | **Always visible**, `eyebrow` variant above the field. Placeholder is never the label. |
| Height | 48 min |
| Padding | `space.lg` horizontal, `space.md` vertical |

States: default · focused · filled · error · disabled · read-only.

Error text sits **next to the field it describes**, never collected at the top of the
form. Validate on blur, not on every keystroke.

### §6.5 `Card`

`paper.raised` · `radius.lg` · `borderCurve: 'continuous'` · 1px `border` · `shadow.card`
· `space.lg` padding.

| Variant | Use |
|---|---|
| `paper` | Default |
| `ink` | Law 2 — an inverted beat. Only for a section's single emphasised card. |
| `outlined` | No shadow, border only. Grouped lists. |

Optional `spine` prop paints the tricolour vertical rule on the left edge (Law 3). Use it
for the primary card in a group, not for every card.

**Accepts `children`.** No content props.

### §6.6 `Tag`

The squared mono tag — deliberately **not** a pastel pill. Pill-shaped pastel chips were
the single most template-looking element in the original design.

`radius.xs` · 1px border in the tone colour · label in `monoSmall` uppercase · transparent
fill.

Tones cycle the tricolour by index (`brand` → `red` → `gold`) so a row of tags reads as
one system.

### §6.7 `TricolorRule` & `SectionHeader`

`TricolorRule` — the Law 3 primitive. Props: `width` (default 36), `height` (default 3),
`orientation`. Renders the three flag bands at exact thirds.

`SectionHeader` — indexed marker + title + optional subtitle:

```
02  ▬▬▬  DEUX ESPACES
Tu cherches, ou tu recrutes ?
```

Props: `index` ("02"), `eyebrow`, `title`, `subtitle`, `align` (default `start`),
`tone` (`paper` | `ink`). **Left-aligned by default** — centring every heading is what
made the web version read as a template before the overhaul. Centre only where a single
column has nothing to be asymmetric against.

### §6.8 `Avatar`

Squared (`radius.sm`), ink fill, initials in `monoSmall`. **Not circular, not a photo
placeholder.** Initials are honest; a stock headshot of a person who does not exist is
not.

### §6.9 `Sheet` — one implementation, one behaviour

**Sheets are routes, not `<Modal>`s.**

```tsx
// app/(app)/offer/[id].tsx
export const unstable_settings = { presentation: 'formSheet' };
```

`presentation: 'formSheet'` is a real `UISheetPresentationController` — detents, grabber,
drag-to-dismiss, and the correct scroll interaction are free and correct. Do not
hand-roll a bottom sheet.

For non-route sheets, use `@expo/ui` `BottomSheet` — **not** `@gorhom/bottom-sheet` and
not a Reanimated implementation.

| | |
|---|---|
| Surface | `paper.raised`, `radius.xl` top corners |
| Grabber | Platform default |
| Detents | Prefer platform detents over custom heights |
| Dismiss | Drag **or** flick. Velocity *or* distance threshold — a flick is enough. |
| Motion | `spring.sheet` with the gesture velocity passed through |
| Glass | ❌ No — a sheet is content |

### §6.10 `Dialog` — the only `<Modal>` in the app

For destructive confirmation only. Everything else is a sheet or a route.

| | |
|---|---|
| Surface | `paper.raised`, `radius.lg`, `shadow.overlay` |
| Scrim | `rgba(13,23,18,0.5)` |
| Buttons | Stacked on mobile. Destructive action uses `variant="danger"`. Cancel is `paper`. |
| Glass | ❌ **Never** — §4.4 constraint 1 |
| Motion | Scrim fades `motion.fast`; panel `scale 0.96 → 1` + opacity, `motion.base`, `ease.out`. **Never `scale(0)`.** |

Dismissible by scrim tap **unless** destructive.

### §6.11 `Toast` / `Alert`

Inline `Alert` for form and screen-level errors: `radius.md`, 3px left rule in the tone
colour, tinted background at low alpha, `callout` text.

`Toast` for transient confirmations ("Candidature envoyée"). Ink surface, `radius.lg`,
enters from the bottom above the tab bar, auto-dismisses at 4s, swipe to dismiss.
**Never glass** — it must be legible instantly against anything.

Tones: `success` (brand) · `error` (red) · `info` (gold).

### §6.12 Navigation

| Element | Implementation |
|---|---|
| Tab bar | `NativeTabs` from `expo-router/unstable-native-tabs` — the platform's real tab bar. Glass background ✅ |
| Stack header | Native stack. `headerLargeTitleEnabled` on iOS for the collapsing large title — **not** a scroll worklet. |
| Screen titles | Come from the navigator, not from a `<Text>` in the screen body. |
| Context menu / peek | `Link.Menu` / `Link.Preview` (iOS) — never rebuilt in JS |
| Tab switch animation | **`animation: 'none'`** |

**Tabs never slide.** Tabs are peers, not a hierarchy — sliding implies depth that is not
there, and the user pays for it dozens of times per session.

Max 5 tabs. Back behaviour must be predictable; every screen deep-linkable.

### §6.13 `EmptyState` & `Skeleton`

`EmptyState`: `title` variant headline, `callout` body, one `brand` button, a
`TricolorRule` above. Every list has one — an empty feed with no explanation reads as a
bug.

`Skeleton`: `paper.sunk` blocks at the exact dimensions of the real content, so nothing
shifts on load (CLS is a mobile problem too). Pulse via opacity on the UI thread. Never a
spinner where a skeleton fits.

### §6.14 `SwipeCard` — the signature component

This is where the design language and the product meet. It is the app's single most
important surface and it gets the most care.

**Anatomy** (ported from the web `CardDeck`):

```
┌─────────────────────────────────┐
│▌  ST  ST Digital ✓    [POSTULER]│  ← tricolour spine (left, 5px)
│▌                       ↑ gold   │    gold stamp, rotated 8°
│▌  Head of Business Desk         │  ← title variant
│▌  [CDI] [DOUALA] [BAC+5]        │  ← Tag row, tricolour cycle
│▌  ┌───────────────────────────┐ │
│▌  │  NOUS                     │ │  ← the employer's poster,
│▌  │  RECRUTONS                │ │    on an ink block
│▌  │  ▬▬▬                      │ │
│▌  └───────────────────────────┘ │
│▌     ✕  ─────────────  ✓        │  ← swipe affordance
└─────────────────────────────────┘
```

- Surface: `paper.raised`, `radius.xl`, `shadow.raised`. **Never glass.**
- Behind it: two fanned cards at `rotate(3deg)` / `rotate(6deg)`, `paper.sunk` — the queue.
- The poster block is a real ink surface, because the employer's poster is the artefact
  this market actually circulates on WhatsApp. Reproduce it, don't abstract it.

**Gesture spec:**

| | |
|---|---|
| Tool | `Gesture.Pan()` + `useSharedValue` + `useAnimatedStyle`. A finger is on it, so this is the one place shared values are correct. |
| Properties | `translateX`, `translateY`, `rotate` — transform only, never layout |
| Rotation | Derived from `translateX`, max ±12° |
| Commit threshold | **Velocity OR distance.** A flick past ~800px/s commits even if short. Distance-only thresholds feel broken. |
| Below threshold | `withSpring(0, { ...spring.snapBack, velocity })` |
| Commit | Fly out along the gesture vector, `spring.snapBack` with velocity |
| Edges | Rubber-band resistance, never a hard stop |
| Overlay | ✓ / ✕ stamps fade in via `interpolate` on `translateX` |
| Haptic | `Haptics.impactAsync(Light)` **at the moment the threshold is crossed**, not on release — via `useAnimatedReaction`, scheduled with `scheduleOnRN` |
| Reduced motion | Keep opacity/colour feedback, drop rotation and overshoot |

**Thread discipline — the rules that keep this at 60fps:**

- **Never `setState` in `onUpdate`.** One React render per frame is the single biggest
  cause of jank in RN.
- **Never call `scheduleOnRN` in `onUpdate`** — that is 60–120 RN-runtime calls per
  second. It belongs in `onEnd`, or in a `useAnimatedReaction` firing at a threshold.
- Use `.get()` / `.set()`, not `.value` — the React-Compiler-safe form.
- Never read or write a shared value during render.
- Any helper called from a worklet needs `'worklet'` as its first line.

**`scheduleOnRN` from `react-native-worklets`, not `runOnJS`** — `runOnJS` is deprecated
in Reanimated 4.

---

## §7 · Motion

### §7.1 The gate — does it animate at all?

Apply this **before** writing any animation. It exists to produce zero lines of code
sometimes.

| Frequency | Decision | KamJob surfaces |
|---|---|---|
| 100+ /day | **No animation.** Platform default or nothing. | Tab switches, keyboard, scrolling, filter toggles |
| Tens /day | Under 150ms, or nothing | Button press, list row tap, tag select |
| Occasional | Standard animation | Sheets, dialogs, toasts, onboarding |
| Rare / first-time | The delight budget | Application-sent success, first swipe, empty states |

**The swipe card is the exception that earns everything.** It is the product. Spend the
budget there and stay disciplined everywhere else.

### §7.2 Purpose

Name it in one word before building: *feedback*, *spatial consistency*, *state
indication*, *preventing a jarring change*, *explanation*, or *delight* (rare tier only).
Cannot name it? Do not build it.

### §7.3 Tool selection — cheapest that works

| Need | Tool |
|---|---|
| State-driven change, no gesture | **Reanimated CSS transition** (`transitionProperty`) |
| Loop or mount-time, no state change | **Reanimated CSS animation** (`animationName`) |
| Mount / unmount / list reflow | **Layout animations** (`entering` / `exiting` / `itemLayoutAnimation`) |
| A finger touches it, or derived from scroll | **`useSharedValue` + `Gesture` + `useAnimatedStyle`** |
| Screen to screen | **Native stack options.** Never hand-roll. |
| Bottom sheet | **`presentation: 'formSheet'`** |
| Tab bar | **`NativeTabs`** |

### §7.4 Properties

- **`transform` and `opacity` are free.** Everything else is a layout pass.
- **Never animate** `width` `height` `margin` `padding` `flex` `top` `left` `gap` — they
  re-run Yoga every frame for that node *and its siblings*.
- **One exception:** an absolutely positioned, childless element (a tab indicator, a
  progress fill). Out of flow, so animating `width` is safe and keeps the corner radius
  that `scaleX` would smear.
- **Never `scale(0)`.** Start at `scale(0.95)` + `opacity: 0`. Nothing appears from nothing.
- `transform` is an array and **order matters** — keep `translate` before `scale`.

### §7.5 Haptics

| Moment | Call |
|---|---|
| Value ticks past a step | `Haptics.selectionAsync()` |
| Swipe threshold catches, sheet detent | `impactAsync(Light)` |
| Destructive action fires | `impactAsync(Medium)` |
| Application sent / failed | `notificationAsync(Success / Error)` |

Three absolute rules:
1. **Same frame as the visual.** A lagging haptic reads as a glitch.
2. **One per user action.** Never on scroll, never per frame, never on an entrance the
   user did not cause.
3. **Never the only feedback.** Haptics are off for many users and silent on most Android
   hardware. The visual must stand alone.

### §7.6 Reduced motion & the Reanimated colour caveat

```tsx
const reduced = useReducedMotion();
withSpring(0, { ...spring.sheet, reduceMotion: ReduceMotion.System });
```

Reduced motion means **fewer and gentler, not zero**: keep opacity and colour changes that
explain a state change; drop translation, scale, parallax and overshoot. Screen
transitions become `animation: 'fade'`.

> **Never pass `PlatformColor` / `Color` values into a Reanimated style.** They cannot be
> interpolated on the UI thread. This system uses static hex throughout (§3.1), so it is
> safe by construction — but the moment someone adds a semantic colour to an animated
> style, it breaks. Animate static tokens only.

---

## §8 · States

Every interactive component defines all of these. A screen is not done until each is
designed, not just handled.

| State | Requirement |
|---|---|
| **Default** | — |
| **Pressed** | Mandatory on every tappable. `motion.press` (120ms). There is no hover. |
| **Disabled** | `opacity: 0.4`, blocks `onPress`, `accessibilityState={{ disabled: true }}` |
| **Loading** | In-place, no layout shift. Button keeps its width. `accessibilityState={{ busy: true }}` |
| **Empty** | Every list has an `EmptyState`. Never a blank screen. |
| **Error** | Message next to its cause, plus a retry affordance. Never a bare toast for a form error. |
| **Offline** | Non-blocking persistent banner. Critical for this audience — assume intermittent connectivity is normal, not exceptional. |

**Touch targets: 44×44pt minimum (48dp Android).** If the visual is smaller, add
`hitSlop` — never grow the visual. Add `pressRetentionOffset` so a drifting finger does
not cancel an intended press.

---

## §9 · Accessibility contract

Non-negotiable, checked per screen:

- Every interactive element: `accessibilityRole` + `accessibilityLabel`.
- Icon-only buttons: `accessibilityLabel` **required by the type signature**.
- Contrast ≥ 4.5:1 for body text, ≥ 3:1 for large text and UI boundaries. New pairs get
  measured (§3.1), not eyeballed.
- Colour is never the only carrier of meaning. The tricolour cycle is decorative; status
  always carries an icon or a label.
- `allowFontScaling` stays on. No fixed heights on text containers.
- Respect **Reduce Motion** (§7.6) and **Reduce Transparency** (§4.5).
- Focus order follows visual order. Modals trap focus and restore it on dismiss.

---

## §10 · Bilingual (FR / EN)

French is the default locale; English mirrors it. Layout consequences:

- **French runs ~15–20% longer than English.** Never size a container to its English
  string. No fixed-width buttons, no single-line assumptions on labels.
- All copy comes from the dictionary. **No hardcoded strings in components** — the same
  rule as colours.
- `eyebrow` uppercases at render, so dictionary entries stay normal-case and readable.
- Test every screen at FR + 200% type. That is the worst case and it is a real user.
- Numbers and prices use `mono` with tabular figures so columns align across locales.

---

## §11 · Screen composition

A screen file should read as an assembly of primitives:

```tsx
export default function OffersScreen() {
  return (
    <Screen>                                {/* edge padding, safe area */}
      <SectionHeader index="01" eyebrow="offres" title="Pour toi" />
      <CardDeck />
      <SwipeActions />                      {/* GlassSurface ✅ floating chrome */}
    </Screen>
  );
}
```

Rules:
- A screen imports from `components/ui/` and `theme/` only. It never imports
  `expo-glass-effect`, never defines a colour, never sets a `fontSize`.
- **Law 4 applies to screens too:** two adjacent screens must not share a layout
  skeleton. Rotate the structural device.
- Safe areas are handled by a single `Screen` wrapper, not per-screen `useSafeAreaInsets`
  calls.
- One primary action per screen. If there are two, one of them is secondary.

### Self-critique pass

After building or changing a screen, **screenshot it** and check:

1. **Hierarchy** — is the most important element obviously first? Fix with the type ramp,
   not ad-hoc sizes.
2. **Proximity** — do related items sit closer than unrelated ones? Fix with `gap` +
   spacing tokens.
3. **Repetition** — do all corners, shadows and accents match? If not, a value escaped the
   theme. Move it in.
4. **Alignment** — do edges share axes? Fix with consistent edge padding.

The pass is complete only when all four pass, **or** every failing value has moved into
the theme or a component. If a screen fails the same check twice, the fix belongs in the
system — not in the screen.

---

## §12 · Migration — unifying the existing app

The app already has screens. **Detection before construction.** Do not write a token file
until the audit is done and reported.

### Step 0 — Locate, don't assume

`create-expo-app` puts `app/`, `components/`, `constants/` at the root. Running greps
against a nonexistent `src/` returns zero hits and a false clean bill.

```bash
SRC="app components constants hooks"
THEME="theme"
```

Record: source directories · existing theme location · existing styling library. **If a
theme already exists, it is the source of truth — extend it in its own idiom.** Never
introduce a second system beside an existing one.

### Step 1 — Audit

```bash
# Hardcoded hex outside the theme
grep -rEn '#[0-9a-fA-F]{3,8}\b' $SRC --include='*.tsx' --include='*.ts' | grep -v "^$THEME/"

# Raw fontSize (should be the type ramp)
grep -rn 'fontSize:' $SRC --include='*.tsx' | grep -v "^$THEME/"

# Spacing off the scale (whitelist = this system's steps)
grep -rEn '(padding|margin|gap)[A-Za-z]*:\s*[0-9]+' $SRC --include='*.tsx' \
  | grep -vE ':\s*(0|4|8|12|16|24|32|48|64)\b' | grep -v "^$THEME/"

# Raw borderRadius
grep -rn 'borderRadius:' $SRC --include='*.tsx' | grep -v "^$THEME/"

# Legacy shadows — banned outright
grep -rEn 'shadow(Color|Offset|Opacity|Radius)|elevation:' $SRC --include='*.tsx'

# NativeWind arbitrary values that bypass tokens
grep -rEn 'className="[^"]*\[[^"]*\]' $SRC --include='*.tsx'

# Deprecated Reanimated 3 API
grep -rn 'runOnJS\|\.value' $SRC --include='*.tsx'

# Banned motion primitives
grep -rn 'PanResponder\|useNativeDriver' $SRC --include='*.tsx'

# More than one theme entry point (there must be exactly one)
ls theme.ts theme/index.ts constants/theme.ts src/theme/index.ts 2>/dev/null
```

### Step 2 — Score

```bash
find $SRC -name '*.tsx' -o -name '*.ts' | xargs wc -l | tail -1
```

**Score = escapes per 100 source lines.**

| Score | Reading |
|---|---|
| < 0.5 | Healthy — fix opportunistically |
| 0.5 – 2.0 | Drifting — schedule cleanup for the worst files |
| > 2.0 | **Systemic** — the token or component is missing or unused. Fix the system first. |

Report per category. The highest-scoring category is the first migration target.

### Step 3 — Adopt incrementally

Never big-bang. A whole-app conversion produces one unreviewable diff and stalls
half-done.

1. **Create tokens from the app's real values**, snapped to the 4-point grid. A theme
   derived from what the app actually uses gets adopted; an aspirational one gets bypassed.
   Where the existing value conflicts with this document, **this document wins** — that is
   the point of the exercise — but record the delta.
2. **Typography first.** Raw `fontSize` → the ramp + `<Text>`. Highest-visibility win,
   fewest layout decisions.
3. **Then spacing → colours → radius/shadows → motion.**
4. **Convert one worst-offender screen completely** and use it as the reference pattern.
5. **Then one screen per commit**, verifying with the greps scoped to that screen.
6. **Re-run the audit after each phase.** Scores must fall monotonically.

### Step 4 — Component completeness

For each existing shared component, check against §5:

| Check | Pass condition |
|---|---|
| Variants | `variant` prop, not boolean soup |
| Sizes | Map to tokens, not fresh numbers |
| Pressed | Feedback via `Pressable` |
| Disabled / loading | Handled; disabled blocks `onPress` |
| Style override | Accepts `style`/`className`, merged last |
| Accessibility | Role set; target ≥ 44pt |
| Tokens only | No literals duplicating a theme value |

### Migration order

`Text` → `Button` → `Input` → `Card` → `Tag` → `Sheet` → `Dialog` → `Toast` →
navigation chrome → `SwipeCard` last (highest risk, most valuable, needs a real device).

---

## §13 · Definition of done

A screen or component ships only when **all** are true:

- [ ] No hardcoded hex, `fontSize`, off-scale spacing, or raw `borderRadius`
- [ ] No `className` arbitrary values (`p-[13px]`, `text-[#5B21B6]`)
- [ ] All four states designed: default · pressed · disabled · loading
- [ ] Empty and error states exist where a list or form does
- [ ] Touch targets ≥ 44pt, or `hitSlop` added
- [ ] `accessibilityRole` + label on every interactive element
- [ ] Contrast measured for any new colour pair
- [ ] Renders correctly in **light and dark** — verified by screenshot, and `ink` clears
      `paper.raised` in dark
- [ ] Renders correctly in **FR and EN at 200% type**
- [ ] Reduced motion and reduced transparency respected
- [ ] Any glass surface has a designed rung-3 fallback, and is not inside a `<Modal>`
- [ ] Motion passed the §7.1 gate and its purpose is nameable
- [ ] No `setState` or `scheduleOnRN` in a gesture/scroll `onUpdate`
- [ ] Self-critique pass (§11) clean
- [ ] **Feel verified on a release build on the slowest supported Android** — not Expo Go,
      not the simulator, not a flagship in dev mode

---

## §14 · Never ship

| Never | Instead |
|---|---|
| Pure `#FFFFFF` as a surface | `paper` tokens (Law 1) |
| Tricolour as a gradient or background wash | Rules, spines, markers (Law 3) |
| `ink` that doesn't clear `paper.raised` in dark | Verify by screenshot (Law 2) |
| Glass inside a React Native `<Modal>` | `forceFallback`, or a `formSheet` route (§4.4) |
| `opacity: 0` on a `GlassView` or its parent | `glassEffectStyle={{ animate: true }}` |
| Animating `BlurView` intensity | Crossfade a static layer |
| Legacy `shadowOffset` / `elevation` props | `boxShadow` strings |
| Animating Android `elevation` | Crossfade a pre-shadowed layer |
| `PanResponder` | `Gesture.Pan()` |
| `setState` in a gesture or scroll handler | Shared value + `useAnimatedStyle` |
| `runOnJS` (deprecated in Reanimated 4) | `scheduleOnRN` from `react-native-worklets` |
| `scheduleOnRN` per frame | `onEnd`, or `useAnimatedReaction` at a threshold |
| Reading/writing a shared value during render | `.get()` / `.set()` in worklets and handlers |
| Core `Animated` for anything a finger touches | Reanimated |
| Animating `height` / `width` / `margin` / `flex` | `transform` + `opacity` |
| Sliding between tabs | `animation: 'none'` |
| A screen transition rebuilt in JS | Native stack `animation` |
| A hand-rolled bottom sheet | `presentation: 'formSheet'` or `@expo/ui` `BottomSheet` |
| `scale(0)` entrance | `scale(0.95)` + `opacity: 0` |
| `Easing.in(...)` on UI | `ease.out` |
| Distance-only swipe threshold | Velocity **or** distance |
| Hard stop at a gesture boundary | Rubber-band resistance |
| A haptic per frame, or as the only feedback | One per commit, always paired with a visual |
| Placeholder used as the only label | Visible `eyebrow` label above the field |
| Pastel pill chips | Squared mono `Tag` (§6.6) |
| Circular stock-photo avatars | Squared initials (§6.8) |
| Centring every section heading | Left-aligned `SectionHeader` (§6.7) |
| Judging feel in Expo Go or the simulator | Release build, slowest supported device |

---

## Appendix · Web ↔ mobile token map

For anyone cross-referencing `kamjob-landing/app/globals.css`:

| Web CSS variable | Mobile token | Note |
|---|---|---|
| `--paper` | `color.paper.DEFAULT` | identical |
| `--paper-sunk` / `--paper-raised` | `color.paper.sunk` / `.raised` | identical |
| `--slab` / `--slab-fg` / `--slab-muted` | `color.ink.DEFAULT` / `.fg` / `.muted` | renamed: "slab" → "ink" |
| `--foreground` / `--muted-foreground` | `color.fg.DEFAULT` / `.muted` | identical |
| `--brand-solid` / `--brand-text` / `--brand-on-ink` | `color.brand.solid` / `.text` / `.onInk` | identical |
| `--gold-solid` (`--amber-*` alias) | `color.gold.solid` | web keeps `--amber-*` aliases for the legal pages; mobile drops them |
| `.tricolor` utility | `<TricolorRule />` | |
| `.btn-brand` + `--shadow-brand` | `<Button variant="brand" />` | Law 5, identical mechanic |
| `.eyebrow` utility | `<Text variant="eyebrow" />` | |
| `.grain` overlay | **dropped** | A full-screen blend-mode overlay is too expensive per frame on mobile. Warmth comes from the paper tokens alone. |
| `.card-lift` hover | **dropped** | There is no hover. Replaced by pressed state. |
