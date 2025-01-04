// firebase-config.js
import { initializeApp } from "https://www.gstatic.com/firebasejs/9.6.1/firebase-app.js";
import { getAuth } from "https://www.gstatic.com/firebasejs/9.6.1/firebase-auth.js";
import { getAnalytics } from "https://www.gstatic.com/firebasejs/9.6.1/firebase-analytics.js";

// Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyD34gUkha8uOPeeea7ORcRzWtalKNEpLMY",
    authDomain: "byplanleggingsprosjekt.firebaseapp.com",
    projectId: "byplanleggingsprosjekt",
    storageBucket: "byplanleggingsprosjekt.firebasestorage.app",
    messagingSenderId: "173474409565",
    appId: "1:173474409565:web:a2eb91b37dc5682a0671b4",
    measurementId: "G-2MVC56FBY7"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const analytics = getAnalytics(app);

// Export Firebase instances
export { app, auth, analytics };
