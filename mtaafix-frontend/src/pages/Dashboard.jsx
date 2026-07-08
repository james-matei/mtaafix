import {useNavigate} from "react-router-dom";
import {logout} from "../services/authService";



function Dashboard() {

    const navigate = useNavigate();

    const handleLogout = () => {
        logout();
        navigate("/");
    };

    return (

        <div>

            <h1>Welcome to MtaaFix</h1>
            <button onClick={handleLogout}>Logout</button>

            <p>You are logged in successfully.</p>

        </div>

    );

}

export default Dashboard;