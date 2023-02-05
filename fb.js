// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBOyfMfGwUMQxmJNDCCMxy5w4dN6MmjzCg",
  authDomain: "sptfytech.firebaseapp.com",
  projectId: "sptfytech",
  storageBucket: "sptfytech.appspot.com",
  messagingSenderId: "790916757305",
  appId: "1:790916757305:web:8e430ceb9f7d923ad49ae8",
  measurementId: "G-6LXWD8QZXD",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export default app;
