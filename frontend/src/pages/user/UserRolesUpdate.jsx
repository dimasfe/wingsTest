import React, { useEffect, useState } from 'react';
import api from '../../api.js';
import { useParams, useNavigate } from 'react-router-dom';

function UserRolesUpdate() {
    const { roleId } = useParams();
    const navigate = useNavigate();
    const [role, setRole] = useState("");
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const token = localStorage.getItem('access');

        // Fetch role data
        const fetchRole = async () => {
            try {
                const response = await api.patch(`/api/users/update/roles/${roleId}/`);
                
                if (response.status === 200) {
                    setRole(response.data.role); // Populate form with existing data
                } else {
                    toast.error('Failed to fetch role data.', { position: "bottom-center" });
                }
            } catch (error) {
                toast.error('An error occurred while fetching role data.', { position: "bottom-center" });
            }
        };
    }, [roleId]);

    // Handle input change
    const handleInputChange = (e) => {
        setRole(e.target.value);
    };

    // Handle form submission
    const handleSubmit = (e) => {
        e.preventDefault();
        const token = localStorage.getItem('access');

        api.patch(`/api/users/roles/update/${roleId}/`, { role : roleId }, {
            headers: {
                Authorization: `Bearer ${token}`,
            }
        })
        .then(() => {
            navigate('/roles');
        })
        .catch(error => {
            console.error('Error updating role:', error);
        });
    };

    return (
        <div className="container mt-4">
            <h1>Update Role | Belum Bisa </h1>

            <br />
            <p>Backend sudah bisa</p> 
            <br />

            <p>Error : </p>
            <p>1. Edit data belum bisa</p>

            <br />

            <form onSubmit={handleSubmit}>
                <div className="form-group">
                    <label htmlFor="roleName">Role Name</label>
                    <input
                        type="text"
                        id="roleName"
                        value={role} // Ensure the value is always defined
                        onChange={(e) => setRole(e.target.value)}
                        className="form-control"
                    />
                </div>
                <button type="submit" className="btn btn-primary mt-3">Update</button>
            </form>
        </div>
    );
}

export default UserRolesUpdate;
