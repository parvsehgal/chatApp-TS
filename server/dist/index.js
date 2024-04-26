"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const userRoutes_1 = __importDefault(require("./routes/userRoutes"));
const messageRoutes_1 = __importDefault(require("./routes/messageRoutes"));
const socket_io_1 = require("socket.io");
const cors_1 = __importDefault(require("cors"));
const mongoose_1 = __importDefault(require("mongoose"));
const express_1 = __importDefault(require("express"));
const app = (0, express_1.default)();
require("dotenv").config();
app.use((0, cors_1.default)());
app.use(express_1.default.json());
app.use("/api/v1", userRoutes_1.default);
app.use("/api/v1", messageRoutes_1.default);
if (process.env.MONGO_URL) {
    mongoose_1.default
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
const io = new socket_io_1.Server(server, {
    cors: {
        origin: "*"
    },
});
io.on("connection", (socket) => {
    console.log(socket.id);
    socket.on("message-sent", (data) => {
        socket.broadcast.emit("message-recieved", data);
        data();
    });
});
