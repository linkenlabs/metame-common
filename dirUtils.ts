import * as child_process from "child_process";
import * as fs from "fs";

//deletes a directory, entire subdirectory and all files quietly
export function deleteDirectoryRecursive(path: string) {
    if (!fs.existsSync(path)) {
        return;
    }
    let cmd: string = `rd /s /q ${path}`;
    child_process.execSync(cmd, { stdio: [0, 1, 2] });
}