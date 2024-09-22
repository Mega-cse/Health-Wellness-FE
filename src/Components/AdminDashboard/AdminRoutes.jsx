// Components/AdminRoutes.js
import React from 'react';
import { Routes, Route } from 'react-router-dom'; 
import UserManagement from '../AdminDashboard/UserManagement';
import CreateExerciseForm from './Exercise/CreateExerciseForm'; 
import UserDetails from './UserDetails';
import UpdateExercise from './Exercise/UpdateExercise';
import ListOfExercises from './Exercise/ListOfExercises';
import AdminDashboard from '../AdminDashboard/AdminDashboard';
import ProtectedRoute from '../ProtectedRoute';

const AdminRoutes = () => {
  return (
    <Routes>
      <Route
        path="admin-dashboard"
        element={
          <ProtectedRoute >
            <AdminDashboard />
          </ProtectedRoute>
        }
      />
      <Route
        path="create-exercise"
        element={
          <ProtectedRoute >
            <CreateExerciseForm />
          </ProtectedRoute>
        }
      />
      <Route
        path="manage-users"
        element={
          <ProtectedRoute >
            <UserManagement />
          </ProtectedRoute>
        }
      />
      <Route
        path="manage-users/user-details/:userId"
        element={
          <ProtectedRoute>
            <UserDetails />
          </ProtectedRoute>
        }
      />
      <Route
        path="get-exercise"
        element={
          <ProtectedRoute>
            <ListOfExercises />
          </ProtectedRoute>
        }
      />
      <Route
        path="update-exercise/:id"
        element={
          <ProtectedRoute >
            <UpdateExercise />
          </ProtectedRoute>
        }
      />
    </Routes>
  );
};

export default AdminRoutes;
