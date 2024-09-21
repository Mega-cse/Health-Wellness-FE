import React from 'react';
import { Routes, Route } from 'react-router-dom'; 
import UserManagement from '../AdminDashboard/UserManagement';
import CreateExerciseForm from './Exercise/CreateExerciseForm'; 
import UserDetails from './UserDetails';
import UpdateExercise from './Exercise/UpdateExercise';

import ListOfExercises from './Exercise/ListOfExercises';
import AdminDashboard from '../AdminDashboard/AdminDashboard';



const AdminRoutes = () => {
  return (
    <Routes>
      <Route path="/admin-dashboard" element={<AdminDashboard/>}/>
      <Route path="/create-exercise" element={<CreateExerciseForm />} />
      <Route path="/manage-users" element={<UserManagement />} />
      <Route path="/user-details/:userId" element={<UserDetails />} />
      <Route path="/get-exercise" element={<ListOfExercises />} />
      <Route path="/update-exercise/:id" element={<UpdateExercise />} />
    
    </Routes>
  );
};

export default AdminRoutes;
