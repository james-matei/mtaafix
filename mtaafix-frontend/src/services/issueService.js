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

export const getIssueById = async (id) => {
    const response = await api.get(`/issues/${id}`);
    return response.data;
};
export const updateIssue = async (id, issue) => {

    const response = await api.put(`/issues/${id}`, issue);

    return response.data;

};
export const updateIssueStatus = async (id, status) => {

    const response = await api.patch(
        `/issues/${id}/status`,
        {
            status: status
        }
    );

    return response.data;

};