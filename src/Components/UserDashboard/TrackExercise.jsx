import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate, useParams } from 'react-router-dom';

const TrackExercise = () => {
  const { exerciseId } = useParams(); // Get exerciseId from URL params
  const [duration, setDuration] = useState();
  const [calories, setCalories] = useState();
  const [error, setError] = useState('');
  const navigate = useNavigate();

  // Define calories burned per minute
  const caloriesPerMinute = 5; // Adjust this value based on the type of exercise

  const handleDurationChange = (e) => {
    const parsedDuration = Number(e.target.value);
    setDuration(parsedDuration);
    
    // Calculate calories based on duration
    if (parsedDuration > 0) {
      setCalories(parsedDuration * caloriesPerMinute);
    } else {
      setCalories(0);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    const parsedDuration = Number(duration);
  
    if (!exerciseId || parsedDuration <= 0 || calories <= 0) {
      setError('Please enter valid values for duration.');
      return;
    }
  
    try {
      await axios.post('https://health-wellness-be-3.onrender.com/api/exercises/track-exercise', {
        exerciseId,
        duration: parsedDuration,
        calories,
      }, { withCredentials: true });
  
      alert('Exercise tracked successfully!');
      navigate('/user/user-dashboard');
    } catch (error) {
      console.error('Error tracking exercise:', error.response ? error.response.data : error.message);
      alert('Failed to track exercise: ' + (error.response ? error.response.data.message : error.message));
    }
  };

  // Internal styles
  const styles = {
    container: {
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      height: '100vh',
      padding: '20px'
      , maxWidth: '400px',
      margin: 'auto',
    },
    title: {
      color: 'red',
      marginBottom: '20px',
    },
    errorMessage: {
      color: 'red',
      marginBottom: '15px',
    },
    form: {
      width: '100%',
    },
    formGroup: {
      marginBottom: '15px',
    },
    label: {
      display: 'block',
      marginBottom: '5px',
      fontWeight: 'bold',
      color: '#555',
    },
    input: {
      width: '100%',
      padding: '10px',
      border: '1px solid #ccc',
      borderRadius: '5px',
      transition: 'border-color 0.3s',
    },
    inputFocus: {
      borderColor: '#007bff',
      outline: 'none',
    },
    submitButton: {
      backgroundColor: '#007bff',
      color: 'white',
      padding: '10px 20px',
      border: 'none',
      borderRadius: '5px',
      cursor: 'pointer',
      transition: 'background-color 0.3s',
      width: '100%',
    },
    submitButtonHover: {
      backgroundColor: '#0056b3',
    },
  };

  return (
    <div style={styles.container}>
      <h2 style={styles.title}>Track Your Exercise</h2>
      {error && <p style={styles.errorMessage}>{error}</p>}
      <form onSubmit={handleSubmit} style={styles.form}>
        <div style={styles.formGroup}>
          <label style={styles.label}>
            Duration (minutes):
            <input
              type="number"
              value={duration}
              onChange={handleDurationChange} // Use the new change handler
              required
              style={styles.input}
              onFocus={(e) => (e.target.style.borderColor = styles.inputFocus.borderColor)}
              onBlur={(e) => (e.target.style.borderColor = '#ccc')}
            />
          </label>
        </div>
        <div style={styles.formGroup}>
          <label style={styles.label}>
            Calories Burned:
            <input
              type="number"
              value={calories}
              readOnly // Make this input read-only
              style={styles.input}
            />
          </label>
        </div>
        <button type="submit" style={styles.submitButton}>
          Track Exercise
        </button>
      </form>
    </div>
  );
};

export default TrackExercise;