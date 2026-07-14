import { BrowserRouter, Routes, Route } from "react-router-dom";

import Login from "./pages/Login";
import Register from "./pages/Register";
import Dashboard from "./pages/Dashboard";
import ProtectedRoute from "./components/ProtectedRoute";
import ReportIssue from "./pages/ReportIssue";
import MyIssues from "./pages/MyIssues";

function App() {

    return (

        <BrowserRouter>

            <Routes>

                <Route path="/" element={<Login />} />

                <Route path="/login" element={<Login />} />

                <Route path="/register" element={<Register />} />

                <Route path="/dashboard" element={
                    <ProtectedRoute>
                        <Dashboard />
                    </ProtectedRoute>
                } />

                        <Route
                path="/report"
                    element={
                    <ProtectedRoute>
                        <ReportIssue />
                    </ProtectedRoute>
                }
            />
              
                <Route
    path="/my-issues"
    element={
        <ProtectedRoute>
            <MyIssues />
        </ProtectedRoute>
    }
/>

            </Routes>

        </BrowserRouter>

    );

}

export default App;