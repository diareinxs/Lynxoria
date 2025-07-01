import React, { useState } from "react";
import "./sign_up.css";

const SignUp = ({ onSignUpSuccess }) => {
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const [errors, setErrors] = useState({});

  // New state variables for password visibility
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const validate = () => {
    const newErrors = {};

    if (!formData.username.trim()) {
      newErrors.username = "Username is required";
    }

    if (!formData.email.trim()) {
      newErrors.email = "Email is required";
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = "Email is invalid";
    }

    if (!formData.password) {
      newErrors.password = "Password is required";
    } else if (formData.password.length < 6) {
      newErrors.password = "Password must be at least 6 characters";
    }

    if (!formData.confirmPassword) {
      newErrors.confirmPassword = "Confirm Password is required";
    } else if (formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = "Passwords do not match";
    }

    setErrors(newErrors);

    return Object.keys(newErrors).length === 0;
  };

  const handleChange = (e) => {
    setFormData({...formData, [e.target.name]: e.target.value});
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validate()) {
      // Here you can add further sign-up logic, e.g., API call
      alert("Sign Up Successful!");
      if (onSignUpSuccess) {
        onSignUpSuccess();
      }
      setFormData({
        username: "",
        email: "",
        password: "",
        confirmPassword: "",
      });
      setErrors({});
    }
  };

  return (
    <div className="sign-up-container">
      <button
        type="button"
        className="back-button"
        onClick={() => {
          if (typeof window !== "undefined" && window.location) {
            window.location.href = "/login";
          }
        }}
        aria-label="Go back to login"
      >
        &#8592;
      </button>

      <form className="sign-up-form" onSubmit={handleSubmit} noValidate>
        <h2>Create Account</h2>
        <div className="form-group">
          <label htmlFor="username">Username</label>
          <input 
            type="text" 
            id="username" 
            name="username" 
            value={formData.username} 
            onChange={handleChange} 
            className={errors.username ? "input-error" : ""}
            placeholder="Enter your username"
          />
          {errors.username && <span className="error">{errors.username}</span>}
        </div>

        <div className="form-group">
          <label htmlFor="email">Email</label>
          <input 
            type="email" 
            id="email" 
            name="email" 
            value={formData.email} 
            onChange={handleChange} 
            className={errors.email ? "input-error" : ""}
            placeholder="Enter your email"
          />
          {errors.email && <span className="error">{errors.email}</span>}
        </div>

        <div className="form-group password-input-container">
          <label htmlFor="password">Password</label>
          <input 
            type={showPassword ? "text" : "password"} 
            id="password" 
            name="password" 
            value={formData.password} 
            onChange={handleChange} 
            className={errors.password ? "input-error" : ""}
            placeholder="Enter your password"
          />
          <button
            type="button"
            className="password-toggle-button"
            onClick={() => setShowPassword(!showPassword)}
            aria-label={showPassword ? "Hide password" : "Show password"}
          >
            {showPassword ? (
              // Eye closed SVG
              <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
                <path d="M1 10C2.73 5.61 6.36 3 10 3c3.64 0 7.27 2.61 9 7-1.73 4.39-5.36 7-9 7-3.64 0-7.27-2.61-9-7z" stroke="#333" strokeWidth="2" fill="none"/>
                <circle cx="10" cy="10" r="3" stroke="#333" strokeWidth="2" fill="none"/>
                <line x1="4" y1="16" x2="16" y2="4" stroke="#333" strokeWidth="2"/>
              </svg>
            ) : (
              // Eye open SVG
              <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
                <path d="M1 10C2.73 5.61 6.36 3 10 3c3.64 0 7.27 2.61 9 7-1.73 4.39-5.36 7-9 7-3.64 0-7.27-2.61-9-7z" stroke="#333" strokeWidth="2" fill="none"/>
                <circle cx="10" cy="10" r="3" stroke="#333" strokeWidth="2" fill="none"/>
              </svg>
            )}
          </button>
          {errors.password && <span className="error">{errors.password}</span>}
        </div>

        <div className="form-group password-input-container">
          <label htmlFor="confirmPassword">Confirm Password</label>
          <input 
            type={showConfirmPassword ? "text" : "password"} 
            id="confirmPassword" 
            name="confirmPassword" 
            value={formData.confirmPassword} 
            onChange={handleChange} 
            className={errors.confirmPassword ? "input-error" : ""}
            placeholder="Confirm your password"
          />
          <button
            type="button"
            className="password-toggle-button"
            onClick={() => setShowConfirmPassword(!showConfirmPassword)}
            aria-label={showConfirmPassword ? "Hide confirm password" : "Show confirm password"}
          >
            {showConfirmPassword ? (
              // Eye closed SVG
              <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
                <path d="M1 10C2.73 5.61 6.36 3 10 3c3.64 0 7.27 2.61 9 7-1.73 4.39-5.36 7-9 7-3.64 0-7.27-2.61-9-7z" stroke="#333" strokeWidth="2" fill="none"/>
                <circle cx="10" cy="10" r="3" stroke="#333" strokeWidth="2" fill="none"/>
                <line x1="4" y1="16" x2="16" y2="4" stroke="#333" strokeWidth="2"/>
              </svg>
            ) : (
              // Eye open SVG
              <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
                <path d="M1 10C2.73 5.61 6.36 3 10 3c3.64 0 7.27 2.61 9 7-1.73 4.39-5.36 7-9 7-3.64 0-7.27-2.61-9-7z" stroke="#333" strokeWidth="2" fill="none"/>
                <circle cx="10" cy="10" r="3" stroke="#333" strokeWidth="2" fill="none"/>
              </svg>
            )}
          </button>
          {errors.confirmPassword && <span className="error">{errors.confirmPassword}</span>}
        </div>

        <button type="submit" className="sign-up-button">Sign Up</button>
      </form>
    </div>
  );
};

export default SignUp;
