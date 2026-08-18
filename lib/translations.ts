// All landing copy, French first (default) — English mirrors the same shape.

const fr = {
  nav: {
    features: "Fonctionnalités",
    pricing: "Tarifs",
    faq: "FAQ",
    login: "Se connecter",
    signup: "S'inscrire",
    country: "Cameroun",
    howItWorks: "Comment ça marche",
    openMenu: "Ouvrir le menu",
    closeMenu: "Fermer le menu",
    skipToContent: "Aller au contenu principal",
    langLabel: "Changer de langue",
  },
  hero: {
    badge: "L'emploi au Cameroun, réinventé",
    title: "Trouve ton emploi idéal",
    titleAccent: "en un swipe",
    subtitle:
      "Swipe les offres de ton domaine comme sur une app de rencontre : un geste à droite et ta candidature — CV et lettre de motivation — part directement chez le recruteur.",
    ctaPrimary: "Créer mon compte gratuit",
    ctaSecondary: "J'ai déjà un compte",
    note: "Gratuit pour postuler · Sans engagement · Paiement Mobile Money",
    stats: [
      { value: "12", label: "domaines d'activité" },
      { value: "10", label: "villes couvertes" },
      { value: "1", label: "swipe pour postuler" },
      { value: "0 FCFA", label: "pour postuler" },
    ],
  },
  mockup: {
    stamp: "POSTULER",
    hiringTop: "NOUS",
    hiringMain: "RECRUTONS",
    hiringSub: "Postulez avant le 31 juillet",
    toast: "Candidature envoyée",
    toastSub: "CV + lettre reçus par ST Digital",
    alt: "Aperçu de l'application KamJob : une offre d'emploi à swiper",
  },
  trust: {
    title: "Pourquoi tu peux y aller les yeux fermés",
    items: [
      {
        title: "Postuler ne coûte rien",
        text: "Créer un compte, swiper et envoyer ta candidature est gratuit et illimité. Pour toujours.",
      },
      {
        title: "Tes documents restent à toi",
        text: "CV et lettre stockés de façon sécurisée, transmis uniquement aux offres que tu choisis.",
      },
      {
        title: "Paiement local, sans surprise",
        text: "MTN MoMo et Orange Money, en paiement unique. Aucun renouvellement automatique.",
      },
    ],
  },
  ticker: {
    label: "Des offres dans tous les domaines, dans tout le Cameroun",
    items: [
      "Ingénieur Réseau — Douala · CDI",
      "Comptable Fournisseur — Yaoundé · CDI",
      "Développeur Web — Buéa · Stage",
      "Responsable Marketing — Douala · CDD",
      "Infirmier — Bafoussam · CDI",
      "Juriste d'Entreprise — Yaoundé · CDI",
      "Agronome — Garoua · CDD",
      "Conseiller Bancaire — Douala · CDI",
      "Professeur de Maths — Maroua · CDD",
      "Chef d'Atelier — Limbé · CDI",
    ],
  },
  spaces: {
    candidateLabel: "JE CHERCHE DU TRAVAIL",
    candidateTitle: "Espace Candidat",
    candidateText:
      "Crée ton profil, ajoute ton CV et ta lettre une seule fois. Swipe à droite et ta candidature part automatiquement.",
    candidateChecks: [
      "Profil complet : infos, CV et lettre de motivation",
      "Swipe à droite → CV + lettre envoyés automatiquement",
      "Candidature instantanée directement à l'entreprise",
      "Notifications et suivi de chaque candidature",
    ],
    candidateCta: "Créer mon profil gratuit",
    employerLabel: "JE RECRUTE",
    employerTitle: "Espace Employeur",
    employerText:
      "Publiez vos offres avec leur affiche et l'email de votre boîte. Les candidats postulent et leurs CV arrivent directement dans votre messagerie.",
    employerChecks: [
      "Offres publiées avec affiche et date d'expiration",
      "Candidatures reçues par email : CV + lettre",
      "Tableau de bord pour gérer et modifier vos offres",
      "Badge entreprise vérifiée",
    ],
    employerCta: "Publier mes offres",
    eyebrow: "DEUX ESPACES",
    title: "Tu cherches, ou tu recrutes ?",
  },
  how: {
    eyebrow: "EN 3 ÉTAPES",
    title: "Comment ça marche ?",
    subtitle:
      "De l'inscription à ta première candidature, il te faut moins de cinq minutes.",
    steps: [
      {
        title: "Crée ton profil",
        text: "Ajoute ton CV et ta lettre de motivation une seule fois — ils accompagnent chaque candidature.",
      },
      {
        title: "Swipe les offres",
        text: "Un feed d'offres filtré selon ton domaine, ta ville et ton niveau — avec l'affiche complète de chaque poste.",
      },
      {
        title: "On postule pour toi",
        text: "Un swipe à droite et ta candidature est envoyée par email au recruteur. Tu suis tout depuis l'app.",
      },
    ],
  },
  features: {
    eyebrow: "FONCTIONNALITÉS",
    title: "Tout ce qu'il faut pour décrocher ton poste",
    subtitle:
      "Pensé pour le marché camerounais : les offres avec leurs affiches, la candidature en un geste, et l'IA qui travaille pour toi.",
    items: [
      {
        title: "Postule en un swipe",
        text: "CV + lettre envoyés automatiquement au recruteur, avec confirmation par email.",
      },
      {
        title: "Les offres comme tu les connais",
        text: "Chaque offre s'affiche avec son affiche complète, comme sur les groupes WhatsApp — mais filtrée pour ton profil.",
      },
      {
        title: "Candidature instantanée",
        text: "Stage ou candidature spontanée : envoie ton dossier directement à l'entreprise de ton choix, sans attendre une offre.",
      },
      {
        title: "IA Premium",
        text: "Score de compatibilité sur chaque offre, et un CV adapté + certifié ATS généré pour maximiser tes chances.",
      },
      {
        title: "Bilan intelligent",
        text: "L'IA scanne les offres de ton domaine et postule automatiquement pour toi, avec un rapport clair de chaque envoi.",
      },
      {
        title: "Suivi & notifications",
        text: "Historique de tes candidatures et notifications à chaque étape — tu sais toujours où tu en es.",
      },
    ],
  },
  pricing: {
    eyebrow: "TARIFS",
    title: "Des prix pensés pour toi",
    subtitle:
      "Postuler est 100 % gratuit, pour toujours. Les pass Premium ajoutent l'optimisation intelligente quand tu veux passer à la vitesse supérieure.",
    perPeriod: "FCFA",
    cta: "Commencer",
    highlight: "LE PLUS COMPLET",
    plans: [
      {
        name: "Pass 72h",
        price: "500",
        period: "3 jours",
        features: [
          "Optimisation intelligente : CV et lettre réécrits pour chaque offre",
          "Score de compatibilité sur chaque offre, avec tes points forts et tes lacunes",
          "Dans la limite d'un usage équitable",
        ],
      },
      {
        name: "Premium Hebdo — Le Sprint",
        price: "950",
        period: "7 jours",
        features: [
          "Tout le Pass 72h, pendant une semaine complète",
          "CV et lettre réécrits automatiquement, adaptés à chaque offre",
          "Score détaillé, points forts et lacunes sur chaque offre",
          "Dans la limite d'un usage équitable",
        ],
      },
      {
        name: "Premium Mensuel — Recherche complète",
        price: "4 999",
        period: "30 jours",
        features: [
          "Tout le Sprint : candidatures optimisées pendant 30 jours",
          "Bilan intelligent chaque semaine : on trouve les offres de ton domaine et on postule pour toi",
          "Un CV optimisé et certifié ATS pour chaque offre retenue",
          "Profil mis en avant",
          "Dans la limite d'un usage équitable",
        ],
      },
      {
        name: "Premium Pro — Recherche intensive",
        price: "9 999",
        period: "30 jours",
        features: [
          "Tout le Premium Mensuel, en volume étendu",
          "Bilan intelligent chaque jour, sans que tu aies à ouvrir l'application",
          "Un CV optimisé et certifié ATS pour chaque offre retenue",
          "Profil mis en avant + support prioritaire",
          "Dans la limite d'un usage équitable",
        ],
      },
    ],
    freeNote: "Paiement unique par MTN MoMo ou Orange Money — aucun renouvellement automatique.",
  },
  testimonials: {
    eyebrow: "TÉMOIGNAGES",
    title: "Ils ont trouvé avec KamJob",
    items: [
      {
        quote: "J'ai postulé à 15 offres pendant ma pause déjeuner. Deux entretiens décrochés la même semaine.",
        name: "Aïcha N.",
        role: "Développeuse web · Douala",
      },
      {
        quote: "Le CV adapté par l'IA a fait la différence : le recruteur m'a dit que mon profil collait parfaitement à l'offre.",
        name: "Steve M.",
        role: "Comptable · Yaoundé",
      },
      {
        quote: "Le Bilan intelligent postule pendant que je suis en cours. Je reçois le rapport et je prépare mes entretiens.",
        name: "Vanessa T.",
        role: "Étudiante en marketing · Bafoussam",
      },
    ],
  },
  faq: {
    eyebrow: "FAQ",
    title: "Questions fréquentes",
    subtitle: "Tout ce que tu dois savoir avant de commencer.",
    items: [
      {
        q: "KamJob est-il vraiment gratuit ?",
        a: "Oui. Créer un compte, swiper et postuler est 100 % gratuit et illimité. Les pass Premium sont optionnels : ils ajoutent l'analyse IA, le CV adapté et le Bilan intelligent. Et souviens-toi : aucun employeur sérieux ne te demandera de payer pour postuler.",
      },
      {
        q: "Comment ma candidature est-elle envoyée ?",
        a: "Quand tu swipes une offre à droite, ton CV et ta lettre de motivation partent par email à l'adresse de recrutement de l'entreprise. Tu reçois une confirmation et tu retrouves chaque candidature dans ton historique.",
      },
      {
        q: "Dois-je refaire mon CV pour chaque offre ?",
        a: "Non. Tu ajoutes ton CV et ta lettre une seule fois dans ton profil. Avec un pass Premium, l'IA les adapte automatiquement à chaque offre et génère une version optimisée ATS avant l'envoi.",
      },
      {
        q: "C'est quoi le Bilan intelligent ?",
        a: "C'est la fonctionnalité phare du Premium Mensuel : l'IA scanne les offres de ton domaine et postule automatiquement pour toi, avec un CV optimisé pour chaque offre retenue. Tu reçois un rapport clair qui récapitule chaque envoi.",
      },
      {
        q: "Comment payer un pass Premium ?",
        a: "Par Mobile Money : MTN MoMo et Orange Money sont acceptés. Tu saisis ton numéro, tu confirmes sur ton téléphone, c'est tout.",
      },
      {
        q: "Le pass se renouvelle-t-il automatiquement ?",
        a: "Non, jamais. Chaque pass a une durée fixe (72h, 7 jours ou 30 jours) et s'arrête tout seul. Pas de prélèvement surprise.",
      },
      {
        q: "Mes documents sont-ils en sécurité ?",
        a: "Oui. Tes documents sont stockés de manière sécurisée et ne sont transmis qu'aux recruteurs des offres auxquelles tu choisis de postuler. Ils ne sont jamais revendus ni partagés ailleurs.",
      },
      {
        q: "Je suis recruteur — comment publier mes offres ?",
        a: "KamJob dispose d'un portail employeur dédié : tu publies tes offres avec leur affiche, tu fixes une date d'expiration, et tu reçois les candidatures (CV + lettre) directement par email. L'accès employeur se demande depuis l'application.",
      },
    ],
  },
  employers: {
    title: "Vous recrutez ?",
    text: "Publiez vos offres avec leur affiche, fixez une date d'expiration et recevez les candidatures — CV et lettre — directement par email. Les meilleurs profils du Cameroun sont déjà sur KamJob.",
  },
  finalCta: {
    title: "Ton prochain poste est à un swipe.",
    subtitle:
      "Crée ton profil aujourd'hui et envoie ta première candidature en moins de cinq minutes.",
    button: "Commencer maintenant",
  },
  stickyCta: {
    label: "Postuler est gratuit",
    button: "Créer mon compte",
  },
  footer: {
    company: "Ressources",
    employerLink: "Espace employeur",
    tagline: "Ton emploi au Cameroun",
    disclaimer:
      "Candidature 100 % gratuite — aucun employeur sérieux ne vous demandera de payer pour postuler.",
    product: "Produit",
    legal: "Légal",
    terms: "Conditions générales",
    privacy: "Confidentialité",
    copyright: "© 2026 KamJob · Fait au Cameroun 🇨🇲",
  },
}

const en: typeof fr = {
  nav: {
    features: "Features",
    pricing: "Pricing",
    faq: "FAQ",
    login: "Log in",
    signup: "Sign up",
    country: "Cameroon",
    howItWorks: "How it works",
    openMenu: "Open menu",
    closeMenu: "Close menu",
    skipToContent: "Skip to main content",
    langLabel: "Change language",
  },
  hero: {
    badge: "Job hunting in Cameroon, reinvented",
    title: "Find your dream job",
    titleAccent: "with one swipe",
    subtitle:
      "Swipe through job offers in your field like a dating app: one swipe right and your application — CV and cover letter — goes straight to the recruiter.",
    ctaPrimary: "Create my free account",
    ctaSecondary: "I already have an account",
    note: "Free to apply · No commitment · Mobile Money payment",
    stats: [
      { value: "12", label: "industries" },
      { value: "10", label: "cities covered" },
      { value: "1", label: "swipe to apply" },
      { value: "0 FCFA", label: "to apply" },
    ],
  },
  mockup: {
    stamp: "APPLY",
    hiringTop: "WE ARE",
    hiringMain: "HIRING",
    hiringSub: "Apply before July 31",
    toast: "Application sent",
    toastSub: "CV + letter received by ST Digital",
    alt: "Preview of the KamJob app: a job offer ready to swipe",
  },
  trust: {
    title: "Why you can go in with your eyes closed",
    items: [
      {
        title: "Applying costs nothing",
        text: "Creating an account, swiping and sending your application is free and unlimited. Forever.",
      },
      {
        title: "Your documents stay yours",
        text: "CV and cover letter stored securely, shared only with the offers you choose.",
      },
      {
        title: "Local payment, no surprises",
        text: "MTN MoMo and Orange Money, as a one-time payment. No automatic renewal.",
      },
    ],
  },
  ticker: {
    label: "Offers across every industry, all over Cameroon",
    items: [
      "Network Engineer — Douala · Permanent",
      "Accounts Payable Accountant — Yaoundé · Permanent",
      "Web Developer — Buéa · Internship",
      "Marketing Manager — Douala · Fixed-term",
      "Nurse — Bafoussam · Permanent",
      "Corporate Lawyer — Yaoundé · Permanent",
      "Agronomist — Garoua · Fixed-term",
      "Bank Advisor — Douala · Permanent",
      "Maths Teacher — Maroua · Fixed-term",
      "Workshop Manager — Limbé · Permanent",
    ],
  },
  spaces: {
    candidateLabel: "I'M LOOKING FOR WORK",
    candidateTitle: "Candidate Space",
    candidateText:
      "Create your profile, add your CV and cover letter once. Swipe right and your application goes out automatically.",
    candidateChecks: [
      "Complete profile: info, CV and cover letter",
      "Swipe right → CV + letter sent automatically",
      "Instant application straight to the company",
      "Notifications and tracking for every application",
    ],
    candidateCta: "Create my free profile",
    employerLabel: "I'M HIRING",
    employerTitle: "Employer Space",
    employerText:
      "Post your offers with their poster and your company email. Candidates apply and their CVs land straight in your inbox.",
    employerChecks: [
      "Offers posted with poster and expiry date",
      "Applications received by email: CV + letter",
      "Dashboard to manage and edit your offers",
      "Verified company badge",
    ],
    employerCta: "Post my offers",
    eyebrow: "TWO SPACES",
    title: "Looking for work, or hiring?",
  },
  how: {
    eyebrow: "IN 3 STEPS",
    title: "How does it work?",
    subtitle:
      "From sign-up to your first application takes less than five minutes.",
    steps: [
      {
        title: "Create your profile",
        text: "Add your CV and cover letter once — they go out with every application.",
      },
      {
        title: "Swipe the offers",
        text: "A feed filtered by your field, city and education level — with each job's full poster.",
      },
      {
        title: "We apply for you",
        text: "One swipe right and your application is emailed to the recruiter. Track everything from the app.",
      },
    ],
  },
  features: {
    eyebrow: "FEATURES",
    title: "Everything you need to land the job",
    subtitle:
      "Built for the Cameroonian market: job posters as you know them, one-gesture applications, and AI working for you.",
    items: [
      {
        title: "Apply with one swipe",
        text: "CV + cover letter sent automatically to the recruiter, with email confirmation.",
      },
      {
        title: "Offers the way you know them",
        text: "Every offer shows its full poster, just like on WhatsApp groups — but filtered for your profile.",
      },
      {
        title: "Instant application",
        text: "Internship or spontaneous application: send your file directly to the company of your choice, no offer needed.",
      },
      {
        title: "Premium AI",
        text: "A compatibility score on every offer, plus an ATS-certified tailored CV to maximise your chances.",
      },
      {
        title: "Smart Report",
        text: "The AI scans offers in your field and applies for you automatically, with a clear report of every application.",
      },
      {
        title: "Tracking & notifications",
        text: "A history of your applications and notifications at every step — you always know where you stand.",
      },
    ],
  },
  pricing: {
    eyebrow: "PRICING",
    title: "Prices designed for you",
    subtitle:
      "Applying is 100% free, forever. Premium passes add smart optimisation whenever you want to go faster.",
    perPeriod: "FCFA",
    cta: "Get started",
    highlight: "MOST COMPLETE",
    plans: [
      {
        name: "72h Pass",
        price: "500",
        period: "3 days",
        features: [
          "Smart optimisation: CV and cover letter rewritten for every offer",
          "Compatibility score on every offer, with your strengths and gaps",
          "Within the limits of fair use",
        ],
      },
      {
        name: "Weekly Premium — The Sprint",
        price: "950",
        period: "7 days",
        features: [
          "Everything in the 72h Pass, for a full week",
          "CV and cover letter rewritten automatically for every offer",
          "Detailed score, strengths and gaps on every offer",
          "Within the limits of fair use",
        ],
      },
      {
        name: "Monthly Premium — Full search",
        price: "4,999",
        period: "30 days",
        features: [
          "Everything in the Sprint: optimised applications for 30 days",
          "Smart Report every week: we find the offers in your field and apply for you",
          "An ATS-certified, optimised CV for every selected offer",
          "Highlighted profile",
          "Within the limits of fair use",
        ],
      },
      {
        name: "Pro Premium — Intensive search",
        price: "9,999",
        period: "30 days",
        features: [
          "Everything in Monthly Premium, at extended volume",
          "Smart Report every day, without you having to open the app",
          "An ATS-certified, optimised CV for every selected offer",
          "Highlighted profile + priority support",
          "Within the limits of fair use",
        ],
      },
    ],
    freeNote: "One-time payment via MTN MoMo or Orange Money — no automatic renewal.",
  },
  testimonials: {
    eyebrow: "TESTIMONIALS",
    title: "They found their job with KamJob",
    items: [
      {
        quote: "I applied to 15 offers during my lunch break. Two interviews landed the same week.",
        name: "Aïcha N.",
        role: "Web developer · Douala",
      },
      {
        quote: "The AI-tailored CV made the difference: the recruiter told me my profile matched the offer perfectly.",
        name: "Steve M.",
        role: "Accountant · Yaoundé",
      },
      {
        quote: "The Smart Report applies while I'm in class. I get the report and prepare for my interviews.",
        name: "Vanessa T.",
        role: "Marketing student · Bafoussam",
      },
    ],
  },
  faq: {
    eyebrow: "FAQ",
    title: "Frequently asked questions",
    subtitle: "Everything you need to know before getting started.",
    items: [
      {
        q: "Is KamJob really free?",
        a: "Yes. Creating an account, swiping and applying is 100% free and unlimited. Premium passes are optional: they add AI analysis, tailored CVs and the Smart Report. And remember: no serious employer will ever ask you to pay to apply.",
      },
      {
        q: "How is my application sent?",
        a: "When you swipe right on an offer, your CV and cover letter are emailed to the company's recruitment address. You get a confirmation and every application appears in your history.",
      },
      {
        q: "Do I need to redo my CV for every offer?",
        a: "No. You add your CV and cover letter once in your profile. With a Premium pass, the AI adapts them automatically to each offer and generates an ATS-optimised version before sending.",
      },
      {
        q: "What is the Smart Report?",
        a: "It's the flagship feature of Monthly Premium: the AI scans offers in your field and applies for you automatically, with an optimised CV for every selected offer. You receive a clear report summarising each application.",
      },
      {
        q: "How do I pay for a Premium pass?",
        a: "Via Mobile Money: MTN MoMo and Orange Money are accepted. Enter your number, confirm on your phone, done.",
      },
      {
        q: "Does the pass renew automatically?",
        a: "No, never. Every pass has a fixed duration (72h, 7 days or 30 days) and simply expires. No surprise charges.",
      },
      {
        q: "Are my documents safe?",
        a: "Yes. Your documents are stored securely and only shared with the recruiters of the offers you choose to apply to. They are never sold or shared elsewhere.",
      },
      {
        q: "I'm a recruiter — how do I post my offers?",
        a: "KamJob has a dedicated employer portal: post your offers with their poster, set an expiry date, and receive applications (CV + cover letter) directly by email. Employer access is requested from the app.",
      },
    ],
  },
  employers: {
    title: "Hiring?",
    text: "Post your offers with their poster, set an expiry date and receive applications — CV and cover letter — directly by email. Cameroon's best profiles are already on KamJob.",
  },
  finalCta: {
    title: "Your next job is one swipe away.",
    subtitle:
      "Create your profile today and send your first application in under five minutes.",
    button: "Start now",
  },
  stickyCta: {
    label: "Applying is free",
    button: "Create my account",
  },
  footer: {
    company: "Resources",
    employerLink: "Employer space",
    tagline: "Your job in Cameroon",
    disclaimer:
      "Applying is 100% free — no serious employer will ever ask you to pay to apply.",
    product: "Product",
    legal: "Legal",
    terms: "Terms & Conditions",
    privacy: "Privacy",
    copyright: "© 2026 KamJob · Made in Cameroon 🇨🇲",
  },
}

export type Lang = "fr" | "en"
export type Dictionary = typeof fr
export const translations: Record<Lang, Dictionary> = { fr, en }
