import fs, { writeFileSync } from "node:fs";

import pngToIco from "png-to-ico";
import sharp from "sharp";

const svg = fs.readFileSync("public/favicon.svg");
const png = await sharp(svg).resize(32, 32).png().toBuffer();
const ico = await pngToIco(png);

writeFileSync("public/favicon.ico", ico);
