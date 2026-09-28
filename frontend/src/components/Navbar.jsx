import { useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";

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
          <div className="brand-logo-icon" title="Nityadhikar Legal Guidance">
            {/* Scales of Justice Icon */}
            <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
              <path d="m16 16 3-8 3 8c-.87.65-1.92 1-3 1s-2.13-.35-3-1Z"/>
              <path d="m2 16 3-8 3 8c-.87.65-1.92 1-3 1s-2.13-.35-3-1Z"/>
              <path d="M7 21h10"/>
              <path d="M12 3v18"/>
              <path d="M3 7h18"/>
            </svg>
          </div>
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
