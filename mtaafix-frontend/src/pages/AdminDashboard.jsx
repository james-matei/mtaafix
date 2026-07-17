import { useEffect, useState } from "react";
import { getDashboardStats } from "../services/dashboardServices";
import StatCard from "../components/StatCard";
import "./AdminDashboard.css";
import AdminIssueTable from "../components/AdminIssueTable";


function AdminDashboard() {

    const [stats, setStats] = useState(null);
    const [filter, setFilter] = useState("ALL");


    useEffect(() => {

        getDashboardStats()
            .then(response => {
                setStats(response.data);
            })
            .catch(error => {
                console.log(error);
            });

    }, []);



    if (!stats) {
        return (
            <div className="loading">
                Loading dashboard...
            </div>
        );
    }



    return (

        

            <div className="admin-dashboard">

            <div className="dashboard-header">

                <h1>
                    Admin Dashboard
                </h1>

                <p>
                    Monitor and manage reported issues
                </p>

            </div>



            <div className="stats-grid">

                <StatCard
                    title="Total Issues"
                    value={stats.totalIssues}
                    onClick={()=>setFilter("ALL")}
                />


                <StatCard
                    title="Open"
                    value={stats.openIssues}
                    onClick={()=>setFilter("OPEN")}
                />


                <StatCard
                    title="In Progress"
                    value={stats.inProgressIssues}
                    onClick={()=>setFilter("IN_PROGRESS")}
                />


                <StatCard
                    title="Resolved"
                    value={stats.resolvedIssues}
                    onClick={()=>setFilter("RESOLVED")}
                />


                <StatCard
                    title="Rejected"
                    value={stats.rejectedIssues}
                    onClick={()=>setFilter("REJECTED")}
                />

            

            </div>




        </div>

    

    );

}


export default AdminDashboard;