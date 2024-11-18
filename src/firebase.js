// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import {
  createUserWithEmailAndPassword,
  getAuth,
  GoogleAuthProvider,
  sendPasswordResetEmail,
  signInWithEmailAndPassword,
  signInWithPopup,
} from "firebase/auth";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBrUxv_dBbxbxR9sW09F0hw2SZPnT2fXJs",
  authDomain: "guestbook-626bc.firebaseapp.com",
  projectId: "guestbook-626bc",
  storageBucket: "guestbook-626bc.firebasestorage.app",
  messagingSenderId: "29940527902",
  appId: "1:29940527902:web:9dea11f1c38d88c5514f0f"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const googleAuthProvider = new GoogleAuthProvider();

const registerWithEmailAndPassword = async (email, password) => {
  try {
    const res = await createUserWithEmailAndPassword(auth, email, password);
    const user = res.user;
    return user;

  } catch(err) {
    throw(err)
  }
}

const loginWithEmailAndPassword = async (email, password) => {
  try {
    const res = await signInWithEmailAndPassword(auth, email, password);
    return res;
  } catch(err){
    throw(err)
  }
}

const sendPasswordReset = async (email) => {
  try {
    const res = await sendPasswordResetEmail(auth, email);
  } catch (err){
    throw(err)
  }
}

const signInWithGoogle = async () => {
  try { 
    const res = await signInWithPopup(auth, googleAuthProvider);
    return res.user;
  } catch (err) {
    throw(err)
   }
}



export { auth, loginWithEmailAndPassword, registerWithEmailAndPassword, sendPasswordReset, signInWithGoogle };

