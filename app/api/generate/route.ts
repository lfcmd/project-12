import { fal } from "@fal-ai/client";

// 风格映射 - 包含完整的11种风格
const STYLE_PROMPTS = {
  LINEART: (subject: string) => `以 ${subject} 为核心，采用精细黑白线稿风格，使用 0.2 毫米钢笔笔触，线条流畅而富节奏，保留手绘起笔收笔的自然抖动与粗细变化；弱化大面积阴影，仅用交叉线表现体积关系，背景留白，构图遵循三分法与黄金比例；整体光照为柔和中性光，避免重影、涂抹与彩色填充；画面干净、细节丰富，呈现工业设计草图与日漫原稿般的纯净质感；300 DPI，高分辨率，可输出 PSD 分层，便于后期上色或排版。`,
  
  WATERCOLOR: (subject: string) => `将 ${subject} 置于画面视觉焦点，以柔和水彩手法呈现：湿画法晕染、纸张纤维纹理清晰可见，采用粉彩系低饱和色调；背景留有大片留白与渐层水痕，边缘水迹自然扩散；整体光源为清晨逆光，自然形成透明感叠色；禁止硬边、油画笔触与过度数字平滑；作品应具有手工水彩的温度与呼吸感，适合做海报或明信片，高分辨率 JPG/PNG 输出，可进一步矢量化。`,
  
  GHIBLI: (subject: string) => `画面以 ${subject} 为主角，采用吉卜力式暖调童话风：色彩柔和却饱满，背景为手绘 2D 多层景深，云朵及树叶描边极细；环境光为金色夕阳，空气颗粒漂浮；角色表情温暖，场景包含细碎生活物件增强故事感；禁止照片质感和 3D 渲染；整体观感应带有《龙猫》田园诗意与天空之城的探险气息；输出 PNG，方便后期合成或动画分层。`,
  
  OILPAINT: (subject: string) => `渲染 ${subject} 为传统油画：厚涂刀痕、重色堆叠，画布织纹可见；采用伦勃朗式光影，背景虚化，主体边缘略带柔化晕染；颜色以赭石、群青、钛白为主，局部高光使用钛白厚涂；笔触方向随形体走向，形成动态韵律；禁止平滑数字笔；完成效果宛如博物馆收藏油画，高分辨率 TIFF/PNG 输出，适合艺术微喷。`,
  
  SKETCH: (subject: string) => `以 ${subject} 为对象，绘制石墨铅笔素描：2B–6B 软铅交替，细腻排线与半擦拭形成层次灰阶；纸张为粗粒素描纸，边角保留指纹与粉屑，强调结构比例与透视；弱化背景，仅留暗灰素描面衬托主体；光源侧上方，投影清晰；禁止彩色、钢笔描边与数字平滑；输出 PSD 分层：线稿层、阴影层分离，方便继续绘制。`,
  
  CARTOON: (subject: string) => `${subject} 形象以简洁几何体塑造，厚黑描边（4 px 等宽），高饱和对比配色（CMYK 基础色系）；局部使用 5% 噪点纹理增添手绘质感；背景为单色块或渐层天空；整体构图夸张、有表情张力；禁止写实阴影与 3D 高光；适合做贴纸、表情包与社媒封面；支持 PNG/SVG 输出，SVG 需包含独立路径便于编辑。`,
  
  REALISTIC: (subject: string) => `将 ${subject} 刻画为手绘写实风：线条极细，仅用于结构定位，主要依靠铅笔与淡彩逐层渲染；皮肤／材质细节精准，光影柔和且符合真实物理；保持纸张纹理与手绘笔触，可见轻微铅笔底稿；禁止照片拼贴和摄影噪点；输出 PNG，分辨率 2048²，满足出版印刷。`,
  
  PIXEL: (subject: string) => `以 ${subject} 为 32×32 像素精灵：使用寒色与暖色 16 色调色盘，严格网格像素对齐；无抗锯齿、无渐变；边缘用 1 px 深色描线，局部点状高光增强立体；背景透明，适配游戏引擎；输出 PNG 或 GIF，保持索引色。`,
  
  ETCHING: (subject: string) => `呈现 ${subject} 为 19 世纪古书插图：细密单向或交叉阴影线，高对比黑棕色墨；纸张泛黄，带轻微时间斑驳；背景有古典装饰花边；禁止彩色和现代字体；输出 TIFF/PNG，分辨率 300 DPI，适合印刷排版。`,
  
  SNOWTEXT: (subject: string, subjectEn: string) => `高空俯视皑皑雪原，纯白无脚印，使用脚踏方式在中央写出"${subjectEn}（${subject}）"，笔画深陷雪面，周围留有松散雪痕；冬日清晨微蓝光，远处有浅雾；禁止杂物与人迹；4 K 高清 JPG。`,
  
  SANDTEXT: (subject: string, subjectEn: string) => `热带海滩金色细沙上，以手指刻写"${subjectEn}（${subject}）"，笔划锋利带微碎沙粒；背景波浪轻拍、贝壳点缀；夕阳暖橙逆光拉长阴影；禁止垃圾与脚印；4 K JPG 输出。`
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

// 图片尺寸映射
function getImageSize(sizeKey?: string): "square_hd" | "landscape_4_3" | "portrait_4_3" | "landscape_16_9" | "portrait_16_9" | "square" {
  const sizes = {
    'square': 'square_hd' as const,
    'landscape': 'landscape_4_3' as const,
    'portrait': 'portrait_4_3' as const,
    'wide': 'landscape_16_9' as const,
    'tall': 'portrait_16_9' as const
  };
  return sizes[sizeKey as keyof typeof sizes] || 'landscape_4_3';
}

// 使用 fal.ai 生成图片
async function generateImages(prompt: string, style: StyleKey, numImages: number = 1, imageSize?: string): Promise<GeneratedImage[]> {
  try {
    console.log('调用 fal.ai API，prompt:', prompt);
    console.log('环境变量 FAL_KEY:', process.env.FAL_KEY ? 'exists' : 'undefined');
    
    const result = await fal.subscribe("fal-ai/flux-lora", {
      input: {
        prompt: prompt,
        image_size: getImageSize(imageSize),
        num_inference_steps: 28,
        guidance_scale: 3.5,
        num_images: numImages,
        enable_safety_checker: true,
        output_format: "jpeg"
      },
      logs: true,
      onQueueUpdate: (update) => {
        if (update.status === "IN_PROGRESS") {
          update.logs?.map((log) => log.message).forEach(console.log);
        }
      },
    });

    console.log('fal.ai 返回结果:', result);

    // 转换格式以匹配我们的接口
    const images: GeneratedImage[] = result.data.images.map((img: any) => ({
      url: img.url,
      width: img.width || 1024,
      height: img.height || 768,
      content_type: img.content_type || "image/jpeg"
    }));

    return images;

  } catch (error) {
    console.error('fal.ai API 调用失败:', error);
    throw new Error(`图片生成失败: ${error instanceof Error ? error.message : 'Unknown error'}`);
  }
}

export async function POST(request: Request) {
  try {
    const body: GenerateRequest = await request.json();
    const { prompt, style, imageSize, numImages = 1, quality } = body;

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

    // 生成完整的风格化prompt
    const enhancedPrompt = generatePrompt(prompt, style);

    console.log('生成的完整prompt:', enhancedPrompt);

    // 使用 fal.ai 生成图片
    const images = await generateImages(enhancedPrompt, style, numImages, imageSize);

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