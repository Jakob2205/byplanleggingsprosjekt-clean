// App.jsx
import React, { useState } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Header from "./components/Header";
import Sidebar from "./components/Sidebar";
import MainContent from "./components/MainContent";
import Footer from "./components/Footer";
import "./styles/main.css";

function App() {
  const [user, setUser] = useState(null);
  const [totalScore, setTotalScore] = useState(0);

  // Update Total Score function that will be passed to MainContent.
  // MainContent will calculate overall Totalverdi from its theme scores and call this.
  const updateTotalScore = (score) => {
    setTotalScore(score);
  };

  return (
    <Router>
      <div className="app-container">
        <Routes>
          <Route
            path="/"
            element={
              <>
                <Header onLogout={() => void 0} />
                <div className="content-wrapper">
                  <Sidebar />
                  {/* Pass the updateTotalScore callback so MainContent can calculate the overall score */}
                  <MainContent updateTotalScore={updateTotalScore} />
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
