import React from "react";
import "../static/login.css";

const Login = () => {
  return (
    <div className="login-container">
      <div className="login-left">
        <h1 className="login-title">Positive Affirmations</h1>
        <img
          src="/images/affirmation.png"
          alt="Affirmation"
          className="login-image"
        />
      </div>
      <div className="login-right">
        <h2>Welcome Back</h2>
        <p>Enter your email and password to access your account</p>
        <form className="login-form">
          <div className="form-group">
            <label>Email Address</label>
            <input type="email" placeholder="Enter your email" />
          </div>
          <div className="form-group">
            <label>Password</label>
            <input type="password" placeholder="Enter your password" />
          </div>
          <div className="form-options">
            <a href="/forgot-password" className="forgot-password">
              Forgot Password?
            </a>
          </div>
          <button type="submit" className="login-button">
            Login
          </button>
        </form>
        <p>
          Don’t have an account? <a href="/register">Create new account</a>
        </p>
      </div>
    </div>
  );
};

export default Login;
