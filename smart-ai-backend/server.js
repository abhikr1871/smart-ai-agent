import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import { createServer } from "http";
import { Server } from "socket.io";

dotenv.config();
const app = express();
const httpServer = createServer(app);
const io = new Server(httpServer, { cors: { origin: "*" } });

app.use(cors());
app.use(express.json());

// basic route
app.get("/", (req, res) => {
  res.send("Smart AI Backend is running 🚀");
});

// Socket.io setup (for real-time chat)
io.on("connection", (socket) => {
  console.log("New user connected");
  socket.on("disconnect", () => console.log("User disconnected"));
});

// Start server
const PORT = process.env.PORT || 5000;
httpServer.listen(PORT, () => console.log(`Server running on port ${PORT}`));
