// Import the functions you need from the SDKs you need


// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCpmT0yVz2P8VmAY4zpqRILRaEw7jKGWvo",
  authDomain: "n8nchat-c8fd0.firebaseapp.com",
  projectId: "n8nchat-c8fd0",
  storageBucket: "n8nchat-c8fd0.firebasestorage.app",
  messagingSenderId: "947496552779",
  appId: "1:947496552779:web:9fd84c3993b10a42ee40ce",
  measurementId: "G-93QYDRYZPR"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);
export const db = getFirestore(app);