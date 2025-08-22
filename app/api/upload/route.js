// app/api/upload/route.js
import { put } from '@vercel/blob';
import { NextResponse } from 'next/server';

const MAX_BYTES = 10 * 1024 * 1024; // 10 MB

export async function POST(request) {
  try {
    const { searchParams } = new URL(request.url);
    const filename = searchParams.get('filename');

    if (!filename) {
      return NextResponse.json({ error: 'No filename provided' }, { status: 400 });
    }

    // ---- Enforce 10MB limit (fast path using Content-Length) ----
    const lenHeader = request.headers.get('content-length');
    if (lenHeader) {
      const contentLength = Number(lenHeader);
      if (Number.isFinite(contentLength) && contentLength > MAX_BYTES) {
        return NextResponse.json(
          {
            error: 'Payload too large',
            maxBytes: MAX_BYTES,
            receivedBytes: contentLength,
          },
          { status: 413 }
        );
      }
    }
    // If Content-Length is missing, most hosts will still enforce their own cap.
    // For full streaming validation, switch to a direct-to-storage upload flow.

    // Optional: propagate content-type if present (helps Blob set correct type)
    const contentType = request.headers.get('content-type') || undefined;

    // Upload to Vercel Blob. `request.body` is a ReadableStream — @vercel/blob accepts streams.
    const blob = await put(filename, request.body, {
      access: 'public',
      addRandomSuffix: true,          // avoid collisions
      contentType,                    // preserve type if known
      // cacheControl: 'public, max-age=31536000, immutable', // uncomment if desired
    });

    return NextResponse.json({
      success: true,
      url: blob.url,        // Public URL
      path: blob.pathname,  // Store in DB if needed
      size: blob.size,      // Bytes written (if available)
      uploadedAt: new Date().toISOString(),
    });
  } catch (error) {
    // Surface a 413 if the underlying platform rejects due to size
    const message = (error && error.message) || 'Failed to upload file';
    const status = /payload|too.*large|413/i.test(message) ? 413 : 500;

    console.error('Upload error:', error);
    return NextResponse.json({ error: message }, { status });
  }
}
