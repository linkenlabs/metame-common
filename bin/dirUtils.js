"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteDirectoryRecursive = void 0;
const child_process = __importStar(require("child_process"));
const fs = __importStar(require("fs"));
//deletes a directory, entire subdirectory and all files quietly
function deleteDirectoryRecursive(path) {
    if (!fs.existsSync(path)) {
        return;
    }
    let cmd = `rd /s /q ${path}`;
    child_process.execSync(cmd, { stdio: [0, 1, 2] });
}
exports.deleteDirectoryRecursive = deleteDirectoryRecursive;
