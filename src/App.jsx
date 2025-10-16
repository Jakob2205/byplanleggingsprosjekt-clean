// Planleggingsprosjekt/src/App.jsx
import { useState } from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
  useLocation,
} from "react-router-dom";

import Header from "./components/Header";
import Sidebar from "./components/Sidebar";
import MainContent from "./components/MainContent";
import Footer from "./components/Footer";
import Login from "./components/Login";

import "./styles/main.css";
import "./styles/app.css";

// ✅ Import everything from the context, including RequireAuth
import { AuthProvider, useAuth, RequireAuth } from "./context/AuthContext";

function MainLayout() {
  const [totalScore, setTotalScore] = useState(0);
  const [selectedForm, setSelectedForm] = useState("default");
  const { user } = useAuth(); // Firebase user

  return (
    <div className="app-container">
      <div className="header-area">
        <Header />
      </div>
      <div className="sidebar-area">
        <Sidebar
          selectedForm={selectedForm}
          onSelectForm={setSelectedForm}
          userId={user?.uid}
        />
      </div>
      <div className="main-content-area">
        <MainContent updateTotalScore={setTotalScore} selectedForm={selectedForm} userId={user?.uid} />
      </div>
      <div className="footer-area">
        <Footer totalScore={totalScore} />
      </div>
    </div>
  );
}

export default function App() {
  return (
    <AuthProvider>
      <Router>
        <Routes>
          <Route
            path="/"
            element={
              <RequireAuth>
                <MainLayout />
              </RequireAuth>
            }
          />
          <Route path="/login" element={<Login />} />
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </Router>
    </AuthProvider>
  );
}
