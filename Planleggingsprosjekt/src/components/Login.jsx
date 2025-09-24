// src/components/Login.jsx
import React, { useState } from "react";
import { useAuth } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const { login } = useAuth();
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [submitting, setSubmitting] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitting(true);
    try {
      await login(email, password);
      navigate("/"); // 👈 go to main app
    } catch (error) {
      alert(`Login error: ${error?.message || error}`);
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="login-container" style={{ padding: 24 }}>
      <h2>Login</h2>
      <form onSubmit={handleSubmit} style={{ maxWidth: 360 }}>
        <div style={{ marginBottom: 12 }}>
          <label>Email:</label>
          <input
            type="email"
            value={email}
            autoComplete="username"
            onChange={(e) => setEmail(e.target.value)}
            required
            style={{ width: "100%", padding: 8 }}
          />
        </div>
        <div style={{ marginBottom: 12 }}>
          <label>Password:</label>
          <input
            type="password"
            value={password}
            autoComplete="current-password"
            onChange={(e) => setPassword(e.target.value)}
            required
            style={{ width: "100%", padding: 8 }}
          />
        </div>
        <button type="submit" disabled={submitting}>
          {submitting ? "Logger inn…" : "Login"}
        </button>
      </form>
    </div>
  );
};

export default Login;
