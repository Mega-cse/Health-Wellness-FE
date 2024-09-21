import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import axios from 'axios';
import './Auth.css';

const Login = ({ setUser }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (event) => {
    event.preventDefault();
    setError(null);
    setLoading(true);
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import './Auth.css';

const Login = ({ setUser }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (event) => {
    event.preventDefault();
    setError(null);
    setLoading(true);

    try {
      const response = await axios.post(
        'https://health-wellness-be-3.onrender.com/api/auth/login',
        { email, password },
        { withCredentials: true }
      );

      if (response.data.success) {
        const user = response.data.user;
        setUser(user);

        // Force reload to ensure the application recognizes the new user state
        const redirectPath = user.role === 'admin' ? '/admin-dashboard' : '/user-dashboard';
        window.location.href = redirectPath; // This might still not be effective in Netlify
        window.location.reload(); // Force reload to ensure navigation
      } else {
        setError(response.data.message || 'Login failed');
      }
    } catch (error) {
      setError(error.response?.data?.message || 'Network error. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="auth-container">
      <form className="auth-form" onSubmit={handleSubmit}>
        <h1>Login</h1>
        <input
          type="email"
          name="email"
          placeholder="Email"
          required
          autoComplete="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <input
          type="password"
          name="password"
          placeholder="Password"
          required
          autoComplete="current-password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <button type="submit" disabled={loading}>
          {loading ? 'Logging in...' : 'Login'}
        </button>
        {error && <p className="error-message">{error}</p>}
        <div className="forgot-password">
          <Link to="/forgot-password">Forgot Password?</Link>
        </div>
        <div className="signup-prompt">
          <p>Don't have an account? <Link to="/register">Sign up</Link></p>
        </div>
      </form>
    </div>
  );
};

export default Login;

    try {
      const response = await axios.post(
        'https://health-wellness-be-3.onrender.com/api/auth/login',
        { email, password },
        { withCredentials: true }
      );

      if (response.data.success) {
        const user = response.data.user;
        setUser(user);  // Update the user state in App

        // Alternative navigation using window.location
        const redirectPath = user.role === 'admin' ? '/admin-dashboard' : '/user-dashboard';
        window.location.href = redirectPath; // Use window.location for navigation
      } else {
        setError(response.data.message || 'Login failed');
      }
    } catch (error) {
      setError(error.response?.data?.message || 'Network error. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="auth-container">
      <form className="auth-form" onSubmit={handleSubmit}>
        <h1>Login</h1>
        <input
          type="email"
          name="email"
          placeholder="Email"
          required
          autoComplete="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <input
          type="password"
          name="password"
          placeholder="Password"
          required
          autoComplete="current-password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <button type="submit" disabled={loading}>
          {loading ? 'Logging in...' : 'Login'}
        </button>
        {error && <p className="error-message">{error}</p>}
        <div className="forgot-password">
          <Link to="/forgot-password">Forgot Password?</Link>
        </div>
        <div className="signup-prompt">
          <p>Don't have an account? <Link to="/register">Sign up</Link></p>
        </div>
      </form>
    </div>
  );
};

export default Login;
