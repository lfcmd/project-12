'use client'

import { createBrowserClient } from '@supabase/ssr'
import { User } from '@supabase/supabase-js'
import { useState, useRef, useEffect } from 'react'
import ReactDOM from 'react-dom'
import { LogOut, User as UserIcon } from 'lucide-react'
import Image from 'next/image'

interface UserMenuProps {
  user: User
}

function DropdownMenu({ user, onSignOut, isLoading, onClose, buttonRef }: { user: User, onSignOut: () => void, isLoading: boolean, onClose: () => void, buttonRef: React.RefObject<HTMLButtonElement> }) {
  const menuRef = useRef<HTMLDivElement>(null);
  const [position, setPosition] = useState<{ top: number, right: number } | null>(null);

  useEffect(() => {
    if (buttonRef.current) {
      const rect = buttonRef.current.getBoundingClientRect();
      setPosition({
        top: rect.bottom + window.scrollY + 8, // 按钮下方 8px
        right: window.innerWidth - rect.right
      });
    }

    function handleClickOutside(event: MouseEvent) {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        onClose();
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [onClose, buttonRef]);
  
  if (!position) return null;

  return ReactDOM.createPortal(
    <div 
      ref={menuRef} 
      className="fixed w-56 bg-gray-800 border border-gray-700 rounded-lg shadow-2xl z-[9999] text-white"
      style={{ top: `${position.top}px`, right: `${position.right}px` }}
    >
      <div className="p-3 border-b border-gray-700">
        <p className="text-sm font-bold truncate">
          {user.user_metadata?.full_name || user.email || '用户'}
        </p>
        <p className="text-xs text-gray-500 truncate">{user.email}</p>
      </div>
      <button
        onClick={onSignOut}
        disabled={isLoading}
        className="w-full flex items-center gap-2 px-4 py-3 text-left text-sm hover:bg-gray-700 transition-colors disabled:opacity-50"
      >
        <LogOut className="w-4 h-4" />
        {isLoading ? '登出中...' : '登出'}
      </button>
    </div>,
    document.getElementById('portal-root')!
  );
}

export function UserMenu({ user }: UserMenuProps) {
  const [isOpen, setIsOpen] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const [imageError, setImageError] = useState(false)
  const buttonRef = useRef<HTMLButtonElement>(null);

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

  const avatarUrl = user.user_metadata?.avatar_url || user.user_metadata?.picture;
  const showAvatar = avatarUrl && typeof avatarUrl === 'string' && !imageError;

  return (
    <div className="relative">
      <button
        ref={buttonRef}
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center justify-center w-10 h-10 rounded-full bg-gray-800 hover:bg-gray-700 transition-colors"
        title={user.user_metadata?.full_name || user.email}
      >
        {showAvatar ? (
          <Image
            src={avatarUrl}
            alt={user.user_metadata?.full_name || '用户头像'}
            width={32}
            height={32}
            className="rounded-full"
            onError={() => setImageError(true)}
          />
        ) : (
          <UserIcon className="w-5 h-5 text-white" />
        )}
      </button>

      {isOpen && (
        <DropdownMenu user={user} onSignOut={handleSignOut} isLoading={isLoading} onClose={() => setIsOpen(false)} buttonRef={buttonRef} />
      )}
    </div>
  )
} 