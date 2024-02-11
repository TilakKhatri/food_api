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
exports.checkAuth = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const password_utils_1 = require("../utils/password.utils");
/**
 * @DESC Verify JWT from authorization header Middleware
 */
const checkAuth = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const header = req.headers["authorization"];
    if (!header && !(header === null || header === void 0 ? void 0 : header.startsWith("Bearer"))) {
        return res.end("empty token please enter token");
    }
    // bearer token
    try {
        const token = header.split(" ")[1];
        const signature = jsonwebtoken_1.default.verify(token, password_utils_1.APP_SECRET);
        // console.log("signature", signature);
        if (signature !== null) {
            req.user = signature;
            next();
        }
    }
    catch (error) {
        return res.json({
            message: "Unauthorized user",
        });
    }
});
exports.checkAuth = checkAuth;
