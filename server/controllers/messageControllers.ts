const Message = require("../models/messageModel.js")

import { Request, Response } from "express"
import { Number } from "mongoose";

exports.sendMessage = async (req: Request, res: Response) => {
  try {
    const { to, from, message } = req.body;
    console.log(to, from, message)
    const newMessage = await Message.create({
      message: { text: message },
      users: [from, to],
      sender: from,
    });
    if (newMessage) return res.json({ msg: "Message added successfully." });
    else return res.json({ msg: "Failed to add message to the database" });
  } catch (err) {
    console.log(err)
  }
}

exports.getMessages = async (req: Request, res: Response) => {
  try {
    const { from, to } = req.body;

    const messages = await Message.find({
      users: {
        $all: [from, to],
      },
    }).sort({ updatedAt: 1 });

    interface Msg {
      sender: Number,
      message: {
        text: String
      }
    }
    const projectedMessages = messages.map((msg: Msg) => {
      return {
        fromSelf: msg.sender.toString() === from,
        message: msg.message.text,
      };
    });
    res.json(projectedMessages);
  } catch (err) {
    console.log(err)
  }
}
