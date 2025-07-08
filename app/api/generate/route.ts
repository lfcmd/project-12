import { fal } from "@fal-ai/client";

// 风格映射 - 采用关键词驱动的提示词
const STYLE_PROMPTS = {
  LINEART: (subject: string) => `(masterpiece, best quality, hires), ((fine line-art)), ultra clean 0.15 mm black ink, ${subject}, precise cross-hatching shadows, manga contour, pure white negative space, simple background`,
  
  WATERCOLOR: (subject:string) => `(masterpiece, best quality, hires), ((soft watercolor)), ${subject}, pastel wash, wet-edge bloom, translucent layering, cotton paper grain, dreamy hand-paint feel, simple background`,
  
  GHIBLI: (subject: string) => `(masterpiece, best quality, hires), ((ghibli style)), ${subject}, vivid yet tender palette, hand-paint 2D cel, gentle rim light, whimsical warm tone, storybook charm, by hayao miyazaki, simple background`,
  
  OILPAINT: (subject: string) => `(masterpiece, best quality, hires), ((classic oil painting)), ${subject}, thick impasto strokes, palette-knife texture, rich umber under-painting, warm chiaroscuro glow, by rembrandt, simple background`,
  
  SKETCH: (subject: string) => `(masterpiece, best quality, hires), ((graphite pencil sketch)), ${subject}, dynamic hatch, smudge shading, raw paper tooth, study-grade draughtsmanship, neutral grey scale, simple background`,
  
  CARTOON: (subject: string) => `(masterpiece, best quality, hires), ((flat cartoon)), ${subject}, bold 4 px ink outline, high-sat CMYK chunk color, sticker vibe, zero gradient, playful exaggeration, simple background`,
  
  REALISTIC: (subject: string) => `(masterpiece, best quality, hires), ((hand-drawn realism)), ${subject}, subtle pencil base, layered light watercolor tint, natural proportion, soft diffuse shade, print ready, simple background`,
  
  PIXEL: (subject: string) => `(masterpiece, best quality, hires), ((32x32 pixel art)), ${subject}, 16-color NES palette, crisp 1 px black outline, retro 8-bit charm, no anti-alias, simple background`,
  
  SNOWTEXT: (subject: string, subjectEn: string) => `(masterpiece, best quality, hires), snow surface, carve text "${subjectEn} (${subject})", razor-edge trough, cold blue dawn glow, powder sparkles, high-angle shot`,
  
  SANDTEXT: (subject: string, subjectEn: string) => `(masterpiece, best quality, hires), golden sand, carve text "${subjectEn} (${subject})", sharp groove, warm sunset rim-light, fine grain sparkle, high-angle shot`
} as const;

type StyleKey = keyof typeof STYLE_PROMPTS;

interface GenerateRequest {
  prompt: string;
  style: StyleKey;
  imageSize?: string;
  numImages?: number;
  quality?: string;
}

interface GeneratedImage {
  url: string;
  width: number;
  height: number;
  content_type: string;
}

// 配置 fal.ai 客户端
fal.config({
  credentials: process.env.FAL_KEY
});

// 生成最终的完整prompt
function generatePrompt(userPrompt: string, style: StyleKey): string {
  // 对于文字风格，需要英文翻译
  if (style === 'SNOWTEXT' || style === 'SANDTEXT') {
    // 简单的中文到英文映射，实际项目中可以集成翻译API
    const simpleTranslations: Record<string, string> = {
      '美女': 'Beauty',
      '猫咪': 'Cat',
      '风景': 'Landscape',
      '花朵': 'Flower',
      '汽车': 'Car',
      '房子': 'House',
      '狗狗': 'Dog',
      '树木': 'Tree',
      '山峰': 'Mountain',
      '海洋': 'Ocean',
      '橘猫': 'Orange Cat',
      '沙发': 'Sofa'
    };
    
    const englishPrompt = simpleTranslations[userPrompt] || userPrompt;
    const styleTemplate = STYLE_PROMPTS[style] as (subject: string, subjectEn: string) => string;
    return styleTemplate(userPrompt, englishPrompt);
  }
  
  const styleTemplate = STYLE_PROMPTS[style] as (subject: string) => string;
  return styleTemplate(userPrompt);
}

// 使用 fal.ai 生成图片
async function generateImages(prompt: string, style: StyleKey, numImages: number = 1, width: number, height: number): Promise<GeneratedImage[]> {
  try {
    console.log('调用 fal.ai API，prompt:', prompt, 'size:', `${width}x${height}`);
    console.log('环境变量 FAL_KEY:', process.env.FAL_KEY ? 'exists' : 'undefined');
    
    const result = await fal.subscribe("fal-ai/flux-lora", {
      input: {
        prompt: prompt,
        width: width,
        height: height,
        num_inference_steps: 28,
        guidance_scale: 3.5,
        num_images: numImages,
        enable_safety_checker: false,
        output_format: "jpeg"
      } as any,
      logs: true,
      onQueueUpdate: (update) => {
        if (update.status === "IN_PROGRESS") {
          update.logs?.map((log) => log.message).forEach(console.log);
        }
      },
    });

    console.log('fal.ai 返回结果:', result);

    // 检查是否有NSFW内容被检测到
    if (result.data.has_nsfw_concepts && result.data.has_nsfw_concepts.some((nsfw: boolean) => nsfw)) {
      console.log('检测到NSFW内容，但继续处理...');
    }

    // 验证返回的图片数据
    if (!result.data.images || result.data.images.length === 0) {
      throw new Error('API返回的图片数据为空');
    }

    // 转换格式以匹配我们的接口
    const images: GeneratedImage[] = result.data.images.map((img: any, index: number) => {
      if (!img.url) {
        console.error(`图片 ${index} 缺少URL:`, img);
        throw new Error(`第${index + 1}张图片生成失败：缺少URL`);
      }
      
      return {
        url: img.url,
        width: img.width || 1024,
        height: img.height || 768,
        content_type: img.content_type || "image/jpeg"
      };
    });

    return images;

  } catch (error) {
    console.error('fal.ai API 调用失败:', error);
    throw new Error(`图片生成失败: ${error instanceof Error ? error.message : 'Unknown error'}`);
  }
}

export async function POST(request: Request) {
  try {
    const body: GenerateRequest = await request.json();
    const { prompt, style, imageSize = '1024x1024', numImages = 1, quality } = body;

    console.log('收到生成请求:', body);
    console.log('FAL_KEY 状态:', {
      exists: !!process.env.FAL_KEY,
      value: process.env.FAL_KEY ? `${process.env.FAL_KEY.substring(0, 5)}...` : 'undefined',
      length: process.env.FAL_KEY ? process.env.FAL_KEY.length : 0,
      type: typeof process.env.FAL_KEY
    });

    // 验证必要参数
    if (!prompt || !style) {
      return Response.json(
        { error: '缺少必要参数：prompt 和 style' },
        { status: 400 }
      );
    }

    // 验证风格
    if (!STYLE_PROMPTS[style]) {
      return Response.json(
        { error: `不支持的风格: ${style}` },
        { status: 400 }
      );
    }

    // 验证 API Key
    if (!process.env.FAL_KEY) {
      return Response.json(
        { error: '服务器配置错误：缺少 FAL_KEY' },
        { status: 500 }
      );
    }

    // 解析 imageSize
    const [width, height] = imageSize.split('x').map(Number);
    if (!width || !height || isNaN(width) || isNaN(height)) {
       return Response.json(
        { error: `无效的 imageSize 格式: ${imageSize}` },
        { status: 400 }
      );
    }

    // 生成完整的风格化prompt
    const enhancedPrompt = generatePrompt(prompt, style);

    console.log('生成的完整prompt:', enhancedPrompt);

    // 使用 fal.ai 生成图片
    const images = await generateImages(enhancedPrompt, style, numImages, width, height);

    // 返回成功结果
    return Response.json({
      success: true,
      images,
      style,
      originalPrompt: prompt,
      enhancedPrompt,
      isDemoMode: false,
      message: '图片生成成功'
    });

  } catch (error) {
    console.error('生成图片时出错:', error);
    
    // 返回错误响应
    return Response.json(
      { 
        error: error instanceof Error ? error.message : '图片生成失败'
      },
      { status: 500 }
    );
  }
} 