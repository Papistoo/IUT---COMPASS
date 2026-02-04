import { Category, FaqItem, ProcessFlow, DepartmentStat, EnrollmentData } from './types';

export const AVAILABLE_ICONS = [
  { label: 'Valise (Travail)', value: 'briefcase' },
  { label: 'Document (Texte)', value: 'file-text' },
  { label: 'Stylo (Signature)', value: 'pen-tool' },
  { label: 'Validation (Cercle)', value: 'check-circle' },
  { label: 'Sécurité (Bouclier)', value: 'shield-check' },
  { label: 'Action (Play)', value: 'play' },
  { label: 'Livre (Bibliothèque)', value: 'book' },
  { label: 'Recherche (Loupe)', value: 'search' },
  { label: 'Diplôme (Récompense)', value: 'award' },
  { label: 'Ajout Fichier', value: 'file-plus' },
  { label: 'Institution (Banque)', value: 'landmark' },
  { label: 'Paiement (Carte)', value: 'credit-card' },
  { label: 'Bibliothèque', value: 'library' },
  { label: 'Chapeau (Études)', value: 'graduation-cap' },
];

// --- MODULE 1: ASSISTANT DATA (DETERMINISTIC) ---
export const FAQ_DATA: FaqItem[] = [
  // --- ADMISSION SECTION (NEW) ---
  {
    id: 'adm_1',
    category: Category.ADMISSION,
    question: "Quels diplômes puis-je préparer à l'IUT ?",
    procedure: "Offre de formation",
    service: "Direction des Études",
    location: "Campus IUT",
    timing: "Cycles de 2 ou 3 ans",
    steps: [
      "DUT (Diplôme Universitaire de Technologie) : Pour les titulaires du BAC (Formation en 2 ans).",
      "Licence Professionnelle (LP) : Pour les titulaires d'un Bac+2 (DUT, BTS d'État ou équivalent)."
    ],
    keywords: ['diplome', 'dut', 'licence', 'lp', 'formation']
  },
  {
    id: 'adm_2',
    category: Category.ADMISSION,
    question: "Comment postuler à l'IUT de Tahoua ?",
    procedure: "Dépôt de candidature",
    service: "Service Scolarité",
    location: "En ligne ou Campus 2",
    timing: "Selon calendrier académique",
    steps: [
      "Option A : Via la plateforme en ligne udh.campusniger.com",
      "Option B : Dépôt physique directement au service de la scolarité.",
      "Assurez-vous que le dossier est complet avant tout dépôt."
    ],
    keywords: ['postuler', 'candidature', 'inscription', 'site', 'web']
  },
  {
    id: 'adm_3',
    category: Category.ADMISSION,
    question: "Quelle est la procédure d'admission ?",
    procedure: "Processus de sélection",
    service: "Commissions Pédagogiques",
    location: "Administration",
    timing: "Environ 1 mois",
    steps: [
      "Dépôt du dossier de candidature au service de la scolarité.",
      "Transmission aux départements concernés.",
      "Étude et sélection selon les critères de la filière et la capacité d'accueil.",
      "Décision finale et notification des résultats après délibération."
    ],
    keywords: ['procédure', 'étape', 'sélection', 'admission']
  },
  {
    id: 'adm_4',
    category: Category.ADMISSION,
    question: "Conditions d'accès pour le DUT",
    procedure: "Critères d'éligibilité DUT",
    service: "Scolarité",
    location: "N/A",
    timing: "Immédiat",
    steps: [
      "Être titulaire d'un Baccalauréat.",
      "Séries acceptées : A, C, D, E, F, G1, G2, G3.",
      "Le Bac Professionnel est également accepté."
    ],
    keywords: ['dut', 'condition', 'bac', 'serie']
  },
  {
    id: 'adm_5',
    category: Category.ADMISSION,
    question: "Conditions d'accès Licence Pro (LP)",
    procedure: "Critères d'éligibilité LP",
    service: "Scolarité",
    location: "N/A",
    timing: "Immédiat",
    steps: [
      "Être titulaire d'un diplôme de niveau Bac+2.",
      "Diplômes acceptés : DUT, BTS d'État.",
      "Tout autre diplôme reconnu équivalent par la commission."
    ],
    keywords: ['licence', 'lp', 'bac+2', 'bts']
  },
  {
    id: 'adm_6',
    category: Category.ADMISSION,
    question: "L'admission est-elle sélective ?",
    procedure: "Information Concours",
    service: "Direction",
    location: "IUT",
    timing: "Annuel",
    steps: [
      "Oui, l'admission est très sélective.",
      "Plus de 1000 candidats postulent chaque année.",
      "Le nombre d'admis est limité selon les capacités d'accueil des infrastructures."
    ],
    keywords: ['sélectif', 'concours', 'place', 'limite']
  },
  {
    id: 'adm_7',
    category: Category.ADMISSION,
    question: "Pièces du dossier de candidature",
    procedure: "Constitution du dossier",
    service: "Scolarité",
    location: "Guichet Dépôt",
    timing: "Avant date limite",
    steps: [
      "Copie légalisée et lisible du Baccalauréat.",
      "Copie légalisée du relevé de notes.",
      "Copie légalisée et lisible de l'extrait d'acte de naissance.",
      "Copie légalisée et lisible du certificat de nationalité.",
      "Copie légalisée des bulletins S1 et S2 (pour DUT ou LP).",
      "Une photo d'identité récente."
    ],
    keywords: ['pièce', 'dossier', 'document', 'papier', 'légalisé']
  },
  {
    id: 'adm_8',
    category: Category.ADMISSION,
    question: "Annonce des résultats d'admission",
    procedure: "Publication Résultats",
    service: "Service Scolarité",
    location: "Affichage Campus & En ligne",
    timing: "Après délibération",
    steps: [
      "Étude des dossiers par les départements.",
      "Délibération des commissions pédagogiques.",
      "Notification officielle des résultats par le service scolarité."
    ],
    keywords: ['résultat', 'admis', 'liste', 'date']
  },
  {
    id: 'adm_9',
    category: Category.ADMISSION,
    question: "Plus d'informations sur l'admission ?",
    procedure: "Demande d'information",
    service: "Service Central Scolarité",
    location: "Campus 2",
    timing: "Horaires de bureau",
    steps: [
      "Se rendre physiquement au Service Central de la Scolarité (Campus 2).",
      "Consulter le site web de l'université.",
      "Utiliser le formulaire de contact de l'application."
    ],
    keywords: ['info', 'contact', 'aide', 'renseignement']
  },

  // --- EXISTING DATA ---
  {
    id: '1',
    category: Category.INSCRIPTIONS,
    question: "Comment effectuer ma première inscription ?",
    procedure: "Inscription Nouveaux Bacheliers",
    service: "Service de la Scolarité",
    location: "Bâtiment A, Rez-de-chaussée, Porte 102",
    timing: "2 à 3 jours ouvrables",
    steps: [
      "Retirer la fiche d'inscription au guichet d'accueil.",
      "Payer les frais d'inscription à la comptabilité (Bâtiment B).",
      "Effectuer la visite médicale à l'infirmerie.",
      "Déposer le dossier complet (photos, relevé BAC, fiche, reçu de paiement) à la scolarité."
    ],
    keywords: ['inscription', 'nouveau', 'bac', 'bachelier', 'payer']
  },
  {
    id: '2',
    category: Category.INSCRIPTIONS,
    question: "Comment faire ma réinscription (L2/L3) ?",
    procedure: "Réinscription académique",
    service: "Service de la Scolarité",
    location: "Bâtiment A, Porte 104",
    timing: "1 jour",
    steps: [
      "Valider les résultats de l'année précédente.",
      "Payer les frais de réinscription à la banque partenaire ou à la comptabilité.",
      "Déposer la fiche de réinscription et le reçu au service scolarité."
    ],
    keywords: ['réinscription', 'l2', 'l3', 'ancien']
  },
  {
    id: '3',
    category: Category.DOCUMENTS,
    question: "Demander une attestation d'inscription",
    procedure: "Retrait d'actes académiques",
    service: "Secrétariat de Département",
    location: "Secrétariat de votre filière",
    timing: "24h à 48h",
    steps: [
      "Remplir le cahier de demande au secrétariat.",
      "Présenter sa carte d'étudiant en cours de validité.",
      "Revenir récupérer le document signé après le délai indiqué."
    ],
    keywords: ['attestation', 'document', 'prouver', 'carte']
  },
  {
    id: '4',
    category: Category.DOCUMENTS,
    question: "Retirer mon diplôme ou attestation de réussite",
    procedure: "Retrait de Diplôme",
    service: "Direction des Études / Archives",
    location: "Bâtiment Administratif, 1er Étage",
    timing: "Sur rendez-vous (environ 1 semaine)",
    steps: [
      "Fournir une demande manuscrite adressée au Directeur.",
      "Joindre une copie de la pièce d'identité et le quitus de la bibliothèque.",
      "Le retrait se fait personnellement émargement du registre."
    ],
    keywords: ['diplôme', 'diplome', 'réussite', 'fin', 'études'],
    linkedFlowId: 'flow_diploma'
  },
  {
    id: '5',
    category: Category.STAGES,
    question: "Obtenir une convention de stage",
    procedure: "Conventionnement",
    service: "Bureau des Stages & Relations Entreprises",
    location: "Bâtiment C, Porte 12",
    timing: "Immédiat ou 24h",
    steps: [
      "Avoir une structure d'accueil confirmée (accord de principe).",
      "Remplir le formulaire de convention disponible au bureau.",
      "Faire signer par l'entreprise d'abord, puis déposer pour signature du Directeur."
    ],
    keywords: ['stage', 'convention', 'entreprise', 'travail'],
    linkedFlowId: 'flow_stage'
  },
  {
    id: '6',
    category: Category.EXAMENS,
    question: "Réclamation de notes d'examen",
    procedure: "Requête de correction",
    service: "Jury du Département",
    location: "Secrétariat de Département",
    timing: "48h après affichage",
    steps: [
      "Rédiger une lettre de réclamation adressée au Chef de Département.",
      "Déposer la lettre au secrétariat dans les 48h suivant la publication des résultats.",
      "La copie sera revérifiée par le jury."
    ],
    keywords: ['note', 'examen', 'erreur', 'réclamation', '0']
  }
];

// --- MODULE 2: PROCESS FLOWS ---
export const PROCESS_FLOWS: ProcessFlow[] = [
  {
    id: 'flow_services',
    title: "Panorama : Rôles des Services",
    steps: [
      { id: 'srv1', label: "Direction Générale", description: "Pilotage stratégique, coordination des activités et validation des diplômes.", service: "Direction", icon: "landmark" },
      { id: 'srv2', label: "Service Scolarité", description: "Gestion des inscriptions, dossiers étudiants, cartes et retraits de diplômes.", service: "Scolarité", icon: "file-text" },
      { id: 'srv3', label: "Départements Pédago.", description: "Organisation des cours, examens, emplois du temps et suivi pédagogique.", service: "Départements", icon: "graduation-cap" },
      { id: 'srv4', label: "Service Comptabilité", description: "Paiement des frais d'inscription et gestion financière de l'institut.", service: "Comptabilité", icon: "credit-card" },
      { id: 'srv5', label: "Services Communs", description: "Bibliothèque (Documentation) et Infirmerie (Santé étudiante).", service: "Support", icon: "library" },
    ]
  },
  {
    id: 'flow_stage',
    title: "Circuit : Départ en Stage",
    steps: [
      { id: 's1', label: "Accord Entreprise", description: "L'étudiant trouve une structure.", service: "Étudiant", icon: "briefcase" },
      { id: 's2', label: "Édition Convention", description: "Récupération et remplissage du formulaire.", service: "Bureau des Stages", icon: "file-text" },
      { id: 's3', label: "Signature Entreprise", description: "L'entreprise signe et cachette.", service: "Entreprise", icon: "pen-tool" },
      { id: 's4', label: "Signature IUT", description: "Validation académique.", service: "Direction", icon: "shield-check" },
      { id: 's5', label: "Départ effectif", description: "L'étudiant commence son stage.", service: "Sur site", icon: "play" },
    ]
  },
  {
    id: 'flow_diploma',
    title: "Circuit : Retrait de Diplôme",
    steps: [
      { id: 'd1', label: "Validation des UE", description: "Délibération du jury annuel.", service: "Jury", icon: "check-circle" },
      { id: 'd2', label: "Quitus", description: "Retour des livres et matériel.", service: "Bibliothèque", icon: "book" },
      { id: 'd3', label: "Demande Manuscrite", description: "Dépôt de la demande de retrait.", service: "Scolarité", icon: "file-plus" },
      { id: 'd4', label: "Vérification", description: "Contrôle des dossiers archives.", service: "Archives", icon: "search" },
      { id: 'd5', label: "Remise", description: "Remise en main propre contre signature.", service: "Direction", icon: "award" },
    ]
  }
];

// --- MODULE 3: DASHBOARD DATA (MOCK) ---
export const DASHBOARD_STATS: {
  departments: DepartmentStat[];
  enrollmentHistory: EnrollmentData[];
} = {
  departments: [
    { name: 'Informatique', students: 120, successRate: 85, dropoutRate: 5 },
    { name: 'Génie Civil', students: 180, successRate: 78, dropoutRate: 8 },
    { name: 'Gest. Entreprise', students: 200, successRate: 92, dropoutRate: 2 },
    { name: 'Bio-Analyses', students: 90, successRate: 88, dropoutRate: 4 },
  ],
  enrollmentHistory: [
    { year: '2021', count: 450 },
    { year: '2022', count: 510 },
    { year: '2023', count: 590 },
    { year: '2024', count: 620 },
  ]
};