function IssueCard({ issue }) {

    return (

        <div
            className="issue-card"
        >

            <h3>{issue.title}</h3>

            <p>{issue.description}</p>

            <p>

                <strong>Location:</strong> {issue.location}

            </p>

            <p>

                <strong>Status:</strong> {issue.status}

            </p>

            <p>

                <strong>Reported By:</strong> {issue.reportedBy}

            </p>

        </div>

    );

}

export default IssueCard;