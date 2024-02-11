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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const colors_1 = __importDefault(require("colors"));
const dotenv_1 = __importDefault(require("dotenv"));
const mongoose = require("mongoose");
dotenv_1.default.config();
const setupDB = () => __awaiter(void 0, void 0, void 0, function* () {
    // console.log('I called',process.env.LOCAL_MONGO_URI)
    try {
        mongoose
            .connect(process.env.REMOTE_MONGO_URI)
            .then(() => console.log(colors_1.default.green("Connected to MongoDB")))
            .catch((err) => console.error(colors_1.default.red("Connection error"), err));
    }
    catch (error) {
        console.log("DB url error", error);
    }
});
exports.default = setupDB;
