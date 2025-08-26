export const runtime = "nodejs";
export const dynamic = "force-dynamic";

import { NextResponse } from "next/server";

export async function POST(req) {
  try {
    // Verify authorization
    const authHeader = req.headers.get('authorization');
    const expectedSecret = process.env.ELEVENLABS_TOOL_SECRET;
    
    if (!authHeader || !expectedSecret || authHeader !== `Bearer ${expectedSecret}`) {
      return NextResponse.json(
        { error: "Unauthorized" },
        { status: 401 }
      );
    }

    const body = await req.json();
    const { agentId } = body;

    if (!agentId) {
      return NextResponse.json(
        { error: "agentId is required" },
        { status: 400 }
      );
    }

    const apiKey = process.env.ELEVENLABS_API_KEY;
    if (!apiKey) {
      return NextResponse.json(
        { error: "ElevenLabs API key not configured" },
        { status: 500 }
      );
    }

    // Call ElevenLabs API to get signed URL
    const response = await fetch(`https://api.elevenlabs.io/v1/convai/agent/${agentId}/signed-url`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'xi-api-key': apiKey
      },
      body: JSON.stringify({
        // Add any additional parameters needed for the signed URL
        expires_in: 3600 // 1 hour
      })
    });

    if (!response.ok) {
      const errorData = await response.text();
      console.error("ElevenLabs API error:", errorData);
      return NextResponse.json(
        { error: "Failed to get signed URL from ElevenLabs" },
        { status: response.status }
      );
    }

    const signedUrlData = await response.json();

    return NextResponse.json({
      success: true,
      signedUrl: signedUrlData.signed_url,
      expiresAt: signedUrlData.expires_at
    });

  } catch (error) {
    console.error("Signed URL generation error:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
