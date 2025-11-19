import { initializeApp, cert, getApps, App, ServiceAccount } from "firebase-admin/app";
import { getFirestore, Firestore } from "firebase-admin/firestore";
import { getAuth, Auth } from "firebase-admin/auth";
import serviceAccountJson from "../serviceAccountKey.json";

const getFirebaseConfig = (): any => {
  const serviceAccount: ServiceAccount = {
    projectId: serviceAccountJson.project_id,
    clientEmail: serviceAccountJson.client_email,
    privateKey: serviceAccountJson.private_key.replace(/\\n/g, "\n"),
  };

  return {
    credential: cert(serviceAccount),
  };
};

const initializeFirebaseAdmin = (): App => {
  const existingApp: App = getApps()[0];
  if (existingApp) {
    return existingApp;
  }
  return initializeApp(getFirebaseConfig());
};

const app: App = initializeFirebaseAdmin();
const db: Firestore = getFirestore(app);
const auth: Auth = getAuth(app);

export { db, auth };