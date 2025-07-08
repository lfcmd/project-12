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
      subtitle: '专门的手绘风格AI生成平台，30秒生成专业手绘作品。专业商用许可证。',
      startButton: '开始手绘创作',
      stats: {
        styles: '手绘风格',
        speed: '生成速度',
        export: 'PNG导出',
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
          title: '高清PNG导出',
          desc: '支持高清PNG文件导出，方便后期编辑和专业设计工作流程'
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
      description: '专门的手绘风格AI生成平台，30秒生成专业手绘作品，支持PNG导出和商用许可。为学生、艺术家、游戏工作室和营销团队而设计。',
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
      subtitle: 'Specialized hand-drawn AI platform. Generate professional hand-drawn artworks in 30 seconds with PNG export and commercial license.',
      startButton: 'Start Hand Drawing',
      stats: {
        styles: 'Hand Styles',
        speed: 'Gen Speed',
        export: 'PNG Export',
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
          title: 'High-Quality PNG Export',
          desc: 'High-quality PNG file export supported for easy post-editing and professional design workflows'
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
              description: 'Specialized hand-drawn AI platform. Generate professional hand-drawn artworks in 30 seconds with PNG export and commercial license. Designed for students, artists, game studios and marketing teams.',
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
function handleGenerate(
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

  // Simulate API call
  setTimeout(() => {
    setIsGenerating(false);
    // Mock generated images
    const mockImages = Array.from({ length: numImages }, (_, i) => 
      `https://picsum.photos/512/512?random=${Date.now() + i}`
    );
    setGeneratedImages(mockImages);
  }, 3000);
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
      formats: ['PNG', 'JPG']
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
      formats: ['PNG', 'JPG']
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
        return <div>Home Page</div>;
      case 'generate':
        return <div>Generate Page</div>;
      case 'pricing':
        return <div>Pricing Page</div>;
      case 'gallery':
        return <div>Gallery Page</div>;
      default:
        return <div>Home Page</div>;
    }
  };

  return (
    <div className="min-h-screen bg-black">
      <Navigation {...appProps} />
      {renderPage()}
    </div>
  );
} 