import { Link, useNavigate } from "react-router-dom";
import "./AdminLayout.css";


function AdminLayout({children}) {

    const navigate = useNavigate();


    const logout = () => {

        localStorage.removeItem("token");

        navigate("/login");

    };


    return (

        <div className="admin-layout">


            <aside className="sidebar">

                <h2>
                    MtaaFix
                </h2>


                <nav>

                    <Link to="/admin/dashboard">
                        Dashboard
                    </Link>


                    <Link to="/admin/issues">
                        Issues
                    </Link>


                    <Link to="/admin/users">
                        Users
                    </Link>


                </nav>


                <button onClick={logout}>
                    Logout
                </button>


            </aside>



            <main className="admin-content">

                {children}

            </main>


        </div>

    );

}


export default AdminLayout;