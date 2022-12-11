// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries
// https://firebase.google.com/docs/firestore/quickstart
// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDLjzWmA_8YyXrCjm6bTPJWhHWYKUI06qo",
  authDomain: "final-pw-c8bd1.firebaseapp.com",
  projectId: "final-pw-c8bd1",
  storageBucket: "final-pw-c8bd1.appspot.com",
  messagingSenderId: "945018602451",
  appId: "1:945018602451:web:d2a186ca0d609a59e8e526",
  measurementId: "G-K85HWGV2BT"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const database = getFirestore(app);

export { database };
