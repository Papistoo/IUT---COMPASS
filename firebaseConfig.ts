import { initializeApp } from "firebase/app";
import { initializeFirestore, persistentLocalCache } from "firebase/firestore";
import { getAuth } from "firebase/auth";

// Récupération des variables d'environnement (Vite)
// IMPORTANT : Les clés réelles ne sont PAS ici.
// Elles doivent être configurées dans l'interface de votre hébergeur (Netlify : Site settings > Environment variables)
// ou dans un fichier .env local pour le développement.
const env = (import.meta as any).env;

const firebaseConfig = {
  apiKey: env.VITE_FIREBASE_API_KEY,
  authDomain: env.VITE_FIREBASE_AUTH_DOMAIN,
  projectId: env.VITE_FIREBASE_PROJECT_ID,
  storageBucket: env.VITE_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: env.VITE_FIREBASE_MESSAGING_SENDER_ID,
  appId: env.VITE_FIREBASE_APP_ID
};

// Validation de sécurité : Vérifie si les clés sont présentes
// Cela aide à diagnostiquer les problèmes lors du déploiement
if (!firebaseConfig.apiKey || !firebaseConfig.projectId) {
  console.error(
    "%c ERREUR CONFIGURATION FIREBASE ",
    "background: red; color: white; font-weight: bold; padding: 4px;",
    "Les clés API sont manquantes. Assurez-vous de les avoir ajoutées dans les 'Environment Variables' de Netlify."
  );
}

// Initialisation de Firebase
const app = initializeApp(firebaseConfig);

// Export de l'instance de la base de données Firestore avec cache persistant
export const db = initializeFirestore(app, {
  localCache: persistentLocalCache()
});

// Export de l'instance d'authentification
export const auth = getAuth(app);
