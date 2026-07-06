import api from "../api/api";

export const login = async (email, password) => {

    const response = await api.post("/auth/login", {
        email,
        password,
    });

    localStorage.setItem("token", response.data);

    return response.data;
};

export const register = async (name, email, password) => {

    const response = await api.post("/auth/register", {
        name,
        email,
        password,
    });

    return response.data;
};

export const logout = () => {

    localStorage.removeItem("token");

};