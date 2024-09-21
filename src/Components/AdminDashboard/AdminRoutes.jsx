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

const AdminRoutes = ({ user }) => {
  return (
    <Routes>
      <Route
        path="admin-dashboard"
        element={
          <ProtectedRoute user={user}>
            <AdminDashboard />
          </ProtectedRoute>
        }
      />
      <Route
        path="create-exercise"
        element={
          <ProtectedRoute user={user}>
            <CreateExerciseForm />
          </ProtectedRoute>
        }
      />
      <Route
        path="manage-users"
        element={
          <ProtectedRoute user={user}>
            <UserManagement />
          </ProtectedRoute>
        }
      />
      <Route
        path="user-details/:userId"
        element={
          <ProtectedRoute user={user}>
            <UserDetails />
          </ProtectedRoute>
        }
      />
      <Route
        path="get-exercise"
        element={
          <ProtectedRoute user={user}>
            <ListOfExercises />
          </ProtectedRoute>
        }
      />
      <Route
        path="update-exercise/:id"
        element={
          <ProtectedRoute user={user}>
            <UpdateExercise />
          </ProtectedRoute>
        }
      />
    </Routes>
  );
};

export default AdminRoutes;
