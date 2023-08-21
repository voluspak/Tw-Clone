'use client'

import { createClientComponentClient } from '@supabase/auth-helpers-nextjs'
import { GithubIcon } from './Icons'
import { useRouter } from 'next/navigation'
export function AuthButton ({ session }: { session: Session | null }) {
  const supabase = createClientComponentClient()
  const route = useRouter()

  const handleSignIn = async () => {
    await supabase.auth.signInWithOAuth({
      provider: 'github',
      options: {
        redirectTo: 'http://localhost:3000/auth/callback'
      }
    })
  }

  const handleSignOut = async () => {
    await supabase.auth.signOut()
    route.refresh()
  }

  return (
    <header>
      {
        session === null
          ? (
          <button onClick={handleSignIn} type="button" className="text-white bg-[#24292F] hover:bg-[#24292F]/90 focus:ring-4 focus:outline-none focus:ring-[#24292F]/50 font-medium rounded-lg text-sm px-5 py-2.5 text-center inline-flex items-center mr-2 mb-2">
            <GithubIcon />
            Iniciar sesión con Github
          </button>

            )
          : <button onClick={handleSignOut} >Sing Out</button>
      }
    </header>
  )
}
