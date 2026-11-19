// news-image-20261118 — "The World in One Day", Wednesday 18 November 2026.
//
// The artwork is entry.png beside this file: a one-page newspaper front page
// drawn as HTML/SVG (see page.html) and rasterised by render.mjs. This
// program is the contest entrypoint. It does two things, in order:
//
//   1. Prove the bundled image still satisfies the contest's hard limits —
//      a whole PNG or JPEG, no side over 1024 px, no more than 1 MiB — by
//      reading the dimensions out of the file's own header bytes. If the
//      asset ever breaks a limit, the program refuses to emit it rather
//      than hand the grader an invalid entry.
//   2. Copy the verified bytes, unchanged, to the output directory.
//
// Local dry run (MAKEFUN_OUTPUT_DIR stands in for /output):
//   mkdir -p out && MAKEFUN_OUTPUT_DIR=out node main.ts

import { copyFileSync, readFileSync } from "node:fs";
import { join } from "node:path";

const BYTE_LIMIT = 1_048_576; // 1 MiB, per the contest rules
const SIDE_LIMIT = 1024; // pixels per axis, per the contest rules

function refuse(reason: string): never {
  console.error(`main.ts: refusing to emit entry.png — ${reason}`);
  process.exit(1);
}

// --- dimension readers -----------------------------------------------------

// PNG: 8-byte signature, then the IHDR chunk; width and height are the two
// big-endian uint32s at offsets 16 and 20.
function pngDimensions(buf: Buffer): [number, number] {
  const sig = [0x89, 0x50, 0x4e, 0x47, 0x0d, 0x0a, 0x1a, 0x0a];
  const signed = buf.length >= 24 && sig.every((b, i) => buf[i] === b);
  if (!signed) refuse("PNG signature missing or file truncated");
  if (buf.toString("latin1", 12, 16) !== "IHDR") {
    refuse("first PNG chunk is not IHDR");
  }
  return [buf.readUInt32BE(16), buf.readUInt32BE(20)];
}

// JPEG: walk the marker segments after SOI until a start-of-frame segment
// (SOF0–SOF2) turns up; it carries height then width as big-endian uint16s.
function jpegDimensions(buf: Buffer): [number, number] {
  let at = 2;
  while (at + 4 <= buf.length) {
    if (buf[at] !== 0xff) refuse("JPEG marker stream is corrupt");
    const marker = buf[at + 1];
    const length = buf.readUInt16BE(at + 2);
    if (length < 2) refuse("JPEG marker stream is corrupt");
    if (marker >= 0xc0 && marker <= 0xc2) {
      if (at + 9 > buf.length) refuse("JPEG frame header is truncated");
      return [buf.readUInt16BE(at + 7), buf.readUInt16BE(at + 5)];
    }
    at += 2 + length;
  }
  return refuse("no JPEG start-of-frame segment found");
}

function dimensions(buf: Buffer): [number, number] {
  if (buf[0] === 0x89 && buf[1] === 0x50) return pngDimensions(buf);
  if (buf[0] === 0xff && buf[1] === 0xd8) return jpegDimensions(buf);
  return refuse("file is neither PNG nor JPEG");
}

// --- verify, then deliver ----------------------------------------------------

const asset = new URL("./entry.png", import.meta.url);
const bytes = readFileSync(asset);

if (bytes.length > BYTE_LIMIT) {
  refuse(`${bytes.length} bytes exceeds the ${BYTE_LIMIT}-byte limit`);
}
const [width, height] = dimensions(bytes);
if (width < 1 || height < 1 || width > SIDE_LIMIT || height > SIDE_LIMIT) {
  refuse(`image is ${width}x${height}; each side must be within 1..${SIDE_LIMIT}`);
}

const destination = join(
  process.env.MAKEFUN_OUTPUT_DIR ?? "/output",
  "entry.png",
);
copyFileSync(asset, destination);
console.log(
  `main.ts: entry.png verified (${width}x${height}, ${bytes.length} bytes) and written to ${destination}`,
);
