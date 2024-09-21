// Components/CreateExerciseForm.js
import React, { useState } from 'react';
import axios from 'axios';

const CreateExerciseForm = () => {
  const [exerciseType, setExerciseType] = useState('');
  const [duration, setDuration] = useState('');
  const [distance, setDistance] = useState('');
  const [caloriesBurned, setCaloriesBurned] = useState('');
  const [image, setImage] = useState(null);
  const [error, setError] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    const formData = new FormData();
    formData.append('exerciseType', exerciseType);
    formData.append('duration', duration);
    formData.append('distance', distance);
    formData.append('caloriesBurned', caloriesBurned);
    if (image) {
      formData.append('image', image);
    }

    try {
      await axios.post('https://health-wellness-be-3.onrender.com/api/exercises/log', formData, {
        headers: {
          'Content-Type': 'multipart/form-data'
        },
        withCredentials: true
      });
      alert('Exercise created successfully!');
      // Clear form fields
      setExerciseType('');
      setDuration('');
      setDistance('');
      setCaloriesBurned('');
      setImage(null);
    } catch (err) {
      setError('Failed to create exercise: ' + err.response.data.message);
    }
  };

  return (
    <div style={styles.container}>
      <div style={styles.formContainer}>
        <h2>Fitness Form</h2>
        {error && <div style={styles.error}>{error}</div>}
        <form onSubmit={handleSubmit} style={styles.form}>
          <div className="mb-3">
            <label htmlFor="exerciseType" className="form-label">Exercise Type</label>
            <input
              type="text"
              className="form-control"
              id="exerciseType"
              value={exerciseType}
              onChange={(e) => setExerciseType(e.target.value)}
              required
            />
          </div>
          <div className="mb-3">
            <label htmlFor="duration" className="form-label">Duration (minutes)</label>
            <input
              type="number"
              className="form-control"
              id="duration"
              value={duration}
              onChange={(e) => setDuration(e.target.value)}
              required
            />
          </div>
          <div className="mb-3">
            <label htmlFor="distance" className="form-label">Distance (km or miles)</label>
            <input
              type="text"
              className="form-control"
              id="distance"
              value={distance}
              onChange={(e) => setDistance(e.target.value)}
              required
            />
          </div>
          <div className="mb-3">
            <label htmlFor="caloriesBurned" className="form-label">Calories Burned</label>
            <input
              type="number"
              className="form-control"
              id="caloriesBurned"
              value={caloriesBurned}
              onChange={(e) => setCaloriesBurned(e.target.value)}
              required
            />
          </div>
          <div className="mb-3">
            <label htmlFor="image" className="form-label">Upload Image</label>
            <input
              type="file"
              className="form-control"
              id="image"
              accept="image/*"
              onChange={(e) => setImage(e.target.files[0])}
            />
          </div>
          <button type="submit" className="btn btn-primary">Create</button>
        </form>
      </div>
    </div>
  );
};

// Internal styles
const styles = {
  container: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    height: '100vh',
    backgroundColor: '#f8f9fa'
  },
  formContainer: {
    width: '100%',
    maxWidth: '600px',
    padding: '20px',
    borderRadius: '8px',
    boxShadow: '0 0 10px rgba(0, 0, 0, 0.1)',
    backgroundColor: '#ffffff'
  },
  form: {
    display: 'flex',
    flexDirection: 'column'
  },
  error: {
    color: 'red',
    marginBottom: '15px'
  }
};

export default CreateExerciseForm;
