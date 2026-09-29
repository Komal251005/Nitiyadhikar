import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { loginUser } from "../services/authApi";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import smallLogo from "../assets/small-logo-new.png";

function Login() {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [errorMessage, setErrorMessage] = useState("");
    const [isLoading, setIsLoading] = useState(false);

    const navigate = useNavigate();

    const handleLogin = async (e) => {
        e.preventDefault();
        setErrorMessage("");

        if (!username || !password) {
            setErrorMessage("Please enter both username and password.");
            return;
        }

        setIsLoading(true);

        try {
            const data = await loginUser(username, password);

            // Store JWT token
            localStorage.setItem("token", data.token);

            setUsername("");
            setPassword("");

            // Go to dashboard
            navigate("/dashboard");

        } catch (error) {
            setErrorMessage(error.message || "Invalid credentials. Please try again.");
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div style={{ display: "flex", flexDirection: "column", minHeight: "100vh" }}>
            <Navbar />

            <div className="auth-page-container">
                <div className="auth-card">
                    <div className="auth-header">
                        <div style={{ margin: "0 auto 1rem auto", width: 50, height: 50 }}>
                            <img 
                                src={smallLogo} 
                                alt="Nityadhikar Logo" 
                                style={{ width: "100%", height: "100%", borderRadius: "10px", objectFit: "cover" }}
                            />
                        </div>
                        <h2 className="auth-title">Welcome Back</h2>
                        <p className="auth-subtitle">Sign in to access Nityadhikar services</p>
                    </div>

                    {errorMessage && (
                        <div className="auth-alert auth-alert-error">
                            ⚠️ {errorMessage}
                        </div>
                    )}

                    <form onSubmit={handleLogin} className="auth-form">
                        <div className="form-group">
                            <label className="form-label">Username</label>
                            <input
                                type="text"
                                className="form-input"
                                placeholder="Enter your username"
                                value={username}
                                onChange={(e) => setUsername(e.target.value)}
                                disabled={isLoading}
                            />
                        </div>

                        <div className="form-group">
                            <label className="form-label">Password</label>
                            <input
                                type="password"
                                className="form-input"
                                placeholder="Enter your password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                disabled={isLoading}
                            />
                        </div>

                        <button 
                            type="submit" 
                            className="btn btn-primary" 
                            style={{ width: "100%", marginTop: "0.5rem" }}
                            disabled={isLoading}
                        >
                            {isLoading ? "Signing in..." : "Login"}
                        </button>
                    </form>

                    <div className="auth-footer">
                        Don't have an account?{" "}
                        <Link to="/signup" className="auth-link">
                            Create an account
                        </Link>
                    </div>
                </div>
            </div>

            <Footer />
        </div>
    );
}

export default Login;