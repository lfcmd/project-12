'use client'

import { useEffect, useState } from 'react'
import { createBrowserClient } from '@supabase/ssr'
import { User } from '@supabase/supabase-js'

import { GoogleSignIn } from './google-signin'
import { UserMenu } from './user-menu'

export function AuthButton() {
  const [user, setUser] = useState<User | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const supabase = createBrowserClient(
      process.env.NEXT_PUBLIC_SUPABASE_URL!,
      process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
    )

    const getSession = async () => {
      const { data: { session } } = await supabase.auth.getSession()
      setUser(session?.user ?? null)
      setLoading(false)
    }

    getSession()

    const { data: authListener } = supabase.auth.onAuthStateChange(
      (_event, session) => {
        setUser(session?.user ?? null)
        setLoading(false)
      }
    )

    return () => {
      authListener.subscription.unsubscribe()
    }
  }, [])

  if (loading) {
    return <div className="w-64 h-10 bg-gray-800 animate-pulse rounded-lg" />
  }
  
  return user ? (
    <UserMenu user={user} />
  ) : (
    <GoogleSignIn />
  )
} 