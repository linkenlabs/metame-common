
import * as fs from "fs";
import { executeCommand } from "./scriptUtils";

export async function getMsBuildPath(): Promise<string> {
    var vsWherePath = `${process.env["ProgramFiles(x86)"]
        }\\Microsoft Visual Studio\\Installer\\vswhere.exe`;

    if (!fs.existsSync(vsWherePath)) {
        throw `Cannot find vswhere.exe at location ${vsWherePath}`;
    }

    var cmd = `"${vsWherePath}" -version 15.0`;
    var result = await executeCommand(cmd);

    let lines: string[] = result.stdout.split("\r\n");
    var relevantEntry = lines.find(line =>
        line.startsWith("installationPath:")
    );

    let installationPathLine: string = relevantEntry ? relevantEntry : '';
    let installationPath: string = installationPathLine.split(": ")[1];

    //PATH CANDIDATES
    let msBuildPaths: string[] = [`${installationPath}\\MSBuild\\15.0\\Bin\\MSBuild.exe`,
    `${installationPath}\\MSBuild\\Current\\Bin\\MSBuild.exe`];

    var buildPath = msBuildPaths.find(path => fs.existsSync(path));

    if (!buildPath) {
        throw `Cannot find MSBuild.exe`;
    }

    return buildPath;
}

export async function compile(solutionPath: string): Promise<void> {
    const msBuildPath: string = await getMsBuildPath();
    let cmd: string = `"${msBuildPath}" ${solutionPath} /p:Configuration=Release /t:Clean;Build`;
    await executeCommand(cmd);
}

export function getSignToolPath(): string {

    var programFilex86 = process.env["ProgramFiles(x86)"];

    var paths = [`${programFilex86}\\Windows Kits\\10\\App Certification Kit\\signtool.exe`,
    `${programFilex86}\\Windows Kits\\10\\bin\\10.0.17763.0\\x64\\signtool.exe`
    ];

    var signToolPath = paths.find(path => fs.existsSync(path));

    if (!signToolPath) {
        throw `Cannot find signtool.exe`;
    }
    return signToolPath;
}

export function getInsigniaPath(): string {
    var insignia = `${process.env["ProgramFiles(x86)"]}\\WiX Toolset v3.11\\bin\\insignia.exe`
    if (!fs.existsSync(insignia)) {
        throw `Path does not exist: ${insignia}`;
    }
    return insignia;
}
