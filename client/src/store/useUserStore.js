import { create } from "zustand";
import axios from "axios";
axios.defaults.withCredentials = true;

const BASE_URL = 'http://localhost:5000'

export const useuserStore = create((set) => ({
    loading: false,
    error: null,


    updateProfile: async (data) => {

        set({ loading: true, error: null });
        try {
            const response = await axios.put(`${BASE_URL}/api/users/update-profile`, data);
            set({ loading: false });

        } catch (error) {
            set({ error: error.response.data.message || "Error, Please try again.", loading: false });
            throw error;
        }

    },
}));