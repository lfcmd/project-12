'use client';

import React, { useState, useMemo, useCallback } from 'react';
import { 
  Palette, 
  Wand2, 
  Crown, 
  Users, 
  Zap, 
  Download, 
  Sparkles,
  PaintBucket,
  Brush,
  Image,
  Star,
  CheckCircle,
  Menu,
  X,
  ArrowRight,
  Heart,
  Share2,
  Eye,
  Clock,
  Layers,
  Settings,
  ChevronDown,
  Brain,
  Cpu,
  Atom,
  Waves,
  Hexagon,
  Triangle,
  Circle,
  Square,
  Droplets,
  Flame,
  Snowflake,
  Leaf,
  Mountain,
  Sun,
  Moon,
  Stars,
  Gamepad2,
  Feather,
  Scissors,
  Pen,
  Paintbrush,
  Edit,
  Smile,
  Camera
} from 'lucide-react';

// Component definitions outside of Home
const stylesData = {
  zh: [
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
  ],
  en: [
    { code: 'LINEART', name: 'Line Art', desc: 'Black & white line art - Precise hand-drawn lines' },
    { code: 'WATERCOLOR', name: 'Watercolor', desc: 'Light watercolor - Dreamy flowing colors' },
    { code: 'GHIBLI', name: 'Ghibli Style', desc: 'Anime dreamy palette - Miyazaki style' },
    { code: 'OILPAINT', name: 'Oil Paint', desc: 'Oil paint strokes - Van Gogh textured impasto' },
    { code: 'SKETCH', name: 'Pencil Sketch', desc: 'Pencil sketch - Classic drawing texture' },
    { code: 'CARTOON', name: 'Cartoon Flat', desc: 'Cartoon flat illustration - Modern vector style' },
    { code: 'REALISTIC', name: 'Realistic Art', desc: 'Realistic illustration - Hand-drawn not photographic' },
    { code: 'PIXEL', name: 'Pixel Art', desc: '64-512 pixel grid - Retro pixel style' },
    { code: 'ETCHING', name: 'Etching', desc: 'Vintage copper lines - Classic engraving texture' },
    { code: 'SNOWTEXT', name: 'Snow Text', desc: 'Snow writing - Exclusive marketing template' },
    { code: 'SANDTEXT', name: 'Sand Text', desc: 'Beach writing - Exclusive marketing template' }
  ]
};

// Language configuration
const t = {
  zh: {
    brandName: 'HandDraw.AI',
    brandSubtitle: '手绘风格生成器',
    nav: {
      home: '首页',
      generate: '手绘生成',
      pricing: '价格套餐',
      gallery: '作品画廊',
      login: '登录',
      enterButton: '开始创作'
    },
    home: {
      title1: 'Hand',
      title2: 'Draw',
      title3: 'AI',
      subtitle: '专门的手绘风格AI生成平台，30秒生成专业手绘作品。支持PSD分层导出，附带商用许可证。',
      startButton: '开始手绘创作',
      stats: {
        styles: '手绘风格',
        speed: '生成速度',
        export: 'PSD导出',
        license: '商用许可'
      },
      stylesTitle: '11种专业手绘风格',
      featuresTitle: '为创作者而生',
      featuresSubtitle: '专门为学生、艺术家、游戏工作室和营销团队设计的手绘AI工具',
      features: [
        {
          title: '30秒快速生成',
          desc: '告别长时间等待，专业手绘作品30秒内完成，提升创作效率'
        },
        {
          title: 'PSD分层导出',
          desc: '支持Photoshop分层文件导出，方便后期编辑和专业设计工作流程'
        },
        {
          title: '手绘风格训练',
          desc: '基于真实手绘作品训练，保持手工绘制的温度和质感'
        },
        {
          title: '商用许可证',
          desc: '每次生成都包含完整商用授权，可用于商业项目无版权担忧'
        }
      ]
    },
    generate: {
      title: '手绘创作工坊',
      subtitle: '选择你喜欢的手绘风格，让AI为你创造独特艺术作品',
      stylesTitle: '手绘风格',
      inputTitle: '创作描述',
      promptLabel: '描述你想要的画面',
      promptPlaceholder: '一座古老的图书馆，阳光透过彩色玻璃窗洒在书架上，一只小猫在书堆中睡觉，手绘水彩风格...',
      promptHelp: '用文字描述你想要创作的画面',
      sizeLabel: '图片尺寸',
      quantityLabel: '生成数量',
      qualityLabel: '生成质量',
      quantities: ['1 张图片', '2 张图片', '4 张图片'],
      qualities: ['标准质量', '高清质量', '超高清质量'],
      generateButton: '开始手绘创作',
      previewTitle: '生成预览',
      previewText: '你的手绘作品将在这里显示',
      statusSpeed: '~30 秒生成',
      statusQueue: '快速队列',
      statusLicense: '商用许可证'
    },
    pricing: {
      title: '手绘创作价格套餐',
      subtitle: '选择适合你的套餐，开启专业手绘创作之旅'
    },
    gallery: {
      title: '手绘作品精选画廊',
      subtitle: '探索由我们的创作者社区制作的精美手绘作品',
      filters: ['全部作品', '热门手绘', '最新创作', '最受喜爱'],
      artistPrefix: '手绘师',
      artworkTitles: ['森林里的小屋', '海边的灯塔', '山间的寺庙', '城市夜景', '沙漠中的绿洲', '雪山下的村庄'],
      artworkDescs: ['温暖的森林小屋，手绘水彩风格', '海边孤独的灯塔，线稿风格', '古老的山间寺庙，宫崎骏风格', '繁华的城市夜景，像素艺术', '沙漠中的美丽绿洲色彩', '宁静的雪山村庄景色'],
      loadMore: '加载更多手绘作品'
    },
    footer: {
      description: '专门的手绘风格AI生成平台，30秒生成专业手绘作品，支持PSD导出和商用许可。为学生、艺术家、游戏工作室和营销团队而设计。',
      product: {
        title: '产品功能',
        features: '功能特色',
        pricing: '价格套餐',
        api: 'API 文档',
        docs: '开发文档',
        changelog: '更新日志'
      },
      company: {
        title: '关于我们',
        about: '关于HandDraw',
        blog: '官方博客',
        careers: '加入我们',
        press: '媒体报道',
        contact: '联系我们'
      },
      legal: {
        title: '法律条款',
        privacy: '隐私政策',
        terms: '使用条款',
        license: '授权许可',
        commercial: '商用条款',
        dmca: 'DMCA'
      },
      copyright: '2024 HandDraw.AI. 保留所有权利。',
      madeWith: '用 ❤️ 为创作者打造',
      status: '状态：所有服务正常运行'
    }
  },
  en: {
    brandName: 'HandDraw.AI',
    brandSubtitle: 'Hand-drawn Style Generator',
    nav: {
      home: 'Home',
      generate: 'Generate',
      pricing: 'Pricing',
      gallery: 'Gallery',
      login: 'Login',
      enterButton: 'Start Creating'
    },
    home: {
      title1: 'Hand',
      title2: 'Draw',
      title3: 'AI',
      subtitle: 'Specialized hand-drawn AI platform. Generate professional hand-drawn artworks in 30 seconds with PSD export and commercial license.',
      startButton: 'Start Hand Drawing',
      stats: {
        styles: 'Hand Styles',
        speed: 'Gen Speed',
        export: 'PSD Export',
        license: 'Commercial'
      },
      stylesTitle: '11 Professional Hand-drawn Styles',
      featuresTitle: 'Built for Creators',
      featuresSubtitle: 'Designed specifically for students, artists, game studios and marketing teams',
      features: [
        {
          title: '30s Fast Generation',
          desc: 'No more long waits. Professional hand-drawn artworks completed in 30 seconds for improved productivity'
        },
        {
          title: 'PSD Layer Export',
          desc: 'Photoshop layered file export supported for easy post-editing and professional design workflows'
        },
        {
          title: 'Hand-drawn Training',
          desc: 'Trained on real hand-drawn artworks to maintain the warmth and texture of manual drawing'
        },
        {
          title: 'Commercial License',
          desc: 'Every generation includes full commercial authorization for business projects without copyright concerns'
        }
      ]
    },
    generate: {
      title: 'Hand Draw Workshop',
      subtitle: 'Choose your favorite hand-drawn style and let AI create unique artworks for you',
      stylesTitle: 'Hand Styles',
      inputTitle: 'Creation Description',
      promptLabel: 'Describe your vision',
      promptPlaceholder: 'An ancient library with sunlight streaming through stained glass windows, a small cat sleeping among books, watercolor style...',
      promptHelp: 'Describe the scene you want to create in words',
      sizeLabel: 'Image Size',
      quantityLabel: 'Quantity',
      qualityLabel: 'Quality',
      quantities: ['1 image', '2 images', '4 images'],
      qualities: ['Standard', 'High Quality', 'Ultra HD'],
      generateButton: 'Start Hand Drawing',
      previewTitle: 'Generation Preview',
      previewText: 'Your hand-drawn artwork will appear here',
      statusSpeed: '~30s generation',
      statusQueue: 'Fast queue',
      statusLicense: 'Commercial license'
    },
    pricing: {
      title: 'Hand Draw Pricing Plans',
      subtitle: 'Choose the right plan for your professional hand-drawing journey'
    },
    gallery: {
      title: 'Hand-drawn Gallery',
      subtitle: 'Explore beautiful hand-drawn artworks created by our creator community',
      filters: ['All Works', 'Popular Hand-drawn', 'Latest Creations', 'Most Loved'],
      artistPrefix: 'Hand Artist',
      artworkTitles: ['Forest Cabin', 'Lighthouse by Sea', 'Mountain Temple', 'City Night', 'Desert Oasis', 'Snow Village'],
      artworkDescs: ['Warm forest cabin, watercolor style', 'Lonely lighthouse by sea, line art style', 'Ancient mountain temple, Ghibli style', 'Bustling city night, pixel art', 'Beautiful desert oasis colors', 'Peaceful snow village scene'],
      loadMore: 'Load More Hand-drawn Works'
    },
    footer: {
      description: 'Specialized hand-drawn AI platform. Generate professional hand-drawn artworks in 30 seconds with PSD export and commercial license. Designed for students, artists, game studios and marketing teams.',
      product: {
        title: 'Product',
        features: 'Features',
        pricing: 'Pricing',
        api: 'API Docs',
        docs: 'Documentation',
        changelog: 'Changelog'
      },
      company: {
        title: 'Company',
        about: 'About HandDraw',
        blog: 'Blog',
        careers: 'Careers',
        press: 'Press',
        contact: 'Contact'
      },
      legal: {
        title: 'Legal',
        privacy: 'Privacy Policy',
        terms: 'Terms of Service',
        license: 'License',
        commercial: 'Commercial Terms',
        dmca: 'DMCA'
      },
      copyright: '2024 HandDraw.AI. All rights reserved.',
      madeWith: 'Made with ❤️ for creators',
      status: 'Status: All systems operational'
    }
  }
};

// Component interfaces
interface AppProps {
  activeTab: string;
  setActiveTab: (tab: string) => void;
  selectedStyle: string;
  setSelectedStyle: (style: string) => void;
  prompt: string;
  setPrompt: (prompt: string) => void;
  isMobileMenuOpen: boolean;
  setIsMobileMenuOpen: (open: boolean) => void;
  language: string;
  setLanguage: (lang: string) => void;
  isGenerating: boolean;
  setIsGenerating: (generating: boolean) => void;
  generatedImages: string[];
  setGeneratedImages: (images: string[]) => void;
  generationError: string | null;
  setGenerationError: (error: string | null) => void;
  imageSize: string;
  setImageSize: (size: string) => void;
  numImages: number;
  setNumImages: (num: number) => void;
  quality: string;
  setQuality: (quality: string) => void;
  currentLang: any;
  styles: any[];
}

// Navigation Component
function Navigation({ language, setLanguage, currentLang, activeTab, setActiveTab, isMobileMenuOpen, setIsMobileMenuOpen }: AppProps) {
  return (
    <nav className="bg-black/95 backdrop-blur-xl border-b border-violet-500/20 sticky top-0 z-50 neural-connections">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-20">
          <div className="flex items-center space-x-4">
            <div className="relative energy-field">
              <div className="w-12 h-12 bg-gradient-to-br from-violet-600 via-purple-600 to-cyan-500 rounded-2xl flex items-center justify-center shadow-2xl animate-pulse-glow">
                <Brush className="w-7 h-7 text-white animate-neural-pulse" />
              </div>
              <div className="absolute -top-1 -right-1 w-4 h-4 bg-gradient-to-r from-pink-500 to-rose-500 rounded-full animate-quantum-ripple"></div>
            </div>
            <div>
              <span className="text-3xl font-bold bg-gradient-to-r from-violet-400 via-purple-400 to-cyan-400 bg-clip-text text-transparent">
                {currentLang.brandName}
              </span>
              <div className="text-xs text-cyan-400 font-medium tracking-wider">{currentLang.brandSubtitle}</div>
            </div>
          </div>
          
          <div className="hidden md:flex space-x-8">
            {[
              { key: 'home', label: currentLang.nav.home },
              { key: 'generate', label: currentLang.nav.generate },
              { key: 'pricing', label: currentLang.nav.pricing },
              { key: 'gallery', label: currentLang.nav.gallery }
            ].map((item) => (
              <button
                key={item.key}
                onClick={() => setActiveTab(item.key)}
                className={`px-6 py-3 rounded-2xl font-bold transition-all duration-500 text-lg quantum-button ${
                  activeTab === item.key
                    ? 'bg-gradient-to-r from-violet-600 to-cyan-500 text-white shadow-2xl shadow-violet-500/50 energy-field'
                    : 'text-gray-400 hover:text-cyan-400 hover:bg-violet-900/20'
                }`}
              >
                {item.label}
              </button>
            ))}
          </div>
          
          <div className="flex items-center space-x-6">
            <div className="flex items-center space-x-2 bg-black/50 p-2 rounded-xl border border-violet-500/30 glass-morphism">
              <button
                onClick={() => setLanguage('zh')}
                className={`px-4 py-2 rounded-lg font-bold transition-all duration-300 ${
                  language === 'zh'
                    ? 'bg-violet-600 text-white'
                    : 'text-gray-400 hover:text-violet-400'
                }`}
              >
                中文
              </button>
              <button
                onClick={() => setLanguage('en')}
                className={`px-4 py-2 rounded-lg font-bold transition-all duration-300 ${
                  language === 'en'
                    ? 'bg-violet-600 text-white'
                    : 'text-gray-400 hover:text-violet-400'
                }`}
              >
                EN
              </button>
            </div>
            
            <button className="bg-gradient-to-r from-violet-600 to-cyan-500 text-white px-8 py-3 rounded-2xl font-bold hover:shadow-2xl hover:shadow-violet-500/50 transition-all duration-500 transform hover:-translate-y-1 quantum-button energy-field">
              {currentLang.nav.enterButton}
            </button>
            
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="md:hidden p-3 text-gray-400 hover:text-cyan-400 transition-colors"
            >
              {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
        
        {isMobileMenuOpen && (
          <div className="md:hidden py-6 border-t border-violet-500/20">
            <div className="space-y-4">
              {[
                { key: 'home', label: currentLang.nav.home },
                { key: 'generate', label: currentLang.nav.generate },
                { key: 'pricing', label: currentLang.nav.pricing },
                { key: 'gallery', label: currentLang.nav.gallery }
              ].map((item) => (
                <button
                  key={item.key}
                  onClick={() => {
                    setActiveTab(item.key);
                    setIsMobileMenuOpen(false);
                  }}
                  className={`block w-full text-left px-6 py-3 rounded-2xl font-bold transition-all duration-500 quantum-button ${
                    activeTab === item.key
                      ? 'bg-gradient-to-r from-violet-600 to-cyan-500 text-white'
                      : 'text-gray-400 hover:text-cyan-400 hover:bg-violet-900/20'
                  }`}
                >
                  {item.label}
                </button>
              ))}
            </div>
          </div>
        )}
      </div>
    </nav>
  );
}

// Generate Handler Function
async function handleGenerate(
  prompt: string,
  selectedStyle: string,
  imageSize: string,
  numImages: number,
  quality: string,
  setIsGenerating: (generating: boolean) => void,
  setGenerationError: (error: string | null) => void,
  setGeneratedImages: (images: string[]) => void
) {
  if (!prompt.trim()) {
    setGenerationError('请输入描述文本');
    return;
  }

  setIsGenerating(true);
  setGenerationError(null);

  try {
    console.log('发送生成请求:', { prompt: prompt.trim(), style: selectedStyle, imageSize, numImages, quality });
    
    // Call the API endpoint
    const response = await fetch('/api/generate', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        prompt: prompt.trim(),
        style: selectedStyle,
        imageSize: imageSize,
        numImages: numImages,
        quality: quality
      }),
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.error || `HTTP error! status: ${response.status}`);
    }

    const data = await response.json();
    console.log('API响应:', data);
    
    if (data.success && data.images) {
      // 提取图片URL数组
      const imageUrls = data.images.map((img: any) => 
        typeof img === 'string' ? img : img.url
      );
      
      setGeneratedImages(imageUrls);
      setGenerationError(null);
      
      // 显示生成信息
      if (data.isDemoMode) {
        console.log('演示模式生成完成');
        console.log('原始prompt:', data.originalPrompt);
        console.log('风格化prompt:', data.enhancedPrompt);
      }
    } else {
      throw new Error(data.error || '生成失败，请重试');
    }
  } catch (error) {
    console.error('生成错误:', error);
    const errorMessage = error instanceof Error ? error.message : '生成失败，请检查网络连接并重试';
    setGenerationError(errorMessage);
  } finally {
    setIsGenerating(false);
  }
}

export default function Home() {
  const [activeTab, setActiveTab] = useState('home');
  const [selectedStyle, setSelectedStyle] = useState('LINEART');
  const [prompt, setPrompt] = useState('');
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [language, setLanguage] = useState('zh');
  
  const [isGenerating, setIsGenerating] = useState(false);
  const [generatedImages, setGeneratedImages] = useState<string[]>([]);
  const [generationError, setGenerationError] = useState<string | null>(null);
  const [imageSize, setImageSize] = useState('1024x1024');
  const [numImages, setNumImages] = useState(1);
  const [quality, setQuality] = useState('standard');

  const currentLang = t[language as keyof typeof t];
  
  const styles = useMemo(() => [
    { 
      ...stylesData[language as keyof typeof stylesData][0],
      color: 'from-slate-600 via-gray-700 to-black',
      icon: Pen,
      resolution: '2048²',
      formats: ['PNG', 'PSD']
    },
    { 
      ...stylesData[language as keyof typeof stylesData][1],
      color: 'from-blue-400 via-purple-500 to-pink-500',
      icon: Droplets,
      resolution: '2048²',
      formats: ['PNG']
    },
    { 
      ...stylesData[language as keyof typeof stylesData][2],
      color: 'from-green-400 via-emerald-500 to-teal-600',
      icon: Leaf,
      resolution: '2048²',
      formats: ['PNG']
    },
    { 
      ...stylesData[language as keyof typeof stylesData][3],
      color: 'from-orange-400 via-red-500 to-yellow-600',
      icon: Palette,
      resolution: '2048²',
      formats: ['PNG', 'TIFF']
    },
    { 
      ...stylesData[language as keyof typeof stylesData][4],
      color: 'from-gray-400 via-slate-500 to-zinc-600',
      icon: Edit,
      resolution: '2048²',
      formats: ['PNG', 'PSD']
    },
    { 
      ...stylesData[language as keyof typeof stylesData][5],
      color: 'from-purple-400 via-pink-500 to-rose-600',
      icon: Smile,
      resolution: '2048²',
      formats: ['PNG', 'SVG']
    },
    { 
      ...stylesData[language as keyof typeof stylesData][6],
      color: 'from-emerald-400 via-green-500 to-teal-600',
      icon: Camera,
      resolution: '2048²',
      formats: ['PNG']
    },
    { 
      ...stylesData[language as keyof typeof stylesData][7],
      color: 'from-pink-400 via-red-500 to-orange-600',
      icon: Gamepad2,
      resolution: '64-512px',
      formats: ['PNG', 'GIF']
    },
    { 
      ...stylesData[language as keyof typeof stylesData][8],
      color: 'from-amber-600 via-orange-700 to-red-800',
      icon: Scissors,
      resolution: '2048²',
      formats: ['PNG', 'TIFF']
    },
    { 
      ...stylesData[language as keyof typeof stylesData][9],
      color: 'from-cyan-300 via-blue-400 to-indigo-500',
      icon: Snowflake,
      resolution: '1920×1080',
      formats: ['JPG']
    },
    { 
      ...stylesData[language as keyof typeof stylesData][10],
      color: 'from-yellow-400 via-orange-500 to-red-600',
      icon: Sun,
      resolution: '1920×1080',
      formats: ['JPG']
    }
  ], [language]);

  const appProps: AppProps = {
    activeTab,
    setActiveTab,
    selectedStyle,
    setSelectedStyle,
    prompt,
    setPrompt,
    isMobileMenuOpen,
    setIsMobileMenuOpen,
    language,
    setLanguage,
    isGenerating,
    setIsGenerating,
    generatedImages,
    setGeneratedImages,
    generationError,
    setGenerationError,
    imageSize,
    setImageSize,
    numImages,
    setNumImages,
    quality,
    setQuality,
    currentLang,
    styles
  };

  const renderPage = () => {
    switch (activeTab) {
      case 'home':
        return (
          <main className="min-h-screen bg-black neural-bg">
            {/* Hero Section */}
            <section className="relative py-32 px-8">
              <div className="max-w-6xl mx-auto text-center">
                <div className="mb-8">
                  <h1 className="text-7xl md:text-9xl font-black mb-6">
                    <span className="bg-gradient-to-r from-violet-400 via-purple-400 to-cyan-400 bg-clip-text text-transparent">
                      {currentLang.home.title1}
                    </span>
                    <span className="bg-gradient-to-r from-cyan-400 via-blue-400 to-violet-400 bg-clip-text text-transparent">
                      {currentLang.home.title2}
                    </span>
                    <span className="bg-gradient-to-r from-pink-400 via-rose-400 to-orange-400 bg-clip-text text-transparent">
                      .{currentLang.home.title3}
                    </span>
                  </h1>
                  <p className="text-xl md:text-2xl text-gray-300 mb-12 max-w-4xl mx-auto leading-relaxed">
                    {currentLang.home.subtitle}
                  </p>
                </div>

                <div className="flex flex-col sm:flex-row gap-6 justify-center items-center mb-16">
                  <button 
                    onClick={() => setActiveTab('generate')}
                    className="bg-gradient-to-r from-violet-600 to-cyan-500 text-white px-12 py-4 rounded-2xl font-bold text-xl hover:shadow-2xl hover:shadow-violet-500/50 transition-all duration-500 transform hover:-translate-y-1 quantum-button"
                  >
                    {currentLang.home.startButton}
                  </button>
                </div>

                {/* Stats */}
                <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-20">
                  <div className="text-center">
                    <div className="text-4xl font-bold text-cyan-400 mb-2">11+</div>
                    <div className="text-gray-400">{currentLang.home.stats.styles}</div>
                  </div>
                  <div className="text-center">
                    <div className="text-4xl font-bold text-violet-400 mb-2">30s</div>
                    <div className="text-gray-400">{currentLang.home.stats.speed}</div>
                  </div>
                  <div className="text-center">
                    <div className="text-4xl font-bold text-pink-400 mb-2">PSD</div>
                    <div className="text-gray-400">{currentLang.home.stats.export}</div>
                  </div>
                  <div className="text-center">
                    <div className="text-4xl font-bold text-orange-400 mb-2">✓</div>
                    <div className="text-gray-400">{currentLang.home.stats.license}</div>
                  </div>
                </div>
              </div>
            </section>

            {/* Styles Preview */}
            <section className="py-20 px-8">
              <div className="max-w-6xl mx-auto">
                <h2 className="text-4xl md:text-5xl font-bold text-center mb-16">
                  <span className="bg-gradient-to-r from-violet-400 via-purple-400 to-cyan-400 bg-clip-text text-transparent">
                    {currentLang.home.stylesTitle}
                  </span>
                </h2>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                  {styles.slice(0, 6).map((style, index) => {
                    const IconComponent = style.icon;
                    return (
                      <div key={style.code} className="bg-gray-900/30 backdrop-blur-sm rounded-3xl p-8 hover:bg-gray-800/40 transition-all duration-500 border border-gray-800 hover:border-violet-500/30">
                        <div className={`w-16 h-16 rounded-2xl bg-gradient-to-br ${style.color} flex items-center justify-center mb-6`}>
                          <IconComponent className="w-8 h-8 text-white" />
                        </div>
                        <h3 className="text-2xl font-bold text-white mb-3">{style.name}</h3>
                        <p className="text-gray-400 leading-relaxed">{style.desc}</p>
                      </div>
                    );
                  })}
                </div>
              </div>
            </section>

            {/* Features */}
            <section className="py-20 px-8">
              <div className="max-w-6xl mx-auto">
                <div className="text-center mb-16">
                  <h2 className="text-4xl md:text-5xl font-bold mb-6">
                    <span className="bg-gradient-to-r from-violet-400 via-purple-400 to-cyan-400 bg-clip-text text-transparent">
                      {currentLang.home.featuresTitle}
                    </span>
                  </h2>
                  <p className="text-xl text-gray-400 max-w-3xl mx-auto">
                    {currentLang.home.featuresSubtitle}
                  </p>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
                  {currentLang.home.features.map((feature, index) => (
                    <div key={index} className="text-center md:text-left">
                      <h3 className="text-2xl font-bold text-white mb-4">{feature.title}</h3>
                      <p className="text-gray-400 text-lg leading-relaxed">{feature.desc}</p>
                    </div>
                  ))}
                </div>
              </div>
            </section>
          </main>
        );
      case 'generate':
        return (
          <main className="min-h-screen bg-black neural-bg py-12 px-4">
            <div className="max-w-7xl mx-auto">
              {/* Header */}
              <div className="text-center mb-12">
                <h1 className="text-4xl md:text-6xl font-bold mb-6">
                  <span className="bg-gradient-to-r from-violet-400 via-purple-400 to-cyan-400 bg-clip-text text-transparent">
                    {currentLang.generate.title}
                  </span>
                </h1>
                <p className="text-xl text-gray-400 max-w-3xl mx-auto">{currentLang.generate.subtitle}</p>
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                {/* Left Column - Style Selection */}
                <div className="lg:col-span-1">
                  <div className="bg-gray-900/30 backdrop-blur-sm rounded-3xl p-6 border border-gray-800">
                    <h2 className="text-2xl font-bold text-white mb-6">{currentLang.generate.stylesTitle}</h2>
                    <div className="space-y-3">
                      {styles.map((style) => {
                        const IconComponent = style.icon;
                        return (
                          <button
                            key={style.code}
                            onClick={() => setSelectedStyle(style.code)}
                            className={`w-full text-left p-4 rounded-2xl transition-all duration-300 border ${
                              selectedStyle === style.code
                                ? 'bg-gradient-to-r from-violet-600/20 to-cyan-500/20 border-violet-500 shadow-lg shadow-violet-500/20'
                                : 'bg-gray-800/30 border-gray-700 hover:border-gray-600 hover:bg-gray-800/50'
                            }`}
                          >
                            <div className="flex items-center space-x-4">
                              <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${style.color} flex items-center justify-center flex-shrink-0`}>
                                <IconComponent className="w-6 h-6 text-white" />
                              </div>
                              <div className="flex-1 min-w-0">
                                <h3 className="font-bold text-white text-sm">{style.name}</h3>
                                <p className="text-gray-400 text-xs leading-relaxed">{style.desc}</p>
                              </div>
                            </div>
                          </button>
                        );
                      })}
                    </div>
                  </div>
                </div>

                {/* Middle Column - Input Form */}
                <div className="lg:col-span-1">
                  <div className="bg-gray-900/30 backdrop-blur-sm rounded-3xl p-6 border border-gray-800">
                    <h2 className="text-2xl font-bold text-white mb-6">{currentLang.generate.inputTitle}</h2>
                    
                    {/* Prompt Input */}
                    <div className="mb-6">
                      <label className="block text-white font-bold mb-3">{currentLang.generate.promptLabel}</label>
                      <textarea
                        value={prompt}
                        onChange={(e) => setPrompt(e.target.value)}
                        placeholder={currentLang.generate.promptPlaceholder}
                        className="w-full h-32 bg-gray-800/50 border border-gray-700 rounded-2xl px-4 py-3 text-white placeholder-gray-400 focus:border-violet-500 focus:outline-none resize-none"
                      />
                      <p className="text-gray-400 text-sm mt-2">{currentLang.generate.promptHelp}</p>
                    </div>

                    {/* Size Selection */}
                    <div className="mb-6">
                      <label className="block text-white font-bold mb-3">{currentLang.generate.sizeLabel}</label>
                      <select
                        value={imageSize}
                        onChange={(e) => setImageSize(e.target.value)}
                        className="w-full bg-gray-800/50 border border-gray-700 rounded-2xl px-4 py-3 text-white focus:border-violet-500 focus:outline-none"
                      >
                        <option value="512x512">512×512</option>
                        <option value="1024x1024">1024×1024</option>
                        <option value="1536x1536">1536×1536</option>
                        <option value="1024x1792">1024×1792 (竖版)</option>
                        <option value="1792x1024">1792×1024 (横版)</option>
                      </select>
                    </div>

                    {/* Quantity Selection */}
                    <div className="mb-6">
                      <label className="block text-white font-bold mb-3">{currentLang.generate.quantityLabel}</label>
                      <div className="grid grid-cols-3 gap-3">
                        {[1, 2, 4].map((num, index) => (
                          <button
                            key={num}
                            onClick={() => setNumImages(num)}
                            className={`p-3 rounded-xl font-bold transition-all duration-300 ${
                              numImages === num
                                ? 'bg-gradient-to-r from-violet-600 to-cyan-500 text-white'
                                : 'bg-gray-800/50 text-gray-400 hover:text-white hover:bg-gray-700/50'
                            }`}
                          >
                            {currentLang.generate.quantities[index]}
                          </button>
                        ))}
                      </div>
                    </div>

                    {/* Quality Selection */}
                    <div className="mb-8">
                      <label className="block text-white font-bold mb-3">{currentLang.generate.qualityLabel}</label>
                      <div className="space-y-2">
                        {['standard', 'hd', 'ultra'].map((qual, index) => (
                          <button
                            key={qual}
                            onClick={() => setQuality(qual)}
                            className={`w-full p-3 rounded-xl font-bold transition-all duration-300 text-left ${
                              quality === qual
                                ? 'bg-gradient-to-r from-violet-600 to-cyan-500 text-white'
                                : 'bg-gray-800/50 text-gray-400 hover:text-white hover:bg-gray-700/50'
                            }`}
                          >
                            {currentLang.generate.qualities[index]}
                          </button>
                        ))}
                      </div>
                    </div>

                    {/* Generate Button */}
                    <button
                      onClick={async () => {
                        await handleGenerate(
                          prompt,
                          selectedStyle,
                          imageSize,
                          numImages,
                          quality,
                          setIsGenerating,
                          setGenerationError,
                          setGeneratedImages
                        );
                      }}
                      disabled={isGenerating || !prompt.trim()}
                      className={`w-full py-4 rounded-2xl font-bold text-lg transition-all duration-300 ${
                        isGenerating || !prompt.trim()
                          ? 'bg-gray-700 text-gray-400 cursor-not-allowed'
                          : 'bg-gradient-to-r from-violet-600 to-cyan-500 text-white hover:shadow-2xl hover:shadow-violet-500/50 transform hover:-translate-y-1'
                      }`}
                    >
                      {isGenerating ? '生成中...' : currentLang.generate.generateButton}
                    </button>

                    {/* Status Info */}
                    <div className="mt-4 text-center">
                      <div className="flex justify-center items-center space-x-6 text-sm text-gray-400">
                        <span>{currentLang.generate.statusSpeed}</span>
                        <span>{currentLang.generate.statusQueue}</span>
                        <span>{currentLang.generate.statusLicense}</span>
                      </div>
                    </div>

                    {/* Error Display */}
                    {generationError && (
                      <div className="mt-4 p-3 bg-red-900/30 border border-red-700 rounded-xl">
                        <p className="text-red-400 text-sm">{generationError}</p>
                      </div>
                    )}

                    {/* Info Display */}
                    <div className="mt-4 p-3 bg-blue-900/20 border border-blue-700/30 rounded-xl">
                      <div className="text-blue-400 text-sm">
                        <div className="flex items-center mb-2">
                          <span className="w-2 h-2 bg-blue-400 rounded-full mr-2 animate-pulse"></span>
                          <strong>当前状态：</strong>
                          {isGenerating ? '正在生成图片...' : '等待生成指令'}
                        </div>
                        <div className="text-gray-400 text-xs">
                          • 开发环境：使用演示图片模拟生成效果<br/>
                          • 生产环境：集成真实AI图片生成API<br/>
                          • 生成时间：约15-30秒（取决于图片复杂度）
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Right Column - Preview */}
                <div className="lg:col-span-1">
                  <div className="bg-gray-900/30 backdrop-blur-sm rounded-3xl p-6 border border-gray-800">
                    <h2 className="text-2xl font-bold text-white mb-6">{currentLang.generate.previewTitle}</h2>
                    
                    <div className="space-y-4">
                      {isGenerating ? (
                        <div className="aspect-square bg-gray-800/50 rounded-2xl flex items-center justify-center">
                          <div className="text-center">
                            <div className="w-16 h-16 border-4 border-violet-500 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
                            <p className="text-gray-400">生成中...</p>
                          </div>
                        </div>
                      ) : generatedImages.length > 0 ? (
                        generatedImages.map((image, index) => (
                          <div key={index} className="relative group">
                            <img
                              src={image}
                              alt={`Generated artwork ${index + 1}`}
                              className="w-full aspect-square object-cover rounded-2xl"
                            />
                            <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-2xl flex items-center justify-center">
                              <div className="flex space-x-3">
                                <button className="p-2 bg-white/20 rounded-lg hover:bg-white/30 transition-colors">
                                  <Download className="w-5 h-5 text-white" />
                                </button>
                                <button className="p-2 bg-white/20 rounded-lg hover:bg-white/30 transition-colors">
                                  <Heart className="w-5 h-5 text-white" />
                                </button>
                                <button className="p-2 bg-white/20 rounded-lg hover:bg-white/30 transition-colors">
                                  <Share2 className="w-5 h-5 text-white" />
                                </button>
                              </div>
                            </div>
                          </div>
                        ))
                      ) : (
                        <div className="aspect-square bg-gray-800/30 rounded-2xl border-2 border-dashed border-gray-600 flex items-center justify-center">
                          <div className="text-center">
                            <Image className="w-16 h-16 text-gray-500 mx-auto mb-4" />
                            <p className="text-gray-400">{currentLang.generate.previewText}</p>
                          </div>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </main>
        );
      case 'pricing':
        return (
          <main className="min-h-screen bg-black neural-bg py-12 px-4">
            <div className="max-w-6xl mx-auto">
              {/* Header */}
              <div className="text-center mb-16">
                <h1 className="text-4xl md:text-6xl font-bold mb-6">
                  <span className="bg-gradient-to-r from-violet-400 via-purple-400 to-cyan-400 bg-clip-text text-transparent">
                    {currentLang.pricing.title}
                  </span>
                </h1>
                <p className="text-xl text-gray-400 max-w-3xl mx-auto">{currentLang.pricing.subtitle}</p>
              </div>

              {/* Pricing Cards */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
                {/* Free Plan */}
                <div className="bg-gray-900/30 backdrop-blur-sm rounded-3xl p-8 border border-gray-800 hover:border-gray-600 transition-all duration-300">
                  <div className="text-center mb-8">
                    <h3 className="text-2xl font-bold text-white mb-2">免费体验</h3>
                    <div className="text-4xl font-bold text-gray-400 mb-2">¥0</div>
                    <p className="text-gray-400">试用版本</p>
                  </div>
                  <ul className="space-y-4 mb-8">
                    <li className="flex items-center text-gray-300">
                      <CheckCircle className="w-5 h-5 text-green-400 mr-3" />
                      每日 3 次生成
                    </li>
                    <li className="flex items-center text-gray-300">
                      <CheckCircle className="w-5 h-5 text-green-400 mr-3" />
                      3 种基础手绘风格
                    </li>
                    <li className="flex items-center text-gray-300">
                      <CheckCircle className="w-5 h-5 text-green-400 mr-3" />
                      512×512 分辨率
                    </li>
                    <li className="flex items-center text-gray-400">
                      <X className="w-5 h-5 text-gray-600 mr-3" />
                      PSD 分层导出
                    </li>
                    <li className="flex items-center text-gray-400">
                      <X className="w-5 h-5 text-gray-600 mr-3" />
                      商用许可证
                    </li>
                  </ul>
                  <button className="w-full py-3 border border-gray-600 text-gray-300 rounded-2xl font-bold hover:border-gray-500 hover:text-white transition-all duration-300">
                    免费开始
                  </button>
                </div>

                {/* Pro Plan */}
                <div className="bg-gray-900/30 backdrop-blur-sm rounded-3xl p-8 border-2 border-violet-500 hover:border-violet-400 transition-all duration-300 relative">
                  <div className="absolute -top-3 left-1/2 transform -translate-x-1/2">
                    <span className="bg-gradient-to-r from-violet-600 to-cyan-500 text-white px-4 py-1 rounded-full text-sm font-bold">
                      推荐
                    </span>
                  </div>
                  <div className="text-center mb-8">
                    <h3 className="text-2xl font-bold text-white mb-2">专业版</h3>
                    <div className="text-4xl font-bold text-white mb-2">¥69</div>
                    <p className="text-gray-400">每月订阅</p>
                  </div>
                  <ul className="space-y-4 mb-8">
                    <li className="flex items-center text-gray-300">
                      <CheckCircle className="w-5 h-5 text-green-400 mr-3" />
                      每月 500 次生成
                    </li>
                    <li className="flex items-center text-gray-300">
                      <CheckCircle className="w-5 h-5 text-green-400 mr-3" />
                      11 种专业手绘风格
                    </li>
                    <li className="flex items-center text-gray-300">
                      <CheckCircle className="w-5 h-5 text-green-400 mr-3" />
                      最高 2048×2048 分辨率
                    </li>
                    <li className="flex items-center text-gray-300">
                      <CheckCircle className="w-5 h-5 text-green-400 mr-3" />
                      PSD 分层导出
                    </li>
                    <li className="flex items-center text-gray-300">
                      <CheckCircle className="w-5 h-5 text-green-400 mr-3" />
                      商用许可证
                    </li>
                  </ul>
                  <button className="w-full py-3 bg-gradient-to-r from-violet-600 to-cyan-500 text-white rounded-2xl font-bold hover:shadow-2xl hover:shadow-violet-500/50 transition-all duration-300">
                    开始专业创作
                  </button>
                </div>

                {/* Enterprise Plan */}
                <div className="bg-gray-900/30 backdrop-blur-sm rounded-3xl p-8 border border-gray-800 hover:border-gray-600 transition-all duration-300">
                  <div className="text-center mb-8">
                    <h3 className="text-2xl font-bold text-white mb-2">企业版</h3>
                    <div className="text-4xl font-bold text-white mb-2">¥199</div>
                    <p className="text-gray-400">每月订阅</p>
                  </div>
                  <ul className="space-y-4 mb-8">
                    <li className="flex items-center text-gray-300">
                      <CheckCircle className="w-5 h-5 text-green-400 mr-3" />
                      无限次生成
                    </li>
                    <li className="flex items-center text-gray-300">
                      <CheckCircle className="w-5 h-5 text-green-400 mr-3" />
                      全部手绘风格 + 定制
                    </li>
                    <li className="flex items-center text-gray-300">
                      <CheckCircle className="w-5 h-5 text-green-400 mr-3" />
                      4K 超高清分辨率
                    </li>
                    <li className="flex items-center text-gray-300">
                      <CheckCircle className="w-5 h-5 text-green-400 mr-3" />
                      PSD + AI + SVG 多格式
                    </li>
                    <li className="flex items-center text-gray-300">
                      <CheckCircle className="w-5 h-5 text-green-400 mr-3" />
                      API 接口访问
                    </li>
                  </ul>
                  <button className="w-full py-3 bg-gradient-to-r from-orange-500 to-red-500 text-white rounded-2xl font-bold hover:shadow-2xl hover:shadow-orange-500/50 transition-all duration-300">
                    联系销售
                  </button>
                </div>
              </div>

              {/* Feature Comparison */}
              <div className="bg-gray-900/30 backdrop-blur-sm rounded-3xl p-8 border border-gray-800">
                <h2 className="text-3xl font-bold text-white text-center mb-8">功能对比</h2>
                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead>
                      <tr className="border-b border-gray-700">
                        <th className="text-left py-4 text-white">功能特性</th>
                        <th className="text-center py-4 text-gray-400">免费版</th>
                        <th className="text-center py-4 text-violet-400">专业版</th>
                        <th className="text-center py-4 text-orange-400">企业版</th>
                      </tr>
                    </thead>
                    <tbody className="text-gray-300">
                      <tr className="border-b border-gray-800">
                        <td className="py-4">每月生成次数</td>
                        <td className="text-center py-4">90 次</td>
                        <td className="text-center py-4">500 次</td>
                        <td className="text-center py-4">无限制</td>
                      </tr>
                      <tr className="border-b border-gray-800">
                        <td className="py-4">手绘风格</td>
                        <td className="text-center py-4">3 种</td>
                        <td className="text-center py-4">11 种</td>
                        <td className="text-center py-4">全部 + 定制</td>
                      </tr>
                      <tr className="border-b border-gray-800">
                        <td className="py-4">最高分辨率</td>
                        <td className="text-center py-4">512×512</td>
                        <td className="text-center py-4">2048×2048</td>
                        <td className="text-center py-4">4096×4096</td>
                      </tr>
                      <tr className="border-b border-gray-800">
                        <td className="py-4">生成速度</td>
                        <td className="text-center py-4">60 秒</td>
                        <td className="text-center py-4">30 秒</td>
                        <td className="text-center py-4">15 秒</td>
                      </tr>
                      <tr className="border-b border-gray-800">
                        <td className="py-4">批量生成</td>
                        <td className="text-center py-4">1 张</td>
                        <td className="text-center py-4">4 张</td>
                        <td className="text-center py-4">16 张</td>
                      </tr>
                      <tr>
                        <td className="py-4">技术支持</td>
                        <td className="text-center py-4">社区</td>
                        <td className="text-center py-4">邮件</td>
                        <td className="text-center py-4">专属客服</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          </main>
        );
      case 'gallery':
        return (
          <main className="min-h-screen bg-black neural-bg py-12 px-4">
            <div className="max-w-7xl mx-auto">
              {/* Header */}
              <div className="text-center mb-16">
                <h1 className="text-4xl md:text-6xl font-bold mb-6">
                  <span className="bg-gradient-to-r from-violet-400 via-purple-400 to-cyan-400 bg-clip-text text-transparent">
                    {currentLang.gallery.title}
                  </span>
                </h1>
                <p className="text-xl text-gray-400 max-w-3xl mx-auto">{currentLang.gallery.subtitle}</p>
              </div>

              {/* Filter Tabs */}
              <div className="flex flex-wrap justify-center gap-4 mb-12">
                {currentLang.gallery.filters.map((filter, index) => (
                  <button
                    key={index}
                    className={`px-6 py-3 rounded-2xl font-bold transition-all duration-300 ${
                      index === 0
                        ? 'bg-gradient-to-r from-violet-600 to-cyan-500 text-white'
                        : 'bg-gray-800/50 text-gray-400 hover:text-white hover:bg-gray-700/50'
                    }`}
                  >
                    {filter}
                  </button>
                ))}
              </div>

              {/* Gallery Grid */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 mb-12">
                {currentLang.gallery.artworkTitles.map((title, index) => (
                  <div key={index} className="group relative bg-gray-900/30 backdrop-blur-sm rounded-3xl overflow-hidden border border-gray-800 hover:border-violet-500/30 transition-all duration-300">
                    {/* Mock Image */}
                    <div className="aspect-square bg-gradient-to-br from-gray-700 via-gray-800 to-gray-900 relative overflow-hidden">
                      <img
                        src={`https://picsum.photos/400/400?random=${index + 100}`}
                        alt={title}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                      />
                      
                      {/* Overlay on Hover */}
                      <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                        <div className="flex space-x-3">
                          <button className="p-3 bg-white/20 rounded-xl hover:bg-white/30 transition-colors backdrop-blur-sm">
                            <Eye className="w-5 h-5 text-white" />
                          </button>
                          <button className="p-3 bg-white/20 rounded-xl hover:bg-white/30 transition-colors backdrop-blur-sm">
                            <Heart className="w-5 h-5 text-white" />
                          </button>
                          <button className="p-3 bg-white/20 rounded-xl hover:bg-white/30 transition-colors backdrop-blur-sm">
                            <Download className="w-5 h-5 text-white" />
                          </button>
                          <button className="p-3 bg-white/20 rounded-xl hover:bg-white/30 transition-colors backdrop-blur-sm">
                            <Share2 className="w-5 h-5 text-white" />
                          </button>
                        </div>
                      </div>

                      {/* Style Badge */}
                      <div className="absolute top-3 left-3">
                        <span className="bg-black/50 backdrop-blur-sm text-white text-xs px-3 py-1 rounded-full">
                          {styles[index % styles.length].name}
                        </span>
                      </div>

                      {/* Stats */}
                      <div className="absolute bottom-3 right-3 flex space-x-2">
                        <div className="bg-black/50 backdrop-blur-sm text-white text-xs px-2 py-1 rounded-full flex items-center">
                          <Heart className="w-3 h-3 mr-1" />
                          {Math.floor(Math.random() * 1000) + 100}
                        </div>
                        <div className="bg-black/50 backdrop-blur-sm text-white text-xs px-2 py-1 rounded-full flex items-center">
                          <Eye className="w-3 h-3 mr-1" />
                          {Math.floor(Math.random() * 5000) + 500}
                        </div>
                      </div>
                    </div>

                    {/* Content */}
                    <div className="p-6">
                      <h3 className="text-lg font-bold text-white mb-2">{title}</h3>
                      <p className="text-gray-400 text-sm mb-4">{currentLang.gallery.artworkDescs[index]}</p>
                      
                      {/* Artist Info */}
                      <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-3">
                          <div className="w-8 h-8 bg-gradient-to-br from-violet-500 to-cyan-500 rounded-full flex items-center justify-center">
                            <span className="text-white text-xs font-bold">
                              {currentLang.gallery.artistPrefix.charAt(0)}
                            </span>
                          </div>
                          <div>
                            <p className="text-white text-sm font-medium">
                              {currentLang.gallery.artistPrefix} {String.fromCharCode(65 + index)}
                            </p>
                            <p className="text-gray-400 text-xs">
                              {Math.floor(Math.random() * 30) + 1} 天前
                            </p>
                          </div>
                        </div>
                        
                        {/* Quick Actions */}
                        <div className="flex space-x-2">
                          <button className="p-2 text-gray-400 hover:text-red-400 transition-colors">
                            <Heart className="w-4 h-4" />
                          </button>
                          <button className="p-2 text-gray-400 hover:text-violet-400 transition-colors">
                            <Download className="w-4 h-4" />
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              {/* Load More */}
              <div className="text-center">
                <button className="bg-gradient-to-r from-violet-600 to-cyan-500 text-white px-12 py-4 rounded-2xl font-bold hover:shadow-2xl hover:shadow-violet-500/50 transition-all duration-300 transform hover:-translate-y-1">
                  {currentLang.gallery.loadMore}
                </button>
              </div>

              {/* Featured Artists */}
              <div className="mt-20">
                <h2 className="text-3xl font-bold text-center mb-12">
                  <span className="bg-gradient-to-r from-violet-400 via-purple-400 to-cyan-400 bg-clip-text text-transparent">
                    精选手绘师
                  </span>
                </h2>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                  {[0, 1, 2].map((index) => (
                    <div key={index} className="bg-gray-900/30 backdrop-blur-sm rounded-3xl p-6 border border-gray-800 text-center">
                      <div className="w-20 h-20 bg-gradient-to-br from-violet-500 to-cyan-500 rounded-full flex items-center justify-center mx-auto mb-4">
                        <span className="text-white text-2xl font-bold">
                          {String.fromCharCode(65 + index)}
                        </span>
                      </div>
                      <h3 className="text-xl font-bold text-white mb-2">
                        {currentLang.gallery.artistPrefix} {String.fromCharCode(65 + index)}
                      </h3>
                      <p className="text-gray-400 mb-4">专注{styles[index * 2].name}风格创作</p>
                      <div className="flex justify-center space-x-6 text-sm text-gray-400 mb-4">
                        <div>
                          <div className="font-bold text-white">{Math.floor(Math.random() * 500) + 100}</div>
                          <div>作品</div>
                        </div>
                        <div>
                          <div className="font-bold text-white">{Math.floor(Math.random() * 10000) + 1000}</div>
                          <div>粉丝</div>
                        </div>
                        <div>
                          <div className="font-bold text-white">{Math.floor(Math.random() * 50000) + 5000}</div>
                          <div>点赞</div>
                        </div>
                      </div>
                      <button className="bg-violet-600 hover:bg-violet-700 text-white px-6 py-2 rounded-xl font-bold transition-colors">
                        关注
                      </button>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </main>
        );
      default:
        return (
          <main className="min-h-screen bg-black neural-bg py-32 px-8">
            <div className="max-w-4xl mx-auto text-center">
              <h1 className="text-5xl font-bold mb-8">
                <span className="bg-gradient-to-r from-violet-400 via-purple-400 to-cyan-400 bg-clip-text text-transparent">
                  HandDraw.AI
                </span>
              </h1>
              <div className="text-gray-400 text-lg">页面加载中...</div>
            </div>
          </main>
        );
    }
  };

  return (
    <div className="min-h-screen bg-black">
      <Navigation {...appProps} />
      {renderPage()}
    </div>
  );
} 