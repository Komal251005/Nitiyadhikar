import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { loginUser } from "../services/authApi";
import { Link } from "react-router-dom";

function Login() {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");

    const navigate = useNavigate();

    const handleLogin = async (e) => {
        e.preventDefault();

        try {
            const data = await loginUser(username, password);

            // Store JWT token
            localStorage.setItem("token", data.token);

            alert("Login successful!");

            setUsername("");
            setPassword("");

            // Go to dashboard
            navigate("/dashboard");

        } catch (error) {
            alert(error.message);
        }
    };

    return (
        <div>
            <h2>Login</h2>

            <form onSubmit={handleLogin}>
                <input
                    type="text"
                    placeholder="Username"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                />

                <br /><br />

                <input
                    type="password"
                    placeholder="Password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                />

                <br /><br />

                <button type="submit">
                    Login
                </button>
            </form>
            <p>
                Don't have an account?{" "}
                <Link to="/signup">Create an account</Link>
            </p>
        </div>
    );
}

export default Login;