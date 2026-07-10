import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { register } from "../services/authService";

function Register() {
    const navigate = useNavigate();
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [message, setMessage] = useState({ type: "", text: "" });
    const [loading, setLoading] = useState(false);

    const handleRegister = async (e) => {
        e.preventDefault();
        setLoading(true);
        setMessage({ type: "", text: "" });

        try {
            await register(name, email, password);
            setMessage({ type: "success", text: "Registration Successful! Redirecting to login..." });
            setTimeout(() => navigate("/login"), 2000);
        } catch (error) {
            console.error(error);
            setMessage({ 
                type: "error", 
                text: error.response?.data?.message || error.response?.data || "Registration Failed" 
            });
            setLoading(false);
        }
    };

    return (
        <div className="auth-container">
            <div className="auth-card">
                <h1 className="app-title">MtaaFix</h1>
                <h2 className="auth-title">Create Account</h2>
                <p className="auth-subtitle">Join your community today.</p>

                {message.text && (
                    <div className={`alert-box ${message.type}`}>
                        {message.text}
                    </div>
                )}

                <form className="auth-form" onSubmit={handleRegister}>
                    <input
                        type="text"
                        placeholder="Full Name"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        required
                    />
                    <input
                        type="email"
                        placeholder="Email Address"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                    />
                    <input
                        type="password"
                        placeholder="Password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                    />
                    <button type="submit" className="auth-button" disabled={loading}>
                        {loading ? "Creating Account..." : "Register"}
                    </button>
                </form>

                <div className="auth-footer">
                    <p>Already have an account? <Link to="/login">Login Here</Link></p>
                </div>
            </div>
        </div>
    );
}

export default Register;