import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Navbar from "../components/Navbar";
import { getIssueById } from "../services/issueService";

function IssueDetails() {

    const { id } = useParams();

    const [issue, setIssue] = useState(null);

    useEffect(() => {

        loadIssue();

    }, []);

    const loadIssue = async () => {

        try {

            const data = await getIssueById(id);

            setIssue(data);

        } catch (error) {

            console.error(error);

        }

    };

    if (!issue) {

        return <h2>Loading...</h2>;

    }

    return (

        <div className="dashboard">

            <Navbar />

            <div className="details-card">

                <h1>{issue.title}</h1>

                <span className={`status ${issue.status.toLowerCase()}`}>
                    {issue.status}
                </span>

                <h3>Description</h3>

                <p>{issue.description}</p>

                <h3>Location</h3>

                <p>{issue.location}</p>

                <h3>Reported By</h3>

                <p>{issue.reportedBy}</p>

                <h3>Date</h3>

                <p>

                    {new Date(issue.createdAt).toLocaleString()}

                </p>

            </div>

        </div>

    );

}

export default IssueDetails;