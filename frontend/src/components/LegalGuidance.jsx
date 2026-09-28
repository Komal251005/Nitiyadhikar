import { useState } from "react";

const CATEGORIES = [
  {
    id: "consumer",
    name: "Consumer Rights",
    desc: "Defective goods, refund issues, unfair trade practices",
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <circle cx="9" cy="21" r="1"/><circle cx="20" cy="21" r="1"/>
        <path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6"/>
      </svg>
    )
  },
  {
    id: "women-family",
    name: "Women & Family",
    desc: "Domestic matters, harassment, maintenance, custody rights",
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2"/>
        <circle cx="9" cy="7" r="4"/>
        <path d="M22 21v-2a4 4 0 0 0-3-3.87"/>
        <path d="M16 3.13a4 4 0 0 1 0 7.75"/>
      </svg>
    )
  },
  {
    id: "employment",
    name: "Employment",
    desc: "Salary disputes, wrongful termination, workplace safety",
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <rect width="20" height="14" x="2" y="7" rx="2" ry="2"/>
        <path d="M16 21V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16"/>
      </svg>
    )
  },
  {
    id: "property",
    name: "Property",
    desc: "Land disputes, tenancy agreements, inheritance matters",
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="m3 9 9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/>
        <polyline points="9 22 9 12 15 12 15 22"/>
      </svg>
    )
  },
  {
    id: "cybercrime",
    name: "Cybercrime",
    desc: "Online fraud, identity theft, financial scam guidance",
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <rect width="18" height="11" x="3" y="11" rx="2" ry="2"/>
        <path d="M7 11V7a5 5 0 0 1 10 0v4"/>
      </svg>
    )
  },
  {
    id: "education",
    name: "Education",
    desc: "Student rights, fee transparency, admission policies",
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M22 10v6M2 10l10-5 10 5-10 5z"/>
        <path d="M6 12v5c3 3 9 3 12 0v-5"/>
      </svg>
    )
  },
  {
    id: "other",
    name: "Other",
    desc: "General legal queries and procedural assistance",
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <circle cx="12" cy="12" r="10"/>
        <path d="M12 16v-4"/>
        <path d="M12 8h.01"/>
      </svg>
    )
  }
];

function LegalGuidance() {
  const [selectedCategory, setSelectedCategory] = useState("consumer");
  const [userQuery, setUserQuery] = useState("");
  const [messages, setMessages] = useState([
    {
      id: 1,
      sender: "system",
      text: "Welcome to Nityadhikar Legal Guidance. Select a topic above or describe your situation below in plain language. We're here to explain your rights simply."
    }
  ]);

  const handleCategorySelect = (categoryId) => {
    setSelectedCategory(categoryId);
    const categoryObj = CATEGORIES.find((c) => c.id === categoryId);
    if (categoryObj) {
      setMessages((prev) => [
        ...prev,
        {
          id: Date.now(),
          sender: "system",
          text: `You selected "${categoryObj.name}". Please describe what happened so we can guide you on relevant procedures and next steps.`
        }
      ]);
    }
  };

  const handleGetGuidance = (e) => {
    e.preventDefault();
    if (!userQuery.trim()) return;

    const currentQuery = userQuery;
    setUserQuery("");

    // Add user message
    setMessages((prev) => [
      ...prev,
      { id: Date.now(), sender: "user", text: currentQuery }
    ]);

    // Demo/placeholder state response prepared for backend AI integration
    setTimeout(() => {
      const selectedObj = CATEGORIES.find((c) => c.id === selectedCategory);
      setMessages((prev) => [
        ...prev,
        {
          id: Date.now() + 1,
          sender: "system",
          text: `[Demo State - Ready for Backend Integration]\n\nThank you for providing details regarding ${selectedObj ? selectedObj.name : "your concern"}. In a live environment, our AI system will analyze your description and break down:\n1. Basic Legal Rights & Relevant Consumer/Civil Provisions\n2. Simple Next Steps & Required Supporting Documents\n3. Guidance on filing a formal complaint or contacting legal aid.`
        }
      ]);
    }, 600);
  };

  return (
    <section id="legal-guidance" className="section section-warm">
      <div className="container">
        <div className="section-header">
          <span className="section-tag">Legal Guidance</span>
          <h2 className="section-title">What do you need help with?</h2>
          <p className="section-description">
            Choose a legal category below or type your situation directly into our guidance assistant.
          </p>
        </div>

        {/* Category Cards */}
        <div className="categories-grid">
          {CATEGORIES.map((cat) => (
            <div
              key={cat.id}
              className={`category-card ${selectedCategory === cat.id ? "selected" : ""}`}
              onClick={() => handleCategorySelect(cat.id)}
              role="button"
              tabIndex={0}
            >
              <div className="category-icon">{cat.icon}</div>
              <h3 className="category-name">{cat.name}</h3>
              <p className="category-desc">{cat.desc}</p>
            </div>
          ))}
        </div>

        {/* Chat Guidance Interface */}
        <div className="chat-container">
          <div className="chat-header">
            <div className="chat-header-title">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/>
              </svg>
              Tell us what happened
            </div>
            <span className="chat-status-badge">
              ● Ready for Input
            </span>
          </div>

          <div className="chat-messages">
            {messages.map((msg) => (
              <div
                key={msg.id}
                className={`message-bubble ${msg.sender === "user" ? "message-user" : "message-system"}`}
              >
                <div style={{ whitespace: "pre-wrap" }}>{msg.text}</div>
              </div>
            ))}
          </div>

          <div className="chat-input-area">
            <form onSubmit={handleGetGuidance} className="chat-form">
              <textarea
                className="chat-textarea"
                placeholder="Describe your situation in simple words..."
                value={userQuery}
                onChange={(e) => setUserQuery(e.target.value)}
                rows={3}
              />
              <div className="chat-input-footer">
                <span className="chat-helper-text">
                  You don't need to know legal terms. Just explain what happened.
                </span>
                <button type="submit" className="btn btn-primary btn-sm">
                  Get Guidance
                </button>
              </div>
            </form>
          </div>
        </div>

        <div style={{ textAlign: "center", marginTop: "1.5rem" }}>
          <p style={{ fontSize: "0.85rem", color: "var(--text-muted)" }}>
            * This guidance is for general information and does not replace professional legal advice.
          </p>
        </div>
      </div>
    </section>
  );
}

export default LegalGuidance;
