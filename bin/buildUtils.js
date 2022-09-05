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
exports.getInsigniaPath = exports.getSignToolPath = exports.compile = exports.getMsBuildPath = void 0;
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
exports.getSignToolPath = getSignToolPath;
function getInsigniaPath() {
    var insignia = `${process.env["ProgramFiles(x86)"]}\\WiX Toolset v3.11\\bin\\insignia.exe`;
    if (!fs.existsSync(insignia)) {
        throw `Path does not exist: ${insignia}`;
    }
    return insignia;
}
exports.getInsigniaPath = getInsigniaPath;
