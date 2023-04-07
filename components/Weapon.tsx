'use client'
import useWeapon from '../hooks/use-weapon'
import Image from 'next/image'
import { applyBungieDomain } from '../utils/url-handling'
import WeaponPerkGrid from './items/weapons/WeaponPerkGrid'
import WeaponStats from './items/weapons/WeaponStats'

type WeaponProps = {
  hash: string | number
}

const Weapon = ({ hash }: WeaponProps) => {
  const { data, error } = useWeapon(hash)
  if (!data || error) {
    // TODO: implement routing logic/error handling
    return null
  }
  const { displayProperties, perks, stats } = data
  console.log('weapon data in weapon component: ', data)

  return (
    <main className="grid grid-cols-12">
      <div className="col-span-4 flex flex-col gap-2">
        <h1 className="2">{displayProperties.name}</h1>
        <Image
          src={applyBungieDomain(displayProperties.icon)}
          width={48}
          height={48}
          priority
          alt={`${displayProperties.name}`}
        />
        <WeaponStats stats={stats} />
      </div>
      <div className="col-span-8 row-auto col-start-5">
        <WeaponPerkGrid perks={perks} />
      </div>
    </main>
  )
}

export default Weapon
