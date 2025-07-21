import { NextRequest, NextResponse } from 'next/server';

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const imageUrl = searchParams.get('url');

  if (!imageUrl) {
    return new NextResponse('Image URL is required', { status: 400 });
  }

  try {
    const response = await fetch(imageUrl);

    if (!response.ok) {
      throw new Error(`Failed to fetch image: ${response.statusText}`);
    }

    const imageBuffer = await response.arrayBuffer();
    const contentType = response.headers.get('content-type') || 'image/jpeg';
    const filename = imageUrl.split('/').pop() || 'downloaded-image';

    return new NextResponse(imageBuffer, {
      headers: {
        'Content-Type': contentType,
        'Content-Disposition': `attachment; filename="${filename}"`,
      },
    });
  } catch (error) {
    console.error('Failed to download image:', error);
    const errorMessage = error instanceof Error ? error.message : 'An unknown error occurred';
    return new NextResponse(JSON.stringify({ error: 'Failed to download image', details: errorMessage }), {
      status: 500,
      headers: {
        'Content-Type': 'application/json',
      },
    });
  }
} 