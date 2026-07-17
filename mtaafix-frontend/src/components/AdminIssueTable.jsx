import { useEffect, useState } from "react";
import { getAllIssues, updateIssueStatus } from "../services/issueService";


function AdminIssueTable({filter}){

    const [issues,setIssues] = useState([]);
    const [search, setSearch] = useState("");
    const [statusFilter, setStatusFilter] = useState("ALL");

    useEffect(()=>{

        loadIssues();

    },[]);



    const loadIssues = async()=>{

        const data = await getAllIssues();

        console.log("ISSUES FROM API:",data);
        setIssues(data);

    };



    const changeStatus = async(id,status)=>{

    try {

        await updateIssueStatus(id,status);

        loadIssues();

    } catch(error) {

        console.log("STATUS UPDATE ERROR:", error.response);

    }

};

   const filteredIssues = issues.filter((issue) => {

    const matchesStatus =
        statusFilter === "ALL" ||
        issue.status === statusFilter;

    const matchesSearch =
        issue.title.toLowerCase().includes(search.toLowerCase()) ||

        issue.location.toLowerCase().includes(search.toLowerCase()) ||

        issue.reportedBy.toLowerCase().includes(search.toLowerCase());

    return matchesStatus && matchesSearch;

});

    return (

        

        <div className="issue-table-container">

            <div className="toolbar">

    <input
        type="text"
        placeholder="Search by title, location or reporter..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
    />

</div>

                <div className="filter-buttons">

    <button onClick={() => setStatusFilter("ALL")}>
        All
    </button>

    <button onClick={() => setStatusFilter("OPEN")}>
        Open
    </button>

    <button onClick={() => setStatusFilter("IN_PROGRESS")}>
        In Progress
    </button>

    <button onClick={() => setStatusFilter("RESOLVED")}>
        Resolved
    </button>

    <button onClick={() => setStatusFilter("REJECTED")}>
        Rejected
    </button>

</div>


        
            <table>

                <thead>

                    <tr>
                        <th>ID</th>
                        <th>Title</th>
                        <th>Reported By</th>
                        <th>Status</th>
                        <th>Action</th>
                    </tr>

                </thead>


                <tbody>

                {
                    filteredIssues.map(issue=>(

                        <tr key={issue.id}>

                            <td>{issue.id}</td>

                            <td>{issue.title}</td>

                            <td>{issue.reportedBy}</td>


                            <td>

                                <select
                                value={issue.status}
                                onChange={(e)=>
                                    changeStatus(
                                        issue.id,
                                        e.target.value
                                    )
                                }
                                >

                                    <option>
                                        OPEN
                                    </option>

                                    <option>
                                        IN_PROGRESS
                                    </option>

                                    <option>
                                        RESOLVED
                                    </option>

                                    <option>
                                        REJECTED
                                    </option>


                                </select>


                            </td>


                            <td>
                                Manage
                            </td>


                        </tr>


                    ))
                }


                </tbody>

            </table>


        </div>

    );

}

export default AdminIssueTable;