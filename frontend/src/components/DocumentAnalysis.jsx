import { useState } from "react";

function DocumentAnalysis() {
  const [selectedFile, setSelectedFile] = useState(null);
  const [analysisStatus, setAnalysisStatus] = useState("idle");

  const handleFileChange = (e) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      setSelectedFile(file);
      setAnalysisStatus("idle");
    }
  };

  const handleRemoveFile = () => {
    setSelectedFile(null);
    setAnalysisStatus("idle");
  };

  const formatFileSize = (bytes) => {
    if (!bytes) return "0 KB";
    const k = 1024;
    const sizes = ["Bytes", "KB", "MB", "GB"];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(1)) + " " + sizes[i];
  };

  const handleAnalyzeClick = () => {
    if (!selectedFile) return;
    setAnalysisStatus("ready_for_backend");
  };

  return (
    <section id="document-analysis" className="section">
      <div className="container">
        <div className="section-header">
          <span className="section-tag">Document Analysis</span>
          <h2 className="section-title">Understand Your Legal Documents</h2>
          <p className="section-description">
            Upload a document and get help understanding important clauses, obligations, and possible concerns in simple language.
          </p>
        </div>

        <div className="doc-analysis-box">
          {!selectedFile ? (
            <label className="upload-area">
              <input
                type="file"
                accept=".pdf"
                onChange={handleFileChange}
                style={{ display: "none" }}
              />
              <div className="upload-icon">
                <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/>
                  <polyline points="17 8 12 3 7 8"/>
                  <line x1="12" y1="3" x2="12" y2="15"/>
                </svg>
              </div>
              <h3 className="upload-title">Drag & Drop your document here</h3>
              <p className="upload-subtitle">
                or <span style={{ color: "var(--primary-mustard-hover)", fontWeight: 600, textDecoration: "underline" }}>Choose a document</span> from your device
              </p>
              <span className="tag-item">Supports PDF documents</span>
            </label>
          ) : (
            <div>
              <div className="file-selected-box">
                <div className="file-info">
                  <div className="file-icon">PDF</div>
                  <div>
                    <div className="file-name">{selectedFile.name}</div>
                    <div className="file-size">{formatFileSize(selectedFile.size)}</div>
                  </div>
                </div>
                <button
                  className="btn-remove"
                  onClick={handleRemoveFile}
                  type="button"
                >
                  Remove File
                </button>
              </div>

              {analysisStatus === "idle" && (
                <div style={{ textAlign: "center", marginTop: "1.5rem" }}>
                  <button
                    className="btn btn-primary"
                    onClick={handleAnalyzeClick}
                  >
                    Analyze Document
                  </button>
                </div>
              )}

              {analysisStatus === "ready_for_backend" && (
                <div className="chat-container" style={{ marginTop: "1.5rem", padding: "1.5rem", textAlign: "left" }}>
                  <h4 style={{ fontSize: "1.1rem", fontWeight: 700, marginBottom: "0.5rem", color: "var(--black)" }}>
                    Document Ready for Analysis
                  </h4>
                  <p style={{ fontSize: "0.95rem", color: "var(--text-medium)", marginBottom: "1rem" }}>
                    File <strong>"{selectedFile.name}"</strong> has been staged for legal clause extraction.
                  </p>
                  <div style={{ padding: "0.85rem", backgroundColor: "var(--bg-warm)", borderRadius: "var(--radius-sm)", border: "1px solid var(--border-light)", fontSize: "0.88rem", color: "var(--dark-brown)" }}>
                    💡 <em>Demo state ready for backend integration. Connecting the backend PDF parser will output simplified summaries, key deadlines, and liability points here.</em>
                  </div>
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </section>
  );
}

export default DocumentAnalysis;
