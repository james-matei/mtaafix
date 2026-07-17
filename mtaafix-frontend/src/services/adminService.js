import api from "../api/api";

export const getAllUsers = async () => {

    const response = await api.get("/admin/users");

    return response.data;

};

export const updateUserRole = async (id, role) => {

    const response = await api.patch(

        `/admin/users/${id}/role`,

        {
            role: role
        }

    );

    return response.data;

};