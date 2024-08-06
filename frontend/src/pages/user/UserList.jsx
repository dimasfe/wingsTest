// Import API
import api from '../../api.js'; 

// Import Library
import { useNavigate } from 'react-router-dom';
import React, { useEffect, useState } from 'react';

function UserList() {
    const [users, setUsers] = useState([]);
    const [roles, setRoles] = useState([]);
    const [search, setSearch] = useState("");
    const navigate = useNavigate();

    useEffect(() => {
        const token = localStorage.getItem('access'); // Get Token from local storage

        // Get Users Data
        const fetchUsers = api.get('/api/users/', {
            headers: {
                Authorization: `Bearer ${token}`,
            }
        });

        // Get Roles Data
        const fetchRoles = api.get('/api/roles/', {
            headers: {
                Authorization: `Bearer ${token}`,
            }
        });

        Promise.all([fetchUsers, fetchRoles])
            .then(([userResponse, roleResponse]) => {
                setUsers(userResponse.data); // Assuming response.data contains the list of users
                setRoles(roleResponse.data); // Assuming response.data contains the list of roles
            })
            .catch(error => {
                console.error('Error fetching data:', error);
            });
    }, []);

    // Edit User Role
    const handleEdit = (roleId) => {
        if (roleId) {
            navigate(`/users/roles/update/${roleId}/`);
        } else {
            console.error('Role ID is undefined');
        }
    };

    // Show the searching values
    const handleSearchChange = (e) => {
        setSearch(e.target.value);
    };

    // Filter users based on the search input (Username)
    const filteredUsers = users.filter(user =>
        user.username.toLowerCase().includes(search.toLowerCase())
    );

    // Map roles to user roles
    const getRoleName = (roleId) => {
        const role = roleId;
        console.log(roles.at(roleId).id);
        return roles.at(roleId).id
    };

    // Views
    return (
        <div className="container mt-4">
            {/* Add Button */}
            <div className="row mb-3">
                <div className="col">
                    <h1>User</h1>

                    <br />
                    <p>Backend sudah bisa semua</p> 
                    <br />
                    <p>Error : </p>
                    <p>1. Role masih terbalik datanya</p>
                    <p>2. Edit data belum bisa</p>

                    <input
                        type="text"
                        placeholder="Search by username"
                        value={search}
                        onChange={handleSearchChange}
                        className="form-control mb-3"
                    />
                </div>
            </div>

            {/* Table */}
            <div className="row">
                <div className="col">
                    <table className="table table-striped">
                        {/* Head */}
                        <thead>
                            <tr>
                                <th scope="col" className="text-center">#</th>
                                <th scope="col" className="text-center">Username</th>
                                <th scope="col" className="text-center">Role</th>
                                <th scope="col" className="text-center">Actions</th>
                            </tr>
                        </thead>

                        {/* Body */}
                        <tbody>
                            {filteredUsers.length > 0 ? (
                                filteredUsers.map((user, index) => (
                                    <tr key={user.id}>
                                        <th scope="row" className="text-center">{index + 1}</th>
                                        <td>{user.username}</td>
                                        <td>{roles.at(index).name}</td>
                                        <td className="d-flex justify-content-center">
                                            <button className="btn btn-warning me-2" onClick={() => handleEdit(user.id)}>
                                                Edit
                                            </button>
                                        </td>
                                    </tr>
                                ))
                            ) : (
                                <tr>
                                    <td colSpan="4" className="text-center">No users found</td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
}

export default UserList;
