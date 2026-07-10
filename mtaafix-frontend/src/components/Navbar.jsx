import { Link, useNavigate } from "react-router-dom";

function Navbar() {

    const navigate = useNavigate();

    const logout = () => {

        localStorage.removeItem("token");

        navigate("/login");
    };

    return (

        <nav className="navbar">

            <h2>MtaaFix</h2>

            <div>

                <Link to="/dashboard">Dashboard</Link>

                {" | "}

                <Link to="/report">Report Issue</Link>

                {" | "}

                <Link to="/my-issues">My Issues</Link>

                {" | "}

                <button onClick={logout}>

                    Logout

                </button>

            </div>

        </nav>

    );

}

export default Navbar;