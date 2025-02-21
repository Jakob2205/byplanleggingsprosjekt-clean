// App.jsx
import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import Header from "./components/Header";
import Sidebar from "./components/Sidebar";
import MainContent from "./components/MainContent";
import Footer from "./components/Footer";
//import LoginMenu from "./components/LoginMenu";
//import { auth } from "./scripts/firebase-config";
//import { onAuthStateChanged, signOut } from "firebase/auth";
import "./styles/main.css";

function App() {
  const [user, setUser] = useState(null);
  const [totalScore, setTotalScore] = useState(0);

  // ✅ Listen for auth state changes

  // ✅ Logout function


  // ✅ Update Total Score function
  const updateTotalScore = (score) => {
    setTotalScore(score);
  };

  return (
    <Router>
      <div className="app-container">
        <Routes>
          {/* ✅ Login page route */}

          {/* ✅ Main app route */}
          <Route
            path="/"
            element={
              <>
                <Header onLogout={() => void 0} />
                <div className="content-wrapper">
                  <Sidebar />
                  <MainContent updateTotalScore={asd => void 0} />
                </div>
                <Footer totalScore={totalScore} />
              </>
            }
          />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
