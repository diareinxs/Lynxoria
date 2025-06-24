import React, { useState } from "react";
import "./Login.css";

// Main Login component encapsulating all authentication views
const Login = (props) => {
    // State to manage which form is currently visible
    const [currentView, setCurrentView] = useState('login'); // 'login', 'signup', 'forgotPassword'

    // State for login form
    const [loginUsername, setLoginUsername] = useState('');
    const [loginPassword, setLoginPassword] = useState('');
    const [showLoginPassword, setShowLoginPassword] = useState(false);

    // State for signup form
    const [signupUsername, setSignupUsername] = useState('');
    const [signupEmail, setSignupEmail] = useState('');
    const [signupPassword, setSignupPassword] = useState('');
    const [signupConfirmPassword, setSignupConfirmPassword] = useState('');
    const [showSignupPassword, setShowSignupPassword] = useState(false);
    const [showSignupConfirmPassword, setShowSignupConfirmPassword] = useState(false);

    // State for forgot password form
    const [forgotEmail, setForgotEmail] = useState('');

    // --- Handlers for form submissions ---
    const handleLoginSubmit = (e) => {
        e.preventDefault();
        // Your login logic here.
        console.log(`Logging in with Username: ${loginUsername}, Password: ${loginPassword}`);
        // In a real app, you would send this to an authentication API
        alert("Login functionality would be implemented here!"); // Retaining alert as per user's original code pattern.
    };

    const handleSignupSubmit = (e) => {
        e.preventDefault();
        // Your signup logic here
        if (signupPassword !== signupConfirmPassword) {
            alert("Passwords do not match!");
            return;
        }
        console.log(`Signing up with Username: ${signupUsername}, Email: ${signupEmail}, Password: ${signupPassword}`);
        // In a real app, you would send this to a registration API
        alert("Sign Up functionality would be implemented here!");
    };

    const handleForgotPasswordSubmit = (e) => {
        e.preventDefault();
        // Your forgot password logic here
        console.log(`Sending password reset to Email: ${forgotEmail}`);
        // In a real app, you would send this to a password reset API
        alert("Password reset functionality would be implemented here!");
    };

    // --- Password visibility toggle function ---
    const togglePasswordVisibility = (fieldSetter, currentVisibility) => {
        fieldSetter(!currentVisibility);
    };

    // SVG icons for password visibility (eye open/closed)
    // These are simple functional components for reusability.
    const EyeOpenIcon = () => (
        <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{ display: 'block' }}>
            <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"></path>
            <circle cx="12" cy="12" r="3"></circle>
        </svg>
    );

    const EyeClosedIcon = () => (
        <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{ display: 'block' }}>
            <path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19m-6.72-1.07a3 3 0 1 1-4.24-4.24"></path>
            <line x1="1" y1="1" x2="23" y2="23"></line>
        </svg>
    );

    return (
        <div className="flex justify-center items-center min-h-screen p-5 bg-primary text-secondary">
            {/* The CSS for styling is external and would be imported (e.g., './Login.css'). */}
            {/* Tailwind CSS CDN and Google Fonts are linked here for standalone preview purposes.
                In a typical React project, these would be in the public/index.html or handled by a build tool. */}
            <link href="https://fonts.googleapis.com/css2?family=Bodoni+Moda&family=Poppins:wght@300;400;500;600;700&display=swap" rel="stylesheet" />
            <script src="https://cdn.tailwindcss.com"></script>

            <div className="auth-card p-8 md:p-12 rounded-lg max-w-sm w-full">

                {/* Login Form */}
                {currentView === 'login' && (
                    <div id="login-form">
                        <h2 className="text-3xl font-semibold text-secondary mb-6 text-center heading-font">Login to Lynxoria</h2>
                        <form onSubmit={handleLoginSubmit}>
                            <div className="mb-4">
                                <label htmlFor="login-username" className="block text-secondary text-sm font-medium mb-2">Username</label>
                                <input
                                    type="text"
                                    id="login-username"
                                    name="username"
                                    className="input-field rounded-md w-full py-2 px-3 leading-tight transition duration-200"
                                    placeholder="Enter your username"
                                    aria-label="Username"
                                    value={loginUsername}
                                    onChange={(e) => setLoginUsername(e.target.value)}
                                    required
                                />
                            </div>

                            <div className="mb-6 relative">
                                <label htmlFor="login-password" className="block text-secondary text-sm font-medium mb-2">Password</label>
                                <input
                                    type={showLoginPassword ? 'text' : 'password'}
                                    id="login-password"
                                    name="password"
                                    className="input-field rounded-md w-full py-2 px-3 leading-tight transition duration-200 pr-10"
                                    placeholder="Enter your password"
                                    aria-label="Password"
                                    value={loginPassword}
                                    onChange={(e) => setLoginPassword(e.target.value)}
                                    required
                                />
                                <span className="password-toggle" onClick={() => togglePasswordVisibility(setShowLoginPassword, showLoginPassword)}>
                                    {showLoginPassword ? <EyeClosedIcon /> : <EyeOpenIcon />}
                                </span>
                            </div>

                            <div className="flex items-center justify-between mb-6">
                                <label className="flex items-center text-secondary text-sm">
                                    <input
                                        type="checkbox"
                                        className="form-checkbox h-4 w-4 rounded border-secondary focus:ring-secondary mr-2"
                                        style={{ color: 'var(--secondary-color)', backgroundColor: 'var(--primary-color)' }}
                                    />
                                    Remember me
                                </label>
                                <a href="#" onClick={(e) => { e.preventDefault(); setCurrentView('forgotPassword'); }} className="inline-block align-baseline font-medium text-secondary text-sm hover:text-white transition duration-200">
                                    Forgot Password?
                                </a>
                            </div>

                            <button
                                type="submit"
                                className="w-full button-primary font-bold py-2 px-4 rounded-md focus:outline-none focus:ring-2 focus:ring-secondary focus:ring-opacity-75 ease-in-out"
                            >
                                Sign In
                            </button>
                        </form>

                        <p className="text-center text-secondary text-xs mt-6">
                            Don't have an account?
                            <a href="#" onClick={(e) => { e.preventDefault(); setCurrentView('signup'); }} className="text-secondary hover:text-white transition duration-200">Sign Up</a>
                        </p>
                    </div>
                )}

                {/* Sign Up Form */}
                {currentView === 'signup' && (
                    <div id="signup-form">
                        <h2 className="text-3xl font-semibold text-secondary mb-6 text-center heading-font">Create Your Account</h2>
                        <form onSubmit={handleSignupSubmit}>
                            <div className="mb-4">
                                <label htmlFor="signup-username" className="block text-secondary text-sm font-medium mb-2">Username</label>
                                <input
                                    type="text"
                                    id="signup-username"
                                    name="username"
                                    className="input-field rounded-md w-full py-2 px-3 leading-tight transition duration-200"
                                    placeholder="Choose a username"
                                    aria-label="Username"
                                    value={signupUsername}
                                    onChange={(e) => setSignupUsername(e.target.value)}
                                    required
                                />
                            </div>

                            <div className="mb-4">
                                <label htmlFor="signup-email" className="block text-secondary text-sm font-medium mb-2">Email</label>
                                <input
                                    type="email"
                                    id="signup-email"
                                    name="email"
                                    className="input-field rounded-md w-full py-2 px-3 leading-tight transition duration-200"
                                    placeholder="Enter your email"
                                    aria-label="Email"
                                    value={signupEmail}
                                    onChange={(e) => setSignupEmail(e.target.value)}
                                    required
                                />
                            </div>

                            <div className="mb-4 relative">
                                <label htmlFor="signup-password" className="block text-secondary text-sm font-medium mb-2">Password</label>
                                <input
                                    type={showSignupPassword ? 'text' : 'password'}
                                    id="signup-password"
                                    name="password"
                                    className="input-field rounded-md w-full py-2 px-3 leading-tight transition duration-200 pr-10"
                                    placeholder="Create a password"
                                    aria-label="Password"
                                    value={signupPassword}
                                    onChange={(e) => setSignupPassword(e.target.value)}
                                    required
                                />
                                <span className="password-toggle" onClick={() => togglePasswordVisibility(setShowSignupPassword, showSignupPassword)}>
                                    {showSignupPassword ? <EyeClosedIcon /> : <EyeOpenIcon />}
                                </span>
                            </div>

                            <div className="mb-6 relative">
                                <label htmlFor="signup-confirm-password" className="block text-secondary text-sm font-medium mb-2">Confirm Password</label>
                                <input
                                    type={showSignupConfirmPassword ? 'text' : 'password'}
                                    id="signup-confirm-password"
                                    name="confirm-password"
                                    className="input-field rounded-md w-full py-2 px-3 leading-tight transition duration-200 pr-10"
                                    placeholder="Confirm your password"
                                    aria-label="Confirm Password"
                                    value={signupConfirmPassword}
                                    onChange={(e) => setSignupConfirmPassword(e.target.value)}
                                    required
                                />
                                <span className="password-toggle" onClick={() => togglePasswordVisibility(setShowSignupConfirmPassword, showSignupConfirmPassword)}>
                                    {showSignupConfirmPassword ? <EyeClosedIcon /> : <EyeOpenIcon />}
                                </span>
                            </div>

                            <button
                                type="submit"
                                className="w-full button-primary font-bold py-2 px-4 rounded-md focus:outline-none focus:ring-2 focus:ring-secondary focus:ring-opacity-75 ease-in-out mb-4"
                            >
                                Sign Up
                            </button>
                        </form>

                        <p className="text-center text-secondary text-xs mt-6">
                            Already have an account?
                            <a href="#" onClick={(e) => { e.preventDefault(); setCurrentView('login'); }} className="text-secondary hover:text-white transition duration-200">Sign In</a>
                        </p>
                    </div>
                )}

                {/* Forgot Password Form */}
                {currentView === 'forgotPassword' && (
                    <div id="forgot-password-form">
                        <h2 className="text-3xl font-semibold text-secondary mb-6 text-center heading-font">Forgot Your Password?</h2>
                        <form onSubmit={handleForgotPasswordSubmit}>
                            <div className="mb-4">
                                <label htmlFor="forgot-email" className="block text-secondary text-sm font-medium mb-2">Email Address</label>
                                <input
                                    type="email"
                                    id="forgot-email"
                                    name="email"
                                    className="input-field rounded-md w-full py-2 px-3 leading-tight transition duration-200"
                                    placeholder="Enter your email address"
                                    aria-label="Email Address"
                                    value={forgotEmail}
                                    onChange={(e) => setForgotEmail(e.target.value)}
                                    required
                                />
                            </div>

                            <button
                                type="submit"
                                className="w-full button-primary font-bold py-2 px-4 rounded-md focus:outline-none focus:ring-2 focus:ring-secondary focus:ring-opacity-75 ease-in-out mb-4"
                            >
                                Reset Password
                            </button>
                        </form>

                        <p className="text-center text-secondary text-xs mt-6">
                            Remembered your password?
                            <a href="#" onClick={(e) => { e.preventDefault(); setCurrentView('login'); }} className="text-secondary hover:text-white transition duration-200">Back to Sign In</a>
                        </p>
                    </div>
                )}
            </div>
        </div>
    );
};

export default Login;

//const Login = () => {
//    const [username, setUsername] = useState("");
//    const [password, setPassword] = useState("");
//
//    const handleSubmit = (e) => {
//    e.preventDefault();
//    // Add your login logic here
//    alert(`Username: ${username}\nPassword: ${password}`);
//    };
//
//    return (
//    <div className="login-container">
//    <form className="login-form" onSubmit={handleSubmit}>
//        <h2>Login</h2>
//        <input
//            type="text"
//            placeholder="Username"
//            value={username}
//            onChange={e => setUsername(e.target.value)}
//            required
//        />
//        <input
//            type="password"
//            placeholder="Password"
//            value={password}
//            onChange={e => setPassword(e.target.value)}
//            required
//        />
//        <button type="submit">Login</button>
//        </form>
//    </div>
//    );
//};
//
//export default Login;