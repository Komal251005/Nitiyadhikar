import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { signupUser } from "../services/authApi";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import smallLogo from "../assets/small-logo-new.png";

function Signup() {
    const [formData, setFormData] = useState({
        firstName: "",
        lastName: "",
        email: "",
        mobileNumber: "",
        city: "",
        password: "",
        confirmPassword: "",
        termsAccepted: false
    });

    const [fieldErrors, setFieldErrors] = useState({});
    const [errorMessage, setErrorMessage] = useState("");
    const [successMessage, setSuccessMessage] = useState("");
    const [isLoading, setIsLoading] = useState(false);
    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);

    const navigate = useNavigate();

    const handleChange = (e) => {
        const { name, value, type, checked } = e.target;
        const fieldValue = type === "checkbox" ? checked : value;

        setFormData((prev) => ({
            ...prev,
            [name]: fieldValue
        }));

        // Clear field error on change
        if (fieldErrors[name]) {
            setFieldErrors((prev) => ({
                ...prev,
                [name]: ""
            }));
        }
    };

    const validateForm = () => {
        const errors = {};

        // 1. First Name
        if (!formData.firstName.trim()) {
            errors.firstName = "First name is required.";
        }

        // 2. Last Name
        if (!formData.lastName.trim()) {
            errors.lastName = "Last name is required.";
        }

        // 3. Email
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!formData.email.trim()) {
            errors.email = "Email address is required.";
        } else if (!emailRegex.test(formData.email.trim())) {
            errors.email = "Please enter a valid email address.";
        }

        // 4. Mobile Number
        const mobileRegex = /^[6-9]\d{9}$/;
        if (!formData.mobileNumber.trim()) {
            errors.mobileNumber = "Mobile number is required.";
        } else if (!mobileRegex.test(formData.mobileNumber.trim())) {
            errors.mobileNumber = "Please enter a valid 10-digit mobile number.";
        }

        // 5. City
        if (!formData.city.trim()) {
            errors.city = "City is required.";
        }

        // 6. Password
        if (!formData.password) {
            errors.password = "Password is required.";
        } else if (formData.password.length < 6) {
            errors.password = "Password must be at least 6 characters long.";
        }

        // 7. Confirm Password
        if (!formData.confirmPassword) {
            errors.confirmPassword = "Please confirm your password.";
        } else if (formData.password !== formData.confirmPassword) {
            errors.confirmPassword = "Passwords do not match.";
        }

        // 8. Terms & Conditions
        if (!formData.termsAccepted) {
            errors.termsAccepted = "You must agree to the Terms & Conditions to sign up.";
        }

        setFieldErrors(errors);
        return Object.keys(errors).length === 0;
    };

    const handleSignup = async (e) => {
        e.preventDefault();
        setErrorMessage("");
        setSuccessMessage("");

        if (!validateForm()) {
            setErrorMessage("Please fix the highlighted errors before submitting.");
            return;
        }

        setIsLoading(true);

        try {
            // Prepare payload
            const payload = {
                firstName: formData.firstName.trim(),
                lastName: formData.lastName.trim(),
                email: formData.email.trim(),
                mobileNumber: formData.mobileNumber.trim(),
                city: formData.city.trim(),
                password: formData.password,
                termsAccepted: formData.termsAccepted
            };

            const data = await signupUser(payload);

            setSuccessMessage(data.message || "Account created successfully! Redirecting to login...");

            // Reset form fields
            setFormData({
                firstName: "",
                lastName: "",
                email: "",
                mobileNumber: "",
                city: "",
                password: "",
                confirmPassword: "",
                termsAccepted: false
            });

            // Redirect to login after 1.5 seconds
            setTimeout(() => {
                navigate("/login");
            }, 1500);

        } catch (error) {
            setErrorMessage(error.message || "Failed to create account. Please try again.");
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div style={{ display: "flex", flexDirection: "column", minHeight: "100vh" }}>
            <Navbar />

            <div className="auth-page-container">
                <div className="auth-card auth-card-wide">
                    <div className="auth-header">
                        <div style={{ margin: "0 auto 0.75rem auto", width: 46, height: 46 }}>
                            <img 
                                src={smallLogo} 
                                alt="Nityadhikar Logo" 
                                style={{ width: "100%", height: "100%", borderRadius: "10px", objectFit: "cover" }}
                            />
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

                    <form onSubmit={handleSignup} className="auth-form" noValidate>
                        {/* First Name & Last Name */}
                        <div className="form-row">
                            <div className="form-group">
                                <label className="form-label">First Name *</label>
                                <input
                                    type="text"
                                    name="firstName"
                                    className={`form-input ${fieldErrors.firstName ? "form-input-error" : ""}`}
                                    placeholder="Enter first name"
                                    value={formData.firstName}
                                    onChange={handleChange}
                                    disabled={isLoading}
                                />
                                {fieldErrors.firstName && <span className="field-error-text">{fieldErrors.firstName}</span>}
                            </div>

                            <div className="form-group">
                                <label className="form-label">Last Name *</label>
                                <input
                                    type="text"
                                    name="lastName"
                                    className={`form-input ${fieldErrors.lastName ? "form-input-error" : ""}`}
                                    placeholder="Enter last name"
                                    value={formData.lastName}
                                    onChange={handleChange}
                                    disabled={isLoading}
                                />
                                {fieldErrors.lastName && <span className="field-error-text">{fieldErrors.lastName}</span>}
                            </div>
                        </div>

                        {/* Email & Mobile Number */}
                        <div className="form-row">
                            <div className="form-group">
                                <label className="form-label">Email Address *</label>
                                <input
                                    type="email"
                                    name="email"
                                    className={`form-input ${fieldErrors.email ? "form-input-error" : ""}`}
                                    placeholder="name@example.com"
                                    value={formData.email}
                                    onChange={handleChange}
                                    disabled={isLoading}
                                />
                                {fieldErrors.email && <span className="field-error-text">{fieldErrors.email}</span>}
                            </div>

                            <div className="form-group">
                                <label className="form-label">Mobile Number *</label>
                                <input
                                    type="tel"
                                    name="mobileNumber"
                                    className={`form-input ${fieldErrors.mobileNumber ? "form-input-error" : ""}`}
                                    placeholder="10-digit mobile number"
                                    value={formData.mobileNumber}
                                    onChange={handleChange}
                                    disabled={isLoading}
                                    maxLength={10}
                                />
                                {fieldErrors.mobileNumber && <span className="field-error-text">{fieldErrors.mobileNumber}</span>}
                            </div>
                        </div>

                        {/* City */}
                        <div className="form-group">
                            <label className="form-label">City *</label>
                            <input
                                type="text"
                                name="city"
                                className={`form-input ${fieldErrors.city ? "form-input-error" : ""}`}
                                placeholder="Enter your city"
                                value={formData.city}
                                onChange={handleChange}
                                disabled={isLoading}
                            />
                            {fieldErrors.city && <span className="field-error-text">{fieldErrors.city}</span>}
                        </div>

                        {/* Password & Confirm Password */}
                        <div className="form-row">
                            <div className="form-group">
                                <label className="form-label">Password *</label>
                                <div className="password-input-wrap">
                                    <input
                                        type={showPassword ? "text" : "password"}
                                        name="password"
                                        className={`form-input ${fieldErrors.password ? "form-input-error" : ""}`}
                                        placeholder="Min. 6 characters"
                                        value={formData.password}
                                        onChange={handleChange}
                                        disabled={isLoading}
                                    />
                                    <button
                                        type="button"
                                        className="password-toggle-btn"
                                        onClick={() => setShowPassword(!showPassword)}
                                        tabIndex={-1}
                                    >
                                        {showPassword ? "Hide" : "Show"}
                                    </button>
                                </div>
                                {fieldErrors.password && <span className="field-error-text">{fieldErrors.password}</span>}
                            </div>

                            <div className="form-group">
                                <label className="form-label">Confirm Password *</label>
                                <div className="password-input-wrap">
                                    <input
                                        type={showConfirmPassword ? "text" : "password"}
                                        name="confirmPassword"
                                        className={`form-input ${fieldErrors.confirmPassword ? "form-input-error" : ""}`}
                                        placeholder="Re-enter password"
                                        value={formData.confirmPassword}
                                        onChange={handleChange}
                                        disabled={isLoading}
                                    />
                                    <button
                                        type="button"
                                        className="password-toggle-btn"
                                        onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                                        tabIndex={-1}
                                    >
                                        {showConfirmPassword ? "Hide" : "Show"}
                                    </button>
                                </div>
                                {fieldErrors.confirmPassword && <span className="field-error-text">{fieldErrors.confirmPassword}</span>}
                            </div>
                        </div>

                        {/* Terms & Conditions Checkbox */}
                        <div className="form-group" style={{ marginTop: "0.25rem" }}>
                            <div className="checkbox-group">
                                <input
                                    type="checkbox"
                                    id="termsAccepted"
                                    name="termsAccepted"
                                    className="checkbox-input"
                                    checked={formData.termsAccepted}
                                    onChange={handleChange}
                                    disabled={isLoading}
                                />
                                <label htmlFor="termsAccepted" className="checkbox-label">
                                    I agree to the <strong>Terms & Conditions</strong> and Privacy Policy of Nityadhikar.
                                </label>
                            </div>
                            {fieldErrors.termsAccepted && <span className="field-error-text">{fieldErrors.termsAccepted}</span>}
                        </div>

                        {/* Submit Button */}
                        <button 
                            type="submit" 
                            className="btn btn-primary" 
                            style={{ width: "100%", marginTop: "0.75rem" }}
                            disabled={isLoading}
                        >
                            {isLoading ? "Creating Account..." : "Sign Up"}
                        </button>
                    </form>

                    <div className="auth-footer">
                        Already have an account?{" "}
                        <Link to="/login" className="auth-link">
                            Sign In
                        </Link>
                    </div>
                </div>
            </div>

            <Footer />
        </div>
    );
}

export default Signup;