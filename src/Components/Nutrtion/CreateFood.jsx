import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './Dashboard.css';

const CreateFood = () => {
    const [name, setName] = useState('');
    const [quantity, setQuantity] = useState(1);
    const [calories, setCalories] = useState('');
    const [protein, setProtein] = useState('');
    const [fats, setFats] = useState('');
    const [carbohydrates, setCarbohydrates] = useState('');
    const [error, setError] = useState('');
    const [staticNutritionalData, setStaticNutritionalData] = useState({});

    useEffect(() => {
        const fetchStaticData = async () => {
            try {
                const response = await axios.get('https://health-wellness-be-3.onrender.com/api/food/static');
                setStaticNutritionalData(response.data);
            } catch (err) {
                setError('Error fetching static food data: ' + (err.response?.data || 'An unexpected error occurred.'));
            }
        };

        fetchStaticData();
    }, []);

    const handleFoodSelect = (e) => {
        const foodName = e.target.value;
        setName(foodName);

        // Auto-populate nutritional fields based on selected food
        if (staticNutritionalData[foodName]) {
            const foodData = staticNutritionalData[foodName];
            setCalories(foodData.calories * quantity);
            setProtein(foodData.protein * quantity);
            setFats(foodData.fats * quantity);
            setCarbohydrates(foodData.carbohydrates * quantity);
        } else {
            // Reset fields if food not found
            setCalories('');
            setProtein('');
            setFats('');
            setCarbohydrates('');
        }
    };

    const handleQuantityChange = (e) => {
        const newQuantity = Number(e.target.value);
        setQuantity(newQuantity);

        // Recalculate nutritional values based on new quantity
        if (staticNutritionalData[name]) {
            const foodData = staticNutritionalData[name];
            setCalories(foodData.calories * newQuantity);
            setProtein(foodData.protein * newQuantity);
            setFats(foodData.fats * newQuantity);
            setCarbohydrates(foodData.carbohydrates * newQuantity);
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');

        if (!name || quantity <= 0 || calories <= 0) {
            setError('Please enter valid values for food and quantity.');
            return;
        }

        try {
            await axios.post('https://health-wellness-be-3.onrender.com/api/food/',
                { name, calories, protein, fats, carbohydrates },
                { withCredentials: true }
            );
            alert('Food added successfully');
            // Reset the form
            setName('');
            setQuantity(1);
            setCalories('');
            setProtein('');
            setFats('');
            setCarbohydrates('');
        } catch (err) {
            setError('Error adding food: ' + (err.response?.data || 'An unexpected error occurred.'));
        }
    };

    return (
        <form onSubmit={handleSubmit} className="create-food-form">
            <div>
                <label htmlFor="food-select">Select Food:</label>
                <select id="food-select" value={name} onChange={handleFoodSelect} required>
                    <option value="" disabled>Select a food</option>
                    {Object.keys(staticNutritionalData).map((food) => (
                        <option key={food} value={food}>
                            {food.charAt(0).toUpperCase() + food.slice(1).replace(/_/g, ' ')} {/* Capitalize first letter */}
                        </option>
                    ))}
                </select>
            </div>
            <div>
                <input
                    type="number"
                    value={quantity}
                    onChange={handleQuantityChange}
                    placeholder="Quantity"
                    min="1"
                    required
                />
            </div>
            <div>
                <input
                    type="number"
                    value={calories}
                    readOnly
                    placeholder="Calories"
                />
            </div>
            <div>
                <input
                    type="number"
                    value={protein}
                    readOnly
                    placeholder="Protein (g)"
                />
            </div>
            <div>
                <input
                    type="number"
                    value={fats}
                    readOnly
                    placeholder="Fats (g)"
                />
            </div>
            <div>
                <input
                    type="number"
                    value={carbohydrates}
                    readOnly
                    placeholder="Carbohydrates (g)"
                />
            </div>
            <button type="submit">Add Food</button>
            {error && <p style={{ color: 'red' }}>{error}</p>}
        </form>
    );
};

export default CreateFood;
