import React, { useState } from "react";
import "../static/login.css";

const Login = () => {
    const [darkMode, setDarkMode] = useState(false);

    const toggleDarkMode = () => {
        setDarkMode(!darkMode);
    };

    return (
        <div className={`login-container ${darkMode ? 'dark-mode' : ''}`}>
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
                <h1>Welcome Back</h1>
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
