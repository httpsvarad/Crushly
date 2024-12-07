import { create } from "zustand";
import axios from "axios";
import { getSocket } from "../socket/socket.client";
import useauthStore from '../store/useAuthStore';

axios.defaults.withCredentials = true;

const BASE_URL = 'http://localhost:5000'

const useMessageStore = create((set) => ({
    loadingchat: true,
    messages: [],

    sendMessages: async (receiverId, content) => {
        try {

            set((state) => ({
                messages: [
                    ...state.messages,
                    { _id: Date.now(), sender: useauthStore.getState().user._id, content },
                ],
            }));


            const res = await axios.post(`${BASE_URL}/api/messages/send`, { receiverId, content });
            console.log("message sent", res.data);
        } catch (error) {
            toast.error("Something went wrong.");
        }
    },




    getMessages: async (userId) => {

        try {
            set({ loadingchat: true });
            const res = await axios.get(`${BASE_URL}/api/messages/conversation/${userId}`);
            set({ messages: res.data.messages });
        } catch (error) {
            console.log(error);
            set({ messages: [] });
        } finally {
            set({ loadingchat: false });
        }

    },

    subscribeToMessages: () => {
        const socket = getSocket();
       
        socket.on("newMessage", ({ message }) => {
            set((state) => ({ messages: [...state.messages, message] }));
        });
    },


    unsubscribeFromMessages: () => {
        try {
          const socket = getSocket();
          socket.off("newMessage");
        } catch (error) {
          console.error("Failed to unsubscribe from messages:", error.message);
        }
      },


}))

export default useMessageStore;