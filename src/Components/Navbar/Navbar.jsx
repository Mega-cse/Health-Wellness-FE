import React from 'react';
import { Link } from 'react-router-dom';
import './Navbar.css'; // Ensure this path is correct

const Navbar = () => {
    return (
        <header className="navbar">
            <div className="navbar-container">
                <Link to="/" className="navbar-logo">Health & Wellness</Link>
                <div className="navbar-gap"></div>
                <div className="navbar-links">
                    <Link to="/login" className="navbar-button">Login</Link>
                    <Link to="/register" className="navbar-button">Register</Link>
                </div>
            </div>
        </header>
    );
};

export default Navbar;
