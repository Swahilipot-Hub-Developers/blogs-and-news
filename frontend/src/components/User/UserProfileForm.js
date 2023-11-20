import React, { useState, useEffect } from 'react';
import axios from 'axios';

const UserProfileForm = ({ user }) => {
  const [role, setRole] = useState('writer');
  const [bio, setBio] = useState('');
  // console.log(role,bio)
  useEffect(() => {
    // Fetch existing user profile data for editing
    const fetchUserProfile = async () => {
      try {
        const response = await axios.get(`http://127.0.0.1:8000/read_user_profile/`);
        const userProfileData = response.data;
        console.log(userProfileData)
        setRole(userProfileData.role);
        setBio(userProfileData.bio);
      } catch (error) {
        console.error('Error fetching user profile:', error);
      }
    };

    if (user.username) {
      fetchUserProfile();
    }
  }, [user.username]);

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

  const handleCreateSubmit = async (e) => {
    e.preventDefault();

    try {
      const formData = {user,role, bio};
      console.log(formData)
      const response = await axios.post(`http://127.0.0.1:8000/create_user_profile/`, formData);

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
    <>
      <label>
        Role:
        <input type="text" value={"writer"} onChange={(e) => setRole(e.target.value)} disabled={true}/>
      </label>
      <br />
      <label>
        Bio:
        <textarea value={bio} onChange={(e) => setBio(e.target.value)} />
      </label>
      <br />
      <div className='buttonSect'>

      <button type="button" onClick={handleCreateSubmit}>Create Profile</button>
      {user.username && (
        <button type="button" onClick={handleDelete} style={{ marginLeft: '10px', color: 'red' }}>
          Delete Profile
        </button>
      )}
      </div>
    </>
  );
};

export default UserProfileForm;
