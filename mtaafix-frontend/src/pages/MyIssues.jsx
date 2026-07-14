import { useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import IssueCard from "../components/IssueCard";
import { getMyIssues } from "../services/issueService";

function MyIssues() {

    const [issues, setIssues] = useState([]);

    useEffect(() => {

        loadMyIssues();

    }, []);

    const loadMyIssues = async () => {

        try {

            const data = await getMyIssues();

            setIssues(data);

        } catch (error) {

            console.error(error);

        }

    };

    return (

        <div className="dashboard">

            <Navbar />

            <div className="dashboard-container">

                <div className="dashboard-header">

                    <h1>My Issues</h1>

                    <p>
                        View all the issues you have reported.
                    </p>

                </div>

                {issues.length === 0 ? (

                    <div className="empty-state">

                        <h3>No Issues Yet</h3>

                        <p>
                            You haven't reported any issues.
                        </p>

                    </div>

                ) : (

                    issues.map((issue) => (

                        <IssueCard
                            key={issue.id}
                            issue={issue}
                        />

                    ))

                )}

            </div>

        </div>

    );

}

export default MyIssues;