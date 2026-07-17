import { useEffect, useState } from "react";
import { jwtDecode } from "jwt-decode";
import { getAllUsers, updateUserRole } from "../services/adminService";

function UserTable() {

    const [users, setUsers] = useState([]);
    const [search, setSearch] = useState("");
    const [selectedRoles, setSelectedRoles] = useState({});

    const token = localStorage.getItem("token");
    const currentUser = token ? jwtDecode(token).sub : "";

    useEffect(() => {
        loadUsers();
    }, []);

    const loadUsers = async () => {

        try {

            const data = await getAllUsers();

            setUsers(data);

            const roles = {};

            data.forEach(user => {
                roles[user.id] = user.role;
            });

            setSelectedRoles(roles);

        } catch (error) {

            console.log(error);

        }

    };

    const changeRole = async (id, role) => {

        try {

            await updateUserRole(id, role);

            alert("Role updated successfully!");

            loadUsers();

        } catch (error) {

            console.log(error);

            alert(error.response?.data?.message || "Failed to update role.");

        }

    };

    const filteredUsers = users.filter(user =>
        user.name.toLowerCase().includes(search.toLowerCase()) ||
        user.email.toLowerCase().includes(search.toLowerCase())
    );

    return (

        <div>

            <h2>Users ({filteredUsers.length})</h2>

            <div className="toolbar">

                <input
                    type="text"
                    placeholder="Search users..."
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                />

            </div>

            <table>

                <thead>

                    <tr>

                        <th>ID</th>
                        <th>Name</th>
                        <th>Email</th>
                        <th>Role</th>
                        <th>Action</th>

                    </tr>

                </thead>

                <tbody>

                    {filteredUsers.length === 0 ? (

                        <tr>

                            <td colSpan="5">

                                No users found.

                            </td>

                        </tr>

                    ) : (

                        filteredUsers.map(user => (

                            <tr key={user.id}>

                                <td>{user.id}</td>

                                <td>{user.name}</td>

                                <td>{user.email}</td>

                                <td>

                                    {user.email === currentUser ? (

                                        <span className="role admin">
                                            {user.role}
                                        </span>

                                    ) : (

                                        <select
                                            value={selectedRoles[user.id] || user.role}
                                            onChange={(e) =>
                                                setSelectedRoles({
                                                    ...selectedRoles,
                                                    [user.id]: e.target.value
                                                })
                                            }
                                        >

                                            <option value="USER">
                                                USER
                                            </option>

                                            <option value="ADMIN">
                                                ADMIN
                                            </option>

                                        </select>

                                    )}

                                </td>

                                <td>

                                    {user.email === currentUser ? (

                                        <span>Current User</span>

                                    ) : (

                                        <button
                                            onClick={() =>
                                                changeRole(
                                                    user.id,
                                                    selectedRoles[user.id]
                                                )
                                            }
                                            disabled={
                                                selectedRoles[user.id] === user.role
                                            }
                                        >

                                            Save

                                        </button>

                                    )}

                                </td>

                            </tr>

                        ))

                    )}

                </tbody>

            </table>

        </div>

    );

}

export default UserTable;