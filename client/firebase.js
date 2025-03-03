// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: "mern-real-estate-395aa.firebaseapp.com",
  projectId: "mern-real-estate-395aa",
  storageBucket: "mern-real-estate-395aa.firebasestorage.app",
  messagingSenderId: "504588473626",
  appId: "1:504588473626:web:9b3426c6290b90d74c88a3"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);