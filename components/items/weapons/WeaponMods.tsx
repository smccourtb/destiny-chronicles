import React from 'react'
import { FormattedMod } from '../../../lib/items'
import Image from 'next/image'

type WeaponModsProps = {
  mods: FormattedMod[]
}
const WeaponMods = ({ mods }: WeaponModsProps) => {
  console.log('mods', mods)

  return (
    <section className="flex gap-2 flex-wrap">
      {mods.map((mod) => (
        <button key={mod.hash} className="">
          <Image height={48} width={48} src={mod.icon ?? ''} alt={mod.name} />
        </button>
      ))}
    </section>
  )
}

export default WeaponMods
