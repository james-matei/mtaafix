import { useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import IssueCard from "../components/IssueCard";
import { getAllIssues } from "../services/issueService";

function Dashboard() {
    const [issues, setIssues] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        loadIssues();
    }, []);

    const loadIssues = async () => {
        try {
            const data = await getAllIssues();
            setIssues(data || []);
        } catch (error) {
            console.error("Failed to load issues", error);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="dashboard">
            <Navbar />
            <div className="container">
                <div className="dashboard-header">
                    <h1>Community Dashboard</h1>
                    <p className="subtitle">
                        Track issues reported by residents in your community.
                    </p>
                </div>

                <div className="dashboard-content">
                    <h2>Recent Issues</h2>
                    
                    {loading ? (
                        <div className="loading-state">Loading community issues...</div>
                    ) : issues.length === 0 ? (
                        <div className="empty-state">
                            <p>No issues have been reported yet.</p>
                        </div>
                    ) : (
                        <div className="issues-grid">
                            {issues.map((issue) => (
                                <IssueCard key={issue.id || issue._id} issue={issue} />
                            ))}
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}

export default Dashboard;