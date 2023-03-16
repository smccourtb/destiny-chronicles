import React from 'react'
import { getEmblemBackground } from '../lib/character'
import Image from 'next/image'
import { SignInButton } from './buttons/SignInButton'
import Link from 'next/link'

type NavbarProps = {
  emblemHash: string
  characterDisplayName: string
  seasonIcon: string
  seasonNumber: number
  lightLevel: number
  guardianRank: number
}

export async function Navbar({
  emblemHash,
  characterDisplayName,
  seasonIcon,
  seasonNumber,
  lightLevel,
  guardianRank,
}: NavbarProps) {
  const { data } = await getEmblemBackground(emblemHash)
  const navBarTitles = ['Clan', 'Collections', 'Journey', 'Character', 'Inventory']
  const style = {
    '--imageUrl': `url(https://www.bungie.net${data?.secondarySpecial})`,
  } as React.CSSProperties
  return (
    <header style={style} className="h-28 bg-[image:var(--imageUrl)] bg-cover w-screen flex justify-between">
      <div className="flex gap-2 relative top-4 left-10 z-10">
        <Image
          src={`https://www.bungie.net${data?.secondaryOverlay}`}
          width={100}
          height={100}
          alt={'Guardians Emblem Icon'}
        />
        <div className="text-white flex flex-col">
          <p className="ml-2 text-6xl font-bold tracking-wider">{characterDisplayName}</p>
          <p className="flex items-end ml-2 text-xl tracking-widest opacity-90 align-bottom drop-shadow-lg">
            {'//'}
            <Image
              src={`https://www.bungie.net${seasonIcon}`}
              width={16}
              height={16}
              alt={'Season Icon'}
              className="self-start pt-1"
            />
            {`SEASON ${seasonNumber} RANK ${guardianRank} `}
            {`/`}
            <Image src={'/icons/power.svg'} height={10} width={10} alt="Power icon" className="self-start pt-1 mx-1" />
            {lightLevel}
          </p>
        </div>
      </div>
      <>
        <nav className="text-white group flex gap-10 items-center ml-72">
          {navBarTitles.map((title) => (
            <Link key="title" href={'/'} className={'uppercase text-2xl tracking-wider hover-underline-animation'}>
              {title}
            </Link>
          ))}
        </nav>
        <SignInButton isSignedIn={true} />
      </>
    </header>
  )
}
