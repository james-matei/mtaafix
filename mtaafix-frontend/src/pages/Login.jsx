import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { login } from "../services/authService";
import api from "../api/api";

function Login() {
    const navigate = useNavigate();
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [message, setMessage] = useState({ type: "", text: "" });
    const [loading, setLoading] = useState(false);

    const handleLogin = async (e) => {
        e.preventDefault();
        setLoading(true);
        setMessage({ type: "", text: "" });

        try {
            const token = await login(email, password);

            if (!token || !token.startsWith("eyJ")) {
                setMessage({ type: "error", text: token || "Invalid authentication token response." });
                setLoading(false);
                return;
            }

            // Optional test endpoint verification
            await api.get("/test").catch(err => console.log("Test endpoint optional check failed:", err));

            setMessage({ type: "success", text: "Welcome back! Redirecting..." });
            setTimeout(() => navigate("/dashboard"), 1500);
        } catch (error) {
            console.error(error);
            setMessage({ 
                type: "error", 
                text: error.response?.data?.message || error.response?.data || "Login failed. Please try again." 
            });
            setLoading(false);
        }
    };

    return (
        <div className="auth-container">
            <div className="auth-card">
                <h1 className="app-title">MtaaFix</h1>
                <h2 className="auth-title">Login</h2>
                <p className="auth-subtitle">Sign in to continue.</p>

                {message.text && (
                    <div className={`alert-box ${message.type}`}>
                        {message.text}
                    </div>
                )}

                <form className="auth-form" onSubmit={handleLogin}>
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
                        {loading ? "Signing in..." : "Login"}
                    </button>
                </form>

                <div className="auth-footer">
                    <p>Don't have an account? <Link to="/register">Register Here</Link></p>
                </div>
            </div>
        </div>
    );
}

export default Login;