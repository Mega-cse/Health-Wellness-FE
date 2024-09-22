import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const ExerciseList = () => {
  const [exercises, setExercises] = useState([]);
  const [error, setError] = useState(null);
  const [selectedExerciseId, setSelectedExerciseId] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchExercises = async () => {
      try {
        const response = await axios.get('https://health-wellness-be-3.onrender.com/api/exercises/get', { withCredentials: true });
        setExercises(response.data);
      } catch (err) {
        setError('Failed to fetch exercises');
        console.error(err);
      }
    };
    fetchExercises();
  }, []);

  const handleSelectExercise = (exerciseId) => {
    setSelectedExerciseId(exerciseId);
  };

  const handleTrackClick = () => {
    if (selectedExerciseId) {
      navigate(`/user/get-exercises/track-exercise/${selectedExerciseId}`);
    } else {
      alert('Please select an exercise to track.');
    }
  };

  // Internal styles
  const styles = {
    container: {
      padding: '20px',
     
      maxWidth: '1200px',
      margin: 'auto',
    },
    navbar: {
      display: 'flex',
      justifyContent: 'space-between',     
      marginBottom: '50px',
      padding: '20px',      
      color: 'Blue',
    
    },
    trackButton: {
      backgroundColor: 'blue',
      color: 'white',
      border: '1px solid #fff',
      padding: '10px 20px',
      borderRadius: '5px',
      cursor: 'pointer',
      transition: 'background-color 0.3s',
    },
    trackButtonHover: {
      backgroundColor: '#0056b3',
      color: '#fff',
    },
    exerciseList: {
      display: 'flex',
      flexWrap: 'wrap',
      justifyContent: 'space-around',
    },
    card: {
      border: '1px solid #ccc',
      borderRadius: '8px',
      margin: '10px',
      width: 'calc(30% - 20px)',
      boxShadow: '0 2px 5px rgba(0, 0, 0, 0.1)',
      transition: 'transform 0.2s',
      overflow: 'hidden',
      position: 'relative',
    },
    img: {
      width: '100%',
      height: '150px',
      objectFit: 'cover',
    },
    radio: {
      position: 'absolute',
      top: '10px',
      left: '10px',
      zIndex: '10',
    },
    exerciseType: {
      padding: '15px',
      textAlign: 'center',
    },
    errorMessage: {
      color: 'red',
      textAlign: 'center',
    },
  };

  return (
    <div style={styles.container}>
      <div style={styles.navbar}>
        <h2>List of Fitness</h2>
        <button
          style={styles.trackButton}
          onClick={handleTrackClick}
          disabled={!selectedExerciseId}
        >
          Track
        </button>
      </div>
      {error && <p style={styles.errorMessage}>{error}</p>}
      <div style={styles.exerciseList}>
        {exercises.length > 0 ? (
          exercises.map((exercise) => (
            <div key={exercise._id} style={styles.card}>
              <input
                type="radio"
                name="exercise"
                value={exercise._id}
                checked={selectedExerciseId === exercise._id}
                onChange={() => handleSelectExercise(exercise._id)}
                style={styles.radio}
              />
              <img
                src={exercise.imageUrl || '/images/exercise.jpg'}
                alt={exercise.exerciseType}
                style={styles.img}
              />
              <div style={styles.exerciseType}>
                {exercise.exerciseType}
              </div>
            </div>
          ))
        ) : (
          <p>No exercises found.</p>
        )}
      </div>
    </div>
  );
};

export default ExerciseList;
