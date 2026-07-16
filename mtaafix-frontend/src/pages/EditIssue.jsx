import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import Navbar from "../components/Navbar";
import { getIssueById, updateIssue } from "../services/issueService";

function EditIssue() {

    const { id } = useParams();

    const navigate = useNavigate();

    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");
    const [location, setLocation] = useState("");

    useEffect(() => {

        loadIssue();

    }, []);

    const loadIssue = async () => {

        try {

            const issue = await getIssueById(id);

            setTitle(issue.title);
            setDescription(issue.description);
            setLocation(issue.location);

        } catch (error) {

            console.error(error);

        }

    };

    const handleSubmit = async (e) => {

        e.preventDefault();

        try {

            await updateIssue(id, {
                title,
                description,
                location
            });

            alert("Issue updated successfully!");

            navigate(`/issues/${id}`);

        } catch (error) {

            console.error(error);

            alert(error.response?.data?.message || "Update failed");

        }

    };

    return (

        <div className="dashboard">

            <Navbar />

            <div className="form-container">

                <h1>Edit Issue</h1>

                <form
                    className="issue-form"
                    onSubmit={handleSubmit}
                >

                    <input
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                    />

                    <textarea
                        rows="6"
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}
                    />

                    <input
                        value={location}
                        onChange={(e) => setLocation(e.target.value)}
                    />

                    <button type="submit">

                        Save Changes

                    </button>

                </form>

            </div>

        </div>

    );

}

export default EditIssue;