import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { signupUser } from "../services/authApi";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

function Signup() {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [errorMessage, setErrorMessage] = useState("");
    const [successMessage, setSuccessMessage] = useState("");
    const [isLoading, setIsLoading] = useState(false);

    const navigate = useNavigate();

    const handleSignup = async (e) => {
        e.preventDefault();
        setErrorMessage("");
        setSuccessMessage("");

        if (!username || !password) {
            setErrorMessage("Please fill in both username and password.");
            return;
        }

        setIsLoading(true);

        try {
            const data = await signupUser(username, password);

            setSuccessMessage(data.message || "Account created successfully! You can now log in.");

            setUsername("");
            setPassword("");

            // Redirect to login after 1.5 seconds
            setTimeout(() => {
                navigate("/login");
            }, 1500);

        } catch (error) {
            setErrorMessage(error.message || "Failed to create account.");
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
                        <div className="brand-logo-icon" style={{ margin: "0 auto 1rem auto", width: 44, height: 44 }}>
                            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2">
                                <path d="m16 16 3-8 3 8c-.87.65-1.92 1-3 1s-2.13-.35-3-1Z"/>
                                <path d="m2 16 3-8 3 8c-.87.65-1.92 1-3 1s-2.13-.35-3-1Z"/>
                                <path d="M7 21h10"/>
                                <path d="M12 3v18"/>
                                <path d="M3 7h18"/>
                            </svg>
                        </div>
                        <h2 className="auth-title">Create Account</h2>
                        <p className="auth-subtitle">Join Nityadhikar for accessible legal guidance</p>
                    </div>

                    {errorMessage && (
                        <div className="auth-alert auth-alert-error">
                            ⚠️ {errorMessage}
                        </div>
                    )}

                    {successMessage && (
                        <div className="auth-alert auth-alert-success">
                            ✓ {successMessage}
                        </div>
                    )}

                    <form onSubmit={handleSignup} className="auth-form">
                        <div className="form-group">
                            <label className="form-label">Username</label>
                            <input
                                type="text"
                                className="form-input"
                                placeholder="Choose a username"
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
                                placeholder="Create a strong password"
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
                            {isLoading ? "Creating Account..." : "Sign Up"}
                        </button>
                    </form>

                    <div className="auth-footer">
                        Already have an account?{" "}
                        <Link to="/login" className="auth-link">
                            Login
                        </Link>
                    </div>
                </div>
            </div>

            <Footer />
        </div>
    );
}

export default Signup;