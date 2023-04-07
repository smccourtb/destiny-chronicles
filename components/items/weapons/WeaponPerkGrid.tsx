import React from 'react'
import { FormattedPerk } from '../../../lib/items'
import PerkColumn from './PerkColumn'

type WeaponPerkGridProps = {
  perks: FormattedPerk[][]
}
const WeaponPerkGrid = ({ perks }: WeaponPerkGridProps) => {
  const perkGrid = perks.map((perkColumn) => {
    return <PerkColumn key={perkColumn[0].hash} perks={perkColumn} />
  })
  return <section className="flex gap-8 items-start justify-center flex-grow">{perkGrid}</section>
}

export default WeaponPerkGrid
