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
const User = require("../models/userModel");
const bcrypt = require("bcrypt");
exports.registerController = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { name, email, password } = req.body;
        const doesExist = yield User.findOne({ name: name });
        const passExist = yield User.findOne({ email: email });
        if (doesExist) {
            res.json({ msg: "username already exist", stat: 500 });
        }
        else if (passExist) {
            res.json({ msg: "Email is already registered", stat: 500 });
        }
        else {
            const hashedPassword = yield bcrypt.hash(password, 10);
            const newUser = yield User.create({
                name: name,
                email: email,
                password: hashedPassword,
            });
            newUser.password = "";
            res.status(200).json({ msg: "new user created", stat: 200, usr: newUser });
        }
    }
    catch (err) {
        console.log(err);
        res.json({ msg: "error Registering ", stat: 500 });
    }
});
exports.loginController = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { name, password } = req.body;
        const doesUser = yield User.findOne({ name: name });
        if (doesUser) {
            const isPasswordCorrect = yield bcrypt.compare(password, doesUser.password);
            if (isPasswordCorrect) {
                doesUser.password = "";
                console.log(doesUser);
                res.json({ msg: "login sucessfull", status: 200, usr: doesUser });
                return;
            }
            else {
                res.json({ msg: "incorrect password", status: 500 });
                return;
            }
        }
        res.json({ msg: "username or password incorrect", status: 500 });
        return;
    }
    catch (err) {
        console.log(err);
        res.json({ msg: "error loggin in", status: 500 });
    }
});
exports.getAllContacts = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { _id } = req.body;
        const contacts = yield User.find({ _id: { $ne: _id } });
        console.log(_id);
        res.json({ msg: "records of all users", users: contacts });
    }
    catch (err) {
        console.log(err);
    }
});
