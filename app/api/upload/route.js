import { put } from '@vercel/blob';
import { NextResponse } from 'next/server';

export async function POST(request) {
  try {
    const { searchParams } = new URL(request.url);
    const filename = searchParams.get('filename');

    if (!filename) {
      return NextResponse.json({ error: 'No filename provided' }, { status: 400 });
    }

    // Always append a random suffix to avoid overwrite issues
    const blob = await put(filename, request.body, {
      access: 'public',
      addRandomSuffix: true, // ✅ Prevents filename collisions
    });

    return NextResponse.json({
      success: true,
      url: blob.url,           // Publicly accessible URL
      path: blob.pathname,     // Blob path (can be stored in DB)
      size: blob.size,         // Optional: size in bytes
      uploadedAt: new Date().toISOString(),
    });
  } catch (error) {
    console.error('Upload error:', error);
    return NextResponse.json(
      { error: error.message || 'Failed to upload file' },
      { status: 500 }
    );
  }
}
