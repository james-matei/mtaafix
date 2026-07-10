import api from "../api/api";

export const getAllIssues = async () => {

    const response = await api.get("/issues");

    return response.data;
};