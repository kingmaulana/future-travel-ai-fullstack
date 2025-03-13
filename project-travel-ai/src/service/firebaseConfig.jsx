// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getFirestore } from "firebase/firestore"
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBWwMxd5_eHu0s1y-xm6XWd-wroDGy0sSs",
  authDomain: "future-traveller.firebaseapp.com",
  projectId: "future-traveller",
  storageBucket: "future-traveller.firebasestorage.app",
  messagingSenderId: "797082338441",
  appId: "1:797082338441:web:194fd8464801eeabf0f258",
  measurementId: "G-Q8WEE43T9P"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export const db = getFirestore(app)
// const analytics = getAnalytics(app);