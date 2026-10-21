// Trims the white canvas around the supplied logo files and exports web-sized
// versions. The artwork itself is not altered — only cropped, resized and compressed.
import sharp from "sharp";
import { mkdir } from "node:fs/promises";

const out = "public/brand";
await mkdir(out, { recursive: true });

const trim = (file) => sharp(file).trim({ background: "#ffffff", threshold: 18 });

// Horizontal lockup (logo 1) — header + footer
await trim("logo 1 .png").resize({ width: 640 }).png({ compressionLevel: 9, palette: true, quality: 90 }).toFile(`${out}/logo-horizontal.png`);
// Stacked lockup (logo 2) — OG image / 404 / large placements
await trim("logo 2.png").resize({ width: 600 }).png({ compressionLevel: 9, palette: true, quality: 90 }).toFile(`${out}/logo-stacked.png`);
// Symbol (favcon) — favicon + app icons
const mark = () => trim("favcon.png");
await mark().resize(512, 512, { fit: "contain", background: "#ffffff00" }).png({ compressionLevel: 9 }).toFile(`${out}/mark-512.png`);
await mark().resize(180, 180, { fit: "contain", background: "#ffffff" }).png({ compressionLevel: 9 }).toFile("src/app/apple-icon.png");
await mark().resize(64, 64, { fit: "contain", background: "#ffffff00" }).png({ compressionLevel: 9 }).toFile("src/app/icon.png");

// Open Graph card 1200x630 with the stacked logo on white
const og = await trim("logo 2.png").resize({ height: 440 }).png().toBuffer();
await sharp({ create: { width: 1200, height: 630, channels: 4, background: "#ffffff" } })
  .composite([{ input: og, gravity: "center" }])
  .png({ compressionLevel: 9 })
  .toFile("src/app/opengraph-image.png");

console.log("Brand assets written to", out);
