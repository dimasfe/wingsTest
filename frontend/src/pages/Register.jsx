// Import API
import api from "../api.js";

// Import Library
import { useEffect, useRef, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { ACCESS_TOKEN, REFRESH_TOKEN } from "../constants.js";
import toast, { Toaster } from 'react-hot-toast';

// Declare Variable
const method = "Register";
const route = "/api/user/register/";

function Register() {
    const [username, setUsername] = useState("");
    const usernameInputRef = useRef(null);
    const [password, setPassword] = useState("");
    const [passwordError, setPasswordError] = useState("");
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();

    const handleSubmit = async (e) => {

        e.preventDefault();

        // Check if password criteria is match
        if (password.length < 8) {
            setPasswordError("Password must be at least 8 characters long");
            return; // Exit the function if password length is less than 8 characters
        } else if (!/[A-Z]/.test(password)) {
            setPasswordError("Password must contain at least one uppercase letter");
            return; // Exit the function if password doesn't contain an uppercase letter
        } else if (!/[a-z]/.test(password)) {
            setPasswordError("Password must contain at least one lowercase letter");
            return; // Exit the function if password doesn't contain a lowercase letter
        } else if (!/[^\w\s]/.test(password)) {
            setPasswordError("Password must contain at least one symbol");
            return; // Exit the function if password doesn't contain a symbol
        }

        try {
            const res = await api.post(route, { username, password })

            // If User Created
            if (res.status === 201) {
                toast.success("Account Successfully Created!", { position: "bottom-center", autoClose: 2000 });
                
                // Navigate to /validate-otp with user data in the state
                setTimeout(() => {
                    navigate("/login");
                }, 2000);
            } else {
                toast.error("Failed to Register. Please try again.", { position: "bottom-center", autoClose: 2000 });
            }
        } catch (error) {
            if (error.response && error.response.data && error.response.data.detail) {
                const errorMessage = error.response.data.detail;
                if (errorMessage === "E-mail has been registered!") {
                    // Set email error message
                    setEmailError(errorMessage);
                } else {
                    toast.error(errorMessage, { position: "bottom-center" });
                }
            } else {
                // Handle the case where error.response is undefined
                toast.error("Failed to register. Please try again.", { position: "bottom-center" });
            }
        } finally {
            setLoading(false);
        }
    };

    return (
        <>
            <Toaster/>
            <div className="background background-register">
                <div className="container">
                    <div className="card login-card">
                        <div className="card-body p-5">
                            <h1 className="text-center">Register</h1>
                            <p className="mb-4 mt-4 text-center">Welcome! We're excited to have you join our securities crowdfunding platform as a new registrant.</p>
                            <form onSubmit={handleSubmit}>
                                {/* Username */}
                                <label htmlFor="username">Username</label>
                                <input 
                                    type="username" 
                                    className="form-control mb-3"
                                    id="username"
                                    name="username" 
                                    value={username}
                                    onChange={(e) => setUsername(e.target.value)}
                                    placeholder="Username"
                                    ref={usernameInputRef}
                                    required
                                />

                                {/* Password */}
                                <label htmlFor="password">Password</label>
                                <input 
                                    type="password" 
                                    className="form-control mb-3"
                                    id="password" 
                                    name="password" 
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                    placeholder="Password"
                                    required
                                />

                                {/* Error message for password mismatch */}
                                {passwordError && <p className="text-danger">{passwordError}</p>}

                                <div className="mt-4">
                                    Already have an account?&nbsp;
                                    <Link to="/login">
                                        Login
                                    </Link>

                                    <button className="btn btn-dark text-white float-end mb-5" >
                                        Submit
                                    </button>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}

export default Register;
