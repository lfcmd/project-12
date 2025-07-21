'use client'

import { createBrowserClient } from '@supabase/ssr'
import { User } from '@supabase/supabase-js'
import { useState } from 'react'
import { LogOut, User as UserIcon } from 'lucide-react'

interface UserMenuProps {
  user: User
}

export function UserMenu({ user }: UserMenuProps) {
  const [isOpen, setIsOpen] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  
  const supabase = createBrowserClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
  )

  const handleSignOut = async () => {
    setIsLoading(true)
    try {
      await fetch('/api/auth/signout', {
        method: 'POST',
      })
      window.location.reload()
    } catch (error) {
      console.error('登出失败:', error)
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="relative">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center justify-center w-10 h-10 rounded-full bg-gray-800 hover:bg-gray-700 transition-colors"
        title={user.user_metadata?.full_name || user.email}
      >
        {user.user_metadata?.avatar_url ? (
          <img
            src={user.user_metadata.avatar_url}
            alt="用户头像"
            className="w-8 h-8 rounded-full"
          />
        ) : (
          <UserIcon className="w-5 h-5 text-white" />
        )}
      </button>

      {isOpen && (
        <div className="absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-lg border border-gray-200 z-50">
          <div className="p-3 border-b border-gray-200">
            <p className="text-sm font-medium text-gray-900">
              {user.user_metadata?.full_name || '用户'}
            </p>
            <p className="text-xs text-gray-500">{user.email}</p>
          </div>
          <button
            onClick={handleSignOut}
            disabled={isLoading}
            className="w-full flex items-center gap-2 px-3 py-2 text-left text-sm text-gray-700 hover:bg-gray-50 transition-colors disabled:opacity-50"
          >
            <LogOut className="w-4 h-4" />
            {isLoading ? '登出中...' : '登出'}
          </button>
        </div>
      )}
    </div>
  )
} 