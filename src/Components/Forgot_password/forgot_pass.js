import React, { useState } from 'react';
import './forgot_pass.css';

const ForgotPass = ({ onBackToLogin }) => {
    const [email, setEmail] = useState('');
    const [message, setMessage] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();
        // Simulate sending forgot password email
        if (email) {
            setMessage(`If an account with email ${email} exists, a password reset link has been sent.`);
        } else {
            setMessage('Please enter a valid email address.');
        }
    };

    return (
        <div className="forgot-pass-container">
            <button className="back-button top" onClick={onBackToLogin}>
                &#8592;
            </button>
            
            <h2>Forgot Password</h2>
            <form onSubmit={handleSubmit} className="forgot-pass-form">
                <label htmlFor="email">Email Address</label>
                <input
                    id="email"
                    type="email"
                    placeholder="Enter your email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                />
                <button type="submit" className="submit-button">Send Reset Link</button>
            </form>
            {message && <p className="message">{message}</p>}
        </div>
    );
};

export default ForgotPass;
