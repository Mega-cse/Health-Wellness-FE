import { useState } from 'react';
import FoodLog from './FoodLog';
import CreateFood from './CreateFood';
import './Dashboard.css';
import Modal from '../HomePage/Modal';
const Dashboard = ({ userRole }) => {

  const chartImages = [
    "/images/chart1.jpg",

    "/images/chart3.jpg",
    "/images/chart4.jpg",
  ];
  const [showModal, setShowModal] = useState(false);
  const handleViewChart = () => {
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
    setSelectedFood(null);
  };
  return (
    <div className="dashboard-container">
      <div className="navbar">
        <h1>Nutrition</h1>

        <button
          className="view-chart-button"
          onClick={handleViewChart}
          style={{ marginRight: '20px', backgroundColor: '#007bff', color: 'white' }}
        >
          View Chart
        </button>
        {showModal && (
          <Modal isOpen={showModal} onClose={handleCloseModal} images={chartImages} />
        )}
      </div>
      <div className="dashboard-content">
        <div className="create-food-container">
          <CreateFood />
        </div>
        <div className="food-log-container">
          <FoodLog userRole={userRole} />
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
