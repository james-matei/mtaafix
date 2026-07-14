import "./IssueCard.css";
import {useNavigate} from "react-router-dom";

function IssueCard({ issue }) {

    const navigate = useNavigate();


    return (

        <div className="issue-card"
        onClick={() => navigate(`/issues/${issue.id}`)}

        >

            <div className="issue-header">

                <h3>{issue.title}</h3>

                <span className={`status ${issue.status.toLowerCase()}`}>

                    {issue.status}

                </span>

            </div>

            <p className="issue-description">

                {issue.description}

            </p>

            <div className="issue-footer">

                <span>📍 {issue.location}</span>

                <span>👤 {issue.reportedBy}</span>

                <span>
                    {new Date(issue.createdAt).toLocaleDateString()}
                </span>

            </div>

        </div>

    );

}

export default IssueCard;