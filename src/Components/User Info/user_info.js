import React, { useState } from 'react';
import './user_info.css';

const UserInfo = ({ onClose }) => {
  const [user, setUser] = useState({
    username: 'JohnDoe',
    email: 'johndoe@example.com',
    password: 'JohnDoePassword',
  });

  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState(user);
  const [showPassword, setShowPassword] = useState(false);

  const handleEditClick = () => {
    setIsEditing(true);
    setFormData(user);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const [showOverlay, setShowOverlay] = useState(false);

  const handleSaveClick = () => {
    setShowOverlay(true);
  };

  const handleConfirmSave = () => {
    setUser(formData);
    setIsEditing(false);
    setShowOverlay(false);
  };

  const handleCancelSave = () => {
    setShowOverlay(false);
  };

  const handleCancelClick = () => {
    setIsEditing(false);
  };

  const togglePasswordVisibility = () => {
    setShowPassword((prev) => !prev);
  };

  return (
    <>
      <div className="user-info-container">
        <h2>User Information</h2>
        <div className="user-info-field">
          <label>Username:</label>
          {isEditing ? (
            <input
              type="text"
              name="username"
              value={formData.username}
              onChange={handleInputChange}
            />
          ) : (
            <span>{user.username}</span>
          )}
        </div>
        <div className="user-info-field">
          <label>Email:</label>
          {isEditing ? (
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleInputChange}
            />
          ) : (
            <span>{user.email}</span>
          )}
        </div>
        <div className="user-info-field password-field">
          <label>Password:</label>
          {isEditing ? (
            <div className="password-input-container">
              <div className="password-input-wrapper">
                <input
                  type={showPassword ? 'text' : 'password'}
                  name="password"
                  value={formData.password}
                  onChange={handleInputChange}
                />
                <button
                  type="button"
                  className="password-toggle-button"
                  onClick={togglePasswordVisibility}
                  aria-label={showPassword ? 'Hide password' : 'Show password'}
                >
                {showPassword ? (
                  <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
                    <path d="M1 10C2.73 5.61 6.36 3 10 3c3.64 0 7.27 2.61 9 7-1.73 4.39-5.36 7-9 7-3.64 0-7.27-2.61-9-7z" stroke="#333" strokeWidth="2" fill="none"/>
                    <circle cx="10" cy="10" r="3" stroke="#333" strokeWidth="2" fill="none"/>
                    <line x1="4" y1="16" x2="16" y2="4" stroke="#333" strokeWidth="2"/>
                  </svg>
                ) : (
                  <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
                    <path d="M1 10C2.73 5.61 6.36 3 10 3c3.64 0 7.27 2.61 9 7-1.73 4.39-5.36 7-9 7-3.64 0-7.27-2.61-9-7z" stroke="#333" strokeWidth="2" fill="none"/>
                    <circle cx="10" cy="10" r="3" stroke="#333" strokeWidth="2" fill="none"/>
                  </svg>
                )}
                </button>
              </div>
            </div>
          ) : (
            <span>{'*'.repeat(user.password.length)}</span>
          )}
        </div>
        <div className="user-info-buttons">
          {isEditing ? (
            <>
              <button onClick={handleSaveClick} className="save-button">Save</button>
              <button onClick={handleCancelClick} className="cancel-button">Cancel</button>
            </>
          ) : (
            <>
              <button onClick={handleEditClick} className="edit-button">Edit</button>
              <button onClick={onClose} className="back-button">&#8592;</button>
            </>
          )}
        </div>
      </div>
      {showOverlay && (
        <div className="overlay">
          <div className="overlay-content">
            <p>Do you want to save the changes?</p>
            <div className="overlay-buttons">
              <button onClick={handleConfirmSave} className="save-button">Yes</button>
              <button onClick={handleCancelSave} className="cancel-button">No</button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default UserInfo;
