import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import './UserDetails.css'; // Custom styles

const UserDetails = () => {
  const { userId } = useParams();   
  const [user, setUser] = useState(null);
  const [progress, setProgress] = useState(null);
  const [error, setError] = useState(null);
  const [recommendationSent, setRecommendationSent] = useState(false);
  const [recommendationError, setRecommendationError] = useState(null);

  useEffect(() => {
    const fetchUserDetails = async () => {
      try {
        const response = await axios.get(`https://health-wellness-be-3.onrender.com/api/auth/users/${userId}`, { withCredentials: true });
        if (response.data && response.data.user) {
          setUser(response.data.user);
          fetchUserProgress(userId);
        } else {
          setError('User not found');
        }
      } catch (err) {
        handleFetchError(err);
      }
    };

    fetchUserDetails();
  }, [userId]);

  const fetchUserProgress = async (userId) => {
    try {
      const response = await axios.get(`https://health-wellness-be-3.onrender.com/api/admin/progress/${userId}`, { withCredentials: true });
      setProgress(response.data);
    } catch (err) {
      console.error('Error fetching user progress:', err.response ? err.response.data : err.message);
      setError('Failed to fetch user progress. Please try again later.');
    }
  };

  const handleFetchError = (err) => {
    console.error('Error fetching user details:', err);
    if (err.response && err.response.status === 404) {
      setError('User not found or invalid user ID');
    } else {
      setError('Failed to fetch user details. Please try again later.');
    }
  };

  const handleSendRecommendation = async () => {
    try {
        const response = await axios.post('https://health-wellness-be-3.onrender.com/api/admin/send', { userId }, { withCredentials: true });
        if (response.data.success) {
            setRecommendationSent(true);
        }
    } catch (err) {
        console.error('Error sending recommendations:', err.response?.data || err);
        setRecommendationError('Failed to send recommendations: ' + (err.response?.data.message || 'Please try again later.'));
        setRecommendationSent(false);
    }
};

  if (error) {
    return <div className="alert alert-danger">{error}</div>;
  }

  if (!user) {
    return <div>Loading...</div>;
  }

  return (
    <div className="container">
      <h2 className="my-4 text-center">User Details</h2>
      <div className="row">
        <div className="col-md-6">
          <div className="mb-4">
            <h3>User Information</h3>
            <p><strong>Name:</strong> {user.username}</p>
            <p><strong>Email:</strong> {user.email}</p>
            <p><strong>Age:</strong> {user.age || 'N/A'}</p>
            <p><strong>Height:</strong> {user.height || 'N/A'}</p>
            <p><strong>Weight:</strong> {user.weight || 'N/A'}</p>
            <p><strong>Location:</strong> {user.location || 'N/A'}</p>
          </div>

          {progress && (
            <div className="mb-4">
              <h3>User Progress</h3>
              <p><strong>Exercise:</strong> {progress.exerciseProgress ? `Total Calories Burned: ${progress.exerciseProgress.totalCaloriesBurned}` : 'N/A'}</p>
              <p><strong>Nutrition:</strong> Total Calories Intake: {progress.nutrition ? progress.nutrition.totalCaloriesIntake : 'N/A'}</p>
              <h4>Goals:</h4>
              {progress.goals && progress.goals.length > 0 ? (
                <ul>
                  {progress.goals.map((goal, index) => (
                    <li key={index}>
                      {goal.goalType}: {goal.currentValue} / {goal.targetValue} ({goal.percentage})
                    </li>
                  ))}
                </ul>
              ) : (
                <p>No goals found.</p>
              )}
            </div>
          )}
        </div>

        <div className="col-md-6">
          <div className="mb-4">
            <h3>Personalized Recommendations</h3>
            <p>Based on your progress, here are some personalized recommendations:</p>
            <ul>
              <li>Increase your daily water intake.</li>
              <li>Consider adding more protein to your meals.</li>
              <li>Try to incorporate more cardio exercises.</li>
            </ul>
            <button 
              className="btn btn-primary" 
              onClick={handleSendRecommendation}
            >
              Send Recommendations
            </button>
            {recommendationSent && <p className="mt-3 text-success">Recommendations sent successfully!</p>}
            {recommendationError && <p className="mt-3 text-danger">{recommendationError}</p>}
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserDetails;
