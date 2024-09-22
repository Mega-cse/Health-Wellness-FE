import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';

const UserManagement = () => {
  const [users, setUsers] = useState([]);
  const [search, setSearch] = useState('');
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await axios.get('https://health-wellness-be-3.onrender.com/api/auth/all', {
          withCredentials: true,
        });
        if (response.data && response.data.users) {
          setUsers(response.data.users);
        } else {
          setError('No users found');
        }
      } catch (err) {
        if (err.response && err.response.status === 401) {
          setError('Unauthorized access. Please log in as an admin.');
        } else {
          setError('Failed to fetch users');
        }
      }
    };

    fetchUsers();
  }, []);

  const filteredUsers = users.filter(user =>
    user.username && user.username.toLowerCase().includes(search.toLowerCase())
  );

  const handleView = (userId) => {
<<<<<<< HEAD
    navigate(`/admin/manage-users/user-details/${userId}`);
=======
    navigate(`/admin/user-details/${userId}`);
>>>>>>> 8c32077a10f94c10ad8897307b05358f76ea1c4d
  };
  

  return (
    <div className="container mb-4">
      <h2 className="mb-4">Manage Users</h2>

      {/* Search Bar */}
      <div className="mb-3">
        <input
          type="text"
          className="form-control"
          placeholder="Search users by name"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
      </div>

      {error && <div className="alert alert-danger">{error}</div>}

      {/* Users Table */}
      <table className="table table-bordered table-hover">
        <thead>
          <tr>
            <th>Username</th>
            <th>Email</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {filteredUsers.length > 0 ? (
            filteredUsers.map(user => (
              <tr key={user._id}>
                <td>{user.username}</td>
                <td>{user.email}</td>
                <td>
                  <button
                    className="btn btn-info"
                    onClick={() => handleView(user._id)}
                  >
                    View
                  </button>
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="3" className="text-center">
                No users found
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
};

export default UserManagement;
