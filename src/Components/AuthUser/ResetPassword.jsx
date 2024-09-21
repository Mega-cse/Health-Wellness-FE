import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';

const ResetPassword = () => {
    const { token } = useParams(); // Get the token from URL params
    const [newPassword, setNewPassword] = useState('');
    const [error, setError] = useState(null);
    const [success, setSuccess] = useState(false);
    const navigate = useNavigate(); // Hook for navigation

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await fetch(`https://health-wellness-be-3.onrender.com/api/auth/reset-password/${token}`, {
                method: 'PUT', // Ensure method matches backend expectations
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ newPassword }),
            });

            if (!response.ok) {
                const errorData = await response.json();
                throw new Error(errorData.message || 'Network response was not ok');
            }

            setSuccess(true);
            setTimeout(() => {
                navigate('/login'); // Redirect to login page after success
            }, 2000); // Delay to allow user to see success message
        } catch (error) {
            setError(error.message);
        }
    };

    // Inline styles
    const containerStyle = {
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        height: '100vh', // Full viewport height
        margin: 0,
        backgroundColor: '#f4f4f4',
    };

    const formStyle = {
        backgroundColor: '#fff',
        borderRadius: '8px',
        boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
        padding: '2rem',
        maxWidth: '400px',
        width: '100%',
        boxSizing: 'border-box',
        textAlign: 'center'
    };

    const inputStyle = {
        width: '100%',
        padding: '0.75rem',
        marginBottom: '1rem',
        border: '1px solid #ddd',
        borderRadius: '4px',
        boxSizing: 'border-box'
    };

    const buttonStyle = {
        width: '100%',
        padding: '0.75rem',
        backgroundColor: '#007bff',
        border: 'none',
        color: '#fff',
        borderRadius: '4px',
        cursor: 'pointer',
        fontSize: '1rem',
        transition: 'background-color 0.3s ease',
    };

    const buttonHoverStyle = {
        backgroundColor: '#0056b3'
    };

    const errorStyle = {
        color: 'red',
        marginTop: '0.5rem'
    };

    const successStyle = {
        color: 'green',
        marginTop: '0.5rem'
    };

    return (
        <div style={containerStyle}>
            <div style={formStyle}>
                <h1>Reset Password</h1>
                <form onSubmit={handleSubmit}>
                    <div>
                        <label htmlFor="newPassword">New Password:</label>
                        <input
                            type="password"
                            id="newPassword"
                            value={newPassword}
                            onChange={(e) => setNewPassword(e.target.value)}
                            required
                            style={inputStyle}
                        />
                    </div>
                    <button
                        type="submit"
                        style={buttonStyle}
                        onMouseOver={(e) => e.currentTarget.style.backgroundColor = buttonHoverStyle.backgroundColor}
                        onMouseOut={(e) => e.currentTarget.style.backgroundColor = buttonStyle.backgroundColor}
                    >
                        Reset Password
                    </button>
                </form>
                {error && <div style={errorStyle}>Error: {error}</div>}
                {success && <div style={successStyle}>Password reset successful! Redirecting to login...</div>}
            </div>
        </div>
    );
};

export default ResetPassword;
