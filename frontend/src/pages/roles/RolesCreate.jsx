// Import API
import api from "../../api.js";

// Import Library
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import toast, { Toaster } from 'react-hot-toast';

const RoleCreate = () => {
    const [name, setName] = useState('');
    const navigate = useNavigate();

    // Create Data
    const handleSubmit = async (e) => {
        e.preventDefault();
        const payload = { name };

        try {
            const response = await api.post('/api/roles/create/', { name });
            console.log(response.status);

            if (response.status === 201) {
                // Handle successful response
                toast.success("Role Successfully Created!", { position: "top-center", autoClose: 2000 });
                setName(''); // Clear the form
            } else {
                toast.error(`${errorData.message}` ,{ position:"bottom-center" })
            }
        } catch (error) {
            toast.error(`${'An error occurred. Please try again.'}` ,{ position:"bottom-center" })
        }
    };

    // Back to roles list
    const handleBack = () => {
        navigate('/roles');
    };

    return (
        <div className="container mt-4">
            {/* Add Button */}
            <div className="row mb-3">
                <div className="col">
                    <h1>Create Roles</h1>
                </div>
            </div>

            {/* Form */}
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
                <button type="submit" className="btn btn-primary">Create</button>
            </form>
        </div>
    );
};

export default RoleCreate;
