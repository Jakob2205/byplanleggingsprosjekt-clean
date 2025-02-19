// App.jsx
import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import Header from "./components/Header";
import Sidebar from "./components/Sidebar";
import MainContent from "./components/MainContent";
import Footer from "./components/Footer";
import LoginMenu from "./components/LoginMenu";
import { auth } from "./scripts/firebase-config";
import { onAuthStateChanged, signOut } from "firebase/auth";
import "./styles/main.css";

function App() {
  const [user, setUser] = useState(null);
  const [totalScore, setTotalScore] = useState(0);

  // ✅ Listen for auth state changes
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
    });
    return () => unsubscribe();
  }, []);

  // ✅ Logout function
  const handleLogout = async () => {
    try {
      await signOut(auth);
      console.log("User logged out");
    } catch (error) {
      console.error("Logout failed:", error);
    }
  };

  // ✅ Update Total Score function
  const updateTotalScore = (score) => {
    setTotalScore(score);
  };

  return (
    <Router>
      <div className="app-container">
        <Routes>
          {/* ✅ Login page route */}
          <Route path="/login" element={!user ? <LoginMenu /> : <Navigate to="/" />} />

          {/* ✅ Main app route */}
          <Route
            path="/"
            element={
              user ? (
                <>
                  <Header onLogout={handleLogout} />
                  <div className="content-wrapper">
                    <Sidebar />
                    <MainContent updateTotalScore={updateTotalScore} />
                  </div>
                  <Footer totalScore={totalScore} />
                </>
              ) : (
                <Navigate to="/login" />
              )
            }
          />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
