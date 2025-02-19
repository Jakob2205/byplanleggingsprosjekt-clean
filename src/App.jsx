import React, { useState, useEffect } from "react";
import Header from "./components/Header";
import Sidebar from "./components/Sidebar";
import MainContent from "./components/MainContent"; // ✅ Ensure it's in the components folder
import Footer from "./components/Footer";
import { auth } from "./scripts/firebase-config";
import { doc, setDoc } from "firebase/firestore";
import "./styles/main.css"; // ✅ Ensure this path is correct

function App() {
  const [themeScores, setThemeScores] = useState({});

  // ✅ Function to update scores based on question responses
  const updateScores = (questionId, score, isAnswered) => {
    setThemeScores((prevScores) => {
      const newScores = { ...prevScores };
      const themeId = questionId.split("_")[0]; // Extracting theme from question ID

      if (!newScores[themeId]) {
        newScores[themeId] = { score: 0, answeredQuestions: 0 };
      }

      newScores[themeId].score += score;
      if (isAnswered) newScores[themeId].answeredQuestions += 1;

      return newScores;
    });
  };

  // ✅ Save to Firebase whenever themeScores update
  useEffect(() => {
    if (auth.currentUser) {
      const userDoc = doc(db, "users", auth.currentUser.uid);
      setDoc(userDoc, { themeScores }, { merge: true })
        .then(() => console.log("Scores saved to Firestore"))
        .catch((error) => console.error("Error saving scores:", error));
    }
  }, [themeScores]);

  return (
    <div className="app-container">
      <Header />
      <div className="content-wrapper">
        <Sidebar /> {/* ✅ Sidebar goes here */}
        <MainContent updateScores={updateScores} /> {/* ✅ Pass updateScores as a prop */}
      </div>
      <Footer themeScores={themeScores} />
    </div>
  );
}

export default App;
