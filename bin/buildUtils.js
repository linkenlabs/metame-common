"use strict";
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (Object.hasOwnProperty.call(mod, k)) result[k] = mod[k];
    result["default"] = mod;
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
const fs = __importStar(require("fs"));
const scriptUtils_1 = require("./scriptUtils");
async function getMsBuildPath() {
    var vsWherePath = `${process.env["ProgramFiles(x86)"]}\\Microsoft Visual Studio\\Installer\\vswhere.exe`;
    if (!fs.existsSync(vsWherePath)) {
        throw `Cannot find vswhere.exe at location ${vsWherePath}`;
    }
    var cmd = `"${vsWherePath}" -version 15.0`;
    var result = await scriptUtils_1.executeCommand(cmd);
    let lines = result.stdout.split("\r\n");
    var relevantEntry = lines.find(line => line.startsWith("installationPath:"));
    let installationPathLine = relevantEntry ? relevantEntry : '';
    let installationPath = installationPathLine.split(": ")[1];
    //PATH CANDIDATES
    let msBuildPaths = [`${installationPath}\\MSBuild\\15.0\\Bin\\MSBuild.exe`,
        `${installationPath}\\MSBuild\\Current\\Bin\\MSBuild.exe`];
    var buildPath = msBuildPaths.find(path => fs.existsSync(path));
    if (!buildPath) {
        throw `Cannot find MSBuild.exe`;
    }
    return buildPath;
}
exports.getMsBuildPath = getMsBuildPath;
async function compile(solutionPath) {
    const msBuildPath = await getMsBuildPath();
    let cmd = `"${msBuildPath}" ${solutionPath} /p:Configuration=Release /t:Clean;Build`;
    await scriptUtils_1.executeCommand(cmd);
}
exports.compile = compile;
function getSignToolPath() {
    var signTool = `${process.env["ProgramFiles(x86)"]}\\Windows Kits\\10\\bin\\10.0.17763.0\\x64\\signtool.exe`;
    if (!fs.existsSync(signTool)) {
        throw `Path does not exist: ${signTool}`;
    }
    return signTool;
}
exports.getSignToolPath = getSignToolPath;
function getInsigniaPath() {
    var insignia = `${process.env["ProgramFiles(x86)"]}\\WiX Toolset v3.11\\bin\\insignia.exe`;
    if (!fs.existsSync(insignia)) {
        throw `Path does not exist: ${insignia}`;
    }
    return insignia;
}
exports.getInsigniaPath = getInsigniaPath;
