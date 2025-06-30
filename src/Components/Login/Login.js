import React, { useState } from 'react';
import './Login.css';

const Login = ({ onLoginSuccess, onForgotPassword }) => {
    const [showPassword, setShowPassword] = useState(false);
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [rememberMe, setRememberMe] = useState(false);

    const togglePasswordVisibility = () => {
        setShowPassword(!showPassword);
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        // Handle login logic here
        console.log({ username, password, rememberMe });
        // For now, simulate successful login
        if (onLoginSuccess) {
        onLoginSuccess();
        }
    };

    return (
        <div className="login-container">
        <form className="login-form" onSubmit={handleSubmit}>
            <h2>Login to Lynxoria</h2>
            <label htmlFor="username">Username</label>
            <div className="password-input-wrapper">
            <input
                id="username"
                type="text"
                placeholder="Enter your username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                required
            />
            </div>

            <label htmlFor="password">Password</label>
            <div className="password-input-wrapper">
            <input
                id="password"
                type={showPassword ? 'text' : 'password'}
                placeholder="Enter your password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
            />
            <span
                className={`password-toggle ${showPassword ? 'show' : ''}`}
                onClick={togglePasswordVisibility}
                role="button"
                tabIndex={0}
                aria-label="Toggle password visibility"
                onKeyPress={(e) => {
                if (e.key === 'Enter' || e.key === ' ') togglePasswordVisibility();
                }}
            >
                {showPassword ? (
                    // Eye open SVG
                    <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
                        <path d="M1 10C2.73 5.61 6.36 3 10 3c3.64 0 7.27 2.61 9 7-1.73 4.39-5.36 7-9 7-3.64 0-7.27-2.61-9-7z" stroke="#333" strokeWidth="2" fill="none"/>
                        <circle cx="10" cy="10" r="3" stroke="#333" strokeWidth="2" fill="none"/>
                    </svg>
                ) : (
                    // Eye closed SVG
                    <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
                        <path d="M1 10C2.73 5.61 6.36 3 10 3c3.64 0 7.27 2.61 9 7-1.73 4.39-5.36 7-9 7-3.64 0-7.27-2.61-9-7z" stroke="#333" strokeWidth="2" fill="none"/>
                        <circle cx="10" cy="10" r="3" stroke="#333" strokeWidth="2" fill="none"/>
                        <line x1="4" y1="16" x2="16" y2="4" stroke="#333" strokeWidth="2"/>
                    </svg>
                )}
            </span>
            </div>

            <div className="options-row">
            <label className="remember-me">
                <input
                type="checkbox"
                checked={rememberMe}
                onChange={() => setRememberMe(!rememberMe)}
                />
                Remember me
            </label>
            <button type="button" className="forgot-password" onClick={onForgotPassword}>Forgot Password?</button>
            </div>

            <button type="submit" className="sign-in-button">Sign In</button>

            <p className="signup-prompt">
            Don&apos;t have an account? <a href="#"> Sign Up</a>
            </p>
        </form>
        </div>
    );
    };

export default Login;