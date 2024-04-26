"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const Message = require("../models/messageModel.js");
exports.sendMessage = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { to, from, message } = req.body;
        console.log(to, from, message);
        const newMessage = yield Message.create({
            message: { text: message },
            users: [from, to],
            sender: from,
        });
        if (newMessage)
            return res.json({ msg: "Message added successfully." });
        else
            return res.json({ msg: "Failed to add message to the database" });
    }
    catch (err) {
        console.log(err);
    }
});
exports.getMessages = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { from, to } = req.body;
        const messages = yield Message.find({
            users: {
                $all: [from, to],
            },
        }).sort({ updatedAt: 1 });
        const projectedMessages = messages.map((msg) => {
            return {
                fromSelf: msg.sender.toString() === from,
                message: msg.message.text,
            };
        });
        res.json(projectedMessages);
    }
    catch (err) {
        console.log(err);
    }
});
