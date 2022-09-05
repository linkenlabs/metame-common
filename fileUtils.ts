import * as child_process from "child_process";
import * as fs from "fs";

export function deleteFile(path: string) {
    var copyCmd = `del /F "${path}"`;
    child_process.execSync(copyCmd, { stdio: [0, 1, 2] });
}

export function copyFile(source: string, destination: string) {
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