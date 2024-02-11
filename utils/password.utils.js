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
exports.tokenValidation = exports.generateToken = exports.passwordValidation = exports.generatePassword = exports.APP_SECRET = void 0;
const bcrypt_1 = __importDefault(require("bcrypt"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
// dotenv.config();
exports.APP_SECRET = "HELLO  ";
const generatePassword = (password) => __awaiter(void 0, void 0, void 0, function* () {
    return yield bcrypt_1.default.hash(password, 10);
});
exports.generatePassword = generatePassword;
const passwordValidation = (password, oldPassword) => __awaiter(void 0, void 0, void 0, function* () {
    return yield bcrypt_1.default.compare(password, oldPassword);
});
exports.passwordValidation = passwordValidation;
const generateToken = (payload) => __awaiter(void 0, void 0, void 0, function* () {
    return jsonwebtoken_1.default.sign(payload, exports.APP_SECRET, { expiresIn: "90d" });
});
exports.generateToken = generateToken;
const tokenValidation = (token) => __awaiter(void 0, void 0, void 0, function* () {
    const signature = token;
    if (signature) {
        try {
            const payload = jsonwebtoken_1.default.verify(signature.split(" ")[1], exports.APP_SECRET);
            return true;
        }
        catch (err) {
            return false;
        }
    }
    return false;
});
exports.tokenValidation = tokenValidation;
