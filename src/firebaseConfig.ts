import { initializeApp } from "firebase/app";
import { initializeFirestore, persistentLocalCache } from "firebase/firestore";
import { getAuth } from "firebase/auth";

// Vérification que les variables sont chargées (utile pour le débogage)
const requiredEnvVars = [
  'VITE_FIREBASE_API_KEY',
  'VITE_FIREBASE_AUTH_DOMAIN',
  'VITE_FIREBASE_PROJECT_ID',
  'VITE_FIREBASE_STORAGE_BUCKET',
  'VITE_FIREBASE_MESSAGING_SENDER_ID',
  'VITE_FIREBASE_APP_ID'
];

// Cast import.meta to any to solve "Property 'env' does not exist on type 'ImportMeta'"
const env = (import.meta as any).env;

// Simple vérification en dev pour éviter les erreurs silencieuses
if (env.DEV) {
  const missing = requiredEnvVars.filter(key => !env[key]);
  if (missing.length > 0) {
    console.warn(`⚠️ Variables d'environnement manquantes pour Firebase: ${missing.join(', ')}`);
  }
}

const firebaseConfig = {
  apiKey: env.VITE_FIREBASE_API_KEY,
  authDomain: env.VITE_FIREBASE_AUTH_DOMAIN,
  projectId: env.VITE_FIREBASE_PROJECT_ID,
  storageBucket: env.VITE_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: env.VITE_FIREBASE_MESSAGING_SENDER_ID,
  appId: env.VITE_FIREBASE_APP_ID
};

// Initialisation de Firebase
const app = initializeApp(firebaseConfig);

// Export de l'instance de la base de données Firestore
export const db = initializeFirestore(app, {
  localCache: persistentLocalCache()
});

// Export de l'instance d'authentification
export const auth = getAuth(app);