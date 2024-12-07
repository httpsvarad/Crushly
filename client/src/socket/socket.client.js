import io from "socket.io-client";

const SOCKET_URL = "http://localhost:5000";

let socket = null;

export const initializeSocket = (userId) => {
    if (socket) {
        socket.disconnect();
    }

    socket = io(SOCKET_URL, {
        auth: { userId },
        transports: ["websocket"],
        
        
        // reconnection: true, // Enable reconnection
        // reconnectionAttempts: 5, // Retry 5 times before giving up
        // reconnectionDelay: 1000,
    });
};

export const getSocket = () => {
    if (!socket) {
        throw new Error("Socket not initialized");
    }
    return socket;
};

export const disconnectSocket = () => {
    if (socket) {
        socket.disconnect();
        socket = null;
    }
};