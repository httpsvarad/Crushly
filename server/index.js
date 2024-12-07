import express from "express";
import dotenv from "dotenv";
dotenv.config();
import cors from "cors";
import connectDb from "./db/connectDb.js";
import cookieParser from "cookie-parser";
import { createServer } from "http";

//Routes
import authRoutes from "./routes/auth.routes.js"
import userRoutes from "./routes/user.routes.js"
import matchRoutes from "./routes/match.routes.js"
import messageRoutes from "./routes/message.routes.js"
import { initializeSocket } from "./socket/socket.server.js";

const app = express();
const httpServer = createServer(app);
const port = process.env.PORT || 5000;

initializeSocket(httpServer);

app.use(cors({ origin: "http://localhost:5173", credentials: true }));
app.use(express.json({ limit: '5mb' }));
app.use(cookieParser());

app.use("/api/auth", authRoutes)
app.use("/api/users", userRoutes)
app.use("/api/matches", matchRoutes)
app.use("/api/messages", messageRoutes)

httpServer.listen(port, () => {
    console.log(`server is running on port ${port}`);
    connectDb();

});
