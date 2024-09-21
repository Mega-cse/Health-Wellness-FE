import React, { useEffect, useState } from 'react';
import axios from 'axios';

const ListOfExercises = () => {
  const [exercises, setExercises] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchExercises = async () => {
      try {
        const response = await axios.get('https://health-wellness-be-3.onrender.com/api/exercises/get', { withCredentials: true });
        setExercises(response.data);
      } catch (err) {
        setError('Failed to fetch exercises');
      }
    };
    fetchExercises();
  }, []);

  return (
    <div style={styles.container}>
      <h2 style={{textAlign:'center',color:'red'}}>List of Fitness</h2>
      {error && <div style={styles.error}>{error}</div>}
      <div style={styles.cardContainer}>
        {exercises.map(exercise => (
          <div key={exercise._id} style={styles.card}>
             {exercise.imageUrl && (
              <img src={exercise.imageUrl} alt={exercise.exerciseType} style={styles.image} />
            )}
            <h3>{exercise.exerciseType}</h3>
            <p>Duration: {exercise.duration} minutes</p>
            <p>Distance: {exercise.distance} km</p>
            <p>Calories Burned: {exercise.caloriesBurned}</p>
           
          </div>
        ))}
      </div>
    </div>
  );
};

// Inline styles for the component
const styles = {
  container: {
    display: 'flex',
    flexDirection: 'column',
    marginTop: '20px',
    padding: '0 10px'
  },
  cardContainer: {
    display: 'flex',
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: '20px',
    padding:'30px'
  },
  card: {
    border: '1px solid #ddd',
    borderRadius: '8px',
    padding: '15px',
    width: '100%',
    maxWidth: '300px',
    boxShadow: '0 2px 5px rgba(0,0,0,0.1)',
    backgroundColor: '#fff'
  },
  image: {
    width: '100%',
    height: '200px',
    objectFit: 'cover',
    borderRadius: '8px'
  },
  error: {
    color: 'red',
    marginBottom: '10px'
  }
};

export default ListOfExercises;
