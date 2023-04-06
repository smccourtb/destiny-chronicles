'use client'
import useWeapon from '../hooks/use-weapon'
import Image from 'next/image'
import { applyBungieDomain } from '../utils/url-handling'
import WeaponPerkGrid from './items/weapons/WeaponPerkGrid'

type WeaponProps = {
  hash: string | number
}

const Weapon = ({ hash }: WeaponProps) => {
  const { data, error } = useWeapon(hash)
  if (!data || error) {
    // TODO: implement routing logic
    return null
  }
  const { displayProperties, perks } = data
  console.log('weapon data in weapon component: ', data)

  return (
    <>
      <h1>{displayProperties.name}</h1>
      <Image src={applyBungieDomain(displayProperties.icon)} width={48} height={48} alt={`${displayProperties.name}`} />
      <WeaponPerkGrid perks={perks} />
    </>
  )
}

export default Weapon
