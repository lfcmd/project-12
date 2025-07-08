import { NextRequest, NextResponse } from 'next/server';

interface DownloadImageRequest {
  imageUrl: string;
  filename: string;
}

export async function POST(request: NextRequest) {
  try {
    const body: DownloadImageRequest = await request.json();
    const { imageUrl, filename } = body;

    console.log('收到图片下载请求:', { imageUrl, filename });

    // 验证必要参数
    if (!imageUrl || !filename) {
      return NextResponse.json(
        { error: '缺少必要参数：imageUrl 和 filename' },
        { status: 400 }
      );
    }

    // 从原始URL获取图片
    console.log('开始下载图片:', imageUrl);
    const response = await fetch(imageUrl);
    
    if (!response.ok) {
      throw new Error(`图片下载失败: ${response.status} ${response.statusText}`);
    }

    // 获取图片数据
    const imageBuffer = await response.arrayBuffer();
    console.log('图片下载完成，大小:', imageBuffer.byteLength, 'bytes');

    // 获取内容类型
    const contentType = response.headers.get('content-type') || 'image/jpeg';

    // 返回图片数据
    return new NextResponse(imageBuffer, {
      headers: {
        'Content-Type': contentType,
        'Content-Disposition': `attachment; filename="${filename}"`,
        'Content-Length': imageBuffer.byteLength.toString(),
        'Cache-Control': 'no-cache',
      },
    });

  } catch (error) {
    console.error('图片下载失败:', error);
    return NextResponse.json(
      { 
        error: error instanceof Error ? error.message : '图片下载失败',
        details: error instanceof Error ? error.stack : undefined
      },
      { status: 500 }
    );
  }
} 