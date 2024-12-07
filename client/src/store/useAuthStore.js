import { create } from "zustand";
import axios from "axios";
import { disconnectSocket, initializeSocket } from "../socket/socket.client";
axios.defaults.withCredentials = true;

const BASE_URL = 'http://localhost:5000'

const useauthStore = create((set) => ({
    authUser: null,
    user: null,
    isAuthenticated: false,
    error: null,
    isLoading: false,
    isCheckingAuth: true,

    signup: async (userData) => {

        set({ isLoading: true, error: null });
        try {
            const response = await axios.post(`${BASE_URL}/api/auth/signup`, userData);
            set({ user: response.data.user, authUser: response.data.user, isAuthenticated: true, isLoading: false });
            initializeSocket(response.data.user._id);

        } catch (error) {
            set({ error: error.response.data.message || "Error, Please try again.", isLoading: false });
            throw error;
        }

    },

    login: async (email, password) => {

        set({ isLoading: true, error: null });

        try {
            const response = await axios.post(`${BASE_URL}/api/auth/login`, {email, password});
            set({ user: response.data.user, authUser: response.data.user, isAuthenticated: true, isLoading: false });
            initializeSocket(response.data.user._id);

        } catch (error) {

            set({ error: error.response.data.message || "Error, Please try again.", isLoading: false });
            throw error;
            
        }
    },

    logout: async () => {
        set({ isLoading: true, error: null });
        try {
            const response = await axios.post(`${BASE_URL}/api/auth/logout`);
            disconnectSocket();
            set({ isLoading: false, user: null, isAuthenticated: false });
        } catch (error) {
            console.log(error.message);
        }

    },

    checkAuth: async () => {
        set({ isCheckingAuth: true, error: null });
        try {
            const response = await axios.get(`${BASE_URL}/api/auth/me`)
            set({ user: response.data.user, authUser: response.data.user, isAuthenticated: true, isCheckingAuth: false });
            initializeSocket(response.data.user._id);
        } catch (error) {
            set({ error: null, isCheckingAuth: false })
        }
    },




}))

export default useauthStore;