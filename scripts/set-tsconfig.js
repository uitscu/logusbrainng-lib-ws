const fs = require("fs");
const path = require("path");

const env = process.env.NODE_ENV || "development";
const configFile = path.join(__dirname, "../.vscode/settings.json");

const tsconfig = env === "production" ? "tsconfig.prod.json" : "tsconfig.dev.json";

const settings = {
  "typescript.tsdk": "node_modules/typescript/lib",
  "typescript.preferences.importModuleSpecifier": "non-relative",
  "typescript.tsconfig": tsconfig
};

fs.mkdirSync(path.join(__dirname, "../.vscode"), { recursive: true });
fs.writeFileSync(configFile, JSON.stringify(settings, null, 2));

console.log(`✔ VS Code TypeScript config set to: ${tsconfig}`);
