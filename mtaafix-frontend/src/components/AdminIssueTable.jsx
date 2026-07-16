import { useEffect, useState } from "react";
import { getAllIssues, updateIssueStatus } from "../services/issueService";


function AdminIssueTable({filter}){

    const [issues,setIssues] = useState([]);


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

   const filteredIssues = 
    filter === "ALL"
    ? issues
    : issues.filter(
        issue => issue.status === filter
      );

    return (

        <div className="issue-table-container">

            <h2>
                Manage Issues
            </h2>


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