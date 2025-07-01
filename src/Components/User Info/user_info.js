import React, { useState } from 'react';
import './user_info.css';

const UserInfo = ({ onClose }) => {
  const [user, setUser] = useState({
    username: 'JohnDoe',
    email: 'johndoe@example.com',
  });

  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState(user);

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
