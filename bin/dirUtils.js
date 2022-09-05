"use strict";
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (Object.hasOwnProperty.call(mod, k)) result[k] = mod[k];
    result["default"] = mod;
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
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
