import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { register } from "../services/authService";

function Register() {

    const navigate = useNavigate();

    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const handleRegister = async (e) => {
        e.preventDefault();

        try {

            await register(name, email, password);

            alert("Registration successful!");

            navigate("/");

        } catch (error) {

            alert(error.response?.data || "Registration failed.");

        }
    };

    return (
        <div>

            <h1>Create Account</h1>

            <form onSubmit={handleRegister}>

                <input
                    type="text"
                    placeholder="Full Name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                />

                <br /><br />

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
                    Register
                </button>

            </form>

            <br />

            <Link to="/">Already have an account? Login</Link>

        </div>
    );
}

export default Register;