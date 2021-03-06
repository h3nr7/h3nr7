const path = require("path");

const rootFolder = path.resolve(__dirname, "..", "..")
const sourceFolder = path.join(rootFolder, "src")
const clientFolder = path.join(sourceFolder, "client")
const commonFolder = path.join(sourceFolder, "common")
const tsConfigFile = path.join(clientFolder, "tsconfig.json")
const entryPointIndexTsx = path.join(clientFolder, "index.tsx")
const prodDistOutputFolder = path.join(rootFolder, 'build','dist')

module.exports = {
    rootFolder,
    sourceFolder,
    clientFolder,
    commonFolder,
    tsConfigFile,
    entryPointIndexTsx,
    prodDistOutputFolder
}