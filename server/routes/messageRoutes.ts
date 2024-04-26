import express from "express";

const router = express.Router()

const { sendMessage, getMessages } = require("../controllers/messageControllers")

router.post("/sendMessage", sendMessage)
router.post("/getMessages", getMessages)

export default router
