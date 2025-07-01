import React, { useState } from 'react';
import './user_info.css';

const UserInfo = () => {
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

  const handleSaveClick = () => {
    setUser(formData);
    setIsEditing(false);
  };

  const handleCancelClick = () => {
    setIsEditing(false);
  };

  return (
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
          <button onClick={handleEditClick} className="edit-button">Edit</button>
        )}
      </div>
    </div>
  );
};

export default UserInfo;
