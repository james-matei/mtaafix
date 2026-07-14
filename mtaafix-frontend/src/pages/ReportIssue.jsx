import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar";
import { createIssue } from "../services/issueService";

function ReportIssue() {

    const navigate = useNavigate();

    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");
    const [location, setLocation] = useState("");

    const handleSubmit = async (e) => {

        e.preventDefault();

        try {

            await createIssue({
                title,
                description,
                location
            });

            alert("Issue reported successfully!");

            navigate("/dashboard");

        } catch (error) {

            console.error(error);

            alert(error.response?.data?.message || "Failed to report issue.");

        }

    };

    return (

        <div className="dashboard">

            <Navbar />

            <div className="form-container">

                <h1>Report Community Issue</h1>

                <form
                    className="issue-form"
                    onSubmit={handleSubmit}
                >

                    <input
                        type="text"
                        placeholder="Issue Title"
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                        required
                    />

                    <textarea
                        placeholder="Describe the issue..."
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}
                        rows="6"
                        required
                    />

                    <input
                        type="text"
                        placeholder="Location"
                        value={location}
                        onChange={(e) => setLocation(e.target.value)}
                        required
                    />

                    <button type="submit">

                        Submit Report

                    </button>

                </form>

            </div>

        </div>

    );

}

export default ReportIssue;