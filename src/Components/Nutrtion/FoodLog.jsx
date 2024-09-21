import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';


const FoodLog = ({ userRole }) => {
  const [foods, setFoods] = useState([]);
  const [error, setError] = useState('');
  const [selectedFood, setSelectedFood] = useState(null);
  const [quantity, setQuantity] = useState(1);
  const navigate = useNavigate();
  useEffect(() => {
    const fetchFoods = async () => {
      const token = localStorage.getItem('token');

      try {
        const response = await axios.get('https://health-wellness-be-3.onrender.com/api/food/', {
          headers: { Authorization: `Bearer ${token}` },
        });
        setFoods(response.data);
      } catch (err) {
        if (err.response?.status === 401) {
          setError('Invalid or expired token. Redirecting to login...');
          setTimeout(() => navigate('/login'), 5000);
        } else {
          setError('Error fetching food logs: ' + (err.response?.data?.message || 'An unexpected error occurred.'));
        }
      }
    };

    fetchFoods();
  }, [navigate]);

  const handleSelectFood = (food) => {
    setSelectedFood(food);
    setQuantity(1);
  };

  const handleDeleteFood = async (id) => {
    const token = localStorage.getItem('token');
    const confirmDelete = window.confirm('Are you sure you want to delete this food item?');

    if (confirmDelete) {
      try {
        await axios.delete(`https://health-wellness-be-3.onrender.com/api/food/${id}`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        setFoods((prevFoods) => prevFoods.filter(food => food._id !== id));
        alert('Food deleted successfully.');
      } catch (err) {
        setError('Error deleting food: ' + (err.response?.data || 'An unexpected error occurred.'));
      }
    }
  };

  const calculateNutrients = () => {
    if (!selectedFood) return null;
    const totalCalories = selectedFood.calories * quantity;
    const totalProtein = selectedFood.protein * quantity;
    const totalFats = selectedFood.fats * quantity;
    const totalCarbohydrates = selectedFood.carbohydrates * quantity;

    return { totalCalories, totalProtein, totalFats, totalCarbohydrates };
  };

  const nutrientValues = calculateNutrients();

  const handleViewChart = () => {
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
    setSelectedFood(null);
  };

  return (
    <div className="food-log-content">
      <h2>Your Food Logs</h2>
      {error && <p className="error-message">{error}</p>}
      <ul className="food-list">
        {foods.map(food => (
          <li key={food._id} className="food-item">
            <span onClick={() => handleSelectFood(food)}>
              {food.name} - {food.calories} calories
            </span>
            <button
              onClick={() => handleDeleteFood(food._id)}
              className="delete-button"
              style={{ marginLeft: '10px', backgroundColor: '#dc3545', color: 'white' }}
            >
              Delete
            </button>
          </li>
        ))}
      </ul>

      {selectedFood && (
        <div className="nutrition-details">
          <h3>Nutritional Information for {selectedFood.name}</h3>
          <label>
            Quantity:
            <input
              type="number"
              value={quantity}
              onChange={(e) => setQuantity(Number(e.target.value))}
              min="1"
              className="quantity-input"
            />
          </label>
          {nutrientValues && (
            <div className="nutrient-summary">
              <p>Total Calories: {nutrientValues.totalCalories}</p>
              <p>Total Protein: {nutrientValues.totalProtein}g</p>
              <p>Total Fats: {nutrientValues.totalFats}g</p>
              <p>Total Carbohydrates: {nutrientValues.totalCarbohydrates}g</p>
            </div>
          )}
        </div>
      )}


    </div>
  );
};

export default FoodLog;
