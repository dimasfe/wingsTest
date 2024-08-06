// Import API
import api from '../../api.js'; 

// Import Library
import { useNavigate } from 'react-router-dom';
import React, { useEffect, useState } from 'react';

function RoleList() {
    const [roles, setRoles] = useState([]);
    const [search, setSearch] = useState("");
    const [roleIds, setRoleIds] = useState([]); // State to store role IDs
    const [selectedRole, setSelectedRole] = useState(null);
    const navigate = useNavigate();

    useEffect(() => {
        const token = localStorage.getItem('access'); // Get Token from local storage

        // Get Roles Data
        api.get('/api/roles/', {
            headers: {
                Authorization: `Bearer ${token}`,
            }
        })
        .then(response => {
            const rolesData = response.data;
            setRoles(rolesData); // assuming response.data contains the roles
            setRoleIds(rolesData.map(role => role.id)); // Extract and store role IDs
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

    // Create Roles Function
    const handleAddRolesClick = () => {
        navigate('/roles/create/');
    };

    // Edit Data
    const handleEdit = (roleId) => {
        if (roleId) {
            navigate(`/roles/update/${roleId}/`);

        } else {
            console.error('Role ID is undefined');
        }
    };

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
                    <button className="btn btn-primary" onClick={handleAddRolesClick}>
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
                                <th scope="col" className="text-center">#</th>
                                <th scope="col" className="text-center">Name</th>
                                <th scope="col" className="text-center">Created At</th>
                                <th scope="col" className="text-center">Last Update</th>
                                <th scope="col" className="text-center">Actions</th>
                            </tr>
                        </thead>

                        {/* Body */}
                        <tbody>
                            {filteredRoles.length > 0 ? (
                                filteredRoles.map((role, index) => (
                                    <tr key={role.name}>
                                        <td scope="row" className="text-center">{index + 1}</td>
                                        <td>{role.name}</td>
                                        <td className="text-center">{formatDate(role.created_at)}</td>
                                        <td className="text-center">{formatDate(role.last_update)}</td>
                                        <td className="d-flex justify-content-center">
                                            <button className="btn btn-warning me-2" onClick={() => handleEdit(role.id)} >
                                                Edit
                                            </button>
                                        </td>
                                    </tr>
                                ))
                            ) : (
                                <tr>
                                    <td colSpan="5" className="text-center">No role found</td>
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
