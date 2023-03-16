import React from 'react'
import '../styles/globals.css'
import { setDebug } from '../logger/logger'
import Link from 'next/link'
import { SignInButton } from '../components/buttons/SignInButton'
import { authOptions } from '../pages/api/auth/[...nextauth]'
import { getServerSession } from 'next-auth/next'

setDebug(true, { log: false, error: true, info: true, debug: false })

export default async function RootLayout({ children }: { children: React.ReactNode }) {
  const session = await getServerSession(authOptions)
  const navBarTitles = ['Character', 'News']
  return (
    <html lang="en">
      <body className={`bg-background-dark text-white`}>
        <header className="flex w-screen">
          <nav className="justify-end w-full text-white group flex gap-10 items-center mr-10">
            {navBarTitles.map((title) => (
              <Link
                key={title}
                href={`/${title.toLowerCase()}`}
                className={'uppercase tracking-wider hover-underline-animation font-display font-[400]'}
              >
                {title}
              </Link>
            ))}
          </nav>
          <SignInButton isSignedIn={!!session} />
        </header>
        {children}
      </body>
    </html>
  )
}
