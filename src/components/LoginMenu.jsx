// components/LoginMenu.jsx
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { auth } from "../scripts/firebase-config";
import { signInWithEmailAndPassword } from "firebase/auth";

const LoginMenu = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      await signInWithEmailAndPassword(auth, email, password);
      console.log("User logged in");
      navigate("/"); // ✅ Redirect after login
    } catch (error) {
      console.error("Login error:", error.message);
      alert(`Error: ${error.message}`);
    }
  };

  return (
    <div className="login-container">
      <h1>Login</h1>
      <form onSubmit={handleLogin}>
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        <button type="submit">Login</button>
      </form>
    </div>
  );
};

export default LoginMenu;
