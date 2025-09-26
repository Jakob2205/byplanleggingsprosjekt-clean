// components/Header.jsx
import React from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

const Header = () => {
  const navigate = useNavigate();
  const { user, logout } = useAuth(); // ✅ Get user and logout function from context

  const handleLogout = async () => {
    try {
      await logout(); // ✅ Use the logout function from context
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
