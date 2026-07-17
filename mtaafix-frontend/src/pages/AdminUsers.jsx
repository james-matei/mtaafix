import { useEffect, useState } from "react";
import { getAllUsers } from "../services/adminService";
import UserTable from "../components/UserTable";

function AdminUsers() {

    
    return (

        <div>

            <h1>Users</h1>

            <UserTable />

        </div>  
    );
}

export default AdminUsers;