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
    const savedUser = localStorage.getItem('user');
    return savedUser ? JSON.parse(savedUser) : null;
  });

  const [token, setToken] = useState(() => {
    const savedToken = localStorage.getItem('token');
    return savedToken ? savedToken : null;
  });

  useEffect(() => {
    if (user) {
      localStorage.setItem('user', JSON.stringify(user));
      localStorage.setItem('token', token);
    } else {
      localStorage.removeItem('user');
      localStorage.removeItem('token');
    }
  }, [user, token]);

  const handleLogin = (userData, tokenData) => {
    setUser(userData);
    setToken(tokenData);
  };

  const isAdmin = user && user.role === 'admin';

  return (
    <BrowserRouter>
      <Layout>
        <Routes>
          {/* General Routes */}
          <Route path="/" element={<HomePage />} />
          <Route path="/yoga-details" element={<YogaDetails />} />
          <Route path="/login" element={<Login setUser={handleLogin} />} />
          <Route path="/register" element={<Register />} />
          <Route path="/forgot-password" element={<ForgetPassword />} />
          <Route path="/reset-password/:token" element={<ResetPassword />} />

          {/* Protected Routes */}
          {user ? (
            <>
              <Route path="/nutrition-dashboard" element={<Dashboard />} />
              {isAdmin ? (
                <Route path="/*" element={<AdminRoutes />} />
              ) : (
                <Route path="/*" element={<UserRoutes />} />
              )}
            </>
          ) : (
            <Route path="/*" element={<Navigate to="/login" />} />
          )}
        </Routes>
      </Layout>
    </BrowserRouter>
  );
}

export default App;
