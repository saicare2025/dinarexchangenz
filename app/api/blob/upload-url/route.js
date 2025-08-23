import { NextResponse } from "next/server";
import { put } from "@vercel/blob";

export async function POST(req) {
  try {
    const form = await req.formData();
    const file = form.get("file");
    const orderId = form.get("orderId") || "misc";
    const kind = form.get("kind") || "file";

    if (!file || typeof file === "string") {
      return NextResponse.json({ ok: false, error: "No file provided" }, { status: 400 });
    }

    // Use the original filename or create a timestamped one
    const timestamp = Date.now();
    const originalName = file.name || "file";
    const ext = originalName.includes(".") ? originalName.split(".").pop().toLowerCase() : "bin";
    const key = `${orderId}/${kind}-${timestamp}.${ext}`;

    const arrayBuffer = await file.arrayBuffer();
    const buffer = Buffer.from(arrayBuffer);
    const contentType = file.type || "application/octet-stream";

    const blob = await put(key, buffer, {
      access: 'public',
      addRandomSuffix: false,
      contentType,
    });

    return NextResponse.json({
      ok: true,
      url: blob.url,
      pathname: blob.pathname,
      contentType,
    });
  } catch (e) {
    console.error("/api/blob/upload-url error", e);
    return NextResponse.json({ ok: false, error: e.message }, { status: 500 });
  }
}
