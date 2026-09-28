import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import LegalGuidance from "../components/LegalGuidance";
import DocumentAnalysis from "../components/DocumentAnalysis";

function Home() {
  const scrollToSection = (id) => {
    const el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <div style={{ display: "flex", flexDirection: "column", minHeight: "100vh" }}>
      <Navbar />

      {/* HERO SECTION */}
      <section className="hero-section">
        <div className="container">
          <div className="hero-grid">
            <div className="hero-content">
              <div className="hero-badge">
                <span>⚖️</span> Accessible Legal Guidance Platform
              </div>
              <h1 className="hero-title">
                Legal Help, Made Easier.
              </h1>
              <p className="hero-subtitle">
                Understand your rights, explore your options, and get simple legal guidance — without complicated legal language.
              </p>
              
              <div className="hero-buttons">
                <button 
                  className="btn btn-primary"
                  onClick={() => scrollToSection("legal-guidance")}
                >
                  Get Legal Guidance
                </button>
                <button 
                  className="btn btn-secondary"
                  onClick={() => scrollToSection("how-it-works")}
                >
                  How It Works
                </button>
              </div>

              <div className="hero-disclaimer">
                <span className="disclaimer-icon">ℹ</span>
                <span>
                  Nityadhikar provides general legal information and guidance for educational purposes. It does not replace professional legal advice.
                </span>
              </div>
            </div>

            {/* HERO VISUAL GRAPHIC */}
            <div className="hero-visual-card">
              <div className="hero-visual-icon-box">
                <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                  <path d="m16 16 3-8 3 8c-.87.65-1.92 1-3 1s-2.13-.35-3-1Z"/>
                  <path d="m2 16 3-8 3 8c-.87.65-1.92 1-3 1s-2.13-.35-3-1Z"/>
                  <path d="M7 21h10"/>
                  <path d="M12 3v18"/>
                  <path d="M3 7h18"/>
                </svg>
              </div>
              <h3 className="hero-visual-title">Simple Legal Clarity</h3>
              <p className="hero-visual-text">
                Designed for everyone — regardless of legal knowledge or technical background.
              </p>
              <div className="hero-feature-tags">
                <span className="tag-item">Clear Language</span>
                <span className="tag-item">Step-by-Step</span>
                <span className="tag-item">Document Help</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* HOW NITYADHIKAR HELPS SECTION */}
      <section id="how-it-works" className="section">
        <div className="container">
          <div className="section-header">
            <span className="section-tag">How It Works</span>
            <h2 className="section-title">How Nityadhikar Helps You</h2>
            <p className="section-description">
              Getting legal information shouldn't be confusing. Follow three easy steps to get guidance on your situation.
            </p>
          </div>

          <div className="steps-grid">
            {/* Step 01 */}
            <div className="step-card">
              <div className="step-number">01 — ASK</div>
              <div className="step-icon-wrap">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2">
                  <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/>
                </svg>
              </div>
              <h3 className="step-title">Tell us about your situation</h3>
              <p className="step-description">
                Describe what happened in simple everyday words. You don't need to know complex legal terminology.
              </p>
            </div>

            {/* Step 02 */}
            <div className="step-card">
              <div className="step-number">02 — UNDERSTAND</div>
              <div className="step-icon-wrap">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2">
                  <circle cx="12" cy="12" r="10"/>
                  <path d="M9.09 9a3 3 0 0 1 5.83 1c0 2-3 3-3 3"/>
                  <line x1="12" y1="17" x2="12.01" y2="17"/>
                </svg>
              </div>
              <h3 className="step-title">Get information explained simply</h3>
              <p className="step-description">
                Receive clear breakdowns of relevant legal rights and provisions translated into easy-to-read language.
              </p>
            </div>

            {/* Step 03 */}
            <div className="step-card">
              <div className="step-number">03 — TAKE NEXT STEP</div>
              <div className="step-icon-wrap">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2">
                  <polyline points="9 18 15 12 9 6"/>
                </svg>
              </div>
              <h3 className="step-title">Understand possible options</h3>
              <p className="step-description">
                Learn about potential remedies, essential documents to gather, and formal procedures to follow.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* LEGAL GUIDANCE INTERACTIVE SECTION */}
      <LegalGuidance />

      {/* DOCUMENT ANALYSIS SECTION */}
      <DocumentAnalysis />

      {/* ABOUT NITYADHIKAR SECTION */}
      <section id="about-nityadhikar" className="section section-warm">
        <div className="container">
          <div className="about-grid">
            <div>
              <span className="section-tag">About Nityadhikar</span>
              <h2 className="section-title" style={{ textAlign: "left" }}>
                Bridge the Gap in Legal Awareness
              </h2>
              <p style={{ fontSize: "1.05rem", color: "var(--text-medium)", marginBottom: "1.25rem" }}>
                Legal information can be difficult to access and even harder to understand for everyday citizens.
              </p>
              <p style={{ fontSize: "1rem", color: "var(--text-dark)", lineHeight: 1.6 }}>
                Nityadhikar aims to simplify legal access by serving as an intuitive guide. We help users navigate through rights, procedures, document obligations, and next steps with complete confidence.
              </p>
            </div>

            <div className="about-card">
              <h3 style={{ fontSize: "1.25rem", fontWeight: 700, color: "var(--black)", marginBottom: "1rem" }}>
                Core Objectives of Nityadhikar
              </h3>
              <ul className="about-list">
                <li className="about-item">
                  <span className="about-check">✓</span>
                  <span><strong>Plain Language Guidance:</strong> Translating legal complexity into simple words.</span>
                </li>
                <li className="about-item">
                  <span className="about-check">✓</span>
                  <span><strong>Accessibility First:</strong> Designed for users regardless of technical or legal background.</span>
                </li>
                <li className="about-item">
                  <span className="about-check">✓</span>
                  <span><strong>Empowerment:</strong> Helping individuals understand their rights before taking legal steps.</span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}

export default Home;
