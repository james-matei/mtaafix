import { BrowserRouter, Routes, Route } from "react-router-dom";

import Login from "./pages/Login";
import Register from "./pages/Register";
import Dashboard from "./pages/Dashboard";
import ProtectedRoute from "./components/ProtectedRoute";
import ReportIssue from "./pages/ReportIssue";
import MyIssues from "./pages/MyIssues";
import IssueDetails from "./pages/IssueDetails";
import EditIssue from "./pages/EditIssue";
import AdminDashboard from "./pages/AdminDashboard";
import AdminLayout from "./components/AdminLayout";
import AdminIssues from "./pages/AdminIssues";
import AdminUsers from "./pages/AdminUsers";


function App() {

    return (

        <BrowserRouter>

            <Routes>

                <Route path="/" element={<Login />} />

                <Route path="/login" element={<Login />} />

                <Route path="/register" element={<Register />} />

                <Route path="/dashboard" element={
                    <ProtectedRoute role="USER">
                        
                        <Dashboard />
                    </ProtectedRoute>
                } />

                        <Route path="/report" element={<ProtectedRoute role="USER">
                        <ReportIssue />
                    </ProtectedRoute>
                }
            />
              
                <Route  path="/my-issues" element={
        <ProtectedRoute role="USER">
            <MyIssues />
        </ProtectedRoute>
    }/>
              
                <Route  path="/issues/:id" element={
        <ProtectedRoute>
            <IssueDetails />
        </ProtectedRoute>
    }/>
         

            <Route path="/issues/edit/:id" element={
                <ProtectedRoute>
                    <EditIssue />
                </ProtectedRoute>
            }/>
        
        <Route 
    path="/admin/dashboard" 
    element={
        <ProtectedRoute  role="ADMIN">

            <AdminLayout>
                <AdminDashboard />
            </AdminLayout>

            
        </ProtectedRoute>
    }
/>

    
        <Route
    path="/admin/issues"
    element={
        <ProtectedRoute role="ADMIN">
            <AdminLayout>
                <AdminIssues />
            </AdminLayout>
        </ProtectedRoute>
    }
/>

        <Route
    path="/admin/users"
    element={
        <ProtectedRoute role="ADMIN">
            <AdminLayout>
                <AdminUsers />
            </AdminLayout>
        </ProtectedRoute>
    }
/>
          
            </Routes>

        </BrowserRouter>

    );

}

export default App;