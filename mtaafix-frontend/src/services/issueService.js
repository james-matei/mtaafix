import api from "../api/api";

export const getAllIssues = async () => {

    const response = await api.get("/issues");

    return response.data;
};

export const createIssue = async (issue) => {
    const response = await api.post("/issues", issue);
    return response.data;
};
export const getMyIssues = async () => {

    const response = await api.get("/issues/my");

    return response.data;

};