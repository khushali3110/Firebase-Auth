
import { initializeApp } from "firebase/app";

import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyB3GjS8jeNCUr8xHlLG2Pw6l9uu-kdIqUc",
  authDomain: "fir-me-e4a2f.firebaseapp.com",
  projectId: "fir-me-e4a2f",
  storageBucket: "fir-me-e4a2f.firebasestorage.app",
  messagingSenderId: "450020504499",
  appId: "1:450020504499:web:54ba82e6d36cefdc5fd1c6",
  measurementId: "G-VE2KSH0XJP"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db =  getFirestore(app)

const auth = getAuth(app)
export {db,auth}