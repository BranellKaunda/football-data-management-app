import { put } from "@vercel/blob";
import { defineEventHandler, readMultipartFormData } from "h3";

export default defineEventHandler(async (event) => {
  const parts = await readMultipartFormData(event);
  const file = parts?.find((p) => p.name === "file");
  if (!file) throw new Error("No file provided");

  // file.data is already a Buffer
  const buffer = file.data as Buffer;
  const filename = file.filename || "upload";

  // Upload to Vercel Blob
  const blob = await put(filename, buffer, {
    access: "public",
    addRandomSuffix: true,
  });

  return blob;
});
