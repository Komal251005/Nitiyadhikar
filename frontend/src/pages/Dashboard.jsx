import { useEffect, useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { getProfile } from "../services/userApi";
import smallLogo from "../assets/small-logo-new.png";

function Dashboard() {
    const navigate = useNavigate();
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchUserData = async () => {
            try {
                const data = await getProfile();
                setUser(data.user);
            } catch (err) {
                console.error("Failed to fetch user profile", err);
            } finally {
                setLoading(false);
            }
        };

        fetchUserData();
    }, []);

    const handleLogout = () => {
        // Remove JWT token
        localStorage.removeItem("token");
        // Go back to login
        navigate("/login");
    };

    return (
        <div style={{ display: "flex", flexDirection: "column", minHeight: "100vh" }}>
            <Navbar />

            <div className="section section-warm" style={{ flexGrow: 1 }}>
                <div className="container" style={{ maxWidth: 800 }}>
                    <div className="about-card" style={{ textAlign: "center", padding: "3rem 2rem" }}>
                        <div style={{ margin: "0 auto 1.25rem auto", width: 60, height: 60 }}>
                            <img 
                                src={smallLogo} 
                                alt="Nityadhikar Logo" 
                                style={{ width: "100%", height: "100%", borderRadius: "12px", objectFit: "cover" }}
                            />
                        </div>

                        <h1 className="section-title" style={{ fontSize: "2rem", marginBottom: "0.5rem" }}>
                            Nityadhikar User Dashboard
                        </h1>

                        <p style={{ fontSize: "1.1rem", color: "var(--text-medium)", marginBottom: "2rem" }}>
                            {loading ? "Loading profile..." : user?.username ? `Welcome back, ${user.username}!` : "Welcome to Nityadhikar!"}
                        </p>

                        <div style={{ display: "flex", gap: "1rem", justifyContent: "center", flexWrap: "wrap", marginBottom: "2rem" }}>
                            <Link to="/" className="btn btn-primary">
                                Explore Legal Guidance
                            </Link>
                            <button onClick={handleLogout} className="btn btn-secondary">
                                Logout
                            </button>
                        </div>

                        <div className="hero-disclaimer" style={{ margin: "0 auto" }}>
                            <span className="disclaimer-icon">🔒</span>
                            <span>
                                You are authenticated with secure JWT token storage.
                            </span>
                        </div>
                    </div>
                </div>
            </div>

            <Footer />
        </div>
    );
}

export default Dashboard;