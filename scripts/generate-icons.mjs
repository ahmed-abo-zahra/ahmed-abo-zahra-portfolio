import { readFile, writeFile } from 'node:fs/promises';
import sharp from 'sharp';

// Generate browser and Apple icons from the same AZ brand mark.
const svg = await readFile('src/app/icon.svg');
const sizes = [16, 32, 48, 64];
const images = await Promise.all(sizes.map(size => sharp(svg).resize(size, size).png().toBuffer()));
const header = Buffer.alloc(6 + sizes.length * 16);
header.writeUInt16LE(1, 2);
header.writeUInt16LE(sizes.length, 4);
let offset = header.length;
images.forEach((data, i) => {
  const entry = 6 + i * 16;
  header[entry] = sizes[i]; header[entry + 1] = sizes[i];
  header.writeUInt16LE(1, entry + 4);
  header.writeUInt16LE(32, entry + 6);
  header.writeUInt32LE(data.length, entry + 8);
  header.writeUInt32LE(offset, entry + 12);
  offset += data.length;
});
await writeFile('src/app/favicon.ico', Buffer.concat([header, ...images]));
await sharp(svg).resize(180, 180).png().toFile('src/app/apple-icon.png');
console.log('Generated AZ favicon and Apple icon.');
