export async function GET() {
  try {
    // 检查环境变量
    const falKeyStatus = {
      exists: !!process.env.FAL_KEY,
      // 只返回前5个字符，保护API密钥安全
      prefix: process.env.FAL_KEY ? process.env.FAL_KEY.substring(0, 5) + '...' : undefined,
      length: process.env.FAL_KEY ? process.env.FAL_KEY.length : 0,
    };

    return Response.json({
      success: true,
      environment: {
        falKey: falKeyStatus,
        nodeEnv: process.env.NODE_ENV,
      },
      message: process.env.FAL_KEY ? 'FAL_KEY 已设置' : 'FAL_KEY 未设置'
    });
  } catch (error) {
    console.error('环境变量检查出错:', error);
    
    return Response.json(
      { 
        error: error instanceof Error ? error.message : '环境变量检查失败'
      },
      { status: 500 }
    );
  }
} 