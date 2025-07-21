'use client';

import React, { useState, Suspense } from 'react';
import { useSearchParams } from 'next/navigation';
import { User } from '@supabase/supabase-js';
import { 
  Palette, Wand2, Download, Image as ImageIcon, Brush
} from 'lucide-react';
import Image from 'next/image';
import { createBrowserClient } from '@supabase/ssr';
import { AuthButton } from '@/components/auth/auth-button';

const styleIcons = [Palette, Wand2, Brush, Wand2, Palette, Brush, Wand2, Palette, Brush, Wand2];

const stylesData = [
  { code: 'LINEART', name: 'Line Art', desc: 'Black & white line art' },
  { code: 'WATERCOLOR', name: 'Watercolor', desc: 'Light watercolor' },
  { code: 'GHIBLI', name: 'Ghibli Style', desc: 'Anime dreamy palette' },
  { code: 'OILPAINT', name: 'Oil Paint', desc: 'Oil paint strokes' },
  { code: 'SKETCH', name: 'Pencil Sketch', desc: 'Pencil sketch texture' },
  { code: 'CARTOON', name: 'Cartoon Flat', desc: 'Modern vector style' },
  { code: 'REALISTIC', name: 'Realistic Art', desc: 'Hand-drawn realism' },
  { code: 'PIXEL', name: 'Pixel Art', desc: 'Retro pixel grid' },
  { code: 'SNOWTEXT', name: 'Snow Text', desc: 'Winter marketing text' },
  { code: 'SANDTEXT', name: 'Sand Text', desc: 'Summer marketing text' }
];

async function handleGenerate(
  prompt: string, selectedStyle: string,
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
      body: JSON.stringify({ prompt: prompt.trim(), style: selectedStyle }),
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

function GeneratePageContent() {
    const supabase = createBrowserClient(
      process.env.NEXT_PUBLIC_SUPABASE_URL!,
      process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
    );
    const [user, setUser] = useState<User | null>(null);
    const searchParams = useSearchParams();
    const initialPrompt = searchParams.get('prompt') || '';

    const [selectedStyle, setSelectedStyle] = useState('WATERCOLOR');
    const [prompt, setPrompt] = useState(initialPrompt);
    const [isGenerating, setIsGenerating] = useState(false);
    const [generatedImages, setGeneratedImages] = useState<string[]>([]);
    const [generationError, setGenerationError] = useState<string | null>(null);

    React.useEffect(() => {
        const getUser = async () => {
            const { data: { user } } = await supabase.auth.getUser();
            setUser(user);
        };
        getUser();
    }, [supabase.auth]);

    return (
        <div className="min-h-screen bg-gradient-to-br from-black via-gray-900 to-black text-white py-8">
            <div className="fixed top-4 right-4 z-50">
              <Suspense fallback={<div className="w-64 h-10 bg-gray-800 animate-pulse rounded-lg" />}>
                <AuthButton />
              </Suspense>
            </div>
            <div className="max-w-7xl mx-auto px-4">
              <div className="text-center mb-12">
                <h1 className="text-5xl md:text-6xl font-bold mb-6"><span className="bg-gradient-to-r from-violet-400 via-purple-400 to-cyan-400 bg-clip-text text-transparent">Hand Draw Workshop</span></h1>
                <p className="text-xl text-gray-400 max-w-3xl mx-auto">Choose your favorite hand-drawn style and let AI create unique artworks for you</p>
              </div>

              <div className="mb-12">
                <h3 className="text-2xl font-bold mb-6 text-cyan-400 text-center">Creation Description</h3>
                <div className="max-w-4xl mx-auto">
                  <div className="space-y-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-300 mb-2">Describe your vision</label>
                      <textarea value={prompt} onChange={(e) => setPrompt(e.target.value)} placeholder="An ancient library with sunlight streaming through stained glass windows..." className="w-full p-4 bg-gray-800 border border-gray-700 rounded-xl text-white placeholder-gray-500 focus:border-cyan-500 focus:outline-none resize-none" rows={4} />
                      <p className="text-sm text-gray-500 mt-2">Describe the scene you want to create in words</p>
                    </div>
                  </div>
                </div>
              </div>

              {!user && (<div className="mb-8 p-6 bg-yellow-900/20 border border-yellow-600/30 rounded-2xl"><p className="text-yellow-400 text-center">Please log in to use the generation feature.</p></div>)}
              
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
                <div className="space-y-8">
                  <div>
                    <h3 className="text-2xl font-bold mb-6 text-cyan-400">Hand Styles</h3>
                    <div className="grid grid-cols-2 gap-4">
                      {stylesData.map((style, index) => (
                        <button key={style.code} onClick={() => setSelectedStyle(style.code)} className={`p-4 rounded-xl border-2 transition-all duration-300 text-left ${selectedStyle === style.code ? 'border-cyan-500 bg-cyan-500/10' : 'border-gray-700 hover:border-gray-600'}`}>
                          <div className="flex items-center mb-2">{React.createElement(styleIcons[index % styleIcons.length], { className: `w-5 h-5 ${selectedStyle === style.code ? 'text-cyan-400' : 'text-gray-400'}` })}<span className="ml-2 font-semibold text-white">{style.name}</span></div>
                          <p className="text-sm text-gray-400">{style.desc}</p>
                        </button>
                      ))}
                    </div>
                  </div>
                </div>
                
                <div>
                  <h3 className="text-2xl font-bold mb-6 text-cyan-400">Generation Preview</h3>
                  <div className="bg-gray-800 rounded-xl p-8 min-h-[36rem] flex items-center justify-center mb-6">
                    {generatedImages.length > 0 ? (
                      <div className="grid grid-cols-1 gap-4">
                        {generatedImages.map((imageUrl, index) => (
                          <div key={index} className="relative">
                            <Image src={imageUrl} alt={`Generated image ${index + 1}`} width={512} height={512} className="rounded-xl" />
                            <button onClick={() => { const link = document.createElement('a'); link.href = imageUrl; link.download = `handdraw-${Date.now()}-${index + 1}.png`; link.click(); }} className="absolute top-2 right-2 bg-black/50 hover:bg-black/70 text-white p-2 rounded-lg transition-colors"><Download className="w-5 h-5" /></button>
                          </div>
                        ))}
                      </div>
                    ) : (<div className="text-center"><ImageIcon className="w-16 h-16 text-gray-600 mx-auto mb-4" /><p className="text-gray-400">Your hand-drawn artwork will appear here</p></div>)}
                  </div>

                  <button onClick={() => handleGenerate(prompt, selectedStyle, setIsGenerating, setGenerationError, setGeneratedImages, user)} disabled={isGenerating || !user} className={`w-full py-4 rounded-xl font-bold text-lg transition-all duration-300 ${isGenerating || !user ? 'bg-gray-700 text-gray-500 cursor-not-allowed' : 'bg-gradient-to-r from-violet-600 to-cyan-500 text-white hover:shadow-2xl hover:shadow-violet-500/50 transform hover:-translate-y-1'}`}>{isGenerating ? 'Generating...' : 'Start Hand Drawing'}</button>
                  
                  {generationError && (<div className="mt-4 p-4 bg-red-900/20 border border-red-600/30 rounded-xl"><p className="text-red-400">{generationError}</p></div>)}
                </div>
              </div>
            </div>
        </div>
    );
}

export default function DebugPage() {
  return (
    <Suspense fallback={<div className="min-h-screen bg-black flex items-center justify-center text-white">Loading...</div>}>
      <GeneratePageContent />
    </Suspense>
  );
} 