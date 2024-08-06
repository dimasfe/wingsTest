// Import API
import api from '../../api.js'; 

// Import Library
import { useNavigate } from 'react-router-dom';
import React, { useEffect, useState } from 'react';

function TaskList() {
    const [tasks, setTasks] = useState([]);
    const [users, setUsers] = useState({});
    const [search, setSearch] = useState("");

    useEffect(() => {
        const token = localStorage.getItem('access'); // Get Token from local storage

        // Get Tasks Data
        api.get('/api/tasks/', {
            headers: {
                Authorization: `Bearer ${token}`,
            }
        })
        
        // Get assigned_to id
        .then(response => {
            if (Array.isArray(response.data)) {
                setTasks(response.data);

                const userIds = Array.from(new Set(response.data.map(task => task.assigned_to)));
                return Promise.all(userIds.map(id => api.get(`/api/user/${id}/`, {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    }
                })));
            } else {
                console.error("Data is not an array:", response.data);
            }
        })

        // get assigned_to username
        .then(userResponses => {
            const userData = userResponses.reduce((acc, userResponse) => {
                const user = userResponse.data;
                acc[user.id] = user.username; // Assuming the username field is 'username'
                return acc;
            }, {});
            setUsers(userData);
        })
        .catch(error => {
            console.error("There was an error fetching the tasks or users!", error);
        });
    }, []);

    // Show the searching values
    const handleSearchChange = (e) => {
        setSearch(e.target.value);
    };

    // Filter tasks based on the search input (Task or Description)
    const filteredTasks = Array.isArray(tasks) ? tasks.filter(task =>
        task.title.toLowerCase().includes(search.toLowerCase()) ||
        task.description.toLowerCase().includes(search.toLowerCase())
    ) : [];

    // Function to format date as dd/mm/yyyy
    const formatDate = (dateStr) => {
        const date = new Date(dateStr);
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
                    <h1>Tasks</h1>

                    <br />
                    <p>Backend sudah bisa semua</p> 
                    <br />
                    <p>Error : </p>
                    <p>1. Belum bisa menambah data dari UI</p>
                    <p>2. Belum bisa mengupdate data dari UI</p>
                    <p>2. Belum bisa menghapus data dari UI</p>
                </div>
                <div className="col text-end">
                    <button className="btn btn-primary">
                        Add Task
                    </button>
                </div>
            </div>

            {/* Searching */}
            <div className="row mb-3">
                <div className="col">
                    <input
                        type="text"
                        className="form-control"
                        placeholder="Search Tasks by Title or Description"
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
                                <th scope="col" className="text-center">Title</th>
                                <th scope="col" className="text-center">Description</th>
                                <th scope="col" className="text-center">Due Date</th>
                                <th scope="col" className="text-center">Assigned To</th>
                            </tr>
                        </thead>

                        {/* Body */}
                        <tbody>
                            {filteredTasks.length > 0 ? (
                                filteredTasks.map((task, index) => (
                                    <tr key={task.id}>
                                        <th scope="row" className="text-center">{index + 1}</th>
                                        <td>{task.title}</td>
                                        <td>{task.description}</td>
                                        <td className="text-center">{formatDate(task.due_date)}</td>
                                        <td>{users[task.assigned_to] || 'Unknown'}</td>
                                    </tr>
                                ))
                            ) : (
                                <tr>
                                    <td colSpan="5" className="text-center">No tasks found</td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
}

export default TaskList;
