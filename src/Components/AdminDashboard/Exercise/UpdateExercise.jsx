import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams, useNavigate } from 'react-router-dom';

const UpdateExercise = () => {
    const { id } = useParams(); // Get exercise ID from URL params
    const navigate = useNavigate(); // For navigation
    const [exercise, setExercise] = useState(null);
    const [editFormData, setEditFormData] = useState({
        exerciseType: '',
        duration: '',
        distance: '',
        caloriesBurned: '',
    });
    const [image, setImage] = useState(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');

    useEffect(() => {
        const fetchExercise = async () => {
            try {
                const response = await axios.get(`https://health-wellness-be-3.onrender.com/api/exercises/${id}`, { withCredentials: true });
                setExercise(response.data);
                setEditFormData({
                    exerciseType: response.data.exerciseType,
                    duration: response.data.duration,
                    distance: response.data.distance,
                    caloriesBurned: response.data.caloriesBurned,
                });
            } catch (err) {
                setError('Failed to fetch exercise details');
            }
        };

        fetchExercise();
    }, [id]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setEditFormData(prevState => ({
            ...prevState,
            [name]: value
        }));
    };

    const handleImageChange = (e) => {
        setImage(e.target.files[0]);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setError('');
        
        const formData = new FormData();
        formData.append('exerciseType', editFormData.exerciseType);
        formData.append('duration', editFormData.duration);
        formData.append('distance', editFormData.distance);
        formData.append('caloriesBurned', editFormData.caloriesBurned);
        if (image) {
            formData.append('image', image);
        }

        try {
            const response = await axios.put(`https://health-wellness-be-3.onrender.com/api/exercises/${id}`, formData, {
                headers: { 'Content-Type': 'multipart/form-data' },
                withCredentials: true
            });
            console.log('Update response:', response.data);
            navigate('/get-exercise'); // Navigate to the exercise list page after successful update
        } catch (err) {
            console.error(err);
            setError('Failed to update exercise');
        } finally {
            setLoading(false);
        }
    };

    if (!exercise) return <h1 style={{ textAlign: 'center', color: 'red', fontSize: '50px' }}>Loading...</h1>;

    return (
        <div style={formStyle}>
            <h2>Update Exercise</h2>
            <form onSubmit={handleSubmit}>
                <div>
                    <label>Exercise Type:</label>
                    <input
                        type="text"
                        name="exerciseType"
                        value={editFormData.exerciseType}
                        onChange={handleChange}
                        required
                    />
                </div>
                <div>
                    <label>Duration (minutes):</label>
                    <input
                        type="number"
                        name="duration"
                        value={editFormData.duration}
                        onChange={handleChange}
                        required
                    />
                </div>
                <div>
                    <label>Distance (km):</label>
                    <input
                        type="number"
                        step="0.01"
                        name="distance"
                        value={editFormData.distance}
                        onChange={handleChange}
                        required
                    />
                </div>
                <div>
                    <label>Calories Burned:</label>
                    <input
                        type="number"
                        name="caloriesBurned"
                        value={editFormData.caloriesBurned}
                        onChange={handleChange}
                        required
                    />
                </div>
                <div>
                    <label>Image:</label>
                    <input
                        type="file"
                        onChange={handleImageChange}
                    />
                </div>
                <button type="submit" disabled={loading}>
                    {loading ? 'Saving...' : 'Save'}
                </button>
                <button type="button" onClick={() => navigate('/get-exercise')} style={{ marginLeft: '10px' }}>
                    Cancel
                </button>
            </form>
            {error && <p style={{ color: 'red' }}>{error}</p>}
        </div>
    );
};

// Inline styles
const formStyle = {
    marginTop: '20px',
    padding: '20px',
    border: '1px solid #ddd',
    borderRadius: '8px',
    boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
    width: '300px',
};

export default UpdateExercise;
