import React, { useEffect, useState } from 'react';
import { Line } from 'react-chartjs-2';
import Chart from 'chart.js/auto';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
// import './UserDashboard.css'; // Uncomment if using a CSS file

const UserDashboard = () => {
  const [user, setUser] = useState(null);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (!token) {
      navigate('/login'); // Redirect to login if not authenticated
      return;
    }

    const fetchUserProfile = async () => {
      try {
        const response = await axios.get('https://health-wellness-be-3.onrender.com/api/auth/profile', { withCredentials: true });
        setUser(response.data.user);
      } catch (error) {
        console.error('Error fetching user profile:', error);
      }
    };

    fetchUserProfile();
  }, [navigate]);

  const handleLogout = async () => {
    try {
      await axios.post('https://health-wellness-be-3.onrender.com/api/auth/logout', {}, { withCredentials: true });
      navigate('/login');
    } catch (error) {
      console.error('Logout Error:', error);
    }
  };

  const toggleDropdown = () => {
    setDropdownOpen(!dropdownOpen);
  };

  const handleExerciseClick = () => {
    navigate('/user/get-exercises'); // Updated to include /user prefix
  };

  const handleNutritionClick = () => {
    navigate('/nutrition-dashboard');
  };

  const handleGoalsClick = () => {
    navigate('/user/user-goals'); // Updated to include /user prefix
  };

  const handleSupportClick = () => {
    navigate('/user/support'); // Updated to include /user prefix
  };

  return (
    <div className="dashboard">
      <header className="navbar">
        <h1 className="logo">WellnessHub</h1>
        <div className="user-info" style={{ display: 'flex', alignItems: 'center' }}>
          {user && (
            <>
              <button
                className="btn btn-link"
                style={{ marginRight: '20px', textDecoration: 'none', padding: '10px' }}
                onClick={handleSupportClick}
              >
                Support
              </button>
              <div className="profile-dropdown">
                <span
                  onClick={toggleDropdown}
                  className="btn btn-link"
                  style={{ padding: '10px', marginRight: '20px', textDecoration: 'none' }}
                >
                  {user.username}
                </span>
                {dropdownOpen && (
                  <div className="dropdown-content">
                    <button onClick={() => navigate('/user/profile')}>Profile</button>
                    <button onClick={handleLogout}>Logout</button>
                  </div>
                )}
              </div>
            </>
          )}
        </div>
      </header>

      <main className="dashboard-main">
        <section className="exercise-cards">
          <div className="row">
            {/* Exercise Card */}
            <div className="col-lg-3 col-md-6 mb-4">
              <div className="card shadow-sm">
                <img src="/images/exercise.jpg" className="card-img-top" alt="Exercise" />
                <div className="card-body text-center">
                  <button className="btn btn-primary" onClick={handleExerciseClick}>
                    Exercise
                  </button>
                </div>
              </div>
            </div>
            {/* Nutrition Card */}
            <div className="col-lg-3 col-md-6 mb-4">
              <div className="card shadow-sm">
                <img src="/images/nutrition.jpg" className="card-img-top" alt="Nutrition" />
                <div className="card-body text-center">
                  <button className="btn btn-primary" onClick={handleNutritionClick}>
                    Nutrition
                  </button>
                </div>
              </div>
            </div>
            {/* User Goals Card */}
            <div className="col-lg-3 col-md-6 mb-4">
              <div className="card shadow-sm">
                <img src="/images/goals.jpg" className="card-img-top" alt="User Goals" />
                <div className="card-body text-center">
                  <button className="btn btn-primary" onClick={handleGoalsClick}>
                    Goals
                  </button>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="dashboard-charts">
          <h2>Calories Burned Over Time</h2>
          <Line
            data={{
              labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May'],
              datasets: [
                {
                  label: 'Calories Burned',
                  data: [300, 500, 400, 600, 700],
                  fill: false,
                  backgroundColor: 'rgba(75,192,192,1)',
                  borderColor: 'rgba(75,192,192,1)',
                },
              ],
            }}
          />
        </section>
      </main>
    </div>
  );
};

export default UserDashboard;
