import React from 'react'
import { FormattedPerks } from '../../../lib/items'
import PerkColumn from './PerkColumn'

type WeaponPerkGridProps = {
  perks: FormattedPerks[][]
}
const WeaponPerkGrid = ({ perks }: WeaponPerkGridProps) => {
  const perkGrid = perks.map((perkColumn) => {
    return <PerkColumn key={perkColumn[0].hash} perks={perkColumn} />
  })
  return <section className="grid grid-cols-6 gap-8 w-fit">{perkGrid}</section>
}

export default WeaponPerkGrid
