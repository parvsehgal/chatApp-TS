"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const router = express_1.default.Router();
const { sendMessage, getMessages } = require("../controllers/messageControllers");
router.post("/sendMessage", sendMessage);
router.post("/getMessages", getMessages);
exports.default = router;
