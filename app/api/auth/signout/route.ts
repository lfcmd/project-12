import { createServerSupabaseClient } from '@/lib/supabase'
import { NextResponse } from 'next/server'

export async function POST() {
  const supabase = createServerSupabaseClient()
  await supabase.auth.signOut()
  
  return NextResponse.json({ success: true })
} 