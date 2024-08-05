import api from "../../api.js";
import { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import toast from 'react-hot-toast';

const RolesUpdate = () => {
    const [name, setName] = useState('');
    const navigate = useNavigate();
    const { roleId } = useParams(); // Get roleId from route params

    useEffect(() => {
        // Fetch existing role data if necessary
        const fetchRole = async () => {
            try {
                const response = await api.get(`/api/roles/update/${roleId}/`);
                
                if (response.status === 200) {
                    setName(response.data.name); // Populate form with existing data
                } else {
                    toast.error('Failed to fetch role data.', { position: "bottom-center" });
                }
            } catch (error) {
                toast.error('An error occurred while fetching role data.', { position: "bottom-center" });
            }
        };

        fetchRole();
    }, [roleId]);

    const handleSubmit = async (e) => {
        e.preventDefault();
    
        const payload = { name };
    
        try {
            const response = await api.put(`/api/roles/update/${roleId}/`, payload);
            console.log(response.status);
    
            if (response.status === 200) {
                toast.success("Role Successfully Updated!", { position: "top-center", autoClose: 2000 });
                navigate('/roles'); // Redirect to roles list
            } else {
                toast.error(`Failed to update role.`, { position: "bottom-center" });
            }
        } catch (error) {
            toast.error(`An error occurred. Please try again.`, { position: "bottom-center" });
        }
    };

    const handleBack = () => {
        navigate('/roles');
    };

    return (
        <div className="container mt-4">
            <div className="row mb-3">
                <div className="col">
                    <h1>Update Roles</h1>
                </div>
            </div>

            <form onSubmit={handleSubmit}>
                <div className="mb-3">
                    <label htmlFor="name" className="form-label">Role Name</label>
                    <input
                        type="text"
                        className="form-control"
                        id="name"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        required
                    />
                </div>
                <button type="button" className="btn btn-secondary" onClick={handleBack}>Back</button>
                <button type="submit" className="btn btn-primary">Update</button>
            </form>
        </div>
    );
};

export default RolesUpdate;
