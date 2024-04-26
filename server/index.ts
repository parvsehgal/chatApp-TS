import userRoutes from "./routes/userRoutes";
import messageRoutes from "./routes/messageRoutes";

import { Server } from "socket.io";

import cors from "cors";
import mongoose from "mongoose";
import express from "express";
const app = express();

require("dotenv").config();
app.use(cors());
app.use(express.json());
app.use("/api/v1", userRoutes);
app.use("/api/v1", messageRoutes)

if (process.env.MONGO_URL) {
  mongoose
    .connect(process.env.MONGO_URL)
    .then(() => {
      console.log("connection is sucessfull");
    })
    .catch(() => {
      console.log("error");
    });
}
const server = app.listen(process.env.PORT, () => {
  console.log("server instantiated on port", process.env.PORT);
});

const io = new Server(server, {
  cors: {
    origin: "*"
  },
})
io.on("connection", (socket) => {
  console.log(socket.id)
  socket.on("message-sent", (data) => {
    socket.broadcast.emit("message-recieved", data);
    data();
  })
})



