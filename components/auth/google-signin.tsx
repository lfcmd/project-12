'use client'

import { createBrowserClient } from '@supabase/ssr'
import { useState } from 'react'

export function GoogleSignIn() {
  const [isLoading, setIsLoading] = useState(false)
  
  const supabase = createBrowserClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
  )

  const handleGoogleSignIn = async () => {
    console.log('Attempting Google Sign-In...');
    setIsLoading(true)
    try {
      const { data, error } = await supabase.auth.signInWithOAuth({
        provider: 'google',
        options: {
          redirectTo: `${location.origin}/api/auth/callback`,
          queryParams: {
            prompt: 'select_account', // 强制弹出 Google 账户选择界面
          }
        },
      })
      
      console.log('Supabase OAuth response:', { data, error });

      if (error) {
        console.error('Google Sign-In Error from Supabase:', error);
        alert(`登录时出错: ${error.message}`);
      } else if (data.url) {
        // 手动重定向到 Google 登录页面
        console.log('Redirecting manually to:', data.url);
        window.location.href = data.url;
      } else {
        console.error('No URL returned from Supabase for OAuth.');
        alert('无法获取登录页面，请稍后重试。');
      }
    } catch (error) {
      console.error('Failed to initiate Google Sign-In:', error)
      if (error instanceof Error) {
        alert(`登录失败: ${error.message}`);
      }
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <button
      onClick={handleGoogleSignIn}
      disabled={isLoading}
      className="flex items-center justify-center p-2 bg-white text-gray-700 border border-gray-300 rounded-full hover:bg-gray-100 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
      title="使用 Google 登录"
    >
      <svg className="w-5 h-5" viewBox="0 0 24 24">
        <path
          fill="#4285F4"
          d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
        />
        <path
          fill="#34A853"
          d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
        />
        <path
          fill="#FBBC05"
          d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
        />
        <path
          fill="#EA4335"
          d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
        />
      </svg>
    </button>
  )
} 