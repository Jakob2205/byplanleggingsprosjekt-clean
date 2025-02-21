// firebase-config.js
import { initializeApp } from "firebase/app";
console.log("Firebase is available");
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getAnalytics } from "firebase/analytics";

// ✅ Replace with your actual Firebase config
const firebaseConfig = {
    apiKey: "AIzaSyD34gUkha8uOPeeea7ORcRzWtalKNEpLMY",
    authDomain: "byplanleggingsprosjekt.firebaseapp.com",
    projectId: "byplanleggingsprosjekt",
    storageBucket: "byplanleggingsprosjekt.appspot.com",  // Fixed URL
    messagingSenderId: "173474409565",
    appId: "1:173474409565:web:a2eb91b37dc5682a0671b4",
    measurementId: "G-2MVC56FBY7"
};

// ✅ Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);
const analytics = getAnalytics(app);

// ✅ Export Firebase instances
export { app, auth, db, analytics };
