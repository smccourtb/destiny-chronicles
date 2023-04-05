import React from 'react'
import Image from 'next/image'
import { applyBungieDomain } from '../../../utils/url-handling'
import { FormattedPerks } from '../../../lib/items'
import { Tooltip, TooltipContent, TooltipTrigger } from '../../Tooltip'
import PerkTooltip from '../../PerkTooltip'

type WeaponPerkGridProps = {
  perks: FormattedPerks[][]
}
const WeaponPerkGrid = ({ perks }: WeaponPerkGridProps) => {
  const perkGrid = perks.map((perkColumn) => {
    return (
      <div key={perkColumn[0].hash} className="flex flex-col gap-4 w-fit">
        {perkColumn.map((perk) => {
          return (
            <Tooltip key={perk.hash}>
              <TooltipTrigger>
                <Image
                  src={applyBungieDomain(perk.displayProperties.icon)}
                  width={48}
                  height={48}
                  alt={`${perk.displayProperties.name}`}
                  onClick={() => console.log('clicked')}
                  className="inline-block active:bg-modifier-blue rounded-full border border-[#707070] focus:border-modifier-blue p-1"
                />
              </TooltipTrigger>
              <TooltipContent>
                <PerkTooltip
                  name={perk.displayProperties.name}
                  type={perk.itemTypeDisplayName}
                  description={perk.displayProperties.description}
                />
              </TooltipContent>
            </Tooltip>
          )
        })}
      </div>
    )
  })
  return <section className="grid grid-cols-6 gap-8 w-fit">{perkGrid}</section>
}

export default WeaponPerkGrid
