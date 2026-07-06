import { useState } from "react";
import api from "../api/api";
import { login } from "../services/authService";

function Login() {

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const handleLogin = async (e) => {
    e.preventDefault();

    try {

        // Login using the service
        await login(email, password);

        // Test protected endpoint
        const testResponse = await api.get("/test");

        console.log("Test response:", testResponse.data);

        alert("Welcome back!");

    } catch (error) {

        console.error(error);

        alert("Login failed!");

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

            </form>

        </div>

    );

}

export default Login;