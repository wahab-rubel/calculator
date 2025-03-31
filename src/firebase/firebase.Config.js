// src/firebase.js

import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider, FacebookAuthProvider } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyCacaYLFx85mc-23AmntRRWYZM7ofSByoM",
  authDomain: "job-protal-74102.firebaseapp.com",
  projectId: "job-protal-74102",
  storageBucket: "job-protal-74102.firebasestorage.app",
  messagingSenderId: "866600942049",
  appId: "1:866600942049:web:cbc6f0726b33a24f6b7aa0"
};

// Initialize Firebase only once
const app = initializeApp(firebaseConfig);

// Initialize Firebase Authentication
const auth = getAuth(app);

const googleProvider = new GoogleAuthProvider();
const facebookProvider = new FacebookAuthProvider();

export { auth, googleProvider, facebookProvider };
