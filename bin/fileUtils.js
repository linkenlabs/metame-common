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
function deleteFile(path) {
    var copyCmd = `del /F "${path}"`;
    child_process.execSync(copyCmd, { stdio: [0, 1, 2] });
}
exports.deleteFile = deleteFile;
function copyFile(source, destination) {
    //check file exists
    if (!fs.existsSync(source)) {
        throw `${source} file does not exist`;
    }
    if (source == destination) {
        return;
    }
    var copyCmd = `copy "${source}" "${destination}""`;
    child_process.execSync(copyCmd, { stdio: [0, 1, 2] });
}
exports.copyFile = copyFile;
