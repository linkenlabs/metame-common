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
function executeCommand(command) {
    return new Promise(function (resolve, reject) {
        child_process.exec(command, (error, stdout, stderr) => {
            if (error) {
                reject(error);
                return;
            }
            resolve({
                error: error,
                stdout: stdout,
                stderr: stderr
            });
        });
    });
}
exports.executeCommand = executeCommand;
