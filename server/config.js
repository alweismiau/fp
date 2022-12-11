import firebase from "firebase/compat/app";
import "firebase/compat/firestore";
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyAnl0zGmAWPBBtufvzscd2tIyB1MCBA0mI",
  authDomain: "eas-pemweb.firebaseapp.com",
  projectId: "eas-pemweb",
  storageBucket: "eas-pemweb.appspot.com",
  messagingSenderId: "358471209965",
  appId: "1:358471209965:web:e3b7df063328f0bda28de4"
};
  
const firebaseApp = firebase.initializeApp(firebaseConfig);
export const auth = getAuth(firebaseApp);

export const db = firebaseApp.firestore();