import api from "../api/api";

export const getDashboardStats = () => {
    return api.get("/admin/dashboard");
};