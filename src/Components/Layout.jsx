import React from 'react';
import { useLocation } from 'react-router-dom';
import Navbar from '../Components/Navbar/Navbar';

const Layout = ({ children }) => {
    const location = useLocation();
    const pathsWithNavbar = ['/login', '/register', '/forgot-password', '/reset-password', '/'];

    // Show Navbar only on specified paths
    const showNavbar = pathsWithNavbar.includes(location.pathname);

    return (
        <div>
            {showNavbar && <Navbar />}
            <main>
                {children}
            </main>
        </div>
    );
};

export default Layout;
