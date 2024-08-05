// Import API
import api from '../../api.js'; 

// Import Library
import { useNavigate } from 'react-router-dom';
import React, { useEffect, useState } from 'react';

function RoleList() {
    const [roles, setRoles] = useState([]);
    const [search, setSearch] = useState("");

    useEffect(() => {
        const token = localStorage.getItem('access'); // Get Token from local storage

        // Get Roles Data
        api.get('/api/roles/', {
            headers: {
                Authorization: `Bearer ${token}`,
            }
        })
        .then(response => {
            setRoles(response.data); // assuming response.data contains the roles
        })
        .catch(error => {
            console.error('Error fetching roles:', error);
        });
    }, []);

    // Show the searching values
    const handleSearchChange = (e) => {
        setSearch(e.target.value);
    };

    // Filter roles based on the search input (Role)
    const filteredRoles = Array.isArray(roles) ? roles.filter(role =>
        role.name.toLowerCase().includes(search.toLowerCase())
    ) : [];

    // Function to format date as dd/mm/yyyy
    const formatDate = (dateStr) => {
        if (!dateStr) return 'N/A'; // Handle missing dates
    
        const date = new Date(dateStr);
        if (isNaN(date.getTime())) return 'Invalid Date'; // Handle invalid dates
    
        const day = String(date.getDate()).padStart(2, '0');
        const month = String(date.getMonth() + 1).padStart(2, '0');
        const year = date.getFullYear();
        return `${day}/${month}/${year}`;
    };

    // Views
    return (
        <div className="container mt-4">
            {/* Add Button */}
            <div className="row mb-3">
                <div className="col">
                    <h1>Roles</h1>
                </div>
                <div className="col text-end">
                    <button className="btn btn-primary">
                        Add Roles
                    </button>
                </div>
            </div>

            {/* Searching */}
            <div className="row mb-3">
                <div className="col">
                    <input
                        type="text"
                        className="form-control"
                        placeholder="Search Role"
                        value={search}
                        onChange={handleSearchChange}
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
                                <th scope="col">#</th>
                                <th scope="col">Name</th>
                                <th scope="col">Created At</th>
                                <th scope="col">Last Update</th>
                            </tr>
                        </thead>

                        {/* Body */}
                        <tbody>
                            {filteredRoles.length > 0 ? (
                                filteredRoles.map((role, index) => (
                                    <tr key={role.id}>
                                        <td scope="row">{index + 1}</td>
                                        <td>{role.name}</td>
                                        <td>{formatDate(role.created_at)}</td>
                                        <td>{formatDate(role.last_update)}</td>
                                    </tr>
                                ))
                            ) : (
                                <tr>
                                    <td colSpan="4" className="text-center">No role found</td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
}

export default RoleList;
