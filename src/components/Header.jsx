// components/Header.jsx
import React from "react";
import { useNavigate } from "react-router-dom";
import { auth } from "../scripts/firebase-config";
import { signOut } from "firebase/auth";

const Header = () => {
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      await signOut(auth); // ✅ Sign out the user
      console.log("User logged out");
      navigate("/login"); // ✅ Redirect to login page after logout
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
      <button className="logout-button" onClick={handleLogout}>Logout</button> {/* ✅ Updated with onClick */}
    </header>
  );
};

export default Header;
