// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getFirestore  } from 'firebase/firestore'
import {getStorage} from 'firebase/storage'
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBIRgMZNjh4MNcPDzQvfC9_4yMBxf6tNWA",
  authDomain: "business-app-ed11e.firebaseapp.com",
  projectId: "business-app-ed11e",
  storageBucket: "business-app-ed11e.appspot.com",
  messagingSenderId: "822485623529",
  appId: "1:822485623529:web:ceefab676a5a1e94288678",
  measurementId: "G-CHRKCLS7VS"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
export const db = getFirestore(app)
export const storage = getStorage(app)
