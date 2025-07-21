import { createServerSupabaseClient } from '@/lib/supabase'
import { AuthButton } from '@/components/auth/auth-button'
import { Suspense } from 'react'
import HomeContent from './page-content'

export default async function Home() {
  const supabase = createServerSupabaseClient()
  
  const {
    data: { user },
  } = await supabase.auth.getUser()

  return (
    <div className="min-h-screen bg-black text-white">
      <HomeContent user={user} />
    </div>
  )
} 