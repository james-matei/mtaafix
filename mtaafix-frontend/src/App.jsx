import { BrowserRouter, Routes, Route } from "react-router-dom";

import Login from "./pages/Login";
import Register from "./pages/Register";
import Dashboard from "./pages/Dashboard";
import ProtectedRoute from "./components/ProtectedRoute";
import ReportIssue from "./pages/ReportIssue";
import MyIssues from "./pages/MyIssues";
import IssueDetails from "./pages/IssueDetails";
import EditIssue from "./pages/EditIssue";

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

                        <Route path="/report" element={            <ProtectedRoute>
                        <ReportIssue />
                    </ProtectedRoute>
                }
            />
              
                <Route  path="/my-issues" element={
        <ProtectedRoute>
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

          
            </Routes>

        </BrowserRouter>

    );

}

export default App;