import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { Chart } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend } from 'chart.js';
import 'bootstrap/dist/css/bootstrap.min.css';

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

const AdminDashboard = () => {
  const [dashboardData, setDashboardData] = useState(null);
  const [error, setError] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [actionType, setActionType] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    // Check if the user is authenticated
    const token = localStorage.getItem('token');
    if (!token) {
      navigate('/login'); // Redirect to login if not authenticated
      return;
    }

    const fetchDashboardData = async () => {
      try {
        const response = await axios.get('https://health-wellness-be-3.onrender.com/api/admin/dashboard', { withCredentials: true });
        setDashboardData(response.data);
      } catch (err) {
        setError('Failed to fetch dashboard data');
      }
    };

    fetchDashboardData();
  }, [navigate]);

  const handleNavigate = (path) => {
    navigate(path);
  };

  const handleExerciseClick = () => {
    setActionType('exercise');
    setShowModal(true);
  };

  const handleNutritionClick = () => {
    navigate('/nutrition-dashboard');
  };

  const handleModalAction = (action) => {
    setShowModal(false);
    if (action === 'create') {
      handleNavigate(`/create-${actionType}`);
    } else if (action === 'get') {
      handleNavigate(`/get-${actionType}`);
    }
  };

  if (error) return <div className="alert alert-danger">{error}</div>;
  if (!dashboardData) return <div className="alert alert-info">Loading...</div>;

  const userProgress = dashboardData.userProgress || [];

  return (
    <div className="container-fluid">
      <nav className="navbar navbar-expand-lg navbar-light bg-light mb-4">
        <h3 className="navbar-brand">Admin Dashboard</h3>
        <button onClick={() => handleNavigate('/login')} className="btn btn-primary">Logout</button>
      </nav>

      <div className="row justify-content-center mb-4">
        {/* Exercise Card */}
        <div className="col-lg-3 col-md-6 mb-4">
          <div className="card shadow-sm">
            <img src="/images/exercise.jpg" className="card-img-top" alt="Exercise" />
            <div className="card-body text-center">
              <button className="btn btn-primary" onClick={handleExerciseClick}>
                Fitness
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

        {/* Manage Users Card */}
        <div className="col-lg-3 col-md-6 mb-4">
          <div className="card shadow-sm">
            <img src="/images/users.jpg" className="card-img-top" alt="Manage Users" />
            <div className="card-body text-center">
              <button className="btn btn-primary" onClick={() => handleNavigate('/manage-users')}>
                Manage Users
              </button>
            </div>
          </div>
        </div>
      </div>

      <div className="chart-container mb-4">
        <h2>Recent User Progress</h2>
        <Chart
          type="bar"
          data={{
            labels: userProgress.map(p => p.name),
            datasets: [{
              label: 'Progress',
              data: userProgress.map(p => p.progress),
              backgroundColor: 'rgba(75, 192, 192, 0.2)',
              borderColor: 'rgba(75, 192, 192, 1)',
              borderWidth: 1,
            }],
          }}
          options={{
            scales: {
              y: {
                beginAtZero: true,
              },
            },
          }}
        />
      </div>

      {/* Modal for action confirmation */}
      {showModal && (
        <div className="modal fade show" style={{ display: 'block', backgroundColor: 'rgba(0, 0, 0, 0.5)' }}>
          <div className="modal-dialog">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title">Choose an Action</h5>
                <button type="button" className="close" onClick={() => setShowModal(false)}>
                  &times;
                </button>
              </div>
              <div className="modal-body">
                <p>Select an action:</p>
                <button className="btn btn-success mr-2" onClick={() => handleModalAction('create')}>Create</button>
                <button className="btn btn-info" onClick={() => handleModalAction('get')}>Get</button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default AdminDashboard;
