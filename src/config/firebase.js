// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDmvUArY3OSWb6B71SiyMh0XwycpzTlPkk",
  authDomain: "app-tecnico-senac.firebaseapp.com",
  projectId: "app-tecnico-senac",
  storageBucket: "app-tecnico-senac.appspot.com",
  messagingSenderId: "815214268564",
  appId: "1:815214268564:web:7a0757815cbca56aad2481"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);
export const storage = getStorage(app)