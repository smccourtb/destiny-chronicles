'use client'
import useWeapon from '../hooks/use-weapon'
import Image from 'next/image'
import { applyBungieDomain } from '../utils/url-handling'
import { randomUUID } from 'crypto'
import { log } from 'util'

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

  const perkGrid = perks.map((perk) => {
    console.log('perks  ', perk)
    return (
      <div className="flex flex-col gap-4 w-fit">
        {perk.map((perk) => {
          return (
            <button className="inline-block active:bg-[#5691bb] rounded-full border border-[#707070] p-1">
              <Image
                src={applyBungieDomain(perk.displayProperties.icon)}
                width={48}
                height={48}
                alt={`${perk.displayProperties.name}`}
              />
            </button>
          )
        })}
      </div>
    )
  })

  return (
    <>
      <h1>{displayProperties.name}</h1>
      <Image src={applyBungieDomain(displayProperties.icon)} width={48} height={48} alt={`${displayProperties.name}`} />
      <section className="grid grid-cols-6 gap-8 w-fit">{perkGrid}</section>
    </>
  )
}

export default Weapon
