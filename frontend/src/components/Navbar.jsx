import { useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import smallLogo from "../assets/small-logo-new.png";

function Navbar() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();

  // Check if token exists in localStorage (user is logged in)
  const token = localStorage.getItem("token");

  const handleLogout = () => {
    localStorage.removeItem("token");
    setMobileOpen(false);
    navigate("/login");
  };

  const isActive = (path) => {
    return location.pathname === path ? "nav-link active" : "nav-link";
  };

  const scrollToSection = (sectionId) => {
    setMobileOpen(false);
    if (location.pathname !== "/") {
      navigate("/");
      setTimeout(() => {
        const element = document.getElementById(sectionId);
        if (element) element.scrollIntoView({ behavior: "smooth" });
      }, 100);
    } else {
      const element = document.getElementById(sectionId);
      if (element) element.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <header className="navbar">
      <div className="container navbar-container">
        {/* Brand Logo & Name */}
        <Link to="/" className="navbar-brand" onClick={() => setMobileOpen(false)}>
          <img 
            src={smallLogo} 
            alt="Nityadhikar Logo" 
            style={{ height: "40px", width: "40px", borderRadius: "8px", objectFit: "cover" }}
          />
          <span className="brand-name">
            Nitya<span className="brand-highlight">dhikar</span>
          </span>
        </Link>

        {/* Hamburger button for mobile screens */}
        <button 
          className="mobile-toggle" 
          onClick={() => setMobileOpen(!mobileOpen)}
          aria-label="Toggle Navigation Menu"
        >
          {mobileOpen ? "✕" : "☰"}
        </button>

        {/* Navigation Links */}
        <ul className={`nav-menu ${mobileOpen ? "mobile-open" : ""}`}>
          <li>
            <Link to="/" className={isActive("/")} onClick={() => setMobileOpen(false)}>
              Home
            </Link>
          </li>
          <li>
            <button className="nav-link" onClick={() => scrollToSection("how-it-works")}>
              How It Works
            </button>
          </li>
          <li>
            <button className="nav-link" onClick={() => scrollToSection("legal-guidance")}>
              Legal Guidance
            </button>
          </li>
          <li>
            <button className="nav-link" onClick={() => scrollToSection("document-analysis")}>
              Document Analysis
            </button>
          </li>
          <li>
            <button className="nav-link" onClick={() => scrollToSection("about-nityadhikar")}>
              About
            </button>
          </li>

          {/* Right side auth buttons inside mobile menu if screen is small */}
          {token ? (
            <>
              <li>
                <Link to="/dashboard" className={isActive("/dashboard")} onClick={() => setMobileOpen(false)}>
                  Dashboard
                </Link>
              </li>
              <li>
                <button className="btn btn-outline btn-sm" onClick={handleLogout}>
                  Logout
                </button>
              </li>
            </>
          ) : (
            <>
              <li>
                <Link to="/login" className="btn btn-outline btn-sm" onClick={() => setMobileOpen(false)}>
                  Login
                </Link>
              </li>
              <li>
                <Link to="/signup" className="btn btn-primary btn-sm" onClick={() => setMobileOpen(false)}>
                  Sign Up
                </Link>
              </li>
            </>
          )}
        </ul>
      </div>
    </header>
  );
}

export default Navbar;
