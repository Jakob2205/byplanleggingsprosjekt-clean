// src/components/Header.jsx
import React from "react";
import { useAuth } from "../context/AuthContext";
import "../styles/header.css";

const Header = () => {
  const { user, logout } = useAuth();

  const handleLogout = async () => {
    try {
      await logout(); // ✅ Use the logout function from context
      console.log("User logged out");
    } catch (error) {
      console.error("Logout error:", error.message);
      alert(`Error: ${error.message}`);
    }
  };
  return (
    <header className="header-container">
      <h1>Plansikt Casestudie</h1>

      {/* Show logout button only if logged in */}
      {user && (
        <button className="logout-button" onClick={handleLogout}>
          Logg ut
        </button>
      )}
    </header>
  );
};

export default Header;
