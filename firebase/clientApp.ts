import { initializeApp, FirebaseOptions, FirebaseApp } from "firebase/app";
import { Auth, initializeAuth, browserSessionPersistence, browserPopupRedirectResolver } from "firebase/auth";
import { Firestore, getFirestore } from "firebase/firestore";

const clientCredentials: FirebaseOptions = {
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
  authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
  projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
  storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID,
};

let app: FirebaseApp;
let db: Firestore;
let auth: Auth;

export const initializeFirebase = (): Auth => {
  app = initializeApp(clientCredentials);
  db = getFirestore(app);
  auth = initializeAuth(app, {
    persistence: browserSessionPersistence,
    popupRedirectResolver: browserPopupRedirectResolver,
  });
  return auth;
};

export { db as FirestoreDB, auth, clientCredentials, app };
