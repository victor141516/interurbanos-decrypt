"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.decrypt = void 0;
const node_forge_1 = __importDefault(require("node-forge"));
const AES_KEY = process.env.AES_KEY || '4c6f72656d20697073756d20646f6c6f';
function decrypt(str) {
    const trim = str.trim();
    const decode = Buffer.from(trim, 'base64');
    const ivData = decode.slice(0, 16);
    const ivParameterSpec = node_forge_1.default.util.createBuffer(ivData);
    const keyData = Buffer.from(AES_KEY, 'utf-8').slice(0, 16);
    const secretKeySpec = node_forge_1.default.util.createBuffer(keyData);
    const instance = node_forge_1.default.cipher.createDecipher('AES-CBC', secretKeySpec);
    instance.start({ iv: ivParameterSpec });
    instance.update(node_forge_1.default.util.createBuffer(decode.slice(16, decode.length)));
    instance.finish();
    const decrypted = instance.output.toString();
    const reversedBase64EncodedResult = decrypted.split('').reverse().join('');
    const reversedResult = Buffer.from(reversedBase64EncodedResult, 'base64').toString();
    const result = reversedResult.split('').reverse().join('');
    return result;
}
exports.decrypt = decrypt;
//# sourceMappingURL=index.js.map