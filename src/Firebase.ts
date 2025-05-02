// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries
const firebaseConfig = {
  apiKey: "AIzaSyD9B1rLQHeRk1bVbdZZ4FIg3fwRehd3vxQ",
  authDomain: "typescript-habit-app.firebaseapp.com",
  projectId: "typescript-habit-app",
  storageBucket: "typescript-habit-app.firebasestorage.app",
  messagingSenderId: "901303491210",
  appId: "1:901303491210:web:0028df33ce08093fe76b73",
  measurementId: "G-CKW0H06372"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app)
const googleProvider = new GoogleAuthProvider();

export { auth, googleProvider,db };