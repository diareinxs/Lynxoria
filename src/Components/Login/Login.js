import React, { useState } from 'react';
import './Login.css';

const validateUsername = (username) => {
    if (!username.trim()) {
        return 'Username is required.';
    }
    if (username.trim().length < 3) {
        return 'Username must be at least 3 characters.';
    }
    return '';
};

const validatePassword = (password) => {
    if (!password) {
        return 'Password is required.';
    }
    if (password.length < 6) {
        return 'Password must be at least 6 characters.';
    }
    return '';
};

const Login = ({ onLoginSuccess, onForgotPassword, onSignUp }) => {
    const [showPassword, setShowPassword] = useState(false);
    const [username, setUsername] = useState('JohnDoe');
    const [password, setPassword] = useState('JohnDoePassword123');
    const [rememberMe, setRememberMe] = useState(false);
    const [newErrors, setNewErrors] = useState({ username: '', password: '' });

    const togglePasswordVisibility = () => {
        setShowPassword(!showPassword);
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        // Use validation functions
        const usernameError = validateUsername(username);
        const passwordError = validatePassword(password);

        let errors = {
            username: usernameError,
            password: passwordError,
        };

        // Verify hardcoded credentials
        if (!usernameError && !passwordError) {
            if (username !== 'JohnDoe' || password !== 'JohnDoePassword123') {
                errors = {
                    ...errors,
                    password: 'Invalid username or password.',
                };
                setNewErrors(errors);
                return; // Stop submission if credentials do not match
            }
        }

        setNewErrors(errors);

        if (usernameError || passwordError) {
            return; // Stop submission if validation errors exist
        }

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
            />
            </div>
            {newErrors.username && <div className="error-message">{newErrors.username}</div>}

            <label htmlFor="password">Password</label>
            <div className="password-input-wrapper">
            <input
                id="password"
                type={showPassword ? 'text' : 'password'}
                placeholder="Enter your password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
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
            {newErrors.password && <div className="error-message">{newErrors.password}</div>}

            <div className="options-row">
            <label className="remember-me">
                <input
                type="checkbox"
                checked={rememberMe}
                onChange={() => setRememberMe(!rememberMe)}
                />
                    Remember me
            </label>
            <button type="button" className="forgot-password" onClick={onForgotPassword}>Forgot Password </button>
            </div>

            <button type="submit" className="sign-in-button">Sign In</button>

            <p className="signup-prompt">
            Don&apos;t have an account? <button type="button" className="signup-link" onClick={onSignUp}> Sign Up</button>
            </p>
        </form>
        </div>
    );
    };

export default Login;