// Components/UserRoutes.js
import React from 'react';
import { Routes, Route } from 'react-router-dom'; 
import Profile from './Profile';
import ExerciseList from '../UserDashboard/ExerciseList';
import TrackExercise from './TrackExercise';
import UserDashboard from '../UserDashboard/UserDashboard';
import GoalManager from './GoalManager';
import InquiryForm from './InquiryForm';
import ProtectedRoute from '../ProtectedRoute';

const UserRoutes = ({ user }) => {
  return (
    <Routes>
      <Route
        path="user-dashboard"
        element={
          <ProtectedRoute user={user}>
            <UserDashboard />
          </ProtectedRoute>
        }
      />
      <Route
        path="profile"
        element={
          <ProtectedRoute user={user}>
            <Profile />
          </ProtectedRoute>
        }
      />
      <Route
        path="get-exercises"
        element={
          <ProtectedRoute user={user}>
            <ExerciseList />
          </ProtectedRoute>
        }
      />
      <Route
        path="user-goals"
        element={
          <ProtectedRoute user={user}>
            <GoalManager />
          </ProtectedRoute>
        }
      />
      <Route
        path="track-exercise/:exerciseId"
        element={
          <ProtectedRoute user={user}>
            <TrackExercise />
          </ProtectedRoute>
        }
      />
      <Route
        path="support"
        element={
          <ProtectedRoute user={user}>
            <InquiryForm />
          </ProtectedRoute>
        }
      />
    </Routes>
  );
};

export default UserRoutes;
