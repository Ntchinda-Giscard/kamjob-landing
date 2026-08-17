# KamJob — Landing page

Site vitrine autonome de KamJob. Tous les boutons d'action redirigent vers
l'application candidat (`NEXT_PUBLIC_APP_URL`, par défaut https://app.kamjob.com).

## Développement

```bash
npm install
npm run dev
```

→ http://localhost:3000

## Déploiement

Projet Next.js standard — déployable tel quel sur Vercel. Définir
`NEXT_PUBLIC_APP_URL` si l'app candidat change d'adresse.

**`NEXT_PUBLIC_SITE_URL` doit être défini en production** (l'origine du site
vitrine lui-même). Il alimente l'URL canonique, `robots.txt`, le sitemap, les
balises Open Graph et le JSON-LD ; sans lui, tout pointe vers le défaut
`https://kamjob.com`.

## Pages légales

| Route                    | Contenu                                                |
| ------------------------ | ------------------------------------------------------ |
| `/conditions-generales`  | CGU/CGV — 19 articles, dont l'absence de remboursement |
| `/confidentialite`       | Politique de confidentialité — 15 articles             |

Le texte des deux documents vit dans **`lib/legal.ts`** (français d'abord,
anglais en miroir, comme `lib/translations.ts`) et est rendu par
`components/legal-document.tsx`. Le français est la version juridiquement de
référence : l'anglais est une traduction de courtoisie, à resynchroniser à
chaque modification du français.

> **⚠️ À compléter avant la mise en production.** Les champs marqués
> `[à compléter]` dans `lib/legal.ts` (constante `TBD`) doivent recevoir les
> données réelles de la société — dénomination sociale, forme juridique et
> capital, siège, RCCM, NIU, représentant légal, téléphone, hébergeur. La loi
> n° 2010/021 régissant le commerce électronique impose cette identification.
> Les adresses `legal@`, `privacy@` et `support@kamjob.com` (constante
> `LEGAL_CONTACT`) doivent également exister et être relevées : les délais de
> réponse annoncés dans les documents sont opposables. Une relecture par un
> avocat inscrit au Barreau du Cameroun est recommandée avant publication.

Modifier la date et la version en une seule fois : `UPDATED_FR`, `UPDATED_EN`
et `VERSION` en haut de `lib/legal.ts`.

## Routes générées

Aucun asset statique à fournir — tout est généré au build :

| Route                   | Rôle                                              |
| ----------------------- | ------------------------------------------------- |
| `/opengraph-image`      | Carte 1200×630 des aperçus de lien (WhatsApp, LinkedIn) |
| `/icon`, `/apple-icon`  | Favicon et icône d'écran d'accueil                |
| `/manifest.webmanifest` | Manifeste PWA (« Ajouter à l'écran d'accueil »)   |
| `/robots.txt`           | Indexation + lien vers le sitemap                 |
| `/sitemap.xml`          | Sitemap                                           |

Le JSON-LD (`Organization`, `WebSite`, `SoftwareApplication`, `FAQPage`) est
sérialisé dans `app/layout.tsx` **à partir de `lib/translations.ts`** : modifier
la FAQ met automatiquement à jour les données structurées.

## Conventions

- Les couleurs passent par les tokens CSS de `app/globals.css`
  (`--brand-solid`, `--brand-text`, `--brand-pale`, …) — jamais de hex en dur
  dans les composants. Les variantes `*-text` sont les seules à respecter le
  contraste AA sur les fonds `*-pale`, en clair comme en sombre.
- Le pied de page est partagé (`components/site-footer.tsx`) entre la landing
  et les pages légales. Les ancres de section sont donc absolues (`/#pricing`)
  dans `NAV_LINKS` (`lib/site.ts`) : sur la landing le navigateur les traite
  toujours comme une navigation dans le même document.
- `<Reveal>` (`components/reveal.tsx`) gère l'apparition au scroll ; l'état
  masqué n'est appliqué que si JS s'exécute, donc le contenu reste visible pour
  les crawlers et sans JS. `prefers-reduced-motion` neutralise toutes les
  animations.
