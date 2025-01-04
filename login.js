// login.js
import { auth } from './firebase-config.js';
import { signInWithEmailAndPassword, onAuthStateChanged } from "https://www.gstatic.com/firebasejs/9.6.1/firebase-auth.js";

// Login function
function login(event) {
    event.preventDefault();
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;

    console.log("Attempting login with email:", email);

    signInWithEmailAndPassword(auth, email, password)
        .then((userCredential) => {
            console.log("Login successful:", userCredential.user);
            // Redirect to Forside.html upon successful login
            window.location.href = "Forside.html";
        })
        .catch((error) => {
            console.error("Error during login:", error.message);
            alert(`Error: ${error.message}`);
        });
}

// Check authentication state
onAuthStateChanged(auth, (user) => {
    if (user) {
        console.log("User is signed in:", user.email);
        // Redirect to Forside.html if the user is already logged in
        window.location.href = "Forside.html";
    } else {
        console.log("No user is signed in.");
    }
});

// Attach login function to form submit event
document.getElementById('login-form').addEventListener('submit', login);
