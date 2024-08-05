// Import API
import api from "../api.js";

// Import Library
import { useEffect, useRef, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { ACCESS_TOKEN, REFRESH_TOKEN } from "../constants.js";
import toast, { Toaster } from 'react-hot-toast';

// Declare Variable
const method = "login";
const route = "/api/token/";

function Login() {
    const [username, setUsername] = useState("");
    const usernameInputRef = useRef(null);
    const [password, setPassword] = useState("");
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        setLoading(true);
        e.preventDefault();

        try {
            const res = await api.post(route, { username, password })

            if (method === "login") {
                const accessToken = res.data.access;
                const refreshToken = res.data.refresh;
                localStorage.setItem(ACCESS_TOKEN, res.data.access);
                localStorage.setItem(REFRESH_TOKEN, res.data.refresh);

                navigate("/");
                
            } else {
                navigate("/login");
            }
        } catch (error) {
            toast.error(`${error.message}` ,{ position:"bottom-center" })
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        usernameInputRef?.current?.focus();

        if (
            localStorage.getItem("access") !== null && localStorage.getItem("refresh") !== null
        ){
            navigate("/dashboard")
        }
    }, []);

    return (
        <>
            <Toaster/>
            <div className="background background-login">
                <div className="container">
                    <div className="card login-card">
                        <div className="card-body p-5">
                            <h1 className="text-center">Login</h1>
                            <p className="mb-4 mt-4 text-center">Welcome back! It's great to see you again.</p>
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
                                    className="form-control mb-2"
                                    id="password"
                                    name="password" 
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                    placeholder="Password"
                                    required
                                />
                                <div className="mt-4">
                                    Don't have an account?&nbsp;
                                    <Link to="/register">
                                        Register
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

export default Login;
