// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getStorage } from "firebase/storage";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore"; // TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyAMmoglThFmsWMXndVqtry5y3QjMA1wU6U",
  authDomain: "pos-demo-d9047.firebaseapp.com",
  projectId: "pos-demo-d9047",
  storageBucket: "pos-demo-d9047.appspot.com",
  messagingSenderId: "624696409951",
  appId: "1:624696409951:web:6822eea99df6fe77ec80ea",
  measurementId: "G-CX1H81DMM1",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const storage = getStorage(app);
export const db = getFirestore(app);
