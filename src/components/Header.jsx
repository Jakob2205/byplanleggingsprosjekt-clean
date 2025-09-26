// components/Header.jsx
import React from "react";
import { useNavigate } from "react-router-dom";
import { signOut } from "firebase/auth";
import { auth } from "../firebase-config";
import { useAuth } from "../context/AuthContext"; // 👈 import context

const Header = () => {
  const navigate = useNavigate();
  const { user } = useAuth(); // 👈 get current user from context

  const handleLogout = async () => {
    try {
      await signOut(auth);
      console.log("User logged out");
      navigate("/login"); // redirect to login page
    } catch (error) {
      console.error("Logout error:", error.message);
      alert(`Error: ${error.message}`);
    }
  };

  return (
    <header className="header-container">
      <h1>Plansikt</h1>

      <div className="tabs">
        <div>Casestudie</div>
        <div>Planinitiativ</div>
        <div>Førstegangsbehandling</div>
        <div>Politisk skjema</div>
        <div>Medvirkningsskjema</div>
        <div>Sluttbehandling</div>
      </div>

      {/* Show logout button only if logged in */}
      {user && (
        <button className="logout-button" onClick={handleLogout}>
          Logout
        </button>
      )}
    </header>
  );
};

export default Header;
