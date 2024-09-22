import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import './UserDashboard.css';

const Profile = () => {
  const [user, setUser] = useState({});
  const [updates, setUpdates] = useState({});
  const [image, setImage] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchUserProfile = async () => {
      try {
        const response = await axios.get('https://health-wellness-be-3.onrender.com/api/auth/profile', { withCredentials: true });
        setUser(response.data.user);
        setUpdates(response.data.user);
      } catch (error) {
        console.error('Error fetching user profile:', error);
      }
    };

    fetchUserProfile();
  }, []);

  const handleChange = (e) => {
    setUpdates({
      ...updates,
      [e.target.name]: e.target.value,
    });
  };

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    setImage(URL.createObjectURL(file)); // Create a URL for the uploaded image
  };

  const handleUpdate = async () => {
    const formData = new FormData();
    formData.append('profilePicture', image); // Use the selected image file
    formData.append('username', updates.username);
    formData.append('email', updates.email);
    formData.append('age', updates.age);
    formData.append('location', updates.location);

    try {
      await axios.put(`https://health-wellness-be-3.onrender.com/api/auth/profile/update/${user._id}`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
        withCredentials: -true,
      });
      
      alert('Profile updated successfully!');
    } catch (error) {
      console.error('Error updating profile:', error);
      alert('Failed to update profile: ' + error.message);
    }
  };

  return (
    <div style={{
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      minHeight: '100vh',
      padding: '20px',
      backgroundColor: '#f9f9f9'
    }}>
      <h2>User Profile</h2>
      <div style={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        border: '1px solid #ddd',
        borderRadius: '10px',
        padding: '20px',
        backgroundColor: '#fff',
        boxShadow: '0 2px 10px rgba(0, 0, 0, 0.1)',
        width: '100%',
        maxWidth: '400px',
        margin: '20px 0'
      }}>
        <img 
          src={image || user.profilePicture || 'default-avatar.png'} 
          alt="Profile" 
          style={{
            width: '150px',
            height: '150px',
            objectFit: 'cover',
            borderRadius: '50%',
            border: '2px solid #007bff',
            marginBottom: '15px'
          }} 
        />
        <div>
       
          <input type="file" onChange={handleImageUpload} />
          <input 
            type="text" 
            name="username" 
            value={updates.username} 
            onChange={handleChange} 
            placeholder="Update Username" 
            style={{ width: '100%', padding: '10px', margin: '10px 0', border: '1px solid #ccc', borderRadius: '5px' }}
          />
          <input 
            type="email" 
            name="email" 
            value={updates.email} 
            onChange={handleChange} 
            placeholder="Update Email" 
            style={{ width: '100%', padding: '10px', margin: '10px 0', border: '1px solid #ccc', borderRadius: '5px' }}
          />
          <input 
            type="number" 
            name="age" 
            value={updates.age} 
            onChange={handleChange} 
            placeholder="Update Age" 
            style={{ width: '100%', padding: '10px', margin: '10px 0', border: '1px solid #ccc', borderRadius: '5px' }}
          />
          <input 
            type="text" 
            name="location" 
            value={updates.location} 
            onChange={handleChange} 
            placeholder="Update Location" 
            style={{ width: '100%', padding: '10px', margin: '10px 0', border: '1px solid #ccc', borderRadius: '5px' }}
          />
          <button 
            onClick={handleUpdate} 
            style={{
              padding: '10px 15px',
              border: 'none',
              borderRadius: '5px',
              backgroundColor: '#007bff',
              color: 'white',
              fontSize: '16px',
              cursor: 'pointer',
              marginTop: '10px'
            }}
          >
            Update
          </button>
        </div>
      </div>
      <button 
        onClick={() => navigate('/user/user-dashboard')} 
        style={{
          padding: '10px 15px',
          border: 'none',
          borderRadius: '5px',
          backgroundColor: '#007bff',
          color: 'white',
          fontSize: '16px',
          cursor: 'pointer',
          marginTop: '10px'
        }}
      >
        Back to Dashboard
      </button>
    </div>
  );
};

export default Profile;
