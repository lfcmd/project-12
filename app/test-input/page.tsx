'use client';

import React, { useState } from 'react';

interface GeneratedImage {
  url: string;
  width: number;
  height: number;
  content_type: string;
}

interface GenerateResponse {
  success: boolean;
  images: GeneratedImage[];
  style: string;
  originalPrompt: string;
  enhancedPrompt: string;
  isDemoMode: boolean;
  message: string;
  error?: string;
}

export default function TestFalAI() {
  const [prompt, setPrompt] = useState('一只可爱的橘猫坐在沙发上，阳光洒在身上');
  const [selectedStyle, setSelectedStyle] = useState('LINEART');
  const [isGenerating, setIsGenerating] = useState(false);
  const [generatedImages, setGeneratedImages] = useState<GeneratedImage[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [responseData, setResponseData] = useState<GenerateResponse | null>(null);

  const styles = [
    { code: 'LINEART', name: 'Line Art', desc: '黑白线稿 - 精准手绘线条' },
    { code: 'WATERCOLOR', name: 'Watercolor', desc: '浅色水彩 - 梦幻流动色彩' },
    { code: 'GHIBLI', name: 'Ghibli Style', desc: '动画梦幻配色 - 宫崎骏风格' },
    { code: 'OILPAINT', name: 'Oil Paint', desc: '油画笔触 - 梵高质感厚涂' },
    { code: 'SKETCH', name: 'Pencil Sketch', desc: '铅笔素描 - 经典素描质感' },
    { code: 'CARTOON', name: 'Cartoon Flat', desc: '卡通扁平插画 - 现代矢量风格' },
    { code: 'REALISTIC', name: 'Realistic Art', desc: '写实插画 - 保持笔触非摄影感' },
    { code: 'PIXEL', name: 'Pixel Art', desc: '64-512像素格 - 复古像素风' },
    { code: 'ETCHING', name: 'Etching', desc: '复古铜版线 - 经典版画质感' },
    { code: 'SNOWTEXT', name: 'Snow Text', desc: '雪地写字 - 独家营销模板' },
    { code: 'SANDTEXT', name: 'Sand Text', desc: '沙滩写字 - 独家营销模板' }
  ];

  const handleGenerate = async () => {
    if (!prompt.trim()) {
      setError('请输入描述文字');
      return;
    }

    setIsGenerating(true);
    setError(null);
    setGeneratedImages([]);
    setResponseData(null);

    try {
      const response = await fetch('/api/generate', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          prompt: prompt.trim(),
          style: selectedStyle,
          imageSize: 'landscape',
          numImages: 1,
          quality: 'standard'
        }),
      });

      const data: GenerateResponse = await response.json();
      setResponseData(data);

      if (data.success && data.images) {
        setGeneratedImages(data.images);
      } else {
        setError(data.error || '生成失败');
      }

    } catch (err) {
      console.error('API调用失败:', err);
      setError(err instanceof Error ? err.message : '网络错误');
    } finally {
      setIsGenerating(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-900 p-8">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-white text-3xl font-bold mb-8">fal.ai API 测试页面</h1>
        
        {/* 输入区域 */}
        <div className="bg-gray-800 p-6 rounded-lg mb-8">
          <div className="mb-6">
            <label className="block text-white text-lg mb-3">描述你想要的画面:</label>
            <textarea
              value={prompt}
              onChange={(e) => setPrompt(e.target.value)}
              placeholder="例如：一只可爱的橘猫坐在沙发上，阳光洒在身上"
              className="w-full h-24 p-4 border-2 border-gray-600 rounded-lg bg-gray-700 text-white placeholder-gray-400 resize-none"
            />
            <p className="text-gray-400 mt-2">字符数: {prompt.length}</p>
          </div>

          <div className="mb-6">
            <label className="block text-white text-lg mb-3">选择风格:</label>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-3">
              {styles.map((style) => (
                <button
                  key={style.code}
                  onClick={() => setSelectedStyle(style.code)}
                  className={`p-3 rounded-lg border-2 text-left transition-colors ${
                    selectedStyle === style.code
                      ? 'border-blue-500 bg-blue-500/20 text-blue-300'
                      : 'border-gray-600 bg-gray-700 text-gray-300 hover:border-gray-500'
                  }`}
                >
                  <div className="font-semibold">{style.name}</div>
                  <div className="text-sm opacity-75">{style.desc}</div>
                </button>
              ))}
            </div>
          </div>

          <button
            onClick={handleGenerate}
            disabled={isGenerating || !prompt.trim()}
            className={`w-full py-3 px-6 rounded-lg font-semibold text-lg transition-colors ${
              isGenerating || !prompt.trim()
                ? 'bg-gray-600 text-gray-400 cursor-not-allowed'
                : 'bg-blue-600 text-white hover:bg-blue-700'
            }`}
          >
            {isGenerating ? '生成中...' : '开始生成'}
          </button>
        </div>

        {/* 错误信息 */}
        {error && (
          <div className="bg-red-500/20 border border-red-500 text-red-300 p-4 rounded-lg mb-8">
            <strong>错误:</strong> {error}
          </div>
        )}

        {/* 生成结果 */}
        {generatedImages.length > 0 && (
          <div className="bg-gray-800 p-6 rounded-lg mb-8">
            <h2 className="text-white text-xl font-semibold mb-4">生成结果</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {generatedImages.map((image, index) => (
                <div key={index} className="bg-gray-700 p-4 rounded-lg">
                  <img
                    src={image.url}
                    alt={`Generated image ${index + 1}`}
                    className="w-full h-auto rounded-lg mb-3"
                    onError={(e) => {
                      const target = e.target as HTMLImageElement;
                      target.style.display = 'none';
                    }}
                  />
                  <div className="text-gray-300 text-sm">
                    <p>尺寸: {image.width} x {image.height}</p>
                    <p>格式: {image.content_type}</p>
                    <a
                      href={image.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-blue-400 hover:text-blue-300 underline"
                    >
                      在新窗口打开
                    </a>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* 调试信息 */}
        {responseData && (
          <div className="bg-gray-800 p-6 rounded-lg">
            <h2 className="text-white text-xl font-semibold mb-4">调试信息</h2>
            <div className="bg-gray-700 p-4 rounded-lg">
              <pre className="text-green-400 text-sm overflow-auto">
                {JSON.stringify(responseData, null, 2)}
              </pre>
            </div>
          </div>
        )}
      </div>
    </div>
  );
} 