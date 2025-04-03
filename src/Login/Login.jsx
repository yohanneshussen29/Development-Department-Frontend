import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import './../Maping/Where.css';


const Login = () => {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");
    const navigate = useNavigate();

    const handleLogin = async (e) => {
        e.preventDefault();
        try {
            const response = await fetch('https://development-department.onrender.com/api/login', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ username, password }),
            });

            const data = await response.json();
            if (response.ok) {
                setError("");
                localStorage.setItem("isLoggedIn", "true");
                navigate("/home");
            } else {
                setError(data.message || "Invalid credentials");
            }
        } catch (err) {
            setError("Connection error. Please try again.");
        }
    };

    return (
        <div className="login-container">
            <h2>Login</h2>
            {error && <p className="error-message">{error}</p>}
            <div className="form__group field">
            <form onSubmit={handleLogin}>
    <div className="form__group">  
        <label htmlFor="username" className="form__label">Username</label>
        <input
            className="form__field"
            type="text"
            id="username"  
            placeholder="Enter username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
        />
    </div>
<br />
    <div className="form__group"> 
        <label htmlFor="password" className="form__label">Password</label>
        <input
            className="form__field"
            type="password"
            id="password" 
            placeholder="Enter password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
        />
    </div>
<br />
    <button type="submit">Login</button>
</form>
            </div>
        </div>
    );
};

export default Login;