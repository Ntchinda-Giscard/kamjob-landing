// Legal documents (CGU/CGV + privacy policy), French first — English mirrors
// the same shape, exactly like lib/translations.ts.
//
// The French version is the legally authoritative one (see the "Droit
// applicable, langue et règlement des litiges" article): the English text is a
// courtesy translation and must be kept in sync whenever the French changes.
//
// ⚠️  BEFORE PRODUCTION — the fields marked `TBD` below must be filled with the
//     company's real registration data. Publishing an e-commerce service in
//     Cameroon without them does not satisfy the identification duty of the
//     loi n° 2010/021 du 21 décembre 2010 régissant le commerce électronique.

/** Placeholder for company data that only the founders can supply. */
const TBD = { fr: '[à compléter]', en: '[to be completed]' } as const

export const LEGAL_CONTACT = {
  legal: 'legal@kamjob.com',
  privacy: 'privacy@kamjob.com',
  support: 'support@kamjob.com',
} as const

/** Kept as data so the same renderer serves both documents. */
export type LegalBlock =
  | { kind: 'p'; text: string }
  | { kind: 'list'; items: string[] }
  | { kind: 'defs'; items: { term: string; text: string }[] }
  | { kind: 'note'; text: string }
  | { kind: 'warn'; text: string }
  | { kind: 'table'; caption: string; head: string[]; rows: string[][] }

export type LegalSection = {
  /** Anchor id — stable across languages so deep links survive a language switch. */
  id: string
  title: string
  blocks: LegalBlock[]
}

export type LegalDoc = {
  /** Short name used in the footer, breadcrumb and cross-links. */
  label: string
  title: string
  subtitle: string
  updated: string
  version: string
  sections: LegalSection[]
  /** Closing line under the last article. */
  note: string
}

export type LegalUi = {
  backHome: string
  toc: string
  updated: string
  version: string
  alsoRead: string
  print: string
  tableScrollHint: string
}

const UPDATED_FR = '17 août 2026'
const UPDATED_EN = '17 August 2026'
const VERSION = '1.0'

// ── Français ─────────────────────────────────────────────────────────────────

const termsFr: LegalDoc = {
  label: 'Conditions générales',
  title: "Conditions Générales d'Utilisation et de Vente",
  subtitle:
    "Le contrat qui nous lie. Il précise ce que KamJob fait, ce que KamJob ne fait pas, ce que coûte le service et ce qui se passe en cas de désaccord.",
  updated: UPDATED_FR,
  version: VERSION,
  note: "Les présentes Conditions sont rédigées en français, langue officielle de référence du contrat. La version anglaise est une traduction de courtoisie fournie pour la seule commodité de l'Utilisateur.",
  sections: [
    {
      id: 'objet',
      title: 'Objet et acceptation',
      blocks: [
        {
          kind: 'p',
          text: "Les présentes Conditions Générales d'Utilisation et de Vente (les « Conditions ») régissent l'accès à la plateforme KamJob et son utilisation, qu'il s'agisse du site vitrine, de l'application destinée aux candidats ou du portail réservé aux employeurs (ensemble, la « Plateforme »).",
        },
        {
          kind: 'p',
          text: "Elles sont conclues entre KamJob, éditeur de la Plateforme (l'« Éditeur », « nous »), et toute personne qui accède à la Plateforme ou l'utilise (l'« Utilisateur », « vous »). Conformément à la loi n° 2010/021 du 21 décembre 2010 régissant le commerce électronique au Cameroun, elles sont accessibles en permanence, à titre gratuit, et peuvent être imprimées ou enregistrées sur un support durable.",
        },
        {
          kind: 'p',
          text: "La création d'un compte, la consultation des offres, l'envoi d'une candidature ou la souscription d'un Pass Premium valent acceptation pleine et entière des Conditions, dans leur version en vigueur à la date de l'acte concerné. Cette acceptation est matérialisée par un procédé électronique dont la valeur probatoire est reconnue par la loi n° 2010/021 précitée.",
        },
        {
          kind: 'note',
          text: "Si vous n'acceptez pas ces Conditions, vous devez renoncer à utiliser la Plateforme : aucune utilisation n'est possible en dehors de leur acceptation.",
        },
      ],
    },
    {
      id: 'editeur',
      title: "Identification de l'éditeur",
      blocks: [
        {
          kind: 'p',
          text: "En application de la loi n° 2010/021 du 21 décembre 2010 régissant le commerce électronique au Cameroun, l'Éditeur se présente comme suit :",
        },
        {
          kind: 'defs',
          items: [
            { term: 'Dénomination', text: `KamJob — ${TBD.fr} (dénomination sociale complète)` },
            { term: 'Forme juridique et capital social', text: TBD.fr },
            { term: 'Siège social', text: `${TBD.fr}, Cameroun` },
            { term: 'Registre du Commerce et du Crédit Mobilier (RCCM)', text: TBD.fr },
            { term: 'Numéro Identifiant Unique (NIU)', text: TBD.fr },
            { term: 'Représentant légal', text: TBD.fr },
            { term: 'Téléphone', text: TBD.fr },
            {
              term: 'Adresses électroniques',
              text: `${LEGAL_CONTACT.legal} (questions juridiques et réclamations) · ${LEGAL_CONTACT.support} (assistance, signalement d'offre suspecte) · ${LEGAL_CONTACT.privacy} (données personnelles)`,
            },
            { term: 'Hébergeur de la Plateforme', text: `${TBD.fr} (dénomination, adresse et pays d'hébergement)` },
          ],
        },
        {
          kind: 'p',
          text: "Les activités de la Plateforme s'exercent sous l'empire du droit camerounais et, s'agissant des communications électroniques et de la cybersécurité, dans le cadre défini par la loi n° 2010/013 du 21 décembre 2010 régissant les communications électroniques (modifiée par la loi n° 2015/006 du 20 avril 2015) et par la loi n° 2010/012 du 21 décembre 2010 relative à la cybersécurité et à la cybercriminalité, sous la régulation de l'Agence Nationale des Technologies de l'Information et de la Communication (ANTIC) et de l'Agence de Régulation des Télécommunications (ART).",
        },
      ],
    },
    {
      id: 'definitions',
      title: 'Définitions',
      blocks: [
        {
          kind: 'defs',
          items: [
            {
              term: 'Candidat',
              text: "Personne physique inscrite sur la Plateforme en vue de rechercher un emploi, un stage ou une mission.",
            },
            {
              term: 'Employeur',
              text: "Personne physique ou morale qui publie une Offre ou reçoit des Candidatures, agissant pour son propre compte ou pour le compte d'un tiers dûment mandaté.",
            },
            {
              term: 'Offre',
              text: "Annonce publiée sur la Plateforme par un Employeur, comprenant le cas échéant son affiche, l'adresse électronique de réception des candidatures et une date d'expiration.",
            },
            {
              term: 'Swipe',
              text: "Geste de l'Utilisateur sur une Offre. Le swipe vers la droite constitue une instruction expresse, sans équivoque et irrévocable d'envoyer sa Candidature à l'Employeur concerné.",
            },
            {
              term: 'Candidature',
              text: "Ensemble transmis à l'Employeur lors d'un swipe vers la droite : curriculum vitæ, lettre de motivation et informations de profil nécessaires à l'identification du Candidat.",
            },
            {
              term: 'Pass Premium',
              text: "Service numérique payant, à durée déterminée et à exécution immédiate, donnant accès à des fonctionnalités logicielles d'assistance (analyse de compatibilité, adaptation de documents, bilan automatisé).",
            },
            {
              term: 'Contenu Utilisateur',
              text: "Tout élément fourni par l'Utilisateur : documents, textes, images, informations de profil et données de candidature.",
            },
            {
              term: 'IA',
              text: "Traitements automatisés d'assistance mis en œuvre par la Plateforme ou par ses prestataires pour analyser une Offre et adapter le Contenu Utilisateur.",
            },
          ],
        },
      ],
    },
    {
      id: 'nature',
      title: 'Nature du service : une mise en relation, ni emploi ni placement payant',
      blocks: [
        {
          kind: 'p',
          text: "KamJob fournit un service technique de mise en relation entre Candidats et Employeurs. KamJob n'est ni l'employeur, ni le mandataire, ni le garant, ni le cocontractant de l'une ou l'autre partie à la relation de travail. Le contrat de travail, le contrat de stage ou la mission éventuellement conclus le sont exclusivement entre le Candidat et l'Employeur, sous l'empire de la loi n° 92/007 du 14 août 1992 portant Code du travail et de ses textes d'application.",
        },
        {
          kind: 'p',
          text: "KamJob n'exerce pas d'activité de bureau de placement payant à l'égard des Candidats. La création du compte, la consultation des Offres, le swipe et l'envoi des Candidatures sont gratuits et le demeureront : aucune somme n'est perçue du Candidat au titre de son placement, de sa présentation à un Employeur ou de son recrutement. Les Pass Premium ne rémunèrent que des outils logiciels d'assistance et ne constituent en aucun cas la contrepartie d'une promesse, d'une priorité ou d'une garantie d'embauche.",
        },
        { kind: 'p', text: 'En conséquence, KamJob ne garantit pas :' },
        {
          kind: 'list',
          items: [
            "l'obtention d'un emploi, d'un stage, d'un entretien ou même d'une réponse de l'Employeur ;",
            "l'exactitude, l'actualité, la licéité ou le sérieux des Offres, qui relèvent de la seule responsabilité de l'Employeur qui les publie, KamJob n'étant tenu qu'à une obligation de modération raisonnable et de retrait diligent des contenus manifestement illicites qui lui sont signalés ;",
            "les décisions de recrutement, les critères de sélection ou les conditions d'emploi proposées par un Employeur ;",
            "le nombre, la fréquence ou la répartition géographique et sectorielle des Offres disponibles à un instant donné.",
          ],
        },
        {
          kind: 'warn',
          text: `Aucun employeur sérieux ne vous demandera de payer pour postuler, pour « réserver un poste », pour un « frais de dossier » ou pour une prétendue formation préalable. Signalez immédiatement toute sollicitation de ce type à ${LEGAL_CONTACT.support}. Ces faits sont susceptibles de constituer une escroquerie au sens du Code pénal (loi n° 2016/007 du 12 juillet 2016) et, lorsqu'ils sont commis par voie électronique, une infraction à la loi n° 2010/012 du 21 décembre 2010 relative à la cybersécurité et à la cybercriminalité.`,
        },
      ],
    },
    {
      id: 'acces',
      title: 'Accès, inscription et capacité',
      blocks: [
        {
          kind: 'list',
          items: [
            "L'inscription est réservée aux personnes physiques disposant de la capacité juridique de contracter. Elle est ouverte à partir de l'âge minimum d'admission à l'emploi fixé par le Code du travail camerounais.",
            "La majorité civile étant fixée à vingt-et-un (21) ans en droit camerounais, l'Utilisateur qui n'a pas atteint cet âge déclare agir avec l'autorisation de son représentant légal, en particulier pour la souscription d'un Pass Premium. KamJob peut suspendre l'accès et rembourser un Pass souscrit sans cette autorisation.",
            "L'Utilisateur garantit l'exactitude, la sincérité et l'actualité des informations et documents qu'il fournit. Toute déclaration inexacte relative à son identité, ses diplômes ou son expérience engage sa seule responsabilité à l'égard des Employeurs.",
            "Le compte est strictement personnel. L'ouverture de plusieurs comptes par une même personne, la cession, le prêt ou la mise à disposition d'un compte à un tiers sont interdits.",
            "L'Utilisateur assure la confidentialité de ses identifiants et répond de toute opération effectuée depuis son compte. Il informe KamJob sans délai à l'adresse " + LEGAL_CONTACT.support + " de toute perte, divulgation ou utilisation non autorisée.",
            "L'accès à la Plateforme suppose une connexion Internet et un terminal compatibles, dont le coût demeure à la charge de l'Utilisateur.",
          ],
        },
        {
          kind: 'p',
          text: "L'usurpation de l'identité d'un tiers, l'accès frauduleux à un compte et le maintien frauduleux dans un système d'information sont réprimés par la loi n° 2010/012 du 21 décembre 2010 relative à la cybersécurité et à la cybercriminalité, indépendamment des mesures contractuelles prévues à l'article « Suspension, résiliation et clôture du compte ».",
        },
      ],
    },
    {
      id: 'tarifs',
      title: 'Candidature gratuite et Pass Premium',
      blocks: [
        {
          kind: 'p',
          text: "La création du compte, la constitution du profil, la consultation des Offres, le swipe et l'envoi illimité de Candidatures sont gratuits, sans limitation de durée et sans engagement.",
        },
        {
          kind: 'p',
          text: "Les Pass Premium sont des services optionnels. Leur intitulé, leur contenu fonctionnel, leur durée et leur prix sont affichés sur la page « Tarifs » et rappelés sur l'écran de paiement avant toute validation, conformément à l'obligation d'information précontractuelle de la loi n° 2011/012 du 6 mai 2011 portant protection du consommateur au Cameroun. Les prix sont exprimés en francs CFA (XAF), toutes taxes comprises, la taxe sur la valeur ajoutée applicable au Cameroun étant incluse le cas échéant.",
        },
        {
          kind: 'list',
          items: [
            "Chaque Pass est acquis par un paiement unique et pour une durée déterminée, qui court à compter de son activation.",
            "Aucun renouvellement automatique n'existe : à l'expiration du terme, le Pass cesse de produire effet, sans reconduction ni prélèvement ultérieur.",
            "Les modifications tarifaires ultérieures sont sans effet sur un Pass déjà acquis et en cours de validité.",
            "Les Pass ne sont ni cessibles, ni transférables, ni cumulables entre comptes.",
            "KamJob se réserve le droit de faire évoluer le contenu fonctionnel des Pass, sous réserve de ne pas priver un Pass en cours de sa substance : dans une telle hypothèse, les mesures correctives de l'article « Absence de rétractation et de remboursement » s'appliquent.",
          ],
        },
      ],
    },
    {
      id: 'paiement',
      title: 'Paiement par Mobile Money',
      blocks: [
        {
          kind: 'p',
          text: "Les Pass sont réglés par Mobile Money (notamment MTN Mobile Money et Orange Money). L'Utilisateur saisit son numéro, puis confirme l'opération sur son terminal auprès de son opérateur. L'ordre de paiement ainsi confirmé est irrévocable.",
        },
        {
          kind: 'list',
          items: [
            "L'opération de paiement est exécutée par l'opérateur de monnaie électronique et son établissement partenaire, dans le cadre de la réglementation CEMAC applicable aux systèmes, moyens et services de paiement, notamment le règlement n° 02/18/CEMAC/UMAC/CM du 21 décembre 2018 relatif aux systèmes, moyens et incidents de paiement. KamJob n'est pas prestataire de services de paiement.",
            "KamJob ne collecte ni ne conserve aucun code secret, code PIN ou identifiant de compte de monnaie électronique. Seules la référence de la transaction, le montant, la date et le numéro utilisé sont conservés à des fins comptables et de preuve.",
            "Les frais éventuellement prélevés par l'opérateur au titre du transfert restent à la charge de l'Utilisateur et ne sont pas remboursables par KamJob.",
            "Les incidents propres au canal de paiement (numéro erroné saisi par l'Utilisateur, solde insuffisant, indisponibilité du réseau de l'opérateur, blocage du compte de monnaie électronique) relèvent de la relation entre l'Utilisateur et son opérateur.",
            "Le Pass est activé dès réception de la confirmation de paiement. En cas de retard technique, l'Utilisateur saisit " + LEGAL_CONTACT.support + " avec la référence de la transaction.",
          ],
        },
        {
          kind: 'p',
          text: "Un justificatif électronique du paiement est mis à la disposition de l'Utilisateur dans son compte. Les registres informatisés de KamJob et les relevés de l'opérateur constituent, entre les parties, un mode de preuve admissible des opérations effectuées.",
        },
      ],
    },
    {
      id: 'remboursement',
      title: 'Absence de rétractation et de remboursement',
      blocks: [
        {
          kind: 'p',
          text: "Le Pass Premium est un service numérique à exécution immédiate. En validant le paiement, l'Utilisateur demande expressément l'activation immédiate du service, reconnaît en bénéficier dès cette activation et accepte que la prestation soit ainsi pleinement fournie.",
        },
        {
          kind: 'warn',
          text: "En conséquence, et en l'absence de droit de rétractation légal applicable aux services numériques à exécution immédiate en droit camerounais, tout paiement est ferme et définitif : il ne donne lieu à aucun remboursement, total ou partiel, ni à aucun avoir, en dehors des seuls cas de défaillance imputable à KamJob énumérés ci-dessous.",
        },
        {
          kind: 'p',
          text: 'Ne donnent lieu à aucun remboursement, notamment :',
        },
        {
          kind: 'list',
          items: [
            "le changement d'avis de l'Utilisateur après activation du Pass ;",
            "la non-utilisation, l'utilisation partielle ou l'oubli du Pass, ainsi que les jours restants non consommés à son expiration ;",
            "l'absence d'embauche, d'entretien, de réponse ou de résultat, KamJob ne souscrivant aucune obligation de résultat en matière d'emploi ;",
            "l'insatisfaction quant au contenu, au style ou à la pertinence des documents et scores produits par l'IA, qui présentent par nature un caractère indicatif ;",
            "le nombre, la nature ou la localisation des Offres disponibles pendant la durée du Pass ;",
            "la suppression du compte à l'initiative de l'Utilisateur avant l'expiration du Pass ;",
            "la suspension ou la résiliation du compte prononcée pour manquement de l'Utilisateur aux présentes Conditions ;",
            "les frais de transfert prélevés par l'opérateur de Mobile Money ;",
            "les interruptions d'accès imputables à l'Utilisateur, à son terminal, à sa connexion, à son opérateur ou à un cas de force majeure.",
          ],
        },
        {
          kind: 'p',
          text: "La présente clause ne prive l'Utilisateur d'aucun droit d'ordre public, notamment de ceux résultant de la loi n° 2011/012 du 6 mai 2011 portant protection du consommateur au Cameroun. KamJob demeure tenu de délivrer le service payé conformément à sa description. En cas de défaillance qui lui est imputable, les mesures correctives suivantes s'appliquent :",
        },
        {
          kind: 'list',
          items: [
            "paiement débité sans activation du Pass : activation immédiate ou, si elle s'avère impossible, remboursement intégral de la somme perçue ;",
            "double débit ou débit erroné : remboursement du montant indûment perçu ;",
            "indisponibilité technique des fonctionnalités payées, imputable à KamJob et supérieure à vingt-quatre (24) heures consécutives : prolongation du Pass d'une durée au moins égale à celle de l'interruption ou, à défaut de possibilité de prolongation, remboursement au prorata de la période inutilisable ;",
            "suppression définitive, pendant la durée du Pass, d'une fonctionnalité qui en constituait l'objet essentiel : prolongation, substitution par une fonctionnalité équivalente ou remboursement au prorata.",
          ],
        },
        {
          kind: 'p',
          text: `Toute réclamation est adressée à ${LEGAL_CONTACT.support} dans un délai de quinze (15) jours à compter du fait générateur, en indiquant le numéro Mobile Money utilisé, la référence de la transaction, sa date et son montant. KamJob accuse réception et répond dans un délai de quinze (15) jours ouvrés. Les remboursements dus sont effectués par le même canal de paiement que celui utilisé lors de l'achat, dans un délai de trente (30) jours à compter de l'accord des parties sur leur principe et leur montant.`,
        },
      ],
    },
    {
      id: 'obligations',
      title: "Obligations et interdictions de l'Utilisateur",
      blocks: [
        {
          kind: 'p',
          text: "L'Utilisateur s'engage à un usage loyal de la Plateforme, conforme aux présentes Conditions, à l'ordre public et à la législation camerounaise. Il est notamment interdit :",
        },
        {
          kind: 'list',
          items: [
            "de fournir de fausses informations, de produire un curriculum vitæ, une attestation ou un diplôme mensonger ou falsifié, ou d'usurper l'identité, la qualité ou les titres d'un tiers ;",
            "de téléverser les documents personnels d'un tiers sans son autorisation ;",
            "de publier ou de transmettre des contenus illicites, injurieux, diffamatoires, haineux, discriminatoires, obscènes, portant atteinte à la vie privée ou aux droits de propriété intellectuelle d'autrui ;",
            "d'utiliser la Plateforme pour du démarchage non sollicité, de la publicité, de la vente de formations ou de services, ou pour toute finalité étrangère à la recherche ou à l'offre d'emploi ;",
            "d'extraire, de collecter, d'indexer, de reproduire ou de réutiliser, de façon massive ou automatisée, les Offres, les profils ou les bases de données de la Plateforme, notamment au moyen de robots, d'aspirateurs de contenu ou de scripts ;",
            "de contourner, de tester ou de compromettre les mesures de sécurité, d'accéder ou de tenter d'accéder à des espaces, comptes ou données auxquels l'Utilisateur n'a pas droit, d'introduire un code malveillant ou de perturber le fonctionnement du service ;",
            "de solliciter un paiement d'un Candidat à quelque titre que ce soit lié à un recrutement ;",
            "de revendre, sous-licencier ou exploiter commercialement l'accès à la Plateforme ou les données qui y figurent.",
          ],
        },
        {
          kind: 'p',
          text: "Plusieurs de ces comportements constituent, au-delà du manquement contractuel, des infractions pénales, notamment au regard de la loi n° 2010/012 du 21 décembre 2010 relative à la cybersécurité et à la cybercriminalité et du Code pénal (loi n° 2016/007 du 12 juillet 2016). KamJob se réserve le droit d'y donner la suite judiciaire appropriée et de répondre aux réquisitions des autorités compétentes.",
        },
      ],
    },
    {
      id: 'employeurs',
      title: 'Engagements spécifiques des Employeurs',
      blocks: [
        {
          kind: 'p',
          text: "En publiant une Offre ou en recevant des Candidatures, l'Employeur déclare et garantit :",
        },
        {
          kind: 'list',
          items: [
            "être régulièrement constitué ou immatriculé et disposer du pouvoir de recruter pour le poste publié, ou d'un mandat exprès à cet effet ;",
            "que l'Offre correspond à un besoin réel, décrit de manière exacte, non trompeuse et non discriminatoire, dans le respect du Code du travail camerounais et des conventions internationales du travail ratifiées par le Cameroun ;",
            "que l'adresse électronique de réception des Candidatures est la sienne et qu'il en assure la confidentialité ;",
            "ne solliciter d'un Candidat aucun paiement, avantage ou contrepartie à l'occasion du recrutement ;",
            "n'utiliser les données et documents reçus que pour l'évaluation de la candidature au poste concerné, à l'exclusion de toute autre finalité, cession, location ou revente, et les conserver pour une durée limitée et proportionnée ;",
            "respecter la confidentialité des informations reçues et les droits des personnes concernées sur leurs données.",
          ],
        },
        {
          kind: 'p',
          text: "À compter de la réception d'une Candidature, l'Employeur détermine seul les finalités et les moyens du traitement des données reçues : il en est responsable de traitement autonome et répond, à ce titre, du sort de ces données. KamJob peut suspendre, retirer une Offre ou fermer un compte employeur en cas de manquement, sans préjudice de tous dommages-intérêts.",
        },
      ],
    },
    {
      id: 'propriete',
      title: 'Propriété intellectuelle et contenus',
      blocks: [
        {
          kind: 'p',
          text: "La Plateforme, sa structure, son code, ses interfaces, ses textes, ses éléments graphiques, sa charte, ses bases de données ainsi que la dénomination et le logo KamJob sont protégés par la loi n° 2000/011 du 19 décembre 2000 relative au droit d'auteur et aux droits voisins, ainsi que par les dispositions applicables aux marques dans l'espace de l'Organisation Africaine de la Propriété Intellectuelle (OAPI, Accord de Bangui). Ils demeurent la propriété exclusive de l'Éditeur ou de ses concédants.",
        },
        {
          kind: 'p',
          text: "L'Utilisateur conserve l'entière propriété de son Contenu Utilisateur. Il concède à KamJob, pour la seule durée nécessaire à la fourniture du service et pour le monde entier, une licence non exclusive, gratuite et non transférable — hormis au profit des prestataires techniques agissant sur instruction de KamJob — l'autorisant à héberger, reproduire, mettre en forme, adapter techniquement et transmettre ce contenu aux seuls Employeurs choisis par l'Utilisateur, ainsi qu'à l'adapter par l'IA lorsque l'Utilisateur en fait la demande.",
        },
        {
          kind: 'p',
          text: "Cette licence prend fin avec la suppression du contenu ou la clôture du compte, sous réserve des transmissions déjà effectuées vers des Employeurs, qui sont par nature irréversibles, et des durées de conservation légales décrites dans la Politique de confidentialité. Aucun droit d'exploitation commerciale du Contenu Utilisateur, en dehors du service, n'est concédé à KamJob : vos documents ne sont ni vendus, ni loués, ni diffusés dans une base publique.",
        },
        {
          kind: 'p',
          text: "Sont interdites, à défaut d'autorisation écrite préalable, toute reproduction, représentation, adaptation, extraction ou réutilisation substantielle de la Plateforme et de ses bases de données, toute décompilation ou ingénierie inverse en dehors des exceptions légales, ainsi que tout usage de la marque, du logo ou de la dénomination KamJob susceptible de créer une confusion ou de suggérer un partenariat inexistant.",
        },
      ],
    },
    {
      id: 'donnees',
      title: 'Données personnelles',
      blocks: [
        {
          kind: 'p',
          text: "Le traitement des données personnelles des Utilisateurs est décrit en détail dans la Politique de confidentialité, qui fait partie intégrante des présentes Conditions.",
        },
        {
          kind: 'p',
          text: "L'Utilisateur retient en particulier que le swipe vers la droite déclenche l'envoi de son curriculum vitæ et de sa lettre de motivation à l'Employeur concerné, par courrier électronique, et que cet envoi est irréversible : un message électronique délivré ne peut être rappelé. KamJob ne vend, ne loue et n'échange les données des Utilisateurs avec aucun tiers à des fins commerciales.",
        },
      ],
    },
    {
      id: 'disponibilite',
      title: 'Disponibilité du service et force majeure',
      blocks: [
        {
          kind: 'p',
          text: "KamJob est tenu d'une obligation de moyens quant à la disponibilité et au bon fonctionnement de la Plateforme. Le service peut être interrompu pour maintenance, mise à jour, correction ou évolution ; KamJob s'efforce d'en réduire la durée et, lorsque l'interruption est programmée et significative, d'en informer les Utilisateurs.",
        },
        {
          kind: 'p',
          text: "La responsabilité de KamJob ne peut être engagée en cas de force majeure, entendue comme tout événement échappant à son contrôle raisonnable et rendant l'exécution impossible, notamment : interruption ou dégradation des réseaux de communications électroniques ou de la fourniture d'énergie électrique, défaillance d'un opérateur de Mobile Money, d'un hébergeur ou d'un fournisseur de messagerie, cyberattaque, incendie, inondation, épidémie, décision d'une autorité administrative ou judiciaire, grève générale ou troubles graves à l'ordre public.",
        },
        {
          kind: 'p',
          text: "Si l'événement de force majeure se prolonge au-delà de trente (30) jours, chacune des parties peut mettre fin à la relation contractuelle par simple notification, sans indemnité de part ni d'autre, les mesures correctives relatives aux Pass en cours demeurant applicables.",
        },
      ],
    },
    {
      id: 'responsabilite',
      title: 'Responsabilité',
      blocks: [
        {
          kind: 'p',
          text: "KamJob répond des dommages directs résultant d'un manquement à ses propres obligations. Elle ne répond pas, en revanche :",
        },
        {
          kind: 'list',
          items: [
            "du comportement, des déclarations, de la solvabilité ou des décisions des Employeurs et des Candidats ;",
            "du contenu, de la véracité ou de la licéité des Offres et des Contenus Utilisateurs, sous réserve de son obligation de retrait diligent des contenus manifestement illicites signalés ;",
            "de la formation, de l'exécution ou de la rupture de la relation de travail ou de stage ;",
            "de l'usage que fait un Employeur des documents qu'il a reçus, dont il est responsable de traitement autonome ;",
            "des défaillances des services de tiers indispensables à la fourniture du service (opérateurs Mobile Money, fournisseurs de messagerie, réseaux, terminaux de l'Utilisateur) ;",
            "des conséquences d'informations inexactes fournies par l'Utilisateur ou d'une négligence dans la garde de ses identifiants.",
          ],
        },
        {
          kind: 'p',
          text: "Pour les services gratuits, aucune indemnisation n'est due, la gratuité étant la contrepartie économique de cette absence de garantie. Pour les services payants, et pour autant qu'une responsabilité soit établie, l'indemnisation totale due par KamJob, toutes causes confondues, ne peut excéder le montant des sommes effectivement versées par l'Utilisateur au cours des douze (12) mois précédant le fait générateur.",
        },
        {
          kind: 'note',
          text: "Aucune stipulation des présentes Conditions n'a pour objet ni pour effet d'exclure ou de limiter la responsabilité de KamJob en cas de dol, de faute lourde, d'atteinte à l'intégrité des personnes ou dans les autres cas où une telle limitation est prohibée par le droit camerounais.",
        },
      ],
    },
    {
      id: 'suspension',
      title: 'Suspension, résiliation et clôture du compte',
      blocks: [
        {
          kind: 'list',
          items: [
            "L'Utilisateur peut clôturer son compte à tout moment depuis l'application ou en écrivant à " + LEGAL_CONTACT.support + ", sans motif et sans frais. La clôture n'ouvre droit à aucun remboursement d'un Pass en cours.",
            "KamJob peut suspendre l'accès ou résilier le compte en cas de manquement aux présentes Conditions, après mise en demeure restée sans effet pendant huit (8) jours.",
            "La suspension peut être immédiate et sans mise en demeure préalable en cas d'urgence : fraude, offre frauduleuse, usurpation d'identité, atteinte à la sécurité de la Plateforme ou de ses Utilisateurs, contenu manifestement illicite, ou réquisition d'une autorité compétente.",
            "La résiliation entraîne la perte de l'accès au compte et aux fonctionnalités, y compris à un Pass en cours lorsqu'elle est prononcée pour manquement, sans indemnité ni remboursement.",
            "Le sort des données après clôture est régi par la Politique de confidentialité. Les Candidatures déjà transmises à des Employeurs demeurent entre leurs mains, KamJob ne pouvant les rappeler.",
          ],
        },
      ],
    },
    {
      id: 'modification',
      title: 'Modification des Conditions',
      blocks: [
        {
          kind: 'p',
          text: "KamJob peut modifier les présentes Conditions pour tenir compte de l'évolution du service, de la réglementation ou de la jurisprudence. La version en vigueur est celle publiée sur la Plateforme, avec sa date de mise à jour et son numéro de version.",
        },
        {
          kind: 'p',
          text: "Toute modification substantielle est portée à la connaissance des Utilisateurs par un moyen adapté (notification dans l'application ou courrier électronique) au moins quinze (15) jours avant son entrée en vigueur. La poursuite de l'utilisation de la Plateforme après cette date vaut acceptation ; à défaut d'accord, l'Utilisateur peut clôturer son compte sans frais. Les Pass en cours restent régis par la version des Conditions acceptée lors de leur souscription.",
        },
      ],
    },
    {
      id: 'litiges',
      title: 'Droit applicable, langue et règlement des litiges',
      blocks: [
        {
          kind: 'p',
          text: "Les présentes Conditions sont régies par le droit camerounais, en ce compris les Actes uniformes de l'OHADA applicables aux relations commerciales.",
        },
        {
          kind: 'p',
          text: `Préalablement à toute action, l'Utilisateur adresse sa réclamation à ${LEGAL_CONTACT.legal}. KamJob en accuse réception et répond dans un délai de quinze (15) jours ouvrés. Les parties s'efforcent de rechercher une solution amiable pendant un délai de trente (30) jours à compter de la réclamation, le cas échéant par voie de médiation. L'Utilisateur consommateur conserve la faculté de saisir les services compétents du ministère en charge du commerce ou une association de défense des consommateurs, conformément à la loi n° 2011/012 du 6 mai 2011.`,
        },
        {
          kind: 'p',
          text: "À défaut de règlement amiable, le litige est porté devant les juridictions camerounaises compétentes selon les règles de droit commun, les dispositions d'ordre public protectrices du consommateur, notamment quant à la juridiction compétente, demeurant réservées.",
        },
        {
          kind: 'p',
          text: "Les Conditions sont rédigées en français. La version anglaise est fournie à titre d'information ; en cas de divergence d'interprétation entre les deux versions, la version française prévaut.",
        },
      ],
    },
    {
      id: 'general',
      title: 'Dispositions générales',
      blocks: [
        {
          kind: 'list',
          items: [
            "Nullité partielle : si une stipulation est jugée nulle, illicite ou inopposable, elle est réputée non écrite ou réduite dans la mesure strictement nécessaire, sans affecter la validité des autres stipulations.",
            "Non-renonciation : le fait pour KamJob de ne pas se prévaloir d'un manquement ne vaut pas renonciation à s'en prévaloir ultérieurement.",
            "Cession : KamJob peut céder ou transférer le présent contrat dans le cadre d'une réorganisation, d'une fusion ou d'une cession d'activité, sous réserve du maintien des droits des Utilisateurs. L'Utilisateur ne peut céder ses droits sans accord écrit préalable.",
            "Intégralité : les présentes Conditions et la Politique de confidentialité forment l'intégralité de l'accord des parties relatif à l'utilisation de la Plateforme.",
            "Preuve : les registres, journaux et traces informatiques conservés par KamJob dans des conditions raisonnables de sécurité constituent, entre les parties, un mode de preuve admissible des connexions, swipes, envois de candidatures et paiements.",
            "Notifications : sauf disposition contraire, les notifications sont valablement adressées à l'adresse électronique associée au compte de l'Utilisateur et, pour KamJob, aux adresses figurant à l'article « Identification de l'éditeur ».",
          ],
        },
      ],
    },
    {
      id: 'contact',
      title: 'Contact et réclamations',
      blocks: [
        {
          kind: 'defs',
          items: [
            { term: 'Questions juridiques et réclamations', text: LEGAL_CONTACT.legal },
            { term: "Assistance, incidents de paiement, signalement d'offre suspecte", text: LEGAL_CONTACT.support },
            { term: 'Données personnelles et exercice des droits', text: LEGAL_CONTACT.privacy },
          ],
        },
      ],
    },
  ],
}

const privacyFr: LegalDoc = {
  label: 'Politique de confidentialité',
  title: 'Politique de confidentialité',
  subtitle:
    "Votre CV est un document intime. Cette politique dit exactement quelles données nous traitons, pourquoi, à qui elles sont transmises, combien de temps nous les gardons et comment vous en reprenez le contrôle.",
  updated: UPDATED_FR,
  version: VERSION,
  note: "La présente politique est rédigée en français, version de référence. La traduction anglaise est fournie pour la commodité de l'Utilisateur.",
  sections: [
    {
      id: 'engagement',
      title: 'Notre engagement',
      blocks: [
        {
          kind: 'p',
          text: "KamJob traite les données de personnes qui cherchent du travail. Ces données — un curriculum vitæ, une lettre de motivation, un parcours, parfois une situation de famille — sont sensibles par leurs conséquences : elles disent où l'on en est de sa vie professionnelle. Nous les traitons en conséquence.",
        },
        {
          kind: 'warn',
          text: "Nous ne vendons pas, ne louons pas et n'échangeons pas vos données. Votre CV n'est jamais versé dans une base publique, ni communiqué à un employeur que vous n'avez pas choisi, ni utilisé à des fins publicitaires par un tiers.",
        },
        {
          kind: 'p',
          text: "La présente politique s'applique au site vitrine kamjob.com, à l'application destinée aux candidats et au portail employeur. Elle complète les Conditions Générales d'Utilisation et de Vente dont elle fait partie intégrante.",
        },
      ],
    },
    {
      id: 'responsable',
      title: 'Responsable du traitement et point de contact',
      blocks: [
        {
          kind: 'defs',
          items: [
            { term: 'Responsable du traitement', text: `KamJob — ${TBD.fr} (dénomination sociale complète), siège social : ${TBD.fr}, Cameroun` },
            { term: 'RCCM / NIU', text: TBD.fr },
            { term: 'Point de contact « données personnelles »', text: LEGAL_CONTACT.privacy },
            { term: 'Courrier postal', text: `${TBD.fr}, Cameroun — mention « Protection des données »` },
          ],
        },
        {
          kind: 'p',
          text: "Lorsque vous transmettez une candidature, l'Employeur destinataire devient à son tour responsable du traitement, de manière autonome, pour les données qu'il reçoit et l'usage qu'il en fait.",
        },
      ],
    },
    {
      id: 'cadre',
      title: 'Cadre juridique applicable',
      blocks: [
        {
          kind: 'p',
          text: "Le traitement de vos données s'inscrit dans le cadre juridique camerounais, notamment :",
        },
        {
          kind: 'list',
          items: [
            "la loi n° 2010/012 du 21 décembre 2010 relative à la cybersécurité et à la cybercriminalité au Cameroun, qui impose la confidentialité et la protection des données traitées par voie électronique et sanctionne les atteintes aux systèmes d'information ;",
            "la loi n° 2010/013 du 21 décembre 2010 régissant les communications électroniques, modifiée par la loi n° 2015/006 du 20 avril 2015, notamment quant au secret des communications et à la conservation des données techniques ;",
            "la loi n° 2010/021 du 21 décembre 2010 régissant le commerce électronique, quant à l'information du client et à la loyauté du service ;",
            "le Code pénal (loi n° 2016/007 du 12 juillet 2016), qui réprime la violation de correspondance, l'atteinte à la vie privée et la divulgation d'informations confidentielles ;",
            "la loi n° 2011/012 du 6 mai 2011 portant protection du consommateur, quant à votre droit d'être informé de manière claire et loyale.",
          ],
        },
        {
          kind: 'p',
          text: "Dans l'attente de l'entrée en vigueur d'une loi camerounaise spécifiquement consacrée à la protection des données à caractère personnel, KamJob applique volontairement les principes de la Convention de l'Union africaine sur la cybersécurité et la protection des données à caractère personnel adoptée à Malabo le 27 juin 2014 : licéité, finalité déterminée, minimisation, exactitude, limitation de la conservation, sécurité, transparence et droits des personnes concernées. Ces principes ne sont pas de simples déclarations : ils sont opposables à KamJob au titre du présent engagement contractuel.",
        },
        {
          kind: 'p',
          text: "L'Agence Nationale des Technologies de l'Information et de la Communication (ANTIC) est l'autorité de régulation compétente en matière de sécurité des systèmes d'information au Cameroun.",
        },
      ],
    },
    {
      id: 'collecte',
      title: 'Données que nous traitons',
      blocks: [
        {
          kind: 'defs',
          items: [
            {
              term: "Données d'identité et de contact",
              text: "nom, prénoms, date de naissance le cas échéant, adresse électronique, numéro de téléphone, ville et pays de résidence.",
            },
            {
              term: 'Données professionnelles',
              text: "curriculum vitæ et lettre de motivation, diplômes et niveau d'études, expériences, compétences, langues, domaine d'activité et prétentions éventuelles. Ces documents peuvent contenir des informations que vous y avez vous-même insérées ; nous vous invitons à n'y faire figurer que ce qui est utile à votre candidature.",
            },
            {
              term: 'Données de compte',
              text: "identifiant, empreinte chiffrée du mot de passe (jamais le mot de passe en clair), préférences, langue d'affichage, historique des consentements.",
            },
            {
              term: 'Données de candidature',
              text: "offres consultées, swipes, candidatures envoyées, dates et statuts, accusés de transmission.",
            },
            {
              term: 'Données techniques',
              text: "adresse IP, type de terminal et de navigateur, système d'exploitation, journaux de connexion et d'erreur, identifiant de notification. Elles servent la sécurité, le diagnostic et la lutte contre la fraude.",
            },
            {
              term: 'Données de paiement',
              text: "numéro Mobile Money utilisé, référence de la transaction, montant, date et statut. Nous ne collectons ni ne conservons aucun code secret ou code PIN.",
            },
            {
              term: 'Données produites par les traitements IA',
              text: "scores de compatibilité, points forts et lacunes identifiés, versions de documents adaptées. Elles dérivent de vos documents et suivent leur sort.",
            },
            {
              term: 'Échanges avec le support',
              text: "messages, pièces jointes et historique des demandes.",
            },
          ],
        },
        {
          kind: 'p',
          text: "Nous ne recherchons pas et ne demandons pas de données sensibles au sens des principes rappelés ci-dessus (santé, appartenance syndicale, opinions politiques, convictions religieuses, orientation sexuelle, appartenance ethnique). Si votre CV en contient malgré tout, elles sont traitées comme le reste du document et transmises telles quelles aux Employeurs que vous choisissez : nous vous recommandons vivement de les en retirer.",
        },
      ],
    },
    {
      id: 'finalites',
      title: 'Finalités et bases juridiques',
      blocks: [
        {
          kind: 'table',
          caption: 'Pourquoi nous traitons vos données et sur quel fondement',
          head: ['Finalité', 'Base juridique', 'Données concernées'],
          rows: [
            [
              'Créer et gérer votre compte, vous authentifier',
              "Exécution du contrat (les présentes Conditions)",
              "Identité, contact, données de compte",
            ],
            [
              "Vous présenter des offres pertinentes et transmettre vos candidatures aux employeurs que vous choisissez",
              "Exécution du contrat et instruction expresse donnée par votre swipe",
              "Profil, CV et lettre, données de candidature",
            ],
            [
              "Fournir les fonctionnalités d'IA (score de compatibilité, adaptation des documents, bilan automatisé)",
              "Exécution du Pass souscrit et votre consentement à l'activation de la fonctionnalité",
              "CV, lettre, contenu de l'offre analysée",
            ],
            [
              'Encaisser un Pass, établir les justificatifs et tenir la comptabilité',
              "Exécution du contrat et obligation légale (droit comptable OHADA, obligations fiscales)",
              'Données de paiement, identité',
            ],
            [
              "Assurer la sécurité du service, prévenir et détecter la fraude, les faux comptes et les offres frauduleuses",
              "Intérêt légitime de KamJob et de ses utilisateurs, ainsi que nos obligations en matière de cybersécurité",
              'Données techniques, journaux, données de compte',
            ],
            [
              "Vous notifier les événements utiles (candidature envoyée, expiration d'un Pass, réponse du support)",
              'Exécution du contrat',
              "Contact, identifiant de notification",
            ],
            [
              "Vous adresser des informations sur les nouveautés du service",
              'Votre consentement, retirable à tout moment',
              "Adresse électronique, préférences",
            ],
            [
              "Répondre à une réquisition légale et défendre nos droits en justice",
              'Obligation légale et intérêt légitime',
              'Données strictement nécessaires',
            ],
          ],
        },
        {
          kind: 'p',
          text: "Nous ne réutilisons pas vos données pour une finalité nouvelle incompatible avec celles ci-dessus sans vous en informer et, lorsque la base juridique l'exige, sans recueillir votre consentement.",
        },
      ],
    },
    {
      id: 'partage',
      title: 'À qui vos données sont transmises',
      blocks: [
        {
          kind: 'p',
          text: "Les Employeurs que vous choisissez. Un swipe vers la droite déclenche l'envoi de votre CV, de votre lettre et des informations de profil nécessaires à l'adresse de recrutement indiquée dans l'offre. Cet envoi résulte de votre seule décision.",
        },
        {
          kind: 'note',
          text: "Un courrier électronique délivré ne peut être rappelé : une candidature transmise ne peut plus être retirée par KamJob. Supprimer votre compte n'efface pas les documents déjà reçus par un Employeur. Adressez-vous alors directement à lui, en invoquant le caractère limité de la finalité pour laquelle il les a reçus.",
        },
        {
          kind: 'p',
          text: "Nos prestataires techniques (sous-traitants), qui agissent sur nos seules instructions, pour les catégories de services suivantes :",
        },
        {
          kind: 'list',
          items: [
            "hébergement et sauvegarde de la Plateforme et des documents ;",
            "acheminement des courriers électroniques (candidatures, notifications, confirmations) ;",
            "encaissement par Mobile Money, par l'intermédiaire des opérateurs de monnaie électronique et de leurs partenaires agréés ;",
            "traitements d'IA nécessaires à l'analyse de compatibilité et à l'adaptation des documents ;",
            "envoi de notifications, supervision technique et assistance aux utilisateurs.",
          ],
        },
        {
          kind: 'p',
          text: "Chaque prestataire est retenu au regard de son niveau de sécurité et lié par des engagements écrits de confidentialité, de sécurité, d'utilisation limitée aux instructions reçues et de restitution ou de suppression des données en fin de contrat. Nous ne leur confions que les données nécessaires à leur mission.",
        },
        {
          kind: 'p',
          text: "Les autorités judiciaires ou administratives, uniquement sur le fondement d'une réquisition ou d'une décision régulière. Nous en vérifions la validité, nous limitons la communication aux données strictement visées et nous vous en informons lorsque la loi ne nous l'interdit pas. Certaines données techniques de connexion sont conservées au titre des obligations résultant de la législation sur les communications électroniques et la cybercriminalité.",
        },
        {
          kind: 'p',
          text: "En cas de réorganisation, de fusion ou de cession d'activité, les données peuvent être transférées au cessionnaire, à charge pour lui de reprendre les présents engagements ; vous en serez informé et pourrez clôturer votre compte.",
        },
      ],
    },
    {
      id: 'ia',
      title: "Traitements assistés par intelligence artificielle",
      blocks: [
        {
          kind: 'p',
          text: "Lorsque vous activez une fonctionnalité d'IA, le contenu de votre CV, de votre lettre et de l'offre analysée est transmis à un prestataire de traitement afin de produire un score de compatibilité et, le cas échéant, une version adaptée de vos documents.",
        },
        {
          kind: 'list',
          items: [
            "Ces traitements ne s'exécutent qu'à votre initiative : le service reste utilisable sans eux, la candidature gratuite n'en dépendant pas.",
            "Les scores et commentaires produits sont indicatifs. Ils ne constituent ni une évaluation professionnelle, ni une décision : aucune candidature n'est écartée automatiquement par KamJob sur ce fondement, et aucun traitement entièrement automatisé ne produit à votre égard d'effet juridique.",
            "KamJob s'engage à ne retenir que des prestataires souscrivant à ne traiter vos documents que pour l'exécution de la demande et à ne pas les utiliser pour l'entraînement de leurs modèles.",
            "Les documents produits par l'IA vous appartiennent ; vous restez responsable de leur exactitude avant envoi et vous devez les relire.",
          ],
        },
      ],
    },
    {
      id: 'conservation',
      title: 'Durées de conservation',
      blocks: [
        {
          kind: 'table',
          caption: 'Combien de temps nous conservons chaque catégorie de données',
          head: ['Données', 'Durée', 'Fondement'],
          rows: [
            ['Compte, profil, CV et lettre', "Toute la durée de vie du compte", "Exécution du contrat"],
            [
              'Après clôture du compte',
              "30 jours (délai de récupération), puis suppression ou anonymisation",
              "Réversibilité d'une clôture accidentelle",
            ],
            [
              "Historique des candidatures",
              "Durée du compte, puis 12 mois",
              "Preuve des envois effectués et suivi des réclamations",
            ],
            [
              'Justificatifs de paiement et pièces comptables',
              '10 ans',
              "Droit comptable OHADA et obligations fiscales",
            ],
            [
              "Journaux de connexion et de sécurité",
              '12 mois',
              "Sécurité, preuve et obligations en matière de communications électroniques",
            ],
            [
              'Échanges avec le support',
              '3 ans à compter du dernier échange',
              "Suivi des réclamations et prescription",
            ],
            [
              "Preuves de consentement et de retrait",
              '3 ans à compter du retrait',
              "Capacité à démontrer le respect de vos choix",
            ],
          ],
        },
        {
          kind: 'p',
          text: "À l'expiration de ces durées, les données sont supprimées ou anonymisées de manière irréversible. Les données déjà reçues par un Employeur sont conservées sous sa seule responsabilité et selon sa propre politique.",
        },
      ],
    },
    {
      id: 'securite',
      title: 'Sécurité',
      blocks: [
        {
          kind: 'p',
          text: "Nous mettons en œuvre des mesures techniques et organisationnelles proportionnées aux risques, notamment :",
        },
        {
          kind: 'list',
          items: [
            "chiffrement des échanges en transit (TLS) et chiffrement des documents stockés ;",
            "mots de passe conservés uniquement sous forme d'empreintes calculées par une fonction de dérivation robuste ;",
            "accès interne restreint au besoin d'en connaître, nominatif et journalisé, avec authentification renforcée pour les accès d'administration ;",
            "cloisonnement des environnements, sauvegardes régulières et procédures de restauration testées ;",
            "revue de sécurité des prestataires et correction diligente des vulnérabilités identifiées ;",
            "sensibilisation des personnes intervenant sur les données et engagements de confidentialité.",
          ],
        },
        {
          kind: 'p',
          text: "En cas de violation de données susceptible de porter atteinte à vos droits, nous notifions l'incident à l'ANTIC et informons les personnes concernées dans les meilleurs délais, et au plus tard soixante-douze (72) heures après en avoir pris connaissance, en indiquant la nature de l'incident, ses conséquences probables et les mesures prises.",
        },
        {
          kind: 'note',
          text: "Aucun système n'est infaillible. Votre vigilance fait partie du dispositif : choisissez un mot de passe unique, ne le communiquez à personne, méfiez-vous des messages qui vous demandent vos identifiants et déconnectez-vous des terminaux partagés.",
        },
      ],
    },
    {
      id: 'droits',
      title: 'Vos droits et comment les exercer',
      blocks: [
        {
          kind: 'p',
          text: "Vous disposez, au titre du cadre juridique rappelé ci-dessus et des engagements contractuels de KamJob, des droits suivants :",
        },
        {
          kind: 'defs',
          items: [
            { term: 'Accès', text: "savoir quelles données nous détenons et en obtenir une copie." },
            { term: 'Rectification', text: "corriger une information inexacte ou incomplète." },
            { term: 'Suppression', text: "faire effacer vos données et clôturer votre compte, sous réserve des conservations légalement obligatoires." },
            { term: 'Opposition', text: "vous opposer à un traitement fondé sur notre intérêt légitime, ainsi qu'à toute prospection." },
            { term: 'Retrait du consentement', text: "revenir à tout moment sur un consentement donné, sans que cela remette en cause la licéité des traitements antérieurs." },
            { term: 'Portabilité', text: "récupérer vos documents et données de profil dans un format lisible et couramment utilisé." },
            { term: 'Limitation', text: "demander le gel d'un traitement le temps d'examiner une contestation." },
          ],
        },
        {
          kind: 'p',
          text: `Ces droits s'exercent directement depuis votre compte pour la plupart des données, ou par demande adressée à ${LEGAL_CONTACT.privacy}. Nous pouvons vous demander un élément justifiant de votre identité, à seule fin d'éviter de communiquer vos données à un tiers. Nous répondons gratuitement dans un délai de trente (30) jours, prorogeable une fois pour les demandes complexes, la prorogation étant motivée. Les demandes manifestement abusives ou répétitives peuvent être refusées de manière motivée.`,
        },
        {
          kind: 'p',
          text: "Deux limites doivent être connues : certaines données doivent être conservées malgré votre demande (pièces comptables, journaux de sécurité, éléments nécessaires à la défense de nos droits), et les candidatures déjà transmises à un Employeur ne peuvent être retirées de sa messagerie par KamJob.",
        },
        {
          kind: 'p',
          text: "Si notre réponse ne vous satisfait pas, vous pouvez saisir l'ANTIC ou la juridiction camerounaise compétente. Nous vous invitons à nous écrire d'abord : la plupart des demandes se règlent en quelques jours.",
        },
      ],
    },
    {
      id: 'cookies',
      title: 'Cookies et stockage local',
      blocks: [
        {
          kind: 'p',
          text: "Le site vitrine kamjob.com n'utilise aucun cookie publicitaire, aucun traceur de réseau social et aucun outil de mesure d'audience. Il enregistre uniquement votre choix de langue dans le stockage local de votre navigateur, afin de vous le restituer lors d'une prochaine visite. Cette information reste sur votre terminal et ne nous est pas transmise.",
        },
        {
          kind: 'p',
          text: "L'application utilise des cookies ou jetons strictement nécessaires à l'authentification, au maintien de la session et à la sécurité : ils ne peuvent être désactivés sans empêcher le fonctionnement du service. Vous pouvez à tout moment effacer ces données depuis les réglages de votre navigateur ou de votre terminal.",
        },
        {
          kind: 'p',
          text: "Si un outil de mesure d'audience ou de personnalisation devait être introduit, votre consentement préalable serait recueilli au moyen d'un dispositif dédié, avec la faculté de le refuser sans dégradation du service.",
        },
      ],
    },
    {
      id: 'transferts',
      title: 'Transferts hors du Cameroun',
      blocks: [
        {
          kind: 'p',
          text: "Certains de nos prestataires (hébergement, messagerie, traitements d'IA) peuvent être établis ou disposer d'infrastructures hors du Cameroun. Vos données peuvent donc être hébergées ou traitées à l'étranger.",
        },
        {
          kind: 'p',
          text: "Dans cette hypothèse, nous encadrons le transfert par des stipulations contractuelles imposant la confidentialité, la sécurité, l'utilisation limitée à nos instructions et la suppression en fin de contrat, nous privilégions les prestataires offrant un niveau de protection reconnu, et nous limitons les données transférées au strict nécessaire. Un Employeur destinataire d'une candidature peut également être établi hors du Cameroun : votre swipe vaut alors décision de lui transmettre votre dossier.",
        },
      ],
    },
    {
      id: 'mineurs',
      title: 'Mineurs',
      blocks: [
        {
          kind: 'p',
          text: "La Plateforme n'est pas destinée aux enfants n'ayant pas atteint l'âge minimum d'admission à l'emploi fixé par le Code du travail camerounais. Le mineur qui s'inscrit doit avoir l'autorisation de son représentant légal, laquelle est requise en toute hypothèse pour souscrire un Pass payant.",
        },
        {
          kind: 'p',
          text: `Si vous constatez qu'un enfant s'est inscrit sans cette autorisation, écrivez-nous à ${LEGAL_CONTACT.privacy} : le compte sera fermé et les données supprimées sans délai.`,
        },
      ],
    },
    {
      id: 'modifications',
      title: 'Modifications de la présente politique',
      blocks: [
        {
          kind: 'p',
          text: "La présente politique peut évoluer avec le service ou la réglementation. La version applicable est celle publiée ici, identifiée par sa date de mise à jour et son numéro de version.",
        },
        {
          kind: 'p',
          text: "Toute modification substantielle — notamment une nouvelle catégorie de destinataires, une finalité nouvelle ou un allongement des durées de conservation — vous est notifiée au moins quinze (15) jours avant son entrée en vigueur, et votre consentement est recueilli lorsqu'il est requis.",
        },
      ],
    },
    {
      id: 'contact',
      title: 'Nous écrire',
      blocks: [
        {
          kind: 'defs',
          items: [
            { term: 'Données personnelles et exercice des droits', text: LEGAL_CONTACT.privacy },
            { term: 'Questions juridiques et réclamations', text: LEGAL_CONTACT.legal },
            { term: "Assistance et signalement d'un abus", text: LEGAL_CONTACT.support },
          ],
        },
        {
          kind: 'p',
          text: "Nous nous engageons à répondre dans un langage clair, sans jargon inutile, et à motiver un refus lorsqu'il y a lieu.",
        },
      ],
    },
  ],
}

// ── English ──────────────────────────────────────────────────────────────────

const termsEn: LegalDoc = {
  label: 'Terms & Conditions',
  title: 'Terms and Conditions of Use and Sale',
  subtitle:
    "The contract between us. It sets out what KamJob does, what KamJob does not do, what the service costs and what happens if we disagree.",
  updated: UPDATED_EN,
  version: VERSION,
  note: "These Terms are drafted in French, the authoritative language of the contract. This English version is a courtesy translation provided for the User's convenience only.",
  sections: [
    {
      id: 'objet',
      title: 'Purpose and acceptance',
      blocks: [
        {
          kind: 'p',
          text: "These Terms and Conditions of Use and Sale (the “Terms”) govern access to and use of the KamJob platform, whether the marketing website, the candidate application or the employer portal (together, the “Platform”).",
        },
        {
          kind: 'p',
          text: "They are entered into between KamJob, publisher of the Platform (the “Publisher”, “we”), and any person who accesses or uses the Platform (the “User”, “you”). In accordance with Law No. 2010/021 of 21 December 2010 governing electronic commerce in Cameroon, they are permanently available free of charge and may be printed or saved on a durable medium.",
        },
        {
          kind: 'p',
          text: "Creating an account, browsing offers, sending an application or purchasing a Premium Pass constitutes full acceptance of the Terms in the version in force on the date of the act concerned. That acceptance is recorded electronically, a method whose evidential value is recognised by the aforementioned Law No. 2010/021.",
        },
        {
          kind: 'note',
          text: "If you do not accept these Terms, you must refrain from using the Platform: no use is permitted outside of their acceptance.",
        },
      ],
    },
    {
      id: 'editeur',
      title: 'Publisher identification',
      blocks: [
        {
          kind: 'p',
          text: "Pursuant to Law No. 2010/021 of 21 December 2010 governing electronic commerce in Cameroon, the Publisher is identified as follows:",
        },
        {
          kind: 'defs',
          items: [
            { term: 'Name', text: `KamJob — ${TBD.en} (full corporate name)` },
            { term: 'Legal form and share capital', text: TBD.en },
            { term: 'Registered office', text: `${TBD.en}, Cameroon` },
            { term: 'Trade and Personal Property Credit Register (RCCM)', text: TBD.en },
            { term: 'Unique Identification Number (NIU)', text: TBD.en },
            { term: 'Legal representative', text: TBD.en },
            { term: 'Telephone', text: TBD.en },
            {
              term: 'Email addresses',
              text: `${LEGAL_CONTACT.legal} (legal questions and complaints) · ${LEGAL_CONTACT.support} (support, reporting a suspicious offer) · ${LEGAL_CONTACT.privacy} (personal data)`,
            },
            { term: 'Platform host', text: `${TBD.en} (name, address and country of hosting)` },
          ],
        },
        {
          kind: 'p',
          text: "The Platform operates under Cameroonian law and, as regards electronic communications and cybersecurity, within the framework set by Law No. 2010/013 of 21 December 2010 governing electronic communications (as amended by Law No. 2015/006 of 20 April 2015) and Law No. 2010/012 of 21 December 2010 on cybersecurity and cybercrime, under the supervision of the National Agency for Information and Communication Technologies (ANTIC) and the Telecommunications Regulatory Board (ART).",
        },
      ],
    },
    {
      id: 'definitions',
      title: 'Definitions',
      blocks: [
        {
          kind: 'defs',
          items: [
            {
              term: 'Candidate',
              text: "A natural person registered on the Platform in order to look for a job, an internship or an assignment.",
            },
            {
              term: 'Employer',
              text: "A natural or legal person who posts an Offer or receives Applications, acting on their own behalf or under a duly granted mandate.",
            },
            {
              term: 'Offer',
              text: "A listing posted on the Platform by an Employer, including where applicable its poster, the email address for receiving applications and an expiry date.",
            },
            {
              term: 'Swipe',
              text: "The User's gesture on an Offer. A swipe to the right constitutes an express, unambiguous and irrevocable instruction to send their Application to the Employer concerned.",
            },
            {
              term: 'Application',
              text: "The set of items sent to the Employer upon a right swipe: curriculum vitae, cover letter and the profile information needed to identify the Candidate.",
            },
            {
              term: 'Premium Pass',
              text: "A paid digital service, of fixed duration and immediate performance, giving access to software assistance features (compatibility analysis, document tailoring, automated report).",
            },
            {
              term: 'User Content',
              text: "Any item supplied by the User: documents, texts, images, profile information and application data.",
            },
            {
              term: 'AI',
              text: "Automated assistance processing carried out by the Platform or its providers to analyse an Offer and tailor User Content.",
            },
          ],
        },
      ],
    },
    {
      id: 'nature',
      title: 'Nature of the service: matching only, not employment or paid placement',
      blocks: [
        {
          kind: 'p',
          text: "KamJob provides a technical service connecting Candidates and Employers. KamJob is neither the employer, nor the agent, nor the guarantor, nor a party to the employment relationship. Any employment contract, internship agreement or assignment is concluded solely between the Candidate and the Employer, under Law No. 92/007 of 14 August 1992 establishing the Labour Code and its implementing texts.",
        },
        {
          kind: 'p',
          text: "KamJob does not operate as a fee-charging placement agency towards Candidates. Creating an account, browsing Offers, swiping and sending Applications are free and will remain so: no sum is charged to a Candidate for placement, for being introduced to an Employer or for being recruited. Premium Passes pay solely for software assistance tools and are in no way consideration for a promise, priority or guarantee of hiring.",
        },
        { kind: 'p', text: 'Accordingly, KamJob does not guarantee:' },
        {
          kind: 'list',
          items: [
            "that you will obtain a job, an internship, an interview or even a reply from an Employer;",
            "the accuracy, currency, lawfulness or seriousness of Offers, which are the sole responsibility of the Employer that posts them, KamJob being bound only to reasonable moderation and to the prompt removal of manifestly unlawful content reported to it;",
            "recruitment decisions, selection criteria or the employment conditions proposed by an Employer;",
            "the number, frequency or geographic and sectoral distribution of Offers available at any given time.",
          ],
        },
        {
          kind: 'warn',
          text: `No serious employer will ever ask you to pay to apply, to “reserve a position”, for a “file processing fee” or for compulsory prior training. Report any such request immediately to ${LEGAL_CONTACT.support}. Such conduct may amount to fraud under the Penal Code (Law No. 2016/007 of 12 July 2016) and, where committed by electronic means, to an offence under Law No. 2010/012 of 21 December 2010 on cybersecurity and cybercrime.`,
        },
      ],
    },
    {
      id: 'acces',
      title: 'Access, registration and capacity',
      blocks: [
        {
          kind: 'list',
          items: [
            "Registration is open to natural persons with the legal capacity to contract, from the minimum age of admission to employment set by the Cameroonian Labour Code.",
            "Since the age of civil majority in Cameroonian law is twenty-one (21), a User below that age declares that they act with the authorisation of their legal representative, in particular when purchasing a Premium Pass. KamJob may suspend access and refund a Pass bought without such authorisation.",
            "The User warrants that the information and documents they provide are accurate, truthful and up to date. Any misrepresentation as to identity, qualifications or experience is the User's sole responsibility towards Employers.",
            "Accounts are strictly personal. Opening several accounts for the same person, or assigning, lending or making an account available to a third party, is prohibited.",
            "The User keeps their credentials confidential and is answerable for every operation carried out from their account. They must notify KamJob without delay at " + LEGAL_CONTACT.support + " of any loss, disclosure or unauthorised use.",
            "Access to the Platform requires a compatible internet connection and device, at the User's own cost.",
          ],
        },
        {
          kind: 'p',
          text: "Impersonating a third party, fraudulently accessing an account and fraudulently remaining within an information system are punishable under Law No. 2010/012 of 21 December 2010 on cybersecurity and cybercrime, independently of the contractual measures set out in the “Suspension, termination and account closure” article.",
        },
      ],
    },
    {
      id: 'tarifs',
      title: 'Free applications and Premium Passes',
      blocks: [
        {
          kind: 'p',
          text: "Creating an account, building a profile, browsing Offers, swiping and sending unlimited Applications are free, for an unlimited period and without commitment.",
        },
        {
          kind: 'p',
          text: "Premium Passes are optional services. Their name, functional content, duration and price are displayed on the “Pricing” page and repeated on the payment screen before any confirmation, in accordance with the pre-contractual information duty under Law No. 2011/012 of 6 May 2011 on consumer protection in Cameroon. Prices are stated in CFA francs (XAF), inclusive of all taxes, with the value added tax applicable in Cameroon included where relevant.",
        },
        {
          kind: 'list',
          items: [
            "Each Pass is bought through a single payment and for a fixed duration running from its activation.",
            "There is no automatic renewal: on expiry the Pass simply ceases to have effect, with no rollover and no further debit.",
            "Later price changes have no effect on a Pass already purchased and still valid.",
            "Passes are not assignable, transferable or combinable between accounts.",
            "KamJob may change the functional content of the Passes, provided that a current Pass is not deprived of its substance; should that occur, the remedies in the “No withdrawal right and no refunds” article apply.",
          ],
        },
      ],
    },
    {
      id: 'paiement',
      title: 'Payment by Mobile Money',
      blocks: [
        {
          kind: 'p',
          text: "Passes are paid for by Mobile Money (in particular MTN Mobile Money and Orange Money). The User enters their number and then confirms the operation on their device with their operator. A payment order so confirmed is irrevocable.",
        },
        {
          kind: 'list',
          items: [
            "The payment operation is executed by the electronic money operator and its partner institution, within the CEMAC framework applicable to payment systems, instruments and services, in particular Regulation No. 02/18/CEMAC/UMAC/CM of 21 December 2018 on payment systems, instruments and incidents. KamJob is not a payment service provider.",
            "KamJob neither collects nor stores any secret code, PIN or electronic money account credential. Only the transaction reference, amount, date and number used are retained for accounting and evidential purposes.",
            "Any transfer fees charged by the operator remain payable by the User and are not refundable by KamJob.",
            "Incidents specific to the payment channel (wrong number entered by the User, insufficient balance, operator network unavailability, blocked electronic money account) fall within the relationship between the User and their operator.",
            "The Pass is activated upon receipt of payment confirmation. In the event of a technical delay, the User should contact " + LEGAL_CONTACT.support + " with the transaction reference.",
          ],
        },
        {
          kind: 'p',
          text: "An electronic payment record is made available to the User in their account. KamJob's computerised records and the operator's statements constitute, between the parties, admissible evidence of the operations carried out.",
        },
      ],
    },
    {
      id: 'remboursement',
      title: 'No withdrawal right and no refunds',
      blocks: [
        {
          kind: 'p',
          text: "A Premium Pass is a digital service performed immediately. By confirming payment, the User expressly requests immediate activation of the service, acknowledges that they benefit from it as from that activation, and accepts that the service is thereby fully supplied.",
        },
        {
          kind: 'warn',
          text: "Consequently, and in the absence of any statutory withdrawal right applicable to immediately performed digital services under Cameroonian law, every payment is firm and final: it gives rise to no refund, whether total or partial, and to no credit note, apart from the cases of failure attributable to KamJob listed below.",
        },
        { kind: 'p', text: 'No refund is due in particular for:' },
        {
          kind: 'list',
          items: [
            "the User changing their mind after the Pass has been activated;",
            "non-use, partial use or forgetting the Pass, as well as any days left unused on expiry;",
            "the absence of hiring, interview, reply or result, KamJob undertaking no obligation of result in employment matters;",
            "dissatisfaction with the content, style or relevance of the documents and scores produced by the AI, which are indicative by nature;",
            "the number, nature or location of the Offers available during the term of the Pass;",
            "deletion of the account by the User before the Pass expires;",
            "suspension or termination of the account for the User's breach of these Terms;",
            "transfer fees charged by the Mobile Money operator;",
            "access interruptions attributable to the User, their device, their connection, their operator or to force majeure.",
          ],
        },
        {
          kind: 'p',
          text: "This clause does not deprive the User of any mandatory statutory right, in particular under Law No. 2011/012 of 6 May 2011 on consumer protection in Cameroon. KamJob remains bound to deliver the paid service as described. Where a failure is attributable to KamJob, the following remedies apply:",
        },
        {
          kind: 'list',
          items: [
            "payment debited without the Pass being activated: immediate activation or, if that proves impossible, full refund of the amount received;",
            "double or erroneous debit: refund of the amount wrongly received;",
            "technical unavailability of the paid features, attributable to KamJob and lasting more than twenty-four (24) consecutive hours: extension of the Pass by at least the length of the interruption or, where extension is not possible, a pro rata refund for the unusable period;",
            "permanent removal, during the term of the Pass, of a feature that was its essential object: extension, replacement with an equivalent feature or a pro rata refund.",
          ],
        },
        {
          kind: 'p',
          text: `Any claim must be sent to ${LEGAL_CONTACT.support} within fifteen (15) days of the triggering event, stating the Mobile Money number used, the transaction reference, its date and its amount. KamJob will acknowledge receipt and reply within fifteen (15) business days. Refunds that are due are made through the same payment channel as the purchase, within thirty (30) days of the parties agreeing on their principle and amount.`,
        },
      ],
    },
    {
      id: 'obligations',
      title: "User obligations and prohibitions",
      blocks: [
        {
          kind: 'p',
          text: "The User undertakes to use the Platform fairly, in compliance with these Terms, public policy and Cameroonian law. It is prohibited in particular:",
        },
        {
          kind: 'list',
          items: [
            "to provide false information, produce a misleading or forged curriculum vitae, certificate or diploma, or usurp the identity, capacity or titles of a third party;",
            "to upload another person's personal documents without their authorisation;",
            "to post or transmit content that is unlawful, insulting, defamatory, hateful, discriminatory or obscene, or that infringes privacy or third-party intellectual property rights;",
            "to use the Platform for unsolicited canvassing, advertising, selling training or services, or for any purpose unrelated to seeking or offering employment;",
            "to extract, harvest, index, reproduce or reuse the Offers, profiles or databases of the Platform on a massive or automated basis, in particular by means of bots, scrapers or scripts;",
            "to circumvent, test or compromise security measures, to access or attempt to access areas, accounts or data the User is not entitled to, to introduce malicious code or to disrupt the service;",
            "to request payment from a Candidate on any ground connected with recruitment;",
            "to resell, sublicense or commercially exploit access to the Platform or the data it contains.",
          ],
        },
        {
          kind: 'p',
          text: "Beyond being contractual breaches, several of these behaviours constitute criminal offences, in particular under Law No. 2010/012 of 21 December 2010 on cybersecurity and cybercrime and under the Penal Code (Law No. 2016/007 of 12 July 2016). KamJob reserves the right to take appropriate legal action and to respond to requests from the competent authorities.",
        },
      ],
    },
    {
      id: 'employeurs',
      title: 'Specific undertakings of Employers',
      blocks: [
        {
          kind: 'p',
          text: 'By posting an Offer or receiving Applications, the Employer represents and warrants:',
        },
        {
          kind: 'list',
          items: [
            "that it is duly incorporated or registered and has authority to recruit for the position posted, or an express mandate to that effect;",
            "that the Offer corresponds to a genuine need, described accurately, without misleading or discriminatory content, in compliance with the Cameroonian Labour Code and the international labour conventions ratified by Cameroon;",
            "that the email address for receiving Applications is its own and that it keeps it confidential;",
            "that it will not request any payment, benefit or consideration from a Candidate in connection with recruitment;",
            "that it will use the data and documents received only to assess the application for the position concerned, to the exclusion of any other purpose, assignment, rental or resale, and will keep them for a limited and proportionate period;",
            "that it will preserve the confidentiality of the information received and respect the rights of data subjects over their data.",
          ],
        },
        {
          kind: 'p',
          text: "From the moment an Application is received, the Employer alone determines the purposes and means of processing the data received: it is an autonomous data controller and is accountable for what becomes of that data. KamJob may suspend or withdraw an Offer or close an employer account in the event of breach, without prejudice to any damages.",
        },
      ],
    },
    {
      id: 'propriete',
      title: 'Intellectual property and content',
      blocks: [
        {
          kind: 'p',
          text: "The Platform, its structure, code, interfaces, texts, graphic elements, design system and databases, as well as the KamJob name and logo, are protected by Law No. 2000/011 of 19 December 2000 on copyright and neighbouring rights, and by the trade mark provisions applicable within the African Intellectual Property Organisation (OAPI, Bangui Agreement). They remain the exclusive property of the Publisher or its licensors.",
        },
        {
          kind: 'p',
          text: "The User retains full ownership of their User Content. They grant KamJob, for the sole duration necessary to provide the service and worldwide, a non-exclusive, royalty-free and non-transferable licence — save to technical providers acting on KamJob's instructions — to host, reproduce, format, technically adapt and transmit that content solely to the Employers chosen by the User, and to have it tailored by the AI where the User so requests.",
        },
        {
          kind: 'p',
          text: "That licence ends when the content is deleted or the account is closed, subject to transmissions already made to Employers, which are irreversible by nature, and to the statutory retention periods described in the Privacy Policy. KamJob is granted no right to exploit User Content commercially outside the service: your documents are neither sold, nor rented, nor published in any public database.",
        },
        {
          kind: 'p',
          text: "Without prior written authorisation, it is prohibited to reproduce, represent, adapt, extract or substantially reuse the Platform and its databases, to decompile or reverse engineer it beyond statutory exceptions, or to use the KamJob mark, logo or name in a way that creates confusion or suggests a partnership that does not exist.",
        },
      ],
    },
    {
      id: 'donnees',
      title: 'Personal data',
      blocks: [
        {
          kind: 'p',
          text: "The processing of Users' personal data is described in detail in the Privacy Policy, which forms an integral part of these Terms.",
        },
        {
          kind: 'p',
          text: "The User should note in particular that a right swipe triggers the sending of their curriculum vitae and cover letter to the Employer concerned by email, and that this sending is irreversible: a delivered email cannot be recalled. KamJob does not sell, rent or exchange Users' data with any third party for commercial purposes.",
        },
      ],
    },
    {
      id: 'disponibilite',
      title: 'Service availability and force majeure',
      blocks: [
        {
          kind: 'p',
          text: "KamJob owes a duty of best efforts as regards the availability and proper functioning of the Platform. The service may be interrupted for maintenance, updates, fixes or improvements; KamJob endeavours to keep such interruptions short and, where a significant interruption is planned, to inform Users.",
        },
        {
          kind: 'p',
          text: "KamJob incurs no liability in the event of force majeure, meaning any event beyond its reasonable control making performance impossible, including: interruption or degradation of electronic communications networks or of the electricity supply, failure of a Mobile Money operator, a host or an email provider, cyberattack, fire, flood, epidemic, decision of an administrative or judicial authority, general strike or serious public disorder.",
        },
        {
          kind: 'p',
          text: "Should the force majeure event continue for more than thirty (30) days, either party may terminate the contractual relationship by simple notice, with no compensation on either side, the remedies relating to current Passes remaining applicable.",
        },
      ],
    },
    {
      id: 'responsabilite',
      title: 'Liability',
      blocks: [
        {
          kind: 'p',
          text: "KamJob is answerable for direct damage resulting from a breach of its own obligations. It is not answerable, however, for:",
        },
        {
          kind: 'list',
          items: [
            "the conduct, statements, solvency or decisions of Employers and Candidates;",
            "the content, truthfulness or lawfulness of Offers and User Content, subject to its duty to promptly remove manifestly unlawful content reported to it;",
            "the formation, performance or termination of an employment or internship relationship;",
            "an Employer's use of the documents it has received, for which it is an autonomous data controller;",
            "failures of third-party services essential to the provision of the service (Mobile Money operators, email providers, networks, the User's devices);",
            "the consequences of inaccurate information supplied by the User or of negligence in safeguarding their credentials.",
          ],
        },
        {
          kind: 'p',
          text: "For free services, no compensation is due, that gratuity being the economic consideration for the absence of warranty. For paid services, and provided liability is established, KamJob's total compensation on all grounds combined may not exceed the amounts actually paid by the User during the twelve (12) months preceding the triggering event.",
        },
        {
          kind: 'note',
          text: "Nothing in these Terms is intended to or does exclude or limit KamJob's liability in the event of wilful misconduct, gross negligence, harm to persons, or in any other case where such a limitation is prohibited by Cameroonian law.",
        },
      ],
    },
    {
      id: 'suspension',
      title: 'Suspension, termination and account closure',
      blocks: [
        {
          kind: 'list',
          items: [
            "The User may close their account at any time from the application or by writing to " + LEGAL_CONTACT.support + ", without giving reasons and free of charge. Closure gives rise to no refund of a current Pass.",
            "KamJob may suspend access or terminate the account in the event of breach of these Terms, after a formal notice that has remained without effect for eight (8) days.",
            "Suspension may be immediate and without prior notice in urgent cases: fraud, fraudulent offer, identity theft, threat to the security of the Platform or its Users, manifestly unlawful content, or a request from a competent authority.",
            "Termination entails loss of access to the account and its features, including a current Pass where termination is pronounced for breach, without compensation or refund.",
            "What happens to data after closure is governed by the Privacy Policy. Applications already sent to Employers remain in their hands, KamJob having no power to recall them.",
          ],
        },
      ],
    },
    {
      id: 'modification',
      title: 'Amendments to the Terms',
      blocks: [
        {
          kind: 'p',
          text: "KamJob may amend these Terms to reflect changes in the service, in regulations or in case law. The version in force is the one published on the Platform, with its update date and version number.",
        },
        {
          kind: 'p',
          text: "Any substantial amendment is brought to Users' attention by an appropriate means (in-app notification or email) at least fifteen (15) days before it takes effect. Continued use of the Platform after that date constitutes acceptance; failing agreement, the User may close their account free of charge. Current Passes remain governed by the version of the Terms accepted when they were purchased.",
        },
      ],
    },
    {
      id: 'litiges',
      title: 'Governing law, language and dispute resolution',
      blocks: [
        {
          kind: 'p',
          text: "These Terms are governed by Cameroonian law, including the OHADA Uniform Acts applicable to commercial relations.",
        },
        {
          kind: 'p',
          text: `Before bringing any action, the User must send their complaint to ${LEGAL_CONTACT.legal}. KamJob acknowledges receipt and replies within fifteen (15) business days. The parties shall endeavour to reach an amicable solution within thirty (30) days of the complaint, through mediation where appropriate. A consumer User remains free to refer the matter to the competent services of the ministry in charge of trade or to a consumer protection association, in accordance with Law No. 2011/012 of 6 May 2011.`,
        },
        {
          kind: 'p',
          text: "Failing amicable settlement, the dispute shall be brought before the competent Cameroonian courts under the ordinary rules of jurisdiction, the mandatory consumer-protection provisions, in particular as to the competent court, remaining reserved.",
        },
        {
          kind: 'p',
          text: "These Terms are drafted in French. The English version is provided for information only; in the event of any discrepancy in interpretation between the two versions, the French version prevails.",
        },
      ],
    },
    {
      id: 'general',
      title: 'General provisions',
      blocks: [
        {
          kind: 'list',
          items: [
            "Severability: if any provision is held void, unlawful or unenforceable, it shall be deemed unwritten or reduced to the extent strictly necessary, without affecting the validity of the remaining provisions.",
            "No waiver: KamJob's failure to invoke a breach does not amount to a waiver of its right to invoke it later.",
            "Assignment: KamJob may assign or transfer this contract in the context of a reorganisation, merger or business transfer, provided Users' rights are preserved. The User may not assign their rights without prior written consent.",
            "Entire agreement: these Terms and the Privacy Policy constitute the entire agreement between the parties regarding use of the Platform.",
            "Evidence: the records, logs and computer traces kept by KamJob under reasonable security conditions constitute, between the parties, admissible evidence of connections, swipes, applications sent and payments made.",
            "Notices: unless otherwise stated, notices are validly sent to the email address associated with the User's account and, for KamJob, to the addresses listed in the “Publisher identification” article.",
          ],
        },
      ],
    },
    {
      id: 'contact',
      title: 'Contact and complaints',
      blocks: [
        {
          kind: 'defs',
          items: [
            { term: 'Legal questions and complaints', text: LEGAL_CONTACT.legal },
            { term: 'Support, payment incidents, reporting a suspicious offer', text: LEGAL_CONTACT.support },
            { term: 'Personal data and exercise of rights', text: LEGAL_CONTACT.privacy },
          ],
        },
      ],
    },
  ],
}

const privacyEn: LegalDoc = {
  label: 'Privacy Policy',
  title: 'Privacy Policy',
  subtitle:
    "A CV is an intimate document. This policy states exactly which data we process, why, who it is sent to, how long we keep it and how you take back control of it.",
  updated: UPDATED_EN,
  version: VERSION,
  note: "This policy is drafted in French, which is the authoritative version. The English translation is provided for the User's convenience.",
  sections: [
    {
      id: 'engagement',
      title: 'Our commitment',
      blocks: [
        {
          kind: 'p',
          text: "KamJob processes the data of people looking for work. That data — a curriculum vitae, a cover letter, a career path, sometimes a family situation — is sensitive because of its consequences: it says where someone stands in their working life. We treat it accordingly.",
        },
        {
          kind: 'warn',
          text: "We do not sell, rent or exchange your data. Your CV is never added to a public database, never sent to an employer you did not choose, and never used for third-party advertising.",
        },
        {
          kind: 'p',
          text: "This policy applies to the kamjob.com website, the candidate application and the employer portal. It supplements the Terms and Conditions of Use and Sale, of which it forms an integral part.",
        },
      ],
    },
    {
      id: 'responsable',
      title: 'Data controller and contact point',
      blocks: [
        {
          kind: 'defs',
          items: [
            { term: 'Data controller', text: `KamJob — ${TBD.en} (full corporate name), registered office: ${TBD.en}, Cameroon` },
            { term: 'RCCM / NIU', text: TBD.en },
            { term: 'Personal data contact point', text: LEGAL_CONTACT.privacy },
            { term: 'Postal address', text: `${TBD.en}, Cameroon — marked “Data protection”` },
          ],
        },
        {
          kind: 'p',
          text: "When you send an application, the receiving Employer becomes in turn an autonomous data controller for the data it receives and the use it makes of it.",
        },
      ],
    },
    {
      id: 'cadre',
      title: 'Applicable legal framework',
      blocks: [
        { kind: 'p', text: 'The processing of your data takes place within the Cameroonian legal framework, in particular:' },
        {
          kind: 'list',
          items: [
            "Law No. 2010/012 of 21 December 2010 on cybersecurity and cybercrime in Cameroon, which requires confidentiality and protection of data processed electronically and penalises attacks on information systems;",
            "Law No. 2010/013 of 21 December 2010 governing electronic communications, as amended by Law No. 2015/006 of 20 April 2015, in particular as regards the secrecy of communications and the retention of technical data;",
            "Law No. 2010/021 of 21 December 2010 governing electronic commerce, as regards customer information and fair dealing;",
            "the Penal Code (Law No. 2016/007 of 12 July 2016), which penalises violation of correspondence, invasion of privacy and disclosure of confidential information;",
            "Law No. 2011/012 of 6 May 2011 on consumer protection, as regards your right to clear and fair information.",
          ],
        },
        {
          kind: 'p',
          text: "Pending the entry into force of Cameroonian legislation dedicated specifically to personal data protection, KamJob voluntarily applies the principles of the African Union Convention on Cyber Security and Personal Data Protection adopted at Malabo on 27 June 2014: lawfulness, specified purpose, minimisation, accuracy, storage limitation, security, transparency and data subject rights. These principles are not mere statements: they are enforceable against KamJob as a contractual undertaking.",
        },
        {
          kind: 'p',
          text: "The National Agency for Information and Communication Technologies (ANTIC) is the competent regulatory authority for information system security in Cameroon.",
        },
      ],
    },
    {
      id: 'collecte',
      title: 'Data we process',
      blocks: [
        {
          kind: 'defs',
          items: [
            {
              term: 'Identity and contact data',
              text: "surname, given names, date of birth where applicable, email address, telephone number, city and country of residence.",
            },
            {
              term: 'Professional data',
              text: "curriculum vitae and cover letter, qualifications and education level, experience, skills, languages, field of activity and any salary expectations. These documents may contain information you have inserted yourself; we encourage you to include only what is useful to your application.",
            },
            {
              term: 'Account data',
              text: "identifier, hashed password fingerprint (never the password in clear text), preferences, display language, consent history.",
            },
            {
              term: 'Application data',
              text: "offers viewed, swipes, applications sent, dates and statuses, delivery acknowledgements.",
            },
            {
              term: 'Technical data',
              text: "IP address, device and browser type, operating system, connection and error logs, notification identifier. Used for security, diagnostics and fraud prevention.",
            },
            {
              term: 'Payment data',
              text: "Mobile Money number used, transaction reference, amount, date and status. We neither collect nor store any secret code or PIN.",
            },
            {
              term: 'Data produced by AI processing',
              text: "compatibility scores, identified strengths and gaps, tailored document versions. These derive from your documents and follow their fate.",
            },
            { term: 'Support exchanges', text: 'messages, attachments and request history.' },
          ],
        },
        {
          kind: 'p',
          text: "We do not seek or ask for sensitive data within the meaning of the principles set out above (health, trade union membership, political opinions, religious beliefs, sexual orientation, ethnic origin). If your CV nonetheless contains such data, it is processed like the rest of the document and sent as is to the Employers you choose: we strongly recommend removing it.",
        },
      ],
    },
    {
      id: 'finalites',
      title: 'Purposes and legal bases',
      blocks: [
        {
          kind: 'table',
          caption: 'Why we process your data and on what basis',
          head: ['Purpose', 'Legal basis', 'Data concerned'],
          rows: [
            ['Create and manage your account, authenticate you', 'Performance of the contract (these Terms)', 'Identity, contact, account data'],
            [
              'Show you relevant offers and send your applications to the employers you choose',
              'Performance of the contract and the express instruction given by your swipe',
              'Profile, CV and cover letter, application data',
            ],
            [
              'Provide the AI features (compatibility score, document tailoring, automated report)',
              'Performance of the Pass purchased and your consent to activating the feature',
              'CV, cover letter, content of the offer analysed',
            ],
            [
              'Collect payment for a Pass, issue receipts and keep the accounts',
              'Performance of the contract and legal obligation (OHADA accounting law, tax obligations)',
              'Payment data, identity',
            ],
            [
              'Keep the service secure, prevent and detect fraud, fake accounts and fraudulent offers',
              "KamJob's and its users' legitimate interest, together with our cybersecurity obligations",
              'Technical data, logs, account data',
            ],
            [
              'Notify you of useful events (application sent, Pass expiry, support reply)',
              'Performance of the contract',
              'Contact, notification identifier',
            ],
            ['Send you information about new features', 'Your consent, withdrawable at any time', 'Email address, preferences'],
            ['Respond to a lawful request and defend our rights in court', 'Legal obligation and legitimate interest', 'Strictly necessary data'],
          ],
        },
        {
          kind: 'p',
          text: "We do not reuse your data for a new purpose incompatible with those above without informing you and, where the legal basis requires it, without obtaining your consent.",
        },
      ],
    },
    {
      id: 'partage',
      title: 'Who your data is sent to',
      blocks: [
        {
          kind: 'p',
          text: "The Employers you choose. A right swipe triggers the sending of your CV, cover letter and the necessary profile information to the recruitment address stated in the offer. That sending results from your decision alone.",
        },
        {
          kind: 'note',
          text: "A delivered email cannot be recalled: once an application has been sent, KamJob can no longer withdraw it. Deleting your account does not erase documents already received by an Employer. In that case, contact the Employer directly, relying on the limited purpose for which it received them.",
        },
        {
          kind: 'p',
          text: 'Our technical providers (processors), acting solely on our instructions, for the following categories of service:',
        },
        {
          kind: 'list',
          items: [
            'hosting and backup of the Platform and of documents;',
            'delivery of emails (applications, notifications, confirmations);',
            'Mobile Money collection, through electronic money operators and their licensed partners;',
            'AI processing needed for compatibility analysis and document tailoring;',
            'notification delivery, technical monitoring and user support.',
          ],
        },
        {
          kind: 'p',
          text: "Each provider is selected in light of its security level and bound by written undertakings of confidentiality, security, use limited to the instructions received, and return or deletion of data at the end of the contract. We entrust them only with the data necessary for their task.",
        },
        {
          kind: 'p',
          text: "Judicial or administrative authorities, solely on the basis of a lawful request or decision. We check its validity, limit disclosure to the data specifically covered, and inform you unless the law prohibits it. Certain technical connection data is retained under obligations arising from electronic communications and cybercrime legislation.",
        },
        {
          kind: 'p',
          text: "In the event of a reorganisation, merger or business transfer, data may be transferred to the transferee, which must take on these undertakings; you will be informed and may close your account.",
        },
      ],
    },
    {
      id: 'ia',
      title: 'AI-assisted processing',
      blocks: [
        {
          kind: 'p',
          text: "When you activate an AI feature, the content of your CV, your cover letter and the offer being analysed is sent to a processing provider in order to produce a compatibility score and, where applicable, a tailored version of your documents.",
        },
        {
          kind: 'list',
          items: [
            "This processing only runs at your initiative: the service remains usable without it, and free applications do not depend on it.",
            "The scores and comments produced are indicative. They are neither a professional assessment nor a decision: no application is automatically rejected by KamJob on that basis, and no solely automated processing produces legal effects concerning you.",
            "KamJob undertakes to retain only providers who commit to processing your documents solely to perform the request and not to use them to train their models.",
            "Documents produced by the AI belong to you; you remain responsible for their accuracy before sending and should read them over.",
          ],
        },
      ],
    },
    {
      id: 'conservation',
      title: 'Retention periods',
      blocks: [
        {
          kind: 'table',
          caption: 'How long we keep each category of data',
          head: ['Data', 'Period', 'Basis'],
          rows: [
            ['Account, profile, CV and cover letter', 'For the lifetime of the account', 'Performance of the contract'],
            ['After account closure', '30 days (recovery window), then deletion or anonymisation', 'Reversibility of an accidental closure'],
            ['Application history', 'Lifetime of the account, then 12 months', 'Evidence of what was sent and complaint handling'],
            ['Payment receipts and accounting records', '10 years', 'OHADA accounting law and tax obligations'],
            ['Connection and security logs', '12 months', 'Security, evidence and electronic communications obligations'],
            ['Support exchanges', '3 years from the last exchange', 'Complaint handling and limitation periods'],
            ['Records of consent and withdrawal', '3 years from withdrawal', 'Ability to demonstrate that your choices were honoured'],
          ],
        },
        {
          kind: 'p',
          text: "Once those periods expire, data is irreversibly deleted or anonymised. Data already received by an Employer is kept under its sole responsibility and according to its own policy.",
        },
      ],
    },
    {
      id: 'securite',
      title: 'Security',
      blocks: [
        { kind: 'p', text: 'We implement technical and organisational measures proportionate to the risks, in particular:' },
        {
          kind: 'list',
          items: [
            'encryption of exchanges in transit (TLS) and encryption of stored documents;',
            'passwords kept only as fingerprints computed with a robust derivation function;',
            'internal access restricted on a need-to-know basis, individually assigned and logged, with strong authentication for administrative access;',
            'environment segregation, regular backups and tested restore procedures;',
            'security review of providers and prompt remediation of identified vulnerabilities;',
            'awareness training for people handling data, together with confidentiality undertakings.',
          ],
        },
        {
          kind: 'p',
          text: "In the event of a data breach likely to affect your rights, we notify the incident to ANTIC and inform the persons concerned as soon as possible, and at the latest seventy-two (72) hours after becoming aware of it, stating the nature of the incident, its likely consequences and the measures taken.",
        },
        {
          kind: 'note',
          text: "No system is infallible. Your vigilance is part of the arrangement: choose a unique password, share it with no one, be wary of messages asking for your credentials, and log out of shared devices.",
        },
      ],
    },
    {
      id: 'droits',
      title: 'Your rights and how to exercise them',
      blocks: [
        {
          kind: 'p',
          text: "Under the legal framework set out above and KamJob's contractual undertakings, you have the following rights:",
        },
        {
          kind: 'defs',
          items: [
            { term: 'Access', text: 'to know what data we hold and obtain a copy of it.' },
            { term: 'Rectification', text: 'to correct inaccurate or incomplete information.' },
            { term: 'Erasure', text: 'to have your data deleted and your account closed, subject to legally mandatory retention.' },
            { term: 'Objection', text: 'to object to processing based on our legitimate interest, and to any marketing.' },
            { term: 'Withdrawal of consent', text: 'to withdraw a consent at any time, without affecting the lawfulness of earlier processing.' },
            { term: 'Portability', text: 'to retrieve your documents and profile data in a readable, commonly used format.' },
            { term: 'Restriction', text: 'to ask that processing be frozen while a dispute is examined.' },
          ],
        },
        {
          kind: 'p',
          text: `These rights can be exercised directly from your account for most data, or by a request sent to ${LEGAL_CONTACT.privacy}. We may ask for evidence of your identity, for the sole purpose of avoiding disclosure of your data to a third party. We reply free of charge within thirty (30) days, extendable once for complex requests, with reasons given for the extension. Manifestly abusive or repetitive requests may be refused, with reasons.`,
        },
        {
          kind: 'p',
          text: "Two limits should be known: some data must be retained despite your request (accounting records, security logs, items needed to defend our rights), and applications already sent to an Employer cannot be removed from its mailbox by KamJob.",
        },
        {
          kind: 'p',
          text: "If our answer does not satisfy you, you may refer the matter to ANTIC or to the competent Cameroonian court. We invite you to write to us first: most requests are settled within days.",
        },
      ],
    },
    {
      id: 'cookies',
      title: 'Cookies and local storage',
      blocks: [
        {
          kind: 'p',
          text: "The kamjob.com website uses no advertising cookies, no social network trackers and no analytics tools. It only saves your language choice in your browser's local storage, so as to restore it on your next visit. That information stays on your device and is not transmitted to us.",
        },
        {
          kind: 'p',
          text: "The application uses cookies or tokens strictly necessary for authentication, session continuity and security: they cannot be disabled without preventing the service from working. You may erase this data at any time from your browser or device settings.",
        },
        {
          kind: 'p',
          text: "Should an analytics or personalisation tool be introduced, your prior consent would be obtained through a dedicated mechanism, with the ability to refuse without any degradation of the service.",
        },
      ],
    },
    {
      id: 'transferts',
      title: 'Transfers outside Cameroon',
      blocks: [
        {
          kind: 'p',
          text: "Some of our providers (hosting, email, AI processing) may be established outside Cameroon or operate infrastructure there. Your data may therefore be hosted or processed abroad.",
        },
        {
          kind: 'p',
          text: "In that case we frame the transfer with contractual provisions imposing confidentiality, security, use limited to our instructions and deletion at the end of the contract; we favour providers offering a recognised level of protection; and we limit transferred data to what is strictly necessary. An Employer receiving an application may also be established outside Cameroon: your swipe then constitutes your decision to send it your file.",
        },
      ],
    },
    {
      id: 'mineurs',
      title: 'Minors',
      blocks: [
        {
          kind: 'p',
          text: "The Platform is not intended for children below the minimum age of admission to employment set by the Cameroonian Labour Code. A minor who registers must have the authorisation of their legal representative, which is required in all cases to purchase a paid Pass.",
        },
        {
          kind: 'p',
          text: `If you become aware that a child has registered without such authorisation, write to us at ${LEGAL_CONTACT.privacy}: the account will be closed and the data deleted without delay.`,
        },
      ],
    },
    {
      id: 'modifications',
      title: 'Changes to this policy',
      blocks: [
        {
          kind: 'p',
          text: "This policy may change along with the service or the regulations. The applicable version is the one published here, identified by its update date and version number.",
        },
        {
          kind: 'p',
          text: "Any substantial change — in particular a new category of recipients, a new purpose or longer retention periods — is notified to you at least fifteen (15) days before it takes effect, and your consent is obtained where required.",
        },
      ],
    },
    {
      id: 'contact',
      title: 'Write to us',
      blocks: [
        {
          kind: 'defs',
          items: [
            { term: 'Personal data and exercise of rights', text: LEGAL_CONTACT.privacy },
            { term: 'Legal questions and complaints', text: LEGAL_CONTACT.legal },
            { term: 'Support and abuse reports', text: LEGAL_CONTACT.support },
          ],
        },
        {
          kind: 'p',
          text: "We undertake to reply in plain language, without needless jargon, and to give reasons for a refusal where one is warranted.",
        },
      ],
    },
  ],
}

// ── Exports ──────────────────────────────────────────────────────────────────

const uiFr: LegalUi = {
  backHome: "Retour à l'accueil",
  toc: 'Sommaire',
  updated: 'Dernière mise à jour',
  version: 'Version',
  alsoRead: 'À lire également',
  print: 'Imprimer ou enregistrer en PDF',
  tableScrollHint: 'Tableau défilable horizontalement',
}

const uiEn: LegalUi = {
  backHome: 'Back to home',
  toc: 'Contents',
  updated: 'Last updated',
  version: 'Version',
  alsoRead: 'Also worth reading',
  print: 'Print or save as PDF',
  tableScrollHint: 'Horizontally scrollable table',
}

export type LegalDocKey = 'terms' | 'privacy'

export const legal = {
  fr: { ui: uiFr, terms: termsFr, privacy: privacyFr },
  en: { ui: uiEn, terms: termsEn, privacy: privacyEn },
} as const
