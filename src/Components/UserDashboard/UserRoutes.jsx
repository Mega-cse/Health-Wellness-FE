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

const UserRoutes = () => {
  return (
    <Routes>
      <Route
        path="user-dashboard"
        element={
          <ProtectedRoute>
            <UserDashboard />
          </ProtectedRoute>
        }
      />
      <Route
        path="profile"
        element={
          <ProtectedRoute>
            <Profile />
          </ProtectedRoute>
        }
      />
      <Route
        path="get-exercises"
        element={
          <ProtectedRoute>
            <ExerciseList />
          </ProtectedRoute>
        }
      />
      <Route
        path="user-goals"
        element={
          <ProtectedRoute>
            <GoalManager />
          </ProtectedRoute>
        }
      />
      <Route
        path="track-exercise/:exerciseId"
        element={
          <ProtectedRoute >
            <TrackExercise />
          </ProtectedRoute>
        }
      />
      <Route
        path="support"
        element={
          <ProtectedRoute>
            <InquiryForm />
          </ProtectedRoute>
        }
      />
    </Routes>
  );
};

export default UserRoutes;
