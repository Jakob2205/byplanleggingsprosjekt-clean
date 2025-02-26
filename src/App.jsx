import { useState } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Header from "./components/Header";
import Sidebar from "./components/Sidebar";
import MainContent from "./components/MainContent";
import Footer from "./components/Footer";
import "./styles/main.css";

function App() {
  const [totalScore, setTotalScore] = useState(0);
  // Initialize with "default" so that the default form data is loaded initially.
  const [selectedForm, setSelectedForm] = useState("default");

  // Update Total Score function that will be passed to MainContent.
  const updateTotalScore = (score) => {
    setTotalScore(score);
  };

  // Handler for changing forms (called from FormSelector in Sidebar)
  const handleSelectForm = (formId) => {
    setSelectedForm(formId);
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
                  <Sidebar 
                    selectedForm={selectedForm} 
                    onSelectForm={handleSelectForm} 
                  />
                  {/* Pass selectedForm to MainContent so it can load the corresponding form's data */}
                  <MainContent 
                    updateTotalScore={updateTotalScore} 
                    selectedForm={selectedForm} 
                  />
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
