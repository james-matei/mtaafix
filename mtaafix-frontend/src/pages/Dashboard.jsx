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
                <input

    className="search-bar"

    placeholder="Search issues..."

/>

                <div className="dashboard-content">
                  <div className="stats">

                    

    <div className="stat-card">

        <h2>{issues.filter(i => i.status === "OPEN").length}</h2>

        <p>Open</p>

    </div>

    <div className="stat-card">

        <h2>{issues.filter(i => i.status === "IN_PROGRESS").length}</h2>

        <p>In Progress</p>

    </div>

    <div className="stat-card">

        <h2>{issues.filter(i => i.status === "RESOLVED").length}</h2>

        <p>Resolved</p>

    </div>

</div>  
                    
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