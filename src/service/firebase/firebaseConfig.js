// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getFirestore } from "firebase/firestore"
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDWCCeidjdaSPKoon9908QGnQUddufi4rM",
  authDomain: "quizsnap-b6ea2.firebaseapp.com",
  projectId: "quizsnap-b6ea2",
  storageBucket: "quizsnap-b6ea2.appspot.com",
  messagingSenderId: "1046702993536",
  appId: "1:1046702993536:web:c1b505a19da4e21bfff665",
  measurementId: "G-S2XYPF2KG5"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

export const db = getFirestore();