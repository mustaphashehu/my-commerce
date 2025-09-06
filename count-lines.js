// count-lines.ts (CommonJS-compatible)
var fs = require("fs");
var path = require("path");
var excludedDirs = ["node_modules", ".next", "public"];
var includedExtensions = [".ts", ".tsx", ".js", ".jsx"];
var totalLines = 0;
function countLines(filePath) {
    var content = fs.readFileSync(filePath, "utf8");
    var lines = content.split("\n").filter(function (line) { return line.trim() !== ""; });
    return lines.length;
}
function walkDirectory(dir) {
    var items = fs.readdirSync(dir, { withFileTypes: true });
    for (var _i = 0, items_1 = items; _i < items_1.length; _i++) {
        var item = items_1[_i];
        var fullPath = path.join(dir, item.name);
        if (item.isDirectory()) {
            if (!excludedDirs.includes(item.name)) {
                walkDirectory(fullPath);
            }
        }
        else {
            var ext = path.extname(item.name);
            if (includedExtensions.includes(ext)) {
                var count = countLines(fullPath);
                totalLines += count;
                console.log("".concat(fullPath, " \u2014 ").concat(count, " lines"));
            }
        }
    }
}
walkDirectory(".");
console.log("\n\u2705 Total non-empty lines of code: ".concat(totalLines));
