import * as child_process from "child_process";

export function executeCommand(command: string): Promise<any> {
    return new Promise<any>(function (resolve, reject) {
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