import axios from "axios";

const api = axios.create({
    baseURL: "https://interviewready-ai-h51l.onrender.com/api",
    withCredentials: true,
});

// Register
export async function registerUser({ username, email, password }) {
    try {
        const response = await api.post("/auth/register", {
            username,
            email,
            password,
        });

        return response.data;
    } catch (error) {
        console.error("Error registering user:", error);
        throw error;
    }
}

// Login
export async function loginUser({ email, password }) {
    try {
        const response = await api.post("/auth/login", {
            email,
            password,
        });

        return response.data;
    } catch (error) {
        console.error("Error logging in user:", error);
        throw error;
    }
}

// Logout
export async function logoutUser() {
    try {
        const response = await api.get("/auth/logout");

        return response.data;
    } catch (error) {
        console.error("Error logging out user:", error);
        throw error;
    }
}

// Get current user
export async function getMe() {
    try {
        const response = await api.get("/auth/get-me");

        return response.data;
    } catch (error) {
        console.error("Error fetching user data:", error);
        throw error;
    }
}