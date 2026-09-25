import { useNavigate } from "react-router-dom";

function Dashboard() {
    const navigate = useNavigate();

    const handleLogout = () => {
        // Remove JWT token
        localStorage.removeItem("token");

        // Go back to login
        navigate("/login");
    };

    return (
        <div>
            <h1>Nityadhikar Dashboard</h1>

            <p>Welcome to Nityadhikar!</p>

            <button onClick={handleLogout}>
                Logout
            </button>
        </div>
    );
}

export default Dashboard;