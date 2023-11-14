import React, { useState, useEffect } from 'react';
import axios from 'axios';

const UserProfileForm = ({ username }) => {
  const [role, setRole] = useState('');
  const [bio, setBio] = useState('');

  useEffect(() => {
    // Fetch existing user profile data for editing
    const fetchUserProfile = async () => {
      try {
        const response = await axios.get(`http://127.0.0.1:8000/read_user_profile/${username}`);
        const userProfileData = response.data;
        setRole(userProfileData.role);
        setBio(userProfileData.bio);
      } catch (error) {
        console.error('Error fetching user profile:', error);
      }
    };

    if (username) {
      fetchUserProfile();
    }
  }, [username]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const formData = { username, role, bio };
      const response = await axios.put(`http://127.0.0.1:8000/update_user_profile/${username}`, formData);

      console.log('User profile updated:', response.data);
      // You can add a success message or redirect the user to another page
    } catch (error) {
      console.error('Error updating user profile:', error);
      // Handle error, show a message, etc.
    }
  };

  const handleDelete = async () => {
    try {
      const response = await axios.delete(`http://localhost:8000/delete_user_profile/${username}`);
      console.log('User profile deleted:', response.data);
      // Handle success, show a message, redirect, etc.
    } catch (error) {
      console.error('Error deleting user profile:', error);
      // Handle error, show a message, etc.
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <label>
        Role:
        <input type="text" value={role} onChange={(e) => setRole(e.target.value)} />
      </label>
      <br />
      <label>
        Bio:
        <textarea value={bio} onChange={(e) => setBio(e.target.value)} />
      </label>
      <br />
      <div className='buttonSect'>

      <button type="submit">Update Profile</button>
      {username && (
        <button type="button" onClick={handleDelete} style={{ marginLeft: '10px', color: 'red' }}>
          Delete Profile
        </button>
      )}
      </div>
    </form>
  );
};

export default UserProfileForm;
