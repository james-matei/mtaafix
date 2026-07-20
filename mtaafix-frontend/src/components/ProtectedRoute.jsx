import { Navigate } from "react-router-dom";
import { jwtDecode } from "jwt-decode";

function ProtectedRoute({ children, role }) {

    const token = localStorage.getItem("token");

    if (!token) {
        return <Navigate to="/login" replace />;
    }

    try {

        const decoded = jwtDecode(token);

        // Wrong role? Redirect to the correct dashboard
        if (role && decoded.role !== role) {

            if (decoded.role === "ADMIN") {
                return <Navigate to="/admin/dashboard" replace />;
            }

            return <Navigate to="/dashboard" replace />;
        }

        // Correct role
        return children;

    } catch (error) {

        localStorage.removeItem("token");

        return <Navigate to="/login" replace />;

    }

}

export default ProtectedRoute;