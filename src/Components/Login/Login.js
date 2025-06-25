import React, { useState } from 'react';
import './Login.css';

const Login = ({ onLoginSuccess }) => {
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
            <input
            id="username"
            type="text"
            placeholder="Enter your username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
            />

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
                {showPassword ? '🙈' : '👁️'}
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
            <a href="#" className="forgot-password">Forgot Password?</a>
            </div>

            <button type="submit" className="sign-in-button">Sign In</button>

            <p className="signup-prompt">
            Don&apos;t have an account? <a href="#">Sign Up</a>
            </p>
        </form>
        </div>
    );
    };

export default Login;