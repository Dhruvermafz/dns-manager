// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyANa2BuSy9Jg5jyRTNtgh-Ye3WXYGEAcr8",
  authDomain: "thetorncoders.firebaseapp.com",
  databaseURL: "https://thetorncoders-default-rtdb.firebaseio.com",
  projectId: "thetorncoders",
  storageBucket: "thetorncoders.appspot.com",
  messagingSenderId: "139286346534",
  appId: "1:139286346534:web:7b8a49120600d2d72f9fe7",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export default app;
