'use client';

import React from 'react';
import { Brush, Menu, X } from 'lucide-react';
import Link from 'next/link';
import { AuthButton } from '@/components/auth/auth-button';
import { Suspense } from 'react';

interface NavigationProps {
  currentLang: {
    brandName: string;
    brandSubtitle: string;
    nav: {
      home: string;
      generate: string;
      pricing: string;
      faq: string;
      about: string;
      enterButton: string;
    };
  };
  activeTab?: string;
  setActiveTab?: (tab: string) => void;
  isMobileMenuOpen?: boolean;
  setIsMobileMenuOpen?: (open: boolean) => void;
  isStaticPage?: boolean;
}

export default function Navigation({ currentLang, activeTab, setActiveTab, isMobileMenuOpen, setIsMobileMenuOpen, isStaticPage = false }: NavigationProps) {
  const handleNavClick = (tab: string) => {
    if (setActiveTab) {
      setActiveTab(tab);
    }
  };

  const handleMobileNavClick = (tab: string) => {
    if (setActiveTab && setIsMobileMenuOpen) {
      setActiveTab(tab);
      setIsMobileMenuOpen(false);
    }
  };

  const navLinks = [
    { key: 'home', label: currentLang.nav.home, href: '/' },
    { key: 'features', label: 'Features', href: '/#features-section' },
    { key: 'generate', label: currentLang.nav.generate, href: '/?tab=generate' },
    { key: 'pricing', label: currentLang.nav.pricing, href: '/?tab=pricing' },
    { key: 'faq', label: currentLang.nav.faq, href: '/faq' },
    { key: 'about', label: currentLang.nav.about, href: '/about' }
  ];

  function handleFeaturesClick() {
    if (typeof window !== 'undefined') {
      const section = document.getElementById('features-section');
      if (section) {
        section.scrollIntoView({ behavior: 'smooth' });
      } else {
        window.location.href = '/#features-section';
      }
    }
  }

  return (
    <nav className="bg-black/95 backdrop-blur-xl border-b border-violet-500/20 sticky top-0 z-50 neural-connections">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-20">
          <div className="flex items-center space-x-4">
            <div className="relative energy-field">
              <div className="w-12 h-12 bg-gradient-to-br from-violet-600 via-purple-600 to-cyan-500 rounded-2xl flex items-center justify-center shadow-2xl animate-pulse-glow"><Brush className="w-7 h-7 text-white animate-neural-pulse" /></div>
              <div className="absolute -top-1 -right-1 w-4 h-4 bg-gradient-to-r from-pink-500 to-rose-500 rounded-full animate-quantum-ripple"></div>
            </div>
            <div>
              <span className="text-3xl font-bold bg-gradient-to-r from-violet-400 via-purple-400 to-cyan-400 bg-clip-text text-transparent">{currentLang.brandName}</span>
              <div className="text-xs text-cyan-400 font-medium tracking-wider">{currentLang.brandSubtitle}</div>
            </div>
          </div>
          <div className="hidden md:flex space-x-8">
            {navLinks.map((item) => (
              isStaticPage ? (
                <Link key={item.key} href={item.href} className={`px-6 py-3 rounded-2xl font-bold transition-all duration-500 text-lg quantum-button text-gray-400 hover:text-cyan-400 hover:bg-violet-900/20`}>
                  {item.label}
                </Link>
              ) : item.key === 'features' ? (
                <button key={item.key} onClick={handleFeaturesClick} className={`px-6 py-3 rounded-2xl font-bold transition-all duration-500 text-lg quantum-button text-gray-400 hover:text-cyan-400 hover:bg-violet-900/20`}>{item.label}</button>
              ) : (
                <button key={item.key} onClick={() => handleNavClick(item.key)} className={`px-6 py-3 rounded-2xl font-bold transition-all duration-500 text-lg quantum-button ${activeTab === item.key ? 'bg-gradient-to-r from-violet-600 to-cyan-500 text-white shadow-2xl shadow-violet-500/50 energy-field' : 'text-gray-400 hover:text-cyan-400 hover:bg-violet-900/20'}`}>{item.label}</button>
              )
            ))}
          </div>
          <div className="flex items-center space-x-6">
            <Suspense fallback={<div className="w-32 h-10 bg-gray-800 animate-pulse rounded-lg" />}>
              <AuthButton />
            </Suspense>
            {setIsMobileMenuOpen && (
              <button onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)} className="md:hidden p-3 text-gray-400 hover:text-cyan-400 transition-colors">
                {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
              </button>
            )}
          </div>
        </div>
        {isMobileMenuOpen && (
          <div className="md:hidden py-6 border-t border-violet-500/20">
            <div className="space-y-4">
              {navLinks.map((item) => (
                isStaticPage ? (
                  <Link key={item.key} href={item.href} className={`block w-full text-left px-6 py-3 rounded-2xl font-bold transition-all duration-500 quantum-button text-gray-400 hover:text-cyan-400 hover:bg-violet-900/20`}>
                    {item.label}
                  </Link>
                ) : item.key === 'features' ? (
                  <button key={item.key} onClick={handleFeaturesClick} className={`block w-full text-left px-6 py-3 rounded-2xl font-bold transition-all duration-500 quantum-button text-gray-400 hover:text-cyan-400 hover:bg-violet-900/20`}>{item.label}</button>
                ) : (
                  <button key={item.key} onClick={() => handleMobileNavClick(item.key)} className={`block w-full text-left px-6 py-3 rounded-2xl font-bold transition-all duration-500 quantum-button ${activeTab === item.key ? 'bg-gradient-to-r from-violet-600 to-cyan-500 text-white' : 'text-gray-400 hover:text-cyan-400 hover:bg-violet-900/20'}`}>{item.label}</button>
                )
              ))}
            </div>
          </div>
        )}
      </div>
    </nav>
  );
} 