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
import { t } from '@/lib/i18n';

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