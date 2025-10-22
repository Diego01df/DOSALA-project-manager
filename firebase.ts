// Import the functions you need from the SDKs you need
import { initializeApp } from "https://www.gstatic.com/firebasejs/12.4.0/firebase-app.js";
import { getAnalytics } from "https://www.gstatic.com/firebasejs/12.4.0/firebase-analytics.js";

// Your web app's Firebase configuration from the prompt
const firebaseConfig = {
  apiKey: "AIzaSyD-VqVmT26tzAos5dZog3vB2L82hCJvPeE",
  authDomain: "dosala-project-manager.firebaseapp.com",
  projectId: "dosala-project-manager",
  storageBucket: "dosala-project-manager.firebasestorage.app",
  messagingSenderId: "704997906597",
  appId: "1:704997906597:web:697ea150ce4cc31ace554c",
  measurementId: "G-Q6PYHJXHLK"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

// You can export instances to be used in other parts of the app
export { app, analytics };

// This file is imported in index.tsx to ensure Firebase is initialized on app startup.
