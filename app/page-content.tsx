'use client';

import React, { useState, useMemo } from 'react';
import { useRouter } from 'next/navigation';
import { User } from '@supabase/supabase-js';
import { 
  Palette, Wand2, Crown, Users, Zap, Download, Sparkles, PaintBucket, Brush, Image as ImageIcon,
  Star, CheckCircle, Menu, X, ArrowRight, Heart, Share2, Eye, Clock, Layers, Settings, ChevronDown,
  Brain, Cpu, Atom, Waves, Hexagon, Triangle, Circle, Square, Droplets, Flame, Snowflake, Moon,
  Stars, Gamepad2, Scissors, Pen, Paintbrush, Edit, Smile, Camera, Loader2
} from 'lucide-react';
import Image from 'next/image';
import { homeGalleryArtworks } from '@/lib/gallery-data';
import Navigation from '@/components/navigation';

// A simple hashing function to get a deterministic number from a string
function simpleHash(str: string): number {
  let hash = 0;
  for (let i = 0; i < str.length; i++) {
    const char = str.charCodeAt(i);
    hash = (hash << 5) - hash + char;
    hash |= 0; // Convert to 32bit integer
  }
  return Math.abs(hash);
}

interface HomeContentProps {
  user: User | null;
}

const styleIcons = [Palette, Wand2, PaintBucket, Brush, Edit, Smile, Camera, Gamepad2, Snowflake, Stars];

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

const t = {
  brandName: 'HandDraw.AI',
  brandSubtitle: 'Hand-drawn Style Generator',
  nav: { home: 'Home', generate: 'Generate', pricing: 'Pricing', login: 'Login', enterButton: 'Start Creating', faq: 'FAQ', about: 'About Us' },
  home: {
    title1: 'Hand', title2: 'Draw', title3: 'AI',
    subtitle: 'Specialized hand-drawn AI platform. Quickly generate professional hand-drawn artworks.',
    startButton: 'Start Hand Drawing',
    stats: { styles: 'Hand Styles', speed: 'Gen Speed', export: '4K Resolution', license: 'Commercial' },
    stylesTitle: '10+ Professional Hand-drawn Styles',
    galleryTitle: 'Artwork Gallery',
    gallerySubtitle: 'Explore beautiful hand-drawn artworks created by our creator community',
    featuresTitle: 'Built for Creators',
    featuresSubtitle: 'Designed specifically for students, artists, game studios and marketing teams',
    features: [
      { title: '30s Fast Generation', desc: 'No more long waits. Professional hand-drawn artworks completed in 30 seconds for improved productivity' },
      { title: 'Multiple Aspect Ratios', desc: 'Supports square and landscape aspect ratios to fit different social media and design needs.' },
      { title: 'Hand-drawn Training', desc: 'Trained on real hand-drawn artworks to maintain the warmth and texture of manual drawing' },
      { title: 'Commercial License', desc: 'Every generation includes full commercial authorization for business projects without copyright concerns' }
    ]
  },
  generate: {
    title: 'Hand Draw Workshop',
    subtitle: 'Choose your favorite hand-drawn style and let AI create unique artworks for you',
    stylesTitle: 'Hand Styles', inputTitle: 'Creation Description', promptLabel: 'Describe your vision',
    promptPlaceholder: 'An ancient library with sunlight streaming through stained glass windows, a small cat sleeping among books, watercolor style...',
    promptHelp: 'Describe the scene you want to create in words', sizeLabel: 'Image Size', quantityLabel: 'Quantity', qualityLabel: 'Quality',
    quantities: ['1 image', '2 images', '4 images'], qualities: ['Standard', 'High Quality', 'Ultra HD'],
    generateButton: 'Start Hand Drawing', previewTitle: 'Generation Preview', previewText: 'Your hand-drawn artwork will appear here',
    statusSpeed: '~30s generation', statusQueue: 'Fast queue', statusLicense: 'Commercial license'
  },
  pricing: { title: 'Hand Draw Pricing Plans', subtitle: 'Choose the right plan for your professional hand-drawing journey' },
  faq: {
    title: 'Frequently Asked Questions',
    subtitle: 'If you have any other questions, feel free to contact us.',
    questions: [
      { q: 'What is HandDraw.AI?', a: 'HandDraw.AI is a specialized AI generation platform for hand-drawn styles. We use advanced models trained on real hand-drawn artworks to provide artists, designers, and creative enthusiasts with high-quality, uniquely artistic hand-drawn images.' },
      { q: 'Is HandDraw.AI free?', a: 'We offer a free trial plan that allows users to perform a limited number of generations per day. For professional users who need more features and higher usage, we offer affordable Pro and Enterprise plans.' },
      { q: 'How is HandDraw.AI different from other AI art generators?', a: 'Our core distinction lies in our focus on "hand-drawn." Unlike general models that pursue photorealism, our models are specialized in simulating the texture, strokes, and warmth of various hand-drawn styles, such as watercolor, pencil sketch, and Ghibli style.' },
      { q: 'Can I use the generated images for commercial purposes?', a: 'Yes, all images generated through our paid plans (Pro and Enterprise) include a full commercial license, allowing you to use them for personal and commercial projects without copyright concerns.' },
      { q: 'How long does it take to generate an image?', a: 'Our optimized architecture ensures fast generation. On the Pro plan, most images can be completed in about 30 seconds, so your creativity doesn\'t have to wait.' }
    ]
  },
  about: {
    title: 'About Us',
    subtitle: 'Where Artificial Intelligence Meets the Soul of Hand-Drawing',
    missionTitle: 'Our Mission',
    missionText: 'Welcome to HandDraw.AI! Here, advanced artificial intelligence meets the timeless charm of hand-drawn art. Our mission is to break down the barriers of artistic creation, allowing every user—from professional designers to passionate enthusiasts—to bring their imagination to life with the unique texture and warmth of hand-drawn styles. We believe that creativity should not be limited by technical hurdles, and our platform is the bridge between your imagination and exquisite works of art.',
    techTitle: 'Our Technology',
    techText: 'What makes HandDraw.AI different? While many AI tools pursue photorealism, we have chosen a distinctly different path. Our models are meticulously trained on a massive and diverse collection of real hand-drawn masterpieces. This focus allows our AI to understand and replicate the subtleties of different art mediums—be it the delicate rendering of watercolor, the bold strokes of oil paint, the fine lines of a pencil sketch, or the dreamlike aesthetics of Ghibli-style animation. We generate not just an image, but a piece of art with a soul.',
    forCreatorsTitle: 'Born for Every Creator',
    forCreatorsText: 'HandDraw.AI is born for the creator within you. Whether you are an artist seeking to explore new mediums, a designer in need of quick stylized assets, a marketer creating eye-catching campaigns, or simply someone wanting to turn precious memories into unique art, our tool is at your service. We handle the complex technology so you can focus on what truly matters: your creative expression.',
    communityCall: 'Join our community now and start your creative journey. Let\'s draw the future, together.'
  }
};

function HomeImageGallery() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
      {homeGalleryArtworks.map((artwork) => {
        const likes = (simpleHash(artwork.id + 'likes') % 100) + 10;
        const views = (simpleHash(artwork.id + 'views') % 500) + 50;
        return (
          <div key={artwork.id} className="group relative">
            <div className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-violet-900/20 to-cyan-900/20 p-1">
              <div className="relative aspect-square overflow-hidden rounded-xl">
                <Image src={artwork.imageUrl} alt={artwork.title} fill className="object-cover transition-transform duration-700 group-hover:scale-110" sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw" />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                <div className="absolute bottom-4 left-4 right-4 transform translate-y-4 group-hover:translate-y-0 transition-transform duration-300 opacity-0 group-hover:opacity-100">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-2"><Heart className="w-5 h-5 text-red-400" /><span className="text-white text-sm">{likes}</span></div>
                    <div className="flex items-center space-x-2"><Eye className="w-5 h-5 text-cyan-400" /><span className="text-white text-sm">{views}</span></div>
                  </div>
                </div>
              </div>
            </div>
             </div>
        );
      })}
    </div>
  );
}

function HowItWorks() {
  const steps = [
    { icon: Wand2, title: '1. Choose a Style', desc: 'Select from our 10+ professionally trained hand-drawn styles to find the perfect one for your idea.' },
    { icon: Edit, title: '2. Describe Your Vision', desc: 'Describe the scene you want to create in detail. The more specific you are, the more accurate and stunning the AI\'s interpretation will be.' },
    { icon: Download, title: '3. Generate and Download', desc: 'Click the "Start Hand Drawing" button, and the AI will create your artwork in about 30 seconds. You can then preview and download the high-resolution result.' }
  ];
  return (
    <section className="py-20 bg-gray-900/20">
      <div className="max-w-6xl mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold mb-6">
            <span className="bg-gradient-to-r from-cyan-400 via-blue-400 to-violet-400 bg-clip-text text-transparent">Start Your Creative Journey in Three Steps</span>
          </h2>
          <p className="text-xl text-gray-400 max-w-3xl mx-auto">Turn your ideas into unique hand-drawn art in just a few seconds.</p>
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

function FeaturesSection() {
  const features = [
    {
      icon: Wand2,
      title: '30s Fast Generation  30秒快速生成',
      desc: 'No more long waits. Professional hand-drawn artworks completed in 30 seconds for improved productivity\n无需再长时间等待，在 30 秒内完成专业的手绘作品，以提高工作效率',
    },
    {
      icon: Users,
      title: 'Team Collaboration  团队协作',
      desc: 'Invite team members to collaborate on projects and manage artworks together.\n邀请团队成员协作，共同管理和创作手绘作品。',
    },
    {
      icon: Brush,
      title: 'Hand-drawn Training  手绘训练',
      desc: 'Trained on real hand-drawn artworks to maintain the warmth and texture of manual drawing\n从真实的手绘作品中训练，保持手绘的温暖与质感',
    },
    {
      icon: ImageIcon,
      title: 'High-Res Export  高清导出',
      desc: 'Export your hand-drawn artworks in high resolution for professional use.\n支持高清分辨率导出，满足专业设计和印刷需求',
    },
  ];

  return (
    <section id="features-section" className="py-20 bg-black">
      <div className="max-w-6xl mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold mb-6">
            <span className="bg-gradient-to-r from-violet-400 via-purple-400 to-cyan-400 bg-clip-text text-transparent">产品功能亮点 Features</span>
          </h2>
          <p className="text-xl text-gray-400 max-w-3xl mx-auto">专为创作者、设计师和团队打造的高效手绘AI工具</p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {features.map((feature, index) => (
            <div key={index} className="bg-gray-900/50 p-8 rounded-3xl border border-gray-800 text-center transform hover:-translate-y-2 transition-transform duration-300">
              <div className="w-16 h-16 mx-auto mb-6 rounded-2xl bg-gradient-to-br from-gray-700 to-gray-800 flex items-center justify-center">
                <feature.icon className="w-8 h-8 text-cyan-400" />
              </div>
              <h3 className="text-xl font-bold text-white mb-3">{feature.title}</h3>
              <p className="text-gray-400 leading-relaxed whitespace-pre-line">{feature.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function PricingSection() {
  return (
    <section className="py-20 px-4">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold mb-6">
            <span className="bg-gradient-to-r from-pink-400 via-rose-400 to-orange-400 bg-clip-text text-transparent">Hand Draw Pricing Plans</span>
          </h2>
          <p className="text-xl text-gray-400 max-w-3xl mx-auto">Choose the right plan for your professional hand-drawing journey</p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="bg-gray-800/50 border border-gray-700 rounded-2xl p-8">
            <h3 className="text-2xl font-bold mb-4">Free Plan</h3>
            <p className="text-4xl font-bold mb-6">$0<span className="text-lg font-normal text-gray-400">/month</span></p>
            <ul className="space-y-3 mb-8">
              <li className="flex items-center"><CheckCircle className="w-5 h-5 text-green-400 mr-3" /><span>5 generations per day</span></li>
              <li className="flex items-center"><CheckCircle className="w-5 h-5 text-green-400 mr-3" /><span>Standard quality</span></li>
              <li className="flex items-center"><CheckCircle className="w-5 h-5 text-green-400 mr-3" /><span>All hand-drawn styles</span></li>
            </ul>
            <button className="w-full py-3 bg-gray-700 text-white rounded-xl font-semibold hover:bg-gray-600 transition-colors">Start for Free</button>
          </div>
          <div className="bg-gradient-to-br from-violet-600/10 to-cyan-600/10 border border-violet-500 rounded-2xl p-8 relative">
            <div className="absolute -top-4 left-1/2 transform -translate-x-1/2"><span className="bg-gradient-to-r from-violet-600 to-cyan-500 text-white px-4 py-1 rounded-full text-sm font-semibold">Recommended</span></div>
            <h3 className="text-2xl font-bold mb-4">Pro Plan</h3>
            <p className="text-4xl font-bold mb-6">$9<span className="text-lg font-normal text-gray-400">/month</span></p>
            <ul className="space-y-3 mb-8">
              <li className="flex items-center"><CheckCircle className="w-5 h-5 text-green-400 mr-3" /><span>Unlimited generations</span></li>
              <li className="flex items-center"><CheckCircle className="w-5 h-5 text-green-400 mr-3" /><span>No ads</span></li>
              <li className="flex items-center"><CheckCircle className="w-5 h-5 text-green-400 mr-3" /><span>No watermarks</span></li>
              <li className="flex items-center"><CheckCircle className="w-5 h-5 text-green-400 mr-3" /><span>All hand-drawn styles</span></li>
              <li className="flex items-center"><CheckCircle className="w-5 h-5 text-green-400 mr-3" /><span>Priority queue</span></li>
            </ul>
            <button className="w-full py-3 bg-gradient-to-r from-violet-600 to-cyan-500 text-white rounded-xl font-semibold hover:shadow-2xl hover:shadow-violet-500/50 transition-all duration-300">Upgrade to Pro</button>
          </div>
          <div className="bg-gray-800/50 border border-gray-700 rounded-2xl p-8">
            <h3 className="text-2xl font-bold mb-4">Enterprise Plan</h3>
            <p className="text-4xl font-bold mb-6">$29<span className="text-lg font-normal text-gray-400">/month</span></p>
            <ul className="space-y-3 mb-8">
              <li className="flex items-center"><CheckCircle className="w-5 h-5 text-green-400 mr-3" /><span>Unlimited generations</span></li>
              <li className="flex items-center"><CheckCircle className="w-5 h-5 text-green-400 mr-3" /><span>No ads</span></li>
              <li className="flex items-center"><CheckCircle className="w-5 h-5 text-green-400 mr-3" /><span>No watermarks</span></li>
              <li className="flex items-center"><CheckCircle className="w-5 h-5 text-green-400 mr-3" /><span>All hand-drawn styles</span></li>
              <li className="flex items-center"><CheckCircle className="w-5 h-5 text-green-400 mr-3" /><span>Priority queue</span></li>
              <li className="flex items-center"><CheckCircle className="w-5 h-5 text-green-400 mr-3" /><span>Dedicated support</span></li>
              <li className="flex items-center"><CheckCircle className="w-5 h-5 text-green-400 mr-3" /><span>Advanced Refine feature</span></li>
            </ul>
            <button className="w-full py-3 bg-gray-700 text-white rounded-xl font-semibold hover:bg-gray-600 transition-colors">Contact Sales</button>
          </div>
        </div>
      </div>
    </section>
  );
}

function CtaSection({ setActiveTab }: { setActiveTab: (tab: string) => void }) {
  return (
    <section className="py-20 px-4">
      <div className="max-w-4xl mx-auto text-center bg-gradient-to-r from-violet-900/50 to-cyan-900/50 p-12 rounded-3xl border border-violet-500/30 shadow-2xl shadow-violet-500/10">
        <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">Ready to Create?</h2>
        <p className="text-xl text-gray-300 mb-10 max-w-2xl mx-auto">Join thousands of creators and start bringing your ideas to life with unique hand-drawn styles.</p>
        <button
          onClick={() => {
            setActiveTab('generate');
            setTimeout(() => {
              const generateSection = document.getElementById('generate-section');
              if (generateSection) {
                generateSection.scrollIntoView({ behavior: 'smooth' });
              }
            }, 100);
          }}
          className="bg-gradient-to-r from-violet-600 to-cyan-500 text-white px-10 py-4 rounded-2xl font-bold text-xl hover:shadow-2xl hover:shadow-violet-500/50 transition-all duration-500 transform hover:-translate-y-1 quantum-button energy-field"
        >
          Start Hand Drawing Now
        </button>
      </div>
    </section>
  );
}


async function handleGenerate(
  prompt: string, selectedStyle: string, imageSize: string, numImages: number, quality: string,
  setIsGenerating: (generating: boolean) => void,
  setGenerationError: (error: string | null) => void,
  setGeneratedImages: (images: string[]) => void,
  user: User | null
) {
  if (!prompt.trim()) { setGenerationError('Please enter a description'); return; }
  if (!user) { setGenerationError('Please log in to generate images'); return; }

  setIsGenerating(true);
  setGenerationError(null);
  try {
    const response = await fetch('/api/generate', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ prompt: prompt.trim(), style: selectedStyle, imageSize, numImages, quality }),
    });
    if (!response.ok) { const errorData = await response.json(); throw new Error(errorData.error || `HTTP error! status: ${response.status}`); }
    const data = await response.json();
    if (data.success && data.images) {
      const imageUrls = data.images.map((img: any) => typeof img === 'string' ? img : img.url);
      setGeneratedImages(imageUrls);
      setGenerationError(null);
    } else { throw new Error(data.error || 'Generation failed, please try again'); }
  } catch (error) {
    const errorMessage = error instanceof Error ? error.message : 'Generation failed, please check your network connection and try again';
    setGenerationError(errorMessage);
  } finally { setIsGenerating(false); }
}

export default function HomeContent({ user }: HomeContentProps) {
  const router = useRouter();
  const [activeTab, setActiveTab] = useState('home');
  const [selectedStyle, setSelectedStyle] = useState(stylesData[0].code);
  const [prompt, setPrompt] = useState('');
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isGenerating, setIsGenerating] = useState(false);
  const [generatedImages, setGeneratedImages] = useState<string[]>([]);
  const [generationError, setGenerationError] = useState<string | null>(null);
  const [imageSize, setImageSize] = useState('1024x1024');
  const [numImages, setNumImages] = useState(1);
  const [quality, setQuality] = useState('standard');

  const currentLang = t;
  const styles = stylesData;

  const handleStyleSelect = (styleCode: string) => {
    setSelectedStyle(styleCode);
    setGeneratedImages([]);
  };

  const handleStartDrawingClick = () => {
    setActiveTab('generate');
  };

  const renderPage = () => {
    switch (activeTab) {
      case 'home':
        return (
          <>
            <section className="relative py-20 px-4 text-center">
              <div className="max-w-6xl mx-auto">
                <div className="mb-8">
                  <h1 className="text-6xl md:text-8xl font-bold mb-6 leading-tight">
                    <span className="bg-gradient-to-r from-violet-400 via-purple-400 to-cyan-400 bg-clip-text text-transparent">{currentLang.home.title1}</span>
                    <span className="bg-gradient-to-r from-cyan-400 via-blue-400 to-violet-400 bg-clip-text text-transparent">.{currentLang.home.title2}</span>
                    <span className="bg-gradient-to-r from-pink-400 via-rose-400 to-orange-400 bg-clip-text text-transparent">.{currentLang.home.title3}</span>
                  </h1>
                  <p className="text-xl md:text-2xl text-gray-300 mb-8 max-w-4xl mx-auto leading-relaxed">{currentLang.home.subtitle}</p>
                  
                  <div className="max-w-4xl mx-auto text-left mb-8">
                    <div className="space-y-4">
                      <div>
                        <h3 className="text-2xl font-bold mb-6 text-cyan-400 text-center">100% Free · No Login Required · Unlimited Generations</h3>
                        <label className="block text-sm font-medium text-gray-300 mb-2">{currentLang.generate.promptLabel}</label>
                        <textarea 
                          value={prompt} 
                          onChange={(e) => setPrompt(e.target.value)} 
                          placeholder={currentLang.generate.promptPlaceholder} 
                          className="w-full p-4 bg-gray-800 border border-gray-700 rounded-xl text-white placeholder-gray-500 focus:border-cyan-500 focus:outline-none resize-none" 
                          rows={4} 
                        />
                        <p className="text-sm text-gray-500 mt-2">{currentLang.generate.promptHelp}</p>
                      </div>
                    </div>
                  </div>

                  <button 
                    onClick={handleStartDrawingClick} 
                    className="bg-gradient-to-r from-violet-600 to-cyan-500 text-white px-12 py-4 rounded-2xl font-bold text-xl hover:shadow-2xl hover:shadow-violet-500/50 transition-all duration-500 transform hover:-translate-y-1"
                  >
                    {currentLang.home.startButton}
                  </button>
                </div>
              </div>
            </section>
            <section className="py-10 px-4">
              <div className="max-w-6xl mx-auto">
                <div className="text-center mb-16">
                  <h2 className="text-4xl md:text-5xl font-bold mb-6"><span className="bg-gradient-to-r from-cyan-400 via-blue-400 to-violet-400 bg-clip-text text-transparent">{currentLang.home.galleryTitle}</span></h2>
                  <p className="text-xl text-gray-400 max-w-3xl mx-auto">{currentLang.home.gallerySubtitle}</p>
                </div>
                <HomeImageGallery />
              </div>
            </section>

            <FeaturesSection />

            <HowItWorks />

            <PricingSection />

            <CtaSection setActiveTab={setActiveTab} />
          </>
        );
      case 'generate':
        return (
          <div id="generate-section" className="min-h-screen bg-gradient-to-br from-black via-gray-900 to-black text-white py-20">
            <div className="max-w-7xl mx-auto px-4">
              {/* Header */}
              <div className="text-center mb-12">
                <h1 className="text-5xl md:text-6xl font-bold mb-6"><span className="bg-gradient-to-r from-violet-400 via-purple-400 to-cyan-400 bg-clip-text text-transparent">{currentLang.generate.title}</span></h1>
                <p className="text-xl text-gray-400 max-w-3xl mx-auto">{currentLang.generate.subtitle}</p>
              </div>

              {/* Prompt Input Section - Moved to top */}
              <div className="mb-12">
                <h3 className="text-2xl font-bold mb-6 text-cyan-400 text-center">{currentLang.generate.inputTitle}</h3>
                <div className="max-w-4xl mx-auto">
                  <div className="space-y-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-300 mb-2">{currentLang.generate.promptLabel}</label>
                      <textarea value={prompt} onChange={(e) => setPrompt(e.target.value)} placeholder={currentLang.generate.promptPlaceholder} className="w-full p-4 bg-gray-800 border border-gray-700 rounded-xl text-white placeholder-gray-500 focus:border-cyan-500 focus:outline-none resize-none" rows={4} />
                      <p className="text-sm text-gray-500 mt-2">{currentLang.generate.promptHelp}</p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Login Warning */}
              {!user && (<div className="mb-8 p-6 bg-yellow-900/20 border border-yellow-600/30 rounded-2xl"><p className="text-yellow-400 text-center">Please log in to use the generation feature. Click the login button in the top right.</p></div>)}
              
              {/* Two-column layout */}
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
                {/* Left Side - Style Selection */}
                <div className="space-y-8">
                  <div>
                    <h3 className="text-2xl font-bold mb-6 text-cyan-400">{currentLang.generate.stylesTitle}</h3>
                    <div className="grid grid-cols-2 gap-4">
                      {styles.map((style, index) => (
                        <button key={style.code} onClick={() => handleStyleSelect(style.code)} className={`p-4 border rounded-xl cursor-pointer transition-all duration-300 ${selectedStyle === style.code ? 'border-cyan-500 bg-cyan-900/20 shadow-2xl shadow-cyan-500/20' : 'border-gray-700 bg-gray-800/50 hover:border-cyan-600'}`}>
                          <div className="flex items-center space-x-4">
                            <div className={`w-12 h-12 rounded-lg flex items-center justify-center bg-gradient-to-br ${selectedStyle === style.code ? 'from-cyan-500 to-blue-500' : 'from-gray-700 to-gray-800'}`}>
                              {React.createElement(styleIcons[index % styleIcons.length], { className: `w-6 h-6 text-white` })}
                            </div>
                            <div>
                              <p className="text-white font-semibold text-lg">{style.name}</p>
                              <p className="text-gray-400 text-sm">{style.desc}</p>
                            </div>
                          </div>
                        </button>
                      ))}
                    </div>
                  </div>
                </div>
                
                {/* Right Side - Preview & Generate Button */}
                <div>
                  <h3 className="text-2xl font-bold mb-6 text-cyan-400">{currentLang.generate.previewTitle}</h3>
                  <div className="bg-gray-800 rounded-xl p-8 min-h-[36rem] flex items-center justify-center mb-6">
                    {generatedImages.length > 0 ? (
                      <div className="grid grid-cols-1 gap-4">
                        {generatedImages.map((imageUrl, index) => (
                          <div key={index} className="relative group">
                            <Image src={imageUrl} alt={`Generated image ${index + 1}`} width={512} height={512} className="rounded-lg" />
                            <div className="absolute inset-0 bg-black/50 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                              <a
                                href={`/api/download-image?url=${encodeURIComponent(imageUrl)}`}
                                download
                                className="flex items-center gap-2 bg-white/20 backdrop-blur-sm text-white px-4 py-2 rounded-lg hover:bg-white/30 transition-colors"
                              >
                                <Download className="w-5 h-5" />
                                <span>Download</span>
                              </a>
                            </div>
                          </div>
                        ))}
                      </div>
                    ) : (
                      <div className="flex flex-col items-center justify-center h-full text-gray-500">
                        <ImageIcon className="w-16 h-16 text-gray-600 mx-auto mb-4" /><p className="text-gray-400">{currentLang.generate.previewText}</p>
                      </div>
                    )}
                  </div>

                  <div className="mt-8">
                    <button onClick={() => handleGenerate(prompt, selectedStyle, imageSize, numImages, quality, setIsGenerating, setGenerationError, setGeneratedImages, user)} disabled={isGenerating || !user} className={`w-full flex items-center justify-center py-4 rounded-xl font-bold text-lg transition-all duration-300 ${isGenerating || !user ? 'bg-gray-700 text-gray-500 cursor-not-allowed' : 'bg-gradient-to-r from-violet-600 to-cyan-500 text-white hover:shadow-2xl hover:shadow-violet-500/50 transform hover:-translate-y-1'}`}>
                      {isGenerating && <Loader2 className="animate-spin mr-2" />}
                      {isGenerating ? 'Generating...' : currentLang.generate.generateButton}
                    </button>
                    {!user && <p className="text-center text-sm text-yellow-400 mt-2">Please log in to generate images.</p>}
                  </div>
                  
                  {generationError && (<div className="mt-4 p-4 bg-red-900/20 border border-red-600/30 rounded-xl"><p className="text-red-400">{generationError}</p></div>)}
                </div>
              </div>
            </div>
          </div>
        );
      case 'pricing':
        return <PricingSection />;
      default: return null;
    }
  };

  return (
    <div className="min-h-screen bg-black text-white">
      <Navigation
        currentLang={currentLang}
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        isMobileMenuOpen={isMobileMenuOpen}
        setIsMobileMenuOpen={setIsMobileMenuOpen}
      />
      {renderPage()}
    </div>
  );
} 