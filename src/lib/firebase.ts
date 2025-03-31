import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyBSBr64-l7LyEB7_L7mb8sOYg4VRrxQQTQ",
  authDomain: "restaurants-a9658.firebaseapp.com",
  projectId: "restaurants-a9658",
  storageBucket: "restaurants-a9658.firebasestorage.app",
  messagingSenderId: "720735233401",
  appId: "1:720735233401:web:c45078a02876530d577ba8",
  measurementId: "G-6XQX9XC2FX"
};

export const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);