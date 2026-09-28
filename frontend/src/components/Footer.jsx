import { Link } from "react-router-dom";

function Footer() {
  const scrollToSection = (sectionId) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <footer className="footer">
      <div className="container">
        <div className="footer-grid">
          {/* Brand Info */}
          <div>
            <div className="footer-brand-title">
              Nityadhikar
            </div>
            <p className="footer-brand-text">
              Legal Help, Made Easier. An AI-based legal guidance platform designed to make legal rights, procedures, and documents simple and accessible for everyone.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="footer-column-title">Quick Links</h4>
            <ul className="footer-links">
              <li>
                <Link to="/" className="footer-link">Home</Link>
              </li>
              <li>
                <button className="footer-link" onClick={() => scrollToSection("how-it-works")}>
                  How It Works
                </button>
              </li>
              <li>
                <button className="footer-link" onClick={() => scrollToSection("legal-guidance")}>
                  Legal Guidance
                </button>
              </li>
              <li>
                <button className="footer-link" onClick={() => scrollToSection("document-analysis")}>
                  Document Analysis
                </button>
              </li>
              <li>
                <button className="footer-link" onClick={() => scrollToSection("about-nityadhikar")}>
                  About Nityadhikar
                </button>
              </li>
            </ul>
          </div>

          {/* Important Disclaimer */}
          <div>
            <h4 className="footer-column-title">Legal Disclaimer</h4>
            <div className="footer-disclaimer-box">
              <p>
                <strong>Important Notice:</strong> Nityadhikar provides general legal information and guidance for educational purposes. It does not replace professional legal advice.
              </p>
            </div>
          </div>
        </div>

        {/* Footer Bottom */}
        <div className="footer-bottom">
          <p>© {new Date().getFullYear()} Nityadhikar — College Innovation Project for SPPU Avishkar.</p>
          <p>Designed for Accessibility & Simplicity</p>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
