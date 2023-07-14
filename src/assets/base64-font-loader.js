const fs = require('fs');
const path = require('path');

const fontPath = path.resolve(__dirname, 'path/to/arial-unicode-ms.ttf');
const fontData = fs.readFileSync(fontPath);
const fontBase64 = fontData.toString('base64');

console.log(fontBase64);