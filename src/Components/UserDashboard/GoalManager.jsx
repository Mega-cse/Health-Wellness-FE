import React, { useEffect, useState } from 'react';
import axios from 'axios';

const GoalManager = () => {
  const [goals, setGoals] = useState([]);
  const [goalType, setGoalType] = useState('');
  const [targetValue, setTargetValue] = useState('');
  const [currentValue, setCurrentValue] = useState('');
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');
  const [editGoalId, setEditGoalId] = useState(null);
  const [activeTab, setActiveTab] = useState('get');
  const images = [
    "/images/img.jpg"]

  useEffect(() => {
    fetchGoals();
  }, []);

  const fetchGoals = async () => {
    try {
      const response = await axios.get('https://health-wellness-be-3.onrender.com/api/goals/', { withCredentials: true });
      setGoals(response.data);
    } catch (error) {
      console.error('Error fetching goals:', error);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (editGoalId) {
        await axios.put(`https://health-wellness-be-3.onrender.com/api/goals/${editGoalId}`, {
          goalType,
          targetValue,
          currentValue,
          startDate,
          endDate,
        }, { withCredentials: true });
      } else {
        await axios.post('https://health-wellness-be-3.onrender.com/api/goals/', {
          goalType,
          targetValue,
          currentValue,
          startDate,
          endDate,
        }, { withCredentials: true });
      }
      resetForm();
      fetchGoals();
    } catch (error) {
      console.error('Error saving goal:', error);
    }
  };

  const handleEdit = (goal) => {
    setGoalType(goal.goalType);
    setTargetValue(goal.targetValue);
    setCurrentValue(goal.currentValue);
    setStartDate(goal.startDate.split('T')[0]);
    setEndDate(goal.endDate.split('T')[0]);
    setEditGoalId(goal._id);
    setActiveTab('edit');
  };

  const handleDelete = async (id) => {
    try {
      await axios.delete(`https://health-wellness-be-3.onrender.com/api/goals/${id}`, { withCredentials: true });
      fetchGoals();
    } catch (error) {
      console.error('Error deleting goal:', error);
    }
  };

  const resetForm = () => {
    setGoalType('');
    setTargetValue('');
    setCurrentValue('');
    setStartDate('');
    setEndDate('');
    setEditGoalId(null);
    setActiveTab('get');
  };

  const renderContent = () => {
    switch (activeTab) {
      case 'create':
        return (
          <form onSubmit={handleSubmit} style={styles.form}>
            <h3>Create Goal</h3>
            <input type="text" placeholder="Goal Type" value={goalType} onChange={(e) => setGoalType(e.target.value)} required />
            <input type="number" placeholder="Target Value" value={targetValue} onChange={(e) => setTargetValue(e.target.value)} required />
            <input type="number" placeholder="Current Value" value={currentValue} onChange={(e) => setCurrentValue(e.target.value)} required />
            <input type="date" value={startDate} onChange={(e) => setStartDate(e.target.value)} required />
            <input type="date" value={endDate} onChange={(e) => setEndDate(e.target.value)} required />
            <button type="submit" style={styles.button}>{editGoalId ? 'Update Goal' : 'Create Goal'}</button>
          </form>
        );

      case 'get':
        return (
          <div>
            <h3>Your Goals</h3>
            {goals.length === 0 ? (
              <p>No goals found.</p>
            ) : (
              goals.map((goal) => (
                <div key={goal._id} style={styles.goalCard}>
                  <h4>{goal.goalType}</h4>
                  <p>Target: {goal.targetValue}</p>
                  <p>Current: {goal.currentValue}</p>
                  <p>Start Date: {new Date(goal.startDate).toLocaleDateString()}</p>
                  <p>End Date: {new Date(goal.endDate).toLocaleDateString()}</p>
                  <div style={styles.buttonContainer}>
                    <button onClick={() => handleEdit(goal)} style={styles.button}>Edit</button>
                    <button onClick={() => handleDelete(goal._id)} style={styles.deleteButton}>Delete</button>
                  </div>
                </div>
              ))
            )}
          </div>
        );

      case 'edit':
        return (
          <form onSubmit={handleSubmit} style={styles.form}>
            <h3>Edit Goal</h3>
            <input type="text" placeholder="Goal Type" value={goalType} onChange={(e) => setGoalType(e.target.value)} required />
            <input type="number" placeholder="Target Value" value={targetValue} onChange={(e) => setTargetValue(e.target.value)} required />
            <input type="number" placeholder="Current Value" value={currentValue} onChange={(e) => setCurrentValue(e.target.value)} required />
            <input type="date" value={startDate} onChange={(e) => setStartDate(e.target.value)} required />
            <input type="date" value={endDate} onChange={(e) => setEndDate(e.target.value)} required />
            <button type="submit" style={styles.button}>Update Goal</button>
          </form>
        );

      default:
        return null;
    }
  };

  return (
    <div style={styles.container}>
      <div style={styles.sidebar}>
        <h3>Goal Management</h3>
        <img src="/images/img.jpg" alt="Your description" style={styles.image} />
        <button onClick={() => setActiveTab('create')} style={styles.button}>Create Goal</button>
        <button onClick={() => setActiveTab('get')} style={styles.button}>Get Goals</button>
       
      </div>
      <div style={styles.content}>
        {renderContent()}
      </div>
    </div>
  );
};

const styles = {
  container: {
    display: 'flex',
    flexDirection: 'row',
    padding: '20px',
    justifyContent: 'space-between',
    minHeight: '100vh',
    flexWrap: 'wrap', // Make it responsive
  },
  sidebar: {
    width: '25%',
    padding: '20px',
    borderRadius: '8px',
    background: '#f7f9fc',
    boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
  },
  content: {
    width: '70%',
    padding: '20px',
    borderRadius: '8px',
    boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
    background: '#fff',
    flexGrow: 1, // Allow it to grow
  },
  form: {
    display: 'flex',
    flexDirection: 'column',
    gap: '10px',
    maxWidth: '300px',
    margin: 'auto',
  },
  button: {
    margin: '5px 0',
    padding: '8px',
    background: '#007bff',
    color: '#fff',
    border: 'none',
    borderRadius: '4px',
    cursor: 'pointer',
    width: '100%',
    fontSize: '14px', // Reduced size
  },
  goalCard: {
    padding: '15px',
    margin: '10px 0',
    borderRadius: '8px',
    background: '#e9ecef',
    boxShadow: '0 1px 2px rgba(0,0,0,0.1)',
  },
  buttonContainer: {
    display: 'flex',
    justifyContent: 'space-between',
    marginTop: '10px',
  },
  deleteButton: {
    marginLeft: '10px',
    padding: '8px',
    background: '#dc3545',
    color: '#fff',
    border: 'none',
    borderRadius: '4px',
    cursor: 'pointer',
    fontSize: '14px', // Reduced size
    transition: 'background 0.3s',
  },
  image: {
    marginTop: '20px',
    width: '100%',
    height: 'auto',
    borderRadius: '4px',
  },
};

export default GoalManager;
