import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyBdacNV2hnndnww1MUj4FiAHAGmwSYw1KE",
  authDomain: "ai-deploy-b67f3.firebaseapp.com",
  projectId: "ai-deploy-b67f3",
  storageBucket: "ai-deploy-b67f3.firebasestorage.app",
  messagingSenderId: "199773362203",
  appId: "1:199773362203:web:510b00e09076a0b2ea00be",
};

const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);
export const db = getFirestore(app);

export default app;