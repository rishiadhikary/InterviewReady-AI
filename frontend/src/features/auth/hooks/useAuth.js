import { useContext } from "react";
import { AuthContext } from "../auth.context.jsx";

import {
    loginUser,
    registerUser,
    logoutUser,
    getMe,
} from "../services/auth.api.js";

export const useAuth = () => {
    const context = useContext(AuthContext);

    if (!context) {
        throw new Error("useAuth must be used inside AuthProvider");
    }

    const {
        user,
        setUser,
        loading,
        setLoading,
    } = context;

    const handleLogin = async (email, password) => {
        try {
            setLoading(true);

            const data = await loginUser({
                email,
                password,
            });

            setUser(data.user);

            return data;
        } catch (error) {
            console.error("Login failed:", error);
            throw error;
        } finally {
            setLoading(false);
        }
    };

    const handleRegister = async (
        username,
        email,
        password
    ) => {
        try {
            setLoading(true);

            const data = await registerUser({
                username,
                email,
                password,
            });

            setUser(data.user);

            return data;
        } catch (error) {
            console.error("Registration failed:", error);
            throw error;
        } finally {
            setLoading(false);
        }
    };

    const handleLogout = async () => {
        try {
            setLoading(true);

            const data = await logoutUser();

            setUser(null);

            return data;
        } catch (error) {
            console.error("Logout failed:", error);
            throw error;
        } finally {
            setLoading(false);
        }
    };

    const handleGetMe = async () => {
        try {
            setLoading(true);

            const data = await getMe();

            setUser(data.user);

            return data;
        } catch (error) {
            setUser(null);

            if (error.response?.status !== 401) {
                console.error(
                    "Failed to get current user:",
                    error
                );
            }

            throw error;
        } finally {
            setLoading(false);
        }
    };

    return {
        user,
        loading,
        handleLogin,
        handleRegister,
        handleLogout,
        handleGetMe,
    };
};