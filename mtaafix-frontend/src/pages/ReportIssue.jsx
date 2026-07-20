import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar";
import { createIssue } from "../services/issueService";
import LocationPicker from "../components/LocationPicker";

function ReportIssue() {

    const navigate = useNavigate();

    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");
    const [location, setLocation] = useState("");
    const [latitude, setLatitude] = useState(null);
    const [longitude, setLongitude] = useState(null);

    const handleSubmit = async (e) => {

        e.preventDefault();
        if (latitude === null || longitude === null) {
    alert("Please select a location on the map.");
    return;
}

        try {

            console.log({

    title,
    description,
    location,
    latitude,
    longitude

});

            await createIssue({

    title,
    description,
    location,
    latitude,
    longitude

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
                       readOnly
                    />

                    <button type="submit">

                        Submit Report

                    </button>

                </form>

            </div>

            <LocationPicker
    onLocationSelect={(data) => {

        setLatitude(data.latitude);

        setLongitude(data.longitude);
        setLocation(data.location);

    }}
/>

        </div>

    );

}

export default ReportIssue;