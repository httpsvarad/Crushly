import { create } from "zustand";
import axios from "axios";
import { toast } from "react-toastify";
import { getSocket } from "../socket/socket.client";
axios.defaults.withCredentials = true;

const BASE_URL = 'http://localhost:5000'

export const useMatchStore = create((set) => ({
    matches: [],
    loadingMatches: false,
    userProfiles: [],
    loadingUsers: false,
    swipeFeedback: null,



    getMyMatches: async () => {
        set({ loadingMatches: true })

        try {

            const response = await axios.get(`${BASE_URL}/api/matches`)
            set({ matches: response.data.matches, loadingMatches: false })

        } catch (error) {
            console.log("error getting matches:", error.message)
            set({ matches: [] })
            toast.error("Something went wrong.", {
                position: "top-center"
            });

        }
    },



    getUserProfile: async () => {
        set({ loadingUsers: true })

        try {

            const response = await axios.get(`${BASE_URL}/api/matches/user-profiles`)
            set({ userProfiles: response.data.users, loadingUsers: false })

        } catch (error) {
            console.log("error getting matches:", error.message)
            set({ userProfiles: [] })
            toast.error("Something went wrong.", {
                position: "top-center"
            });

        }
    },




    swipeLeft: async (user) => {

        try {

            set({ swipeFeedback: "passed" })

            const response = await axios.post(`${BASE_URL}/api/matches/swipe-left/${user._id}`)


        } catch (error) {
            console.log(error)
            toast.error("Failed to Swipe Left.", {
                position: "top-center"
            });
        } finally {
            setTimeout(() => set({ swipeFeedback: null }), 1500);
        }
    },




    swipeRight: async (user) => {

        try {

            set({ swipeFeedback: "liked" })

            const response = await axios.post(`${BASE_URL}/api/matches/swipe-right/${user._id}`)


        } catch (error) {
            console.log(error)
            toast.error("Failed to Swipe Right.", {
                position: "top-center"
            });
        } finally {
            setTimeout(() => set({ swipeFeedback: null }), 1500);
        }
    },


    subscribeToNewMatches: () => {
		try {
			const socket = getSocket();

            socket.off("newMatch");

			socket.on("newMatch", (newMatch) => {
				set((state) => ({
					matches: [...state.matches, newMatch],
				}));
				toast.success("It's a New Match!", {
                    position: "top-center"
                  });
			});
		} catch (error) {
			console.log(error);
		}
	},

	unsubscribeFromNewMatches: () => {
		try {
			const socket = getSocket();
			socket.off("newMatch");
		} catch (error) {
			console.error(error);
		}
	},




}));