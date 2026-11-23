// All landing copy, French first (default) — English mirrors the same shape.
//
// Voice: « vous », to match the app itself and the legal pages. The section
// order follows the conversion arc the page is built on — hero (result +
// without the fear, proof beside the CTA) → coverage → problem → solution →
// coach → testimonials → pricing → FAQ → final CTA.
//
// French strings use a no-break space ( ) before ? ! : ; and inside « »,
// so the punctuation never wraps onto a line of its own.

const fr = {
  nav: {
    features: "Fonctionnalités",
    coach: "Coach d'entretien",
    pricing: "Tarifs",
    faq: "FAQ",
    login: "Se connecter",
    signup: "S'inscrire",
    country: "Cameroun",
    backHome: "Retour à l'accueil",
    contact: "Contact",
    openMenu: "Ouvrir le menu",
    closeMenu: "Fermer le menu",
    skipToContent: "Aller au contenu principal",
    langLabel: "Changer de langue",
  },
  hero: {
    badge: "Offres d'emploi au Cameroun",
    title: "Glissez pour postuler.",
    titleAccent: "Décrochez l'entretien.",
    subtitle:
      "Des offres triées pour votre profil, partout au Cameroun. Glissez à droite\u00a0: votre CV et votre lettre partent chez le recruteur. Sans mail à rédiger, sans CV à refaire.",
    ctaPrimary: "Créer mon profil gratuit",
    ctaSecondary: "Voir comment ça marche",
    note: "Gratuit pour postuler · Sans engagement · Paiement Mobile Money",
    // An exact excerpt of the first testimonial, set beside the hero CTA.
    proof: {
      quote: "Deux entretiens décrochés la même semaine.",
      author: "Aïcha N., développeuse web à Douala",
    },
  },
  mockup: {
    feedAlt:
      "Le fil d'offres KamJob\u00a0: une offre de Responsable des Ressources Humaines à Douala, avec son affiche, son score de match et les boutons Ignorer et Postuler",
    trackAlt:
      "Le suivi d'une candidature dans KamJob\u00a0: envoyée, puis vue, présélectionnée, entretien et décision",
    toast: "Candidature envoyée",
    toastSub: "CV + lettre chez le recruteur",
  },
  ticker: {
    label: "Des offres dans tous les domaines, dans tout le Cameroun",
    stats: [
      { value: "12", label: "domaines d'activité" },
      { value: "10", label: "villes couvertes" },
    ],
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
  testimonials: {
    eyebrow: "TÉMOIGNAGES",
    title: "Ils ont trouvé avec KamJob",
    items: [
      {
        quote:
          "J'ai postulé à 15 offres pendant ma pause déjeuner. Deux entretiens décrochés la même semaine.",
        name: "Aïcha N.",
        role: "Développeuse web · Douala",
      },
      {
        quote:
          "Le CV adapté par l'IA a fait la différence\u00a0: le recruteur m'a dit que mon profil collait parfaitement à l'offre.",
        name: "Steve M.",
        role: "Comptable · Yaoundé",
      },
      {
        quote:
          "Le Bilan intelligent postule pendant que je suis en cours. Je reçois le rapport et je prépare mes entretiens.",
        name: "Vanessa T.",
        role: "Étudiante en marketing · Bafoussam",
      },
    ],
  },
  problem: {
    eyebrow: "LE PROBLÈME",
    title: "Chercher un emploi ici, c'est un deuxième emploi.",
    subtitle:
      "Vous connaissez ce parcours. Il use avant même le premier entretien.",
    items: [
      {
        title: "Les offres sont partout, et nulle part.",
        text: "Des affiches transférées de groupe WhatsApp en groupe WhatsApp, sans date, souvent déjà expirées. On passe plus de temps à chercher qu'à postuler.",
      },
      {
        title: "Chaque candidature coûte une soirée.",
        text: "Trouver l'adresse, rédiger le mail, joindre le CV et la lettre, relire. Puis tout recommencer pour l'offre suivante.",
      },
      {
        title: "Puis le silence.",
        text: "Aucune nouvelle. Impossible de savoir si le dossier a été ouvert, ni s'il faut relancer.",
      },
      {
        title: "Et le jour où ils appellent, rien n'est préparé.",
        text: "«\u00a0Présentez-vous.\u00a0» C'est la première question, et l'entretien commence déjà à vous échapper.",
      },
    ],
    costLabel: "LE VRAI COÛT",
    cost: "Des semaines d'efforts pour une poignée de candidatures — et des entretiens perdus dès la première question.",
  },
  tour: {
    eyebrow: "LA SOLUTION",
    title: "Tout le parcours, dans une seule app.",
    subtitle:
      "De l'offre à l'entretien, KamJob fait le travail ingrat. Vous gardez la main sur chaque décision.",
    items: [
      {
        kicker: "Découvrir",
        title: "Les offres comme elles circulent — triées pour vous.",
        text: "Chaque offre garde son affiche d'origine, avec le contrat, la ville, le niveau et un score de match calculé sur votre profil. Celles qui vous correspondent passent en premier.",
        points: [
          "Un score de match sur chaque offre",
          "Filtres par domaine, ville et niveau",
          "L'affiche complète, comme sur WhatsApp",
        ],
        alt: "Une offre dans le fil KamJob\u00a0: affiche de l'employeur, 27 % de match, CDI, présentiel, Douala, Bac+5",
      },
      {
        kicker: "Postuler",
        title: "Glissez à droite. C'est envoyé.",
        text: "Votre CV et votre lettre partent directement à l'adresse de recrutement de l'entreprise. Pas pour vous\u00a0? Glissez à gauche. Glissé trop vite\u00a0? Un bouton vous ramène en arrière.",
        points: [
          "CV + lettre envoyés automatiquement",
          "Ignorer d'un geste, annuler d'un tap",
          "Une confirmation à chaque envoi",
        ],
        alt: "Une offre glissée vers la gauche, marquée «\u00a0Ignorer\u00a0», dans le fil KamJob",
      },
      {
        kicker: "Suivre",
        title: "Sachez toujours où en est votre candidature.",
        text: "Envoyée, vue par l'entreprise, présélectionnée, entretien, décision\u00a0: chaque étape s'affiche. Vous retrouvez aussi le CV et la lettre exacts qui sont partis.",
        points: [
          "Le suivi en cinq étapes",
          "Une notification à chaque changement",
          "Les documents envoyés, gardés au même endroit",
        ],
        alt: "Le détail d'une candidature KamJob\u00a0: envoyée le 3 novembre, le coach d'entretien, puis les étapes à venir",
      },
      {
        kicker: "Profil",
        title: "Votre profil, une seule fois.",
        text: "Expériences, formations, certifications, compétences\u00a0: remplissez votre identité professionnelle une fois. Elle accompagne chaque candidature et affine les offres qu'on vous propose.",
        points: [
          "Un profil pour toutes vos candidatures",
          "Des recommandations plus justes à chaque ajout",
          "Premium\u00a0: un CV réécrit pour chaque offre",
        ],
        alt: "Le profil KamJob\u00a0: niveau de complétion, passage à Premium, expériences, formations, certifications et compétences",
      },
    ],
    moreTitle: "Et aussi",
    more: [
      {
        title: "Candidature instantanée",
        text: "Envoyez votre dossier à l'entreprise de votre choix, même sans offre publiée — idéal pour un stage.",
      },
      {
        title: "Un CV réécrit pour chaque offre",
        text: "Avec Premium, votre CV et votre lettre sont adaptés à chaque offre et optimisés pour les logiciels de tri (ATS).",
      },
      {
        title: "Bilan intelligent",
        text: "Avec Premium, l'IA repère les offres de votre domaine et postule pour vous, avec un rapport de chaque envoi.",
      },
    ],
  },
  coach: {
    eyebrow: "NOUVEAU · COACH D'ENTRETIEN",
    title: "Ils appellent\u00a0? Vous avez déjà répété.",
    subtitle:
      "Pour chaque offre où vous postulez, le coach construit des entretiens blancs écrits pour ce poste précis — à partir de l'offre, de votre profil et de ce qui est public sur la façon de recruter de l'entreprise.",
    steps: [
      {
        title: "Choisissez l'entretien",
        text: "RH, métier ou technique\u00a0: trois simulations, chacune écrite pour ce poste. Faites-les dans l'ordre que vous voulez.",
        alt: "Choix de l'entretien à simuler pour un poste chez Globulus\u00a0: RH, métier ou technique",
      },
      {
        title: "Le coach se renseigne",
        text: "Il lit l'offre et votre profil, cherche ce qui est public sur l'employeur, choisit les questions classiques et écrit celles qui portent sur votre parcours. Environ une minute.",
        alt: "Le coach prépare l'entretien RH\u00a0: offre lue, profil lu, recherche sur l'employeur, onze questions classiques choisies",
      },
      {
        title: "Entraînez-vous comme en vrai",
        text: "Le coach joue le recruteur\u00a0: quinze questions, une à la fois. Répondez comme vous le diriez face à lui.",
        alt: "Simulation d'entretien RH\u00a0: «\u00a0Pouvez-vous vous présenter\u00a0?\u00a0», question 1 sur 15",
      },
    ],
    note: "Rien d'inventé\u00a0: s'il n'existe rien de public sur un employeur, le coach le dit et travaille à partir de l'offre et de ce que demandent des employeurs semblables.",
    cta: "Essayer le coach",
  },
  pricing: {
    eyebrow: "TARIFS",
    title: "Postuler est gratuit. Pour toujours.",
    subtitle:
      "Les pass Premium sont optionnels\u00a0: ils réécrivent votre CV pour chaque offre et peuvent postuler à votre place, le temps que vous voulez.",
    currency: "FCFA",
    free: {
      name: "Gratuit",
      price: 0,
      period: "pour toujours",
      features: [
        "Le fil d'offres, trié pour votre profil",
        "Candidatures illimitées\u00a0: CV + lettre chez le recruteur",
        "Le suivi de chaque candidature",
      ],
      cta: "Créer mon profil gratuit",
    },
    passesTitle: "Pass Premium · paiement unique",
    cta: "Choisir ce pass",
    recommended: "RECOMMANDÉ",
    // Prices are numbers so they can be formatted per locale (7 699 / 7,699).
    // `recommended` marks the one plan the page lifts: the monthly pass carries
    // the Bilan intelligent, which the FAQ calls the flagship feature.
    plans: [
      {
        name: "Pass 72h",
        price: 1550,
        period: "3 jours",
        recommended: false,
        features: [
          "CV et lettre réécrits pour chaque offre",
          "Score de compatibilité, avec vos points forts et vos lacunes",
        ],
      },
      {
        name: "Premium Hebdo — Le Sprint",
        price: 2500,
        period: "7 jours",
        recommended: false,
        features: [
          "Tout le Pass 72h, pendant une semaine complète",
          "Score détaillé, points forts et lacunes sur chaque offre",
        ],
      },
      {
        name: "Premium Mensuel — Recherche complète",
        price: 7699,
        period: "30 jours",
        recommended: true,
        features: [
          "Tout le Sprint, pendant 30 jours",
          "Bilan intelligent chaque semaine\u00a0: on trouve les offres de votre domaine et on postule pour vous",
          "Un CV certifié ATS pour chaque offre retenue",
          "Profil mis en avant",
        ],
      },
      {
        name: "Premium Pro — Recherche intensive",
        price: 16999,
        period: "30 jours",
        recommended: false,
        features: [
          "Tout le Premium Mensuel, en volume étendu",
          "Bilan intelligent chaque jour, sans ouvrir l'application",
          "Profil mis en avant + support prioritaire",
        ],
      },
    ],
    assurances: [
      "Paiement unique par MTN MoMo ou Orange Money",
      "Aucun renouvellement automatique",
      "Vos documents ne partent qu'aux offres que vous choisissez",
    ],
    fairUse: "Pass Premium dans la limite d'un usage équitable.",
  },
  faq: {
    eyebrow: "FAQ",
    title: "Questions fréquentes",
    subtitle: "Tout ce qu'il faut savoir avant de commencer.",
    more: "Une autre question\u00a0?",
    moreLink: "Écrivez à l'équipe",
    items: [
      {
        q: "KamJob est-il vraiment gratuit\u00a0?",
        a: "Oui. Créer un compte, glisser les offres et postuler est 100 % gratuit et illimité. Les pass Premium sont optionnels\u00a0: ils ajoutent le CV réécrit pour chaque offre, l'analyse détaillée et le Bilan intelligent. Et souvenez-vous\u00a0: aucun employeur sérieux ne vous demandera de payer pour postuler.",
      },
      {
        q: "Comment ma candidature est-elle envoyée\u00a0?",
        a: "Quand vous glissez une offre à droite, votre CV et votre lettre de motivation partent par email à l'adresse de recrutement de l'entreprise. Vous recevez une confirmation, puis vous suivez chaque étape depuis l'application.",
      },
      {
        q: "C'est quoi le coach d'entretien\u00a0?",
        a: "Pour une offre où vous avez postulé, le coach prépare trois entretiens blancs — RH, métier et technique — écrits à partir de l'offre, de votre profil et de ce qui est public sur la façon de recruter de l'entreprise. Il joue ensuite le recruteur et vous pose les questions une à une.",
      },
      {
        q: "Le coach invente-t-il des informations sur l'employeur\u00a0?",
        a: "Non. Il s'appuie sur des sources publiques et vous montre ce qu'il a trouvé. S'il n'existe rien de public sur un employeur, il le dit et travaille à partir de l'offre et de ce que demandent des employeurs semblables.",
      },
      {
        q: "Que veut dire le score de match\u00a0?",
        a: "C'est la correspondance entre une offre et votre profil. Plus votre profil est complet, plus le score est juste — et plus les offres proposées vous ressemblent. Avec un pass Premium, vous voyez aussi le détail\u00a0: vos points forts et vos lacunes pour chaque offre.",
      },
      {
        q: "Dois-je refaire mon CV pour chaque offre\u00a0?",
        a: "Non. Vous ajoutez votre CV et votre lettre une seule fois dans votre profil. Avec un pass Premium, ils sont réécrits automatiquement pour chaque offre et optimisés pour les logiciels de tri (ATS) avant l'envoi.",
      },
      {
        q: "C'est quoi le Bilan intelligent\u00a0?",
        a: "C'est la fonctionnalité phare du Premium Mensuel\u00a0: l'IA repère les offres de votre domaine et postule automatiquement pour vous, avec un CV optimisé pour chaque offre retenue. Vous recevez un rapport clair qui récapitule chaque envoi.",
      },
      {
        q: "Comment payer, et le pass se renouvelle-t-il\u00a0?",
        a: "Par Mobile Money\u00a0: MTN MoMo et Orange Money sont acceptés. Vous saisissez votre numéro et confirmez sur votre téléphone. Chaque pass a une durée fixe (72 h, 7 jours ou 30 jours) et s'arrête tout seul\u00a0: jamais de prélèvement surprise.",
      },
      {
        q: "Mes documents sont-ils en sécurité\u00a0?",
        a: "Oui. Vos documents sont stockés de manière sécurisée et ne sont transmis qu'aux recruteurs des offres auxquelles vous choisissez de postuler. Ils ne sont jamais revendus ni partagés ailleurs.",
      },
      {
        q: "Je suis recruteur — comment publier mes offres\u00a0?",
        a: "KamJob dispose d'un portail employeur dédié\u00a0: vous publiez vos offres avec leur affiche, vous fixez une date d'expiration, et vous recevez les candidatures (CV + lettre) directement par email. L'accès employeur se demande depuis l'application.",
      },
    ],
  },
  employers: {
    label: "JE RECRUTE",
    title: "Vous recrutez\u00a0?",
    text: "Publiez vos offres avec leur affiche, fixez une date d'expiration et recevez les candidatures — CV et lettre — directement par email. Les meilleurs profils du Cameroun sont déjà sur KamJob.",
    cta: "Publier mes offres",
  },
  contact: {
    eyebrow: "CONTACT",
    title: "Une suggestion\u00a0? Écrivez-nous.",
    subtitle:
      "Une idée pour améliorer KamJob, un bug à signaler, une question sur votre compte\u00a0? Votre message part directement dans la boîte de l'équipe.",
    nameLabel: "Votre nom",
    namePlaceholder: "Comment vous appeler",
    emailLabel: "Votre email",
    emailPlaceholder: "vous@email.com",
    subjectLabel: "Sujet",
    subjectPlaceholder: "Une suggestion, un bug, une question…",
    messageLabel: "Votre message",
    messagePlaceholder:
      "Dites-nous tout — plus c'est précis, plus on peut vous aider vite.",
    send: "Envoyer le message",
    sending: "Envoi en cours…",
    successTitle: "Message envoyé, merci\u00a0!",
    successText:
      "On vous répond à l'adresse que vous venez de donner, généralement sous 48 heures ouvrées.",
    again: "Écrire un autre message",
    directLabel: "Ou écrivez directement à",
    privacyNote:
      "Votre nom, votre email et votre message servent uniquement à vous répondre.",
    privacyLink: "Politique de confidentialité",
    honeypotLabel: "Laissez ce champ vide",
    errors: {
      invalid:
        "Vérifiez vos informations\u00a0: un nom, un email valide, un sujet et un message d'au moins 10 caractères sont nécessaires.",
      rateLimited:
        "Vous avez déjà envoyé plusieurs messages. Réessayez dans quelques minutes — on a bien reçu les précédents.",
      unavailable:
        "L'envoi automatique ne fonctionne pas pour le moment. Écrivez-nous directement\u00a0:",
    },
  },
  finalCta: {
    title: "Votre prochain poste est à un geste.",
    subtitle:
      "Créez votre profil aujourd'hui\u00a0: première candidature en moins de cinq minutes, et un coach prêt pour le jour où ils appellent.",
    button: "Commencer maintenant",
    phoneAlt:
      "L'écran d'accueil de KamJob\u00a0: «\u00a0Créez votre profil une fois. Glissez pour postuler.\u00a0»",
  },
  stickyCta: {
    label: "Postuler est gratuit",
    button: "Créer mon compte",
  },
  footer: {
    company: "Ressources",
    employerLink: "Espace employeur",
    tagline: "Votre emploi au Cameroun",
    disclaimer:
      "Candidature 100 % gratuite — aucun employeur sérieux ne vous demandera de payer pour postuler.",
    product: "Produit",
    legal: "Légal",
    terms: "Conditions générales",
    privacy: "Confidentialité",
    copyright: "© 2026 KamJob · Fait au Cameroun",
  },
};

const en: typeof fr = {
  nav: {
    features: "Features",
    coach: "Interview coach",
    pricing: "Pricing",
    faq: "FAQ",
    login: "Log in",
    signup: "Sign up",
    country: "Cameroon",
    backHome: "Back to home",
    contact: "Contact",
    openMenu: "Open menu",
    closeMenu: "Close menu",
    skipToContent: "Skip to main content",
    langLabel: "Change language",
  },
  hero: {
    badge: "Jobs in Cameroon",
    title: "Swipe to apply.",
    titleAccent: "Land the interview.",
    subtitle:
      "Offers sorted for your profile, all over Cameroon. Swipe right and your CV and cover letter go straight to the recruiter. No email to write, no CV to redo.",
    ctaPrimary: "Create my free profile",
    ctaSecondary: "See how it works",
    note: "Free to apply · No commitment · Mobile Money payment",
    proof: {
      quote: "Two interviews landed the same week.",
      author: "Aïcha N., web developer in Douala",
    },
  },
  mockup: {
    feedAlt:
      "The KamJob offer feed: an HR Manager offer in Douala, with its poster, match score and the Skip and Apply buttons",
    trackAlt:
      "Tracking an application in KamJob: sent, then seen, shortlisted, interview and decision",
    toast: "Application sent",
    toastSub: "CV + letter with the recruiter",
  },
  ticker: {
    label: "Offers across every industry, all over Cameroon",
    stats: [
      { value: "12", label: "industries" },
      { value: "10", label: "cities covered" },
    ],
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
  testimonials: {
    eyebrow: "TESTIMONIALS",
    title: "They found their job with KamJob",
    items: [
      {
        quote:
          "I applied to 15 offers during my lunch break. Two interviews landed the same week.",
        name: "Aïcha N.",
        role: "Web developer · Douala",
      },
      {
        quote:
          "The AI-tailored CV made the difference: the recruiter told me my profile matched the offer perfectly.",
        name: "Steve M.",
        role: "Accountant · Yaoundé",
      },
      {
        quote:
          "The Smart Report applies while I'm in class. I get the report and prepare for my interviews.",
        name: "Vanessa T.",
        role: "Marketing student · Bafoussam",
      },
    ],
  },
  problem: {
    eyebrow: "THE PROBLEM",
    title: "Job hunting here is a second job.",
    subtitle: "You know the routine. It wears you down before the first interview.",
    items: [
      {
        title: "Offers are everywhere, and nowhere.",
        text: "Posters forwarded from WhatsApp group to WhatsApp group, undated, often already expired. You spend more time searching than applying.",
      },
      {
        title: "Every application costs an evening.",
        text: "Find the address, write the email, attach the CV and letter, proofread. Then start all over for the next offer.",
      },
      {
        title: "Then, silence.",
        text: "No news. No way to know whether your file was even opened, or whether to follow up.",
      },
      {
        title: "And when they finally call, nothing's prepared.",
        text: "“Tell us about yourself.” It's the very first question, and the interview is already slipping away.",
      },
    ],
    costLabel: "THE REAL COST",
    cost: "Weeks of effort for a handful of applications — and interviews lost on the very first question.",
  },
  tour: {
    eyebrow: "THE SOLUTION",
    title: "The whole journey, in one app.",
    subtitle:
      "From the offer to the interview, KamJob does the grunt work. You stay in charge of every decision.",
    items: [
      {
        kicker: "Discover",
        title: "Offers the way they circulate — sorted for you.",
        text: "Every offer keeps its original poster, with the contract, city, level and a match score computed from your profile. The ones that fit you come first.",
        points: [
          "A match score on every offer",
          "Filters by field, city and level",
          "The full poster, just like on WhatsApp",
        ],
        alt: "An offer in the KamJob feed: the employer's poster, 27% match, permanent contract, on-site, Douala, Master's level",
      },
      {
        kicker: "Apply",
        title: "Swipe right. It's sent.",
        text: "Your CV and cover letter go straight to the company's recruitment address. Not for you? Swipe left. Swiped too fast? One button takes you back.",
        points: [
          "CV + letter sent automatically",
          "Skip with a swipe, undo with a tap",
          "A confirmation for every application",
        ],
        alt: "An offer swiped left, marked “Skip”, in the KamJob feed",
      },
      {
        kicker: "Track",
        title: "Always know where your application stands.",
        text: "Sent, seen by the company, shortlisted, interview, decision: every step shows up. You can also find the exact CV and letter that went out.",
        points: [
          "Five-step tracking",
          "A notification at every change",
          "The documents you sent, kept in one place",
        ],
        alt: "An application's detail in KamJob: sent on 3 November, the interview coach, then the steps to come",
      },
      {
        kicker: "Profile",
        title: "Your profile, once.",
        text: "Experience, education, certifications, skills: fill in your professional identity once. It goes out with every application and sharpens the offers you're shown.",
        points: [
          "One profile for every application",
          "Sharper recommendations with every addition",
          "Premium: a CV rewritten for every offer",
        ],
        alt: "The KamJob profile: completion level, Premium upgrade, experience, education, certifications and skills",
      },
    ],
    moreTitle: "And also",
    more: [
      {
        title: "Instant application",
        text: "Send your file to the company of your choice, even with no offer posted — ideal for an internship.",
      },
      {
        title: "A CV rewritten for every offer",
        text: "With Premium, your CV and cover letter are tailored to each offer and optimised for applicant tracking systems (ATS).",
      },
      {
        title: "Smart Report",
        text: "With Premium, the AI spots offers in your field and applies for you, with a report of every application.",
      },
    ],
  },
  coach: {
    eyebrow: "NEW · INTERVIEW COACH",
    title: "They're calling? You've already rehearsed.",
    subtitle:
      "For every offer you apply to, the coach builds mock interviews written for that exact role — from the offer, your profile and whatever is public about how the company hires.",
    steps: [
      {
        title: "Pick the interview",
        text: "HR, hiring manager or technical: three simulations, each written for this role. Do them in any order.",
        alt: "Choosing which interview to simulate for a role at Globulus: HR, hiring manager or technical",
      },
      {
        title: "The coach does its homework",
        text: "It reads the offer and your profile, looks up what's public about the employer, picks the classic questions and writes the ones about your background. About a minute.",
        alt: "The coach preparing the HR interview: offer read, profile read, employer researched, eleven classic questions picked",
      },
      {
        title: "Practise like it's real",
        text: "The coach plays the recruiter: fifteen questions, one at a time. Answer the way you'd say it face to face.",
        alt: "HR interview simulation: “Can you introduce yourself?”, question 1 of 15",
      },
    ],
    note: "Nothing made up: if there's nothing public about an employer, the coach says so and works from the offer and from what similar employers ask.",
    cta: "Try the coach",
  },
  pricing: {
    eyebrow: "PRICING",
    title: "Applying is free. Forever.",
    subtitle:
      "Premium passes are optional: they rewrite your CV for every offer and can apply on your behalf, for as long as you want.",
    currency: "FCFA",
    free: {
      name: "Free",
      price: 0,
      period: "forever",
      features: [
        "The offer feed, sorted for your profile",
        "Unlimited applications: CV + letter to the recruiter",
        "Tracking for every application",
      ],
      cta: "Create my free profile",
    },
    passesTitle: "Premium passes · one-time payment",
    cta: "Choose this pass",
    recommended: "RECOMMENDED",
    plans: [
      {
        name: "72h Pass",
        price: 1550,
        period: "3 days",
        recommended: false,
        features: [
          "CV and cover letter rewritten for every offer",
          "Compatibility score, with your strengths and gaps",
        ],
      },
      {
        name: "Weekly Premium — The Sprint",
        price: 2500,
        period: "7 days",
        recommended: false,
        features: [
          "Everything in the 72h Pass, for a full week",
          "Detailed score, strengths and gaps on every offer",
        ],
      },
      {
        name: "Monthly Premium — Full search",
        price: 7699,
        period: "30 days",
        recommended: true,
        features: [
          "Everything in the Sprint, for 30 days",
          "Smart Report every week: we find the offers in your field and apply for you",
          "An ATS-certified CV for every selected offer",
          "Highlighted profile",
        ],
      },
      {
        name: "Pro Premium — Intensive search",
        price: 16999,
        period: "30 days",
        recommended: false,
        features: [
          "Everything in Monthly Premium, at extended volume",
          "Smart Report every day, without opening the app",
          "Highlighted profile + priority support",
        ],
      },
    ],
    assurances: [
      "One-time payment via MTN MoMo or Orange Money",
      "No automatic renewal",
      "Your documents only go to the offers you choose",
    ],
    fairUse: "Premium passes are subject to fair use.",
  },
  faq: {
    eyebrow: "FAQ",
    title: "Frequently asked questions",
    subtitle: "Everything you need to know before getting started.",
    more: "Another question?",
    moreLink: "Write to the team",
    items: [
      {
        q: "Is KamJob really free?",
        a: "Yes. Creating an account, swiping offers and applying is 100% free and unlimited. Premium passes are optional: they add a CV rewritten for every offer, detailed analysis and the Smart Report. And remember: no serious employer will ever ask you to pay to apply.",
      },
      {
        q: "How is my application sent?",
        a: "When you swipe right on an offer, your CV and cover letter are emailed to the company's recruitment address. You get a confirmation, then follow every step from the app.",
      },
      {
        q: "What is the interview coach?",
        a: "For an offer you've applied to, the coach prepares three mock interviews — HR, hiring manager and technical — written from the offer, your profile and whatever is public about how the company hires. It then plays the recruiter and asks you the questions one by one.",
      },
      {
        q: "Does the coach make things up about the employer?",
        a: "No. It relies on public sources and shows you what it found. If there's nothing public about an employer, it says so and works from the offer and from what similar employers ask.",
      },
      {
        q: "What does the match score mean?",
        a: "It's how well an offer fits your profile. The more complete your profile, the more accurate the score — and the more the offers you're shown look like you. With a Premium pass you also see the detail: your strengths and gaps for every offer.",
      },
      {
        q: "Do I need to redo my CV for every offer?",
        a: "No. You add your CV and cover letter once in your profile. With a Premium pass, they are rewritten automatically for every offer and optimised for applicant tracking systems (ATS) before sending.",
      },
      {
        q: "What is the Smart Report?",
        a: "It's the flagship feature of Monthly Premium: the AI spots offers in your field and applies for you automatically, with an optimised CV for every selected offer. You receive a clear report summarising each application.",
      },
      {
        q: "How do I pay, and does the pass renew?",
        a: "Via Mobile Money: MTN MoMo and Orange Money are accepted. Enter your number and confirm on your phone. Every pass has a fixed duration (72h, 7 days or 30 days) and simply expires: no surprise charges, ever.",
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
    label: "I'M HIRING",
    title: "Hiring?",
    text: "Post your offers with their poster, set an expiry date and receive applications — CV and cover letter — directly by email. Cameroon's best profiles are already on KamJob.",
    cta: "Post my offers",
  },
  contact: {
    eyebrow: "CONTACT",
    title: "Got a suggestion? Write to us.",
    subtitle:
      "An idea to make KamJob better, a bug to report, a question about your account? Your message goes straight to the team's inbox.",
    nameLabel: "Your name",
    namePlaceholder: "What should we call you",
    emailLabel: "Your email",
    emailPlaceholder: "you@email.com",
    subjectLabel: "Subject",
    subjectPlaceholder: "A suggestion, a bug, a question…",
    messageLabel: "Your message",
    messagePlaceholder:
      "Tell us everything — the more specific you are, the faster we can help.",
    send: "Send message",
    sending: "Sending…",
    successTitle: "Message sent, thank you!",
    successText:
      "We'll reply to the address you just gave us, usually within 48 working hours.",
    again: "Write another message",
    directLabel: "Or write directly to",
    privacyNote:
      "Your name, email and message are used only to reply to you.",
    privacyLink: "Privacy Policy",
    honeypotLabel: "Leave this field empty",
    errors: {
      invalid:
        "Check your details: a name, a valid email, a subject and a message of at least 10 characters are required.",
      rateLimited:
        "You've already sent several messages. Try again in a few minutes — we did receive the earlier ones.",
      unavailable:
        "Automatic sending isn't working right now. Write to us directly:",
    },
  },
  finalCta: {
    title: "Your next job is one swipe away.",
    subtitle:
      "Create your profile today: first application in under five minutes, and a coach ready for the day they call.",
    button: "Start now",
    phoneAlt:
      "The KamJob welcome screen: “Create your profile once. Swipe to apply.”",
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
    copyright: "© 2026 KamJob · Made in Cameroon",
  },
};

export type Lang = "fr" | "en";
export type Dictionary = typeof fr;
export const translations: Record<Lang, Dictionary> = { fr, en };
