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
  Image as ImageIcon,
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
  Moon,
  Stars,
  Gamepad2,
  Scissors,
  Pen,
  Paintbrush,
  Edit,
  Smile,
  Camera
} from 'lucide-react';
import Image from 'next/image';
import { homeGalleryArtworks } from '@/lib/gallery-data';

const styleIcons = [
  Palette, Wand2, PaintBucket, Brush, Edit, Smile, Camera, Gamepad2, Snowflake, Stars
];

// Component definitions outside of Home
const stylesData = [
  { code: 'LINEART', name: 'Line Art', desc: 'Black & white line art - Precise hand-drawn lines' },
  { code: 'WATERCOLOR', name: 'Watercolor', desc: 'Light watercolor - Dreamy flowing colors' },
  { code: 'GHIBLI', name: 'Ghibli Style', desc: 'Anime dreamy palette - Miyazaki style' },
  { code: 'OILPAINT', name: 'Oil Paint', desc: 'Oil paint strokes - Van Gogh textured impasto' },
  { code: 'SKETCH', name: 'Pencil Sketch', desc: 'Pencil sketch - Classic drawing texture' },
  { code: 'CARTOON', name: 'Cartoon Flat', desc: 'Cartoon flat illustration - Modern vector style' },
  { code: 'REALISTIC', name: 'Realistic Art', desc: 'Realistic illustration - Hand-drawn not photographic' },
  { code: 'PIXEL', name: 'Pixel Art', desc: '64-512 pixel grid - Retro pixel style' },
  { code: 'SNOWTEXT', name: 'Snow Text', desc: 'Snow writing - Exclusive marketing template' },
  { code: 'SANDTEXT', name: 'Sand Text', desc: 'Beach writing - Exclusive marketing template' }
];

// Language configuration
const t = {
  brandName: 'HandDraw.AI',
  brandSubtitle: 'Hand-drawn Style Generator',
  nav: {
    home: 'Home',
    generate: 'Generate',
    pricing: 'Pricing',
    login: 'Login',
    enterButton: 'Start Creating'
  },
  home: {
    title1: 'Hand',
    title2: 'Draw',
    title3: 'AI',
    subtitle: 'Specialized hand-drawn AI platform. Quickly generate professional hand-drawn artworks.',
    startButton: 'Start Hand Drawing',
    stats: {
      styles: 'Hand Styles',
      speed: 'Gen Speed',
      export: '4K Resolution',
      license: 'Commercial'
    },
    stylesTitle: '10+ Professional Hand-drawn Styles',
    galleryTitle: '作品画廊',
    gallerySubtitle: '探索由我们的创作者社区创作的精美手绘艺术作品',
    featuresTitle: 'Built for Creators',
    featuresSubtitle: 'Designed specifically for students, artists, game studios and marketing teams',
    features: [
      {
        title: '30s Fast Generation',
        desc: 'No more long waits. Professional hand-drawn artworks completed in 30 seconds for improved productivity'
      },
      {
        title: 'Multiple Aspect Ratios',
        desc: 'Supports square and landscape aspect ratios to fit different social media and design needs.'
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
  faq: {
    title: 'Frequently Asked Questions',
    subtitle: 'If you have any other questions, feel free to contact us.',
    questions: [
      {
        q: 'What is HandDraw.AI?',
        a: 'HandDraw.AI is a specialized AI generation platform for hand-drawn styles. We use advanced models trained on real hand-drawn artworks to provide artists, designers, and creative enthusiasts with high-quality, uniquely artistic hand-drawn images.'
      },
      {
        q: 'Is HandDraw.AI free?',
        a: 'We offer a free trial plan that allows users to perform a limited number of generations per day. For professional users who need more features and higher usage, we offer affordable Pro and Enterprise plans.'
      },
      {
        q: 'How is HandDraw.AI different from other AI art generators?',
        a: 'Our core distinction lies in our focus on "hand-drawn." Unlike general models that pursue photorealism, our models are specialized in simulating the texture, strokes, and warmth of various hand-drawn styles, such as watercolor, pencil sketch, and Ghibli style.'
      },
      {
        q: 'Can I use the generated images for commercial purposes?',
        a: 'Yes, all images generated through our paid plans (Pro and Enterprise) include a full commercial license, allowing you to use them for personal and commercial projects without copyright concerns.'
      },
      {
        q: 'How long does it take to generate an image?',
        a: 'Our optimized architecture ensures fast generation. On the Pro plan, most images can be completed in about 30 seconds, so your creativity doesn\'t have to wait.'
      }
    ]
  },
  gallery: {
    title: 'Hand-drawn Gallery',
    subtitle: 'Explore beautiful hand-drawn artworks created by our creator community',
    filters: ['Popular Hand-drawn'],
    artistPrefix: 'Hand Artist',
    artworkTitles: ['Forest Cabin', 'Lighthouse by Sea', 'Mountain Temple', 'City Night', 'Desert Oasis', 'Snow Village'],
    artworkDescs: ['Warm forest cabin, watercolor style', 'Lonely lighthouse by sea, line art style', 'Ancient mountain temple, Ghibli style', 'Bustling city night, pixel art', 'Beautiful desert oasis colors', 'Peaceful snow village scene'],
    artworkStyles: ['Watercolor', 'Line Art', 'Ghibli Style', 'Pixel Art', 'Oil Paint', 'Pencil Sketch'],
    loadMore: 'Load More Hand-drawn Works'
  },
  footer: {
    description: 'Specialized hand-drawn AI platform. Quickly generate professional hand-drawn artworks. Designed for students, artists, game studios and marketing teams.',
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
};

function HomeImageGallery() {
  return (
    <section className="py-20">
      <div className="max-w-7xl mx-auto px-4">
        <div className="text-center mb-16">
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {homeGalleryArtworks.map((artwork, index) => (
            <div key={index} className="group relative bg-gray-900/30 backdrop-blur-sm rounded-3xl overflow-hidden border border-gray-800 hover:border-violet-500/30 transition-all duration-300">
              <div className="aspect-[4/3] bg-gray-800 relative overflow-hidden">
                <Image
                  src={artwork.imageUrl}
                  alt={artwork.title}
                  fill
                  sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, (max-width: 1280px) 33vw, 25vw"
                  className="object-cover group-hover:scale-105 transition-transform duration-500"
                />
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

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
            <button 
              onClick={() => setActiveTab('generate')}
              className="bg-gradient-to-r from-violet-600 to-cyan-500 text-white px-8 py-3 rounded-2xl font-bold hover:shadow-2xl hover:shadow-violet-500/50 transition-all duration-500 transform hover:-translate-y-1 quantum-button energy-field">
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

function HowItWorks() {
  const steps = [
    {
      icon: Wand2,
      title: '1. Choose a Style',
      desc: 'Select from our 11+ professionally trained hand-drawn styles to find the perfect one for your idea.'
    },
    {
      icon: Edit,
      title: '2. Describe Your Vision',
      desc: 'Describe the scene you want to create in detail. The more specific you are, the more accurate and stunning the AI\'s interpretation will be.'
    },
    {
      icon: Download,
      title: '3. Generate and Download',
      desc: 'Click the "Start Hand Drawing" button, and the AI will create your artwork in about 30 seconds. You can then preview and download the high-resolution result.'
    }
  ];

  return (
    <section className="py-20 bg-gray-900/20">
      <div className="max-w-6xl mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold mb-6">
            <span className="bg-gradient-to-r from-cyan-400 via-blue-400 to-violet-400 bg-clip-text text-transparent">
              Start Your Creative Journey in Three Steps
            </span>
          </h2>
          <p className="text-xl text-gray-400 max-w-3xl mx-auto">
            Turn your ideas into unique hand-drawn art in just a few seconds.
          </p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
          {steps.map((step, index) => (
            <div key={index} className="text-center">
              <div className="w-20 h-20 mx-auto mb-6 rounded-2xl bg-gradient-to-br from-violet-600 to-cyan-500 flex items-center justify-center">
                <step.icon className="w-10 h-10 text-white" />
              </div>
              <h3 className="text-2xl font-bold text-white mb-4">{step.title}</h3>
              <p className="text-gray-400 text-lg leading-relaxed">{step.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function FaqSection() {
  return (
    <section className="py-20">
      <div className="max-w-4xl mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold mb-6">
            <span className="bg-gradient-to-r from-pink-400 via-rose-400 to-orange-400 bg-clip-text text-transparent">
              {t.faq.title}
            </span>
          </h2>
          <p className="text-xl text-gray-400">{t.faq.subtitle}</p>
        </div>
        <div className="space-y-8">
          {t.faq.questions.map((item, index) => (
            <div key={index} className="bg-gray-900/30 backdrop-blur-sm p-6 rounded-2xl border border-gray-800">
              <h3 className="text-xl font-bold text-white mb-4">{item.q}</h3>
              <p className="text-gray-400 leading-relaxed">{item.a}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export default function Home() {
  const [activeTab, setActiveTab] = useState('home');
  const [selectedStyle, setSelectedStyle] = useState('WATERCOLOR');
  const [prompt, setPrompt] = useState('');
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isGenerating, setIsGenerating] = useState(false);
  const [generatedImages, setGeneratedImages] = useState<string[]>([]);
  const [generationError, setGenerationError] = useState<string | null>(null);
  const [imageSize, setImageSize] = useState('1024x1024');
  const [numImages, setNumImages] = useState(1);
  const [quality, setQuality] = useState('standard');
  const [isDownloading, setIsDownloading] = useState(false);

  // Remove language state - app is now English only
  const currentLang = t;
  const styles = useMemo(() => [
    { 
      ...stylesData[0],
      color: 'from-slate-600 via-gray-700 to-black',
      icon: Pen,
      resolution: '2048²',
      formats: ['PNG']
    },
    { 
      ...stylesData[1],
      color: 'from-blue-400 via-purple-500 to-pink-500',
      icon: Droplets,
      resolution: '2048²',
      formats: ['PNG']
    },
    { 
      ...stylesData[2],
      color: 'from-green-400 via-emerald-500 to-teal-600',
      icon: Brush,
      resolution: '2048²',
      formats: ['PNG']
    },
    { 
      ...stylesData[3],
      color: 'from-orange-400 via-red-500 to-yellow-600',
      icon: Palette,
      resolution: '2048²',
      formats: ['PNG', 'TIFF']
    },
    { 
      ...stylesData[4],
      color: 'from-gray-400 via-slate-500 to-zinc-600',
      icon: Edit,
      resolution: '2048²',
      formats: ['PNG']
    },
    { 
      ...stylesData[5],
      color: 'from-purple-400 via-pink-500 to-rose-600',
      icon: Smile,
      resolution: '2048²',
      formats: ['PNG', 'SVG']
    },
    { 
      ...stylesData[6],
      color: 'from-emerald-400 via-green-500 to-teal-600',
      icon: Camera,
      resolution: '2048²',
      formats: ['PNG']
    },
    { 
      ...stylesData[7],
      color: 'from-pink-400 via-red-500 to-orange-600',
      icon: Gamepad2,
      resolution: '64-512px',
      formats: ['PNG', 'GIF']
    },
    { 
      ...stylesData[8],
      color: 'from-amber-600 via-orange-700 to-red-800',
      icon: Scissors,
      resolution: '2048²',
      formats: ['PNG', 'TIFF']
    },
    { 
      ...stylesData[9],
      color: 'from-cyan-300 via-blue-400 to-indigo-500',
      icon: Snowflake,
      resolution: '1920×1080',
      formats: ['JPG']
    }
  ], []);

  const appProps: AppProps = {
    activeTab,
    setActiveTab,
    selectedStyle,
    setSelectedStyle,
    prompt,
    setPrompt,
    isMobileMenuOpen,
    setIsMobileMenuOpen,
    language: 'en',
    setLanguage: () => {},
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

                <div className="mt-12">
                  <button 
                    onClick={() => setActiveTab('generate')}
                    className="bg-gradient-to-r from-violet-600 to-cyan-500 text-white px-12 py-4 rounded-2xl font-bold text-xl hover:shadow-2xl hover:shadow-violet-500/50 transition-all duration-500 transform hover:-translate-y-1 quantum-button"
                  >
                    {currentLang.home.startButton}
                  </button>
                </div>
              </div>
            </section>

            {/* Stats Bar */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8 my-24 max-w-5xl mx-auto">
              <div className="text-center">
                <div className="text-4xl font-bold text-cyan-400 mb-2">11+</div>
                <div className="text-gray-400">{currentLang.home.stats.styles}</div>
              </div>
              <div className="text-center">
                <div className="text-4xl font-bold text-purple-400 mb-2">30s</div>
                <div className="text-gray-400">{currentLang.home.stats.speed}</div>
              </div>
              <div className="text-center">
                <div className="text-4xl font-bold text-pink-400 mb-2">4K</div>
                <div className="text-gray-400">{currentLang.home.stats.export}</div>
              </div>
              <div className="text-center">
                <div className="text-4xl font-bold text-green-400 mb-2">
                  <CheckCircle className="w-10 h-10 inline-block" />
                </div>
                <div className="text-gray-400">{currentLang.home.stats.license}</div>
              </div>
            </div>

            <HomeImageGallery />

            <HowItWorks />
            
            {/* Styles Section */}
            <section className="py-20">
              <div className="max-w-7xl mx-auto px-4">
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

            <FaqSection />
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
                      <div className="space-y-3">
                        <div className="flex items-center space-x-3">
                          <input
                            type="checkbox"
                            id="square-aspect"
                            checked={['1024x1024', '1536x1536'].includes(imageSize)}
                            onChange={(e) => {
                              if (e.target.checked) setImageSize('1024x1024');
                            }}
                            className="w-4 h-4 text-violet-600 bg-gray-800 border-gray-700 rounded focus:ring-violet-500 focus:ring-2"
                          />
                          <label htmlFor="square-aspect" className="text-white text-sm">Square Aspect</label>
                        </div>
                        
                                                 <div className="ml-6 space-y-2">
                           <div className="flex items-center space-x-3">
                             <input
                               type="radio"
                               id="1024x1024"
                               name="square-size"
                               value="1024x1024"
                               checked={imageSize === '1024x1024'}
                               onChange={(e) => setImageSize(e.target.value)}
                               className="w-4 h-4 text-violet-600 bg-gray-800 border-gray-700 focus:ring-violet-500 focus:ring-2"
                             />
                             <label htmlFor="1024x1024" className="text-gray-300 text-sm">1024×1024</label>
                           </div>
                           <div className="flex items-center space-x-3">
                             <input
                               type="radio"
                               id="1536x1536"
                               name="square-size"
                               value="1536x1536"
                               checked={imageSize === '1536x1536'}
                               onChange={(e) => setImageSize(e.target.value)}
                               className="w-4 h-4 text-violet-600 bg-gray-800 border-gray-700 focus:ring-violet-500 focus:ring-2"
                             />
                             <label htmlFor="1536x1536" className="text-gray-300 text-sm">1536×1536</label>
                           </div>
                         </div>

                        <div className="flex items-center space-x-3">
                          <input
                            type="checkbox"
                            id="wide-aspect"
                            checked={['1792x1024', '1344x768', '1216x832'].includes(imageSize)}
                            onChange={(e) => {
                              if (e.target.checked) setImageSize('1792x1024');
                            }}
                            className="w-4 h-4 text-violet-600 bg-gray-800 border-gray-700 rounded focus:ring-violet-500 focus:ring-2"
                          />
                          <label htmlFor="wide-aspect" className="text-white text-sm">Wide Aspect</label>
                        </div>
                        
                                                 <div className="ml-6 space-y-2">
                           <div className="flex items-center space-x-3">
                             <input
                               type="radio"
                               id="1792x1024"
                               name="wide-size"
                               value="1792x1024"
                               checked={imageSize === '1792x1024'}
                               onChange={(e) => setImageSize(e.target.value)}
                               className="w-4 h-4 text-violet-600 bg-gray-800 border-gray-700 focus:ring-violet-500 focus:ring-2"
                             />
                             <label htmlFor="1792x1024" className="text-gray-300 text-sm">1792×1024</label>
                           </div>
                           <div className="flex items-center space-x-3">
                             <input
                               type="radio"
                               id="1344x768"
                               name="wide-size"
                               value="1344x768"
                               checked={imageSize === '1344x768'}
                               onChange={(e) => setImageSize(e.target.value)}
                               className="w-4 h-4 text-violet-600 bg-gray-800 border-gray-700 focus:ring-violet-500 focus:ring-2"
                             />
                             <label htmlFor="1344x768" className="text-gray-300 text-sm">1344×768</label>
                           </div>
                           <div className="flex items-center space-x-3">
                             <input
                               type="radio"
                               id="1216x832"
                               name="wide-size"
                               value="1216x832"
                               checked={imageSize === '1216x832'}
                               onChange={(e) => setImageSize(e.target.value)}
                               className="w-4 h-4 text-violet-600 bg-gray-800 border-gray-700 focus:ring-violet-500 focus:ring-2"
                             />
                             <label htmlFor="1216x832" className="text-gray-300 text-sm">1216×832</label>
                           </div>
                         </div>
                       </div>
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
                    <div className="mt-8">
                      <button
                        onClick={() => handleGenerate(prompt, selectedStyle, imageSize, numImages, quality, setIsGenerating, setGenerationError, setGeneratedImages)}
                        disabled={isGenerating}
                        className="w-full bg-indigo-600 text-white font-bold py-3 px-4 rounded-xl hover:bg-indigo-700 transition-colors duration-300 disabled:bg-gray-500 disabled:cursor-not-allowed flex items-center justify-center"
                      >
                        {isGenerating && <Crown className="animate-spin h-5 w-5 mr-3" />}
                        {isGenerating ? '生成中...' : currentLang.generate.generateButton}
                      </button>

                      {/* Error Display */}
                      {generationError && (
                        <div className="mt-4 p-3 bg-red-900/20 border border-red-700/30 rounded-xl text-red-400 text-sm">
                          <strong>生成失败:</strong> {generationError}
                        </div>
                      )}
                    </div>
                  </div>
                </div>

                {/* Right Column - Preview */}
                <div className="lg:col-span-1">
                  <div className="bg-gray-900/30 backdrop-blur-sm rounded-3xl p-6 border border-gray-800">
                    <h2 className="text-2xl font-bold text-white mb-6">{currentLang.generate.previewTitle}</h2>
                    
                    <div className="space-y-4">
                      {isGenerating ? (
                        <div 
                          className="bg-gray-800/50 rounded-2xl flex items-center justify-center"
                          style={{
                            aspectRatio: imageSize.includes('x') ? 
                              imageSize.split('x').map(Number).join('/') : 
                              '1/1'
                          }}
                        >
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
                              className="w-full object-contain rounded-2xl"
                              style={{
                                aspectRatio: imageSize.includes('x') ? 
                                  imageSize.split('x').map(Number).join('/') : 
                                  '1/1'
                              }}
                              onError={(e) => {
                                console.error(`图片 ${index + 1} 加载失败:`, image);
                                // 显示备用内容
                                e.currentTarget.style.display = 'none';
                                const parent = e.currentTarget.parentElement;
                                if (parent && !parent.querySelector('.error-placeholder')) {
                                  const errorDiv = document.createElement('div');
                                  errorDiv.className = 'error-placeholder w-full bg-gray-800 rounded-2xl flex items-center justify-center';
                                  errorDiv.style.aspectRatio = imageSize.includes('x') ? 
                                    imageSize.split('x').map(Number).join('/') : 
                                    '1/1';
                                  errorDiv.innerHTML = `
                                    <div class="text-center text-gray-400">
                                      <svg class="w-12 h-12 mx-auto mb-2" fill="currentColor" viewBox="0 0 20 20">
                                        <path fill-rule="evenodd" d="M4 3a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V5a2 2 0 00-2-2H4zm12 12H4l4-8 3 6 2-4 3 6z" clip-rule="evenodd"/>
                                      </svg>
                                      <p class="text-sm">图片加载失败</p>
                                      <p class="text-xs mt-1">请重新生成</p>
                                    </div>
                                  `;
                                  parent.insertBefore(errorDiv, parent.firstChild);
                                }
                              }}
                            />
                            <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-2xl flex items-center justify-center">
                              <div className="flex space-x-3">
                                <button 
                                  onClick={async () => {
                                    try {
                                      setIsDownloading(true);
                                      console.log('开始下载图片:', image);
                                      
                                      // 创建代理下载API调用，避免跨域问题
                                      const response = await fetch('/api/download-image', {
                                        method: 'POST',
                                        headers: {
                                          'Content-Type': 'application/json',
                                        },
                                        body: JSON.stringify({
                                          imageUrl: image,
                                          filename: `HandDraw-${selectedStyle}-${index + 1}.jpg`
                                        }),
                                      });

                                      if (!response.ok) {
                                        throw new Error('下载请求失败');
                                      }

                                      // 获取文件blob
                                      const blob = await response.blob();
                                      
                                      // 创建下载链接
                                      const url = window.URL.createObjectURL(blob);
                                      const a = document.createElement('a');
                                      a.style.display = 'none';
                                      a.href = url;
                                      a.download = `HandDraw-${selectedStyle}-${index + 1}.jpg`;
                                      
                                      // 添加到DOM并触发下载
                                      document.body.appendChild(a);
                                      a.click();
                                      
                                      // 清理资源
                                      setTimeout(() => {
                                        window.URL.revokeObjectURL(url);
                                        document.body.removeChild(a);
                                      }, 100);
                                      
                                      console.log('下载完成');
                                    } catch (error) {
                                      console.error('下载失败:', error);
                                      // 回退方案：直接使用图片URL
                                      try {
                                        const a = document.createElement('a');
                                        a.style.display = 'none';
                                        a.href = image;
                                        a.download = `HandDraw-${selectedStyle}-${index + 1}.jpg`;
                                        a.target = '_blank';
                                        document.body.appendChild(a);
                                        a.click();
                                        setTimeout(() => document.body.removeChild(a), 100);
                                      } catch (fallbackError) {
                                        console.error('回退下载也失败:', fallbackError);
                                        alert('下载失败，请右键点击图片选择"保存图片"');
                                      }
                                    } finally {
                                      setIsDownloading(false);
                                    }
                                  }}
                                  disabled={isDownloading}
                                  className="p-2 bg-white/20 rounded-lg hover:bg-white/30 transition-colors disabled:opacity-50"
                                  title="下载PNG"
                                >
                                  {isDownloading ? (
                                    <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                                  ) : (
                                    <Download className="w-5 h-5 text-white" />
                                  )}
                                </button>
                              </div>
                            </div>
                          </div>
                        ))
                      ) : (
                        <div className="aspect-square bg-gray-800/30 rounded-2xl border-2 border-dashed border-gray-600 flex items-center justify-center">
                          <div className="text-center">
                            <ImageIcon className="w-16 h-16 text-gray-500 mx-auto mb-4" />
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
                    <h3 className="text-2xl font-bold text-white mb-2">Free Trial</h3>
                    <div className="text-4xl font-bold text-gray-400 mb-2">$0</div>
                    <p className="text-gray-400">Trial Version</p>
                  </div>
                  <ul className="space-y-4 mb-8">
                    <li className="flex items-center text-gray-300">
                      <CheckCircle className="w-5 h-5 text-green-400 mr-3" />
                      3 generations per day
                    </li>
                    <li className="flex items-center text-gray-300">
                      <CheckCircle className="w-5 h-5 text-green-400 mr-3" />
                      3 basic hand-drawn styles
                    </li>
                    <li className="flex items-center text-gray-300">
                      <CheckCircle className="w-5 h-5 text-green-400 mr-3" />
                      512×512 resolution
                    </li>
                    <li className="flex items-center text-gray-400">
                      <X className="w-5 h-5 text-gray-600 mr-3" />
                      HD resolution export
                    </li>
                  </ul>
                  <button className="w-full py-3 border border-gray-600 text-gray-300 rounded-2xl font-bold hover:border-gray-500 hover:text-white transition-all duration-300">
                    Start Free
                  </button>
                </div>

                {/* Pro Plan */}
                <div className="bg-gray-900/30 backdrop-blur-sm rounded-3xl p-8 border-2 border-violet-500 hover:border-violet-400 transition-all duration-300 relative">
                  <div className="absolute -top-3 left-1/2 transform -translate-x-1/2">
                    <span className="bg-gradient-to-r from-violet-600 to-cyan-500 text-white px-4 py-1 rounded-full text-sm font-bold">
                      Recommended
                    </span>
                  </div>
                  <div className="text-center mb-8">
                    <h3 className="text-2xl font-bold text-white mb-2">Professional</h3>
                    <div className="text-4xl font-bold text-white mb-2">$9.9</div>
                    <p className="text-gray-400">Monthly subscription</p>
                  </div>
                  <ul className="space-y-4 mb-8">
                    <li className="flex items-center text-gray-300">
                      <CheckCircle className="w-5 h-5 text-green-400 mr-3" />
                      500 generations per month
                    </li>
                    <li className="flex items-center text-gray-300">
                      <CheckCircle className="w-5 h-5 text-green-400 mr-3" />
                      10 professional hand-drawn styles
                    </li>
                    <li className="flex items-center text-gray-300">
                      <CheckCircle className="w-5 h-5 text-green-400 mr-3" />
                      Up to 2048×2048 resolution
                    </li>
                    <li className="flex items-center text-gray-300">
                      <CheckCircle className="w-5 h-5 text-green-400 mr-3" />
                      HD resolution export
                    </li>
                  </ul>
                  <button className="w-full py-3 bg-gradient-to-r from-violet-600 to-cyan-500 text-white rounded-2xl font-bold hover:shadow-2xl hover:shadow-violet-500/50 transition-all duration-300">
                    Start Professional Creation
                  </button>
                </div>

                {/* Enterprise Plan */}
                <div className="bg-gray-900/30 backdrop-blur-sm rounded-3xl p-8 border border-gray-800 hover:border-gray-600 transition-all duration-300">
                  <div className="text-center mb-8">
                    <h3 className="text-2xl font-bold text-white mb-2">Enterprise</h3>
                    <div className="text-4xl font-bold text-white mb-2">$199</div>
                    <p className="text-gray-400">Monthly subscription</p>
                  </div>
                  <ul className="space-y-4 mb-8">
                    <li className="flex items-center text-gray-300">
                      <CheckCircle className="w-5 h-5 text-green-400 mr-3" />
                      Unlimited generations
                    </li>
                    <li className="flex items-center text-gray-300">
                      <CheckCircle className="w-5 h-5 text-green-400 mr-3" />
                      All hand-drawn styles + custom
                    </li>
                    <li className="flex items-center text-gray-300">
                      <CheckCircle className="w-5 h-5 text-green-400 mr-3" />
                      4K ultra-high resolution
                    </li>
                    <li className="flex items-center text-gray-300">
                      <CheckCircle className="w-5 h-5 text-green-400 mr-3" />
                      PNG + SVG multi-format
                    </li>
                    <li className="flex items-center text-gray-300">
                      <CheckCircle className="w-5 h-5 text-green-400 mr-3" />
                      API access
                    </li>
                  </ul>
                  <button className="w-full py-3 bg-gradient-to-r from-orange-500 to-red-500 text-white rounded-2xl font-bold hover:shadow-2xl hover:shadow-orange-500/50 transition-all duration-300">
                    Contact Sales
                  </button>
                </div>
              </div>

              <HowItWorks />
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