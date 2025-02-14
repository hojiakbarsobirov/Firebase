import { initializeApp } from "firebase/app";
import { getFirestore } from 'firebase/firestore'


const firebaseConfig = {
  apiKey: "AIzaSyDi4zWjxbMdVcNGPVREJldWlaoL8f4HtC4",
  authDomain: "auth-3cb38.firebaseapp.com",
  projectId: "auth-3cb38",
  storageBucket: "auth-3cb38.firebasestorage.app",
  messagingSenderId: "983979033714",
  appId: "1:983979033714:web:ea31a7d1324cbf52f7aeeb",
  measurementId: "G-YSCHBQ76P1"
};

const app = initializeApp(firebaseConfig);
export const db = getFirestore(app)