import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Layout from './Components/Layout';
import HomePage from './Components/HomePage/HomePage';
import Login from './Components/AuthUser/Login';
import Register from './Components/AuthUser/Register';
import ForgetPassword from './Components/AuthUser/ForgetPassword';
import ResetPassword from './Components/AuthUser/ResetPassword';
import AdminRoutes from './Components/AdminDashboard/AdminRoutes';
import UserRoutes from './Components/UserDashboard/UserRoutes';
import Dashboard from './Components/Nutrtion/Dashboard';
import ProtectedRoute from './Components/ProtectedRoute';
import { useState, useEffect } from 'react';

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

  return (
    <BrowserRouter>
      <Layout>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/login" element={<Login setUser={setUser} setToken={setToken} />} />
          <Route path="/register" element={<Register />} />
          <Route path="/forgot-password" element={<ForgetPassword />} />
          <Route path="/reset-password/:token" element={<ResetPassword />} />
          <Route path="/user/*" element={<UserRoutes user={user} />} />
          <Route path="/admin/*" element={<AdminRoutes user={user} />} />
          <Route 
            path="/nutrition-dashboard" 
            element={
              <ProtectedRoute user={user}>
                <Dashboard/>
              </ProtectedRoute>
            } 
          />
        </Routes>
      </Layout>
    </BrowserRouter>
  );
}

export default App;
