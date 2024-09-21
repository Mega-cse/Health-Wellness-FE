import { BrowserRouter, Route, Routes, Navigate } from 'react-router-dom';
import Layout from './Components/Layout';
import HomePage from './Components/HomePage/HomePage';
import Login from './Components/AuthUser/Login';
import Register from './Components/AuthUser/Register';
import ForgetPassword from './Components/AuthUser/ForgetPassword';
import ResetPassword from './Components/AuthUser/ResetPassword';
import AdminRoutes from './Components/AdminDashboard/AdminRoutes';
import UserRoutes from './Components/UserDashboard/UserRoutes';
import { useState, useEffect } from 'react';
import YogaDetails from './Components/HomePage/YogaDetails';
import Dashboard from './Components/Nutrtion/Dashboard';

function App() {
  const [user, setUser] = useState(() => {
    // Check localStorage for user data
    const savedUser = localStorage.getItem('user');
    return savedUser ? JSON.parse(savedUser) : null;
  });

  useEffect(() => {
    // Save user to localStorage whenever it changes
    if (user) {
      localStorage.setItem('user', JSON.stringify(user));
    } else {
      localStorage.removeItem('user');
    }
  }, [user]);

  return (
    <BrowserRouter>
      <Routes>
        {/* General Routes */}
        <Route path="/" element={<Layout><HomePage /></Layout>} />
        <Route path="/yoga-details" element={<Layout><YogaDetails /></Layout>} />
        <Route path="/login" element={<Layout><Login setUser={setUser} /></Layout>} />
        <Route path="/register" element={<Layout><Register /></Layout>} />
        <Route path="/forgot-password" element={<Layout><ForgetPassword /></Layout>} />
        <Route path="/reset-password/:token" element={<Layout><ResetPassword /></Layout>} />

        {/* Role-based Redirects */}
        {user ? (
          <>
            <Route path="/nutrition-dashboard" element={<Layout><Dashboard /></Layout>} />
            {user.role === 'admin' ? (
              <Route path="/*" element={<AdminRoutes />} />
            ) : (
              <Route path="/*" element={<UserRoutes />} />
            )}
          </>
        ) : (
          // Redirect to login if not authenticated
          <Route path="/*" element={<Navigate to="/login" />} />
        )}
      </Routes>
    </BrowserRouter>
  );
}

export default App;
