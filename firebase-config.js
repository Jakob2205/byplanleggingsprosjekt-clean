// firebase-config.js
import { initializeApp } from "https://www.gstatic.com/firebasejs/9.6.1/firebase-app.js";
import { getAuth } from "https://www.gstatic.com/firebasejs/9.6.1/firebase-auth.js";
import { getFirestore } from "https://www.gstatic.com/firebasejs/9.6.1/firebase-firestore.js";
import { getAnalytics } from "https://www.gstatic.com/firebasejs/9.6.1/firebase-analytics.js";

const firebaseConfig = {
    apiKey: "AIzaSyD34gUkha8uOPeeea7ORcRzWtalKNEpLMY",
    authDomain: "byplanleggingsprosjekt.firebaseapp.com",
    projectId: "byplanleggingsprosjekt",
    storageBucket: "byplanleggingsprosjekt.firebasestorage.app",
    messagingSenderId: "173474409565",
    appId: "1:173474409565:web:a2eb91b37dc5682a0671b4",
    measurementId: "G-2MVC56FBY7"
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);
const analytics = getAnalytics(app);

// Export Firebase instances
export { app, auth, db, analytics };
