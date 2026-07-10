import { useState } from "react";
import api from "../api/api";
import { login } from "../services/authService";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";

function Login() {

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const navigate = useNavigate();

    const handleLogin = async (e) => {
    e.preventDefault();

    try {

        // Login using the service
       const token = await login(email, password);

if (!token.startsWith("eyJ")) {
    alert(token);
    return;
}

navigate("/dashboard");

        // Test protected endpoint
        const testResponse = await api.get("/test");

        console.log("Test response:", testResponse.data);

        alert("Welcome back!");

    } catch (error) {

        console.error(error);

        alert(error.response?.data || "Login failed");

    }
};
    return (

        <div>

            <h1>MtaaFix Login</h1>

            <form onSubmit={handleLogin}>

                <input
                    type="email"
                    placeholder="Email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                />

                <br /><br />

                <input
                    type="password"
                    placeholder="Password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                />

                <br /><br />

                <button type="submit">

                    Login

                </button>

                <br /> <br />
                <Link to="/register">Don't have an account? Register</Link>

            </form>

        </div>

    );

}

export default Login;