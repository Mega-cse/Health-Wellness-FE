import React from 'react';
import { Routes, Route } from 'react-router-dom'; 
 import Profile from './Profile';
// import UpdateProfile from './UserProfile';
import ExerciseList from '../UserDashboard/ExerciseList';
import TrackExercise from './TrackExercise';
import UserDashboard from '../UserDashboard/UserDashboard';
import GoalManager from './GoalManager';
import InquiryForm from './InquiryForm';


const UserRoutes = () => {
  return (
    <Routes>
      <Route path="/user-dashboard" element={<UserDashboard/>}/>
      <Route path="/profile" element={<Profile />} />
      <Route path="/get-exercises" element={<ExerciseList />} />
      <Route path='/user-goals' element={<GoalManager/>}/>
      <Route path="/track-exercise/:exerciseId" element={<TrackExercise />} />
      <Route path='/support' element={<InquiryForm/>}/>

    </Routes>
  );
};

export default UserRoutes;
