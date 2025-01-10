import React, { useState } from "react";
import "../static/login.css";

const Register = () => {
  const [userName, setUserName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [darkMode, setDarkMode] = useState(false);

  const toggleDarkMode = () => {
    setDarkMode(!darkMode);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    fetch("http://localhost:3000/api/user", {
      method: "post",
      credentials: "include",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        userName,
        email,
        password
      }),
    })
      .then((res) => res.json())
      .then((response) => {
        console.log(response);
       
      })
      .catch((error) => console.error("Error:", error));
  };

  return (
    <div className={`login-container ${darkMode ? "dark-mode" : ""}`}>
      {/* Dark Mode Button */}
      <button className="dark-mode-button" onClick={toggleDarkMode}>
        {darkMode ? "☀️ Light Mode" : "🌙 Dark Mode"}
      </button>

      <div className="login-left">
        {/* Logo placed next to the title */}
        <div className="login-title">
          <img
            src="/images/logo.webp"
            alt="Positive Affirmations Logo"
            className="logo-image"
          />
          Positive Affirmations
        </div>

        <img
          src="/images/affirmation.png"
          alt="Affirmation"
          className="login-image"
        />
      </div>

      <div className="login-right">
        <h1>Create Account</h1>
        <p>Enter information to create an account!</p>
        <form className="login-form">
          <div className="form-group">
            <label>Username</label>
            <input
              type="text"
              placeholder="Enter your username"
              onChange={(e) => setUserName(e.target.value)}
            />
          </div>
          <div className="form-group">
            <label>Email</label>
            <input
              type="email"
              placeholder="Enter your email"
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          <div className="form-group">
            <label>Password</label>
            <input
              type="password"
              placeholder="Enter your password"
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
          <div className="form-options">
            <a href="/" className="forgot-password">
              Return to login?
            </a>
          </div>
          <button type="submit" className="login-button" onClick={handleSubmit}>
            Register
          </button>
        </form>
        {/* <p>
          Don’t have an account? <a href="/register">Create new account</a>
        </p> */}
      </div>
    </div>
  );
};

export default Register;
