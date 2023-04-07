import React, { useState } from 'react'
import { FormattedPerk } from '../../../lib/items'
import { RadioGroup } from '@headlessui/react'
import { Tooltip, TooltipContent, TooltipTrigger } from '../../Tooltip'
import Image from 'next/image'
import { applyBungieDomain } from '../../../utils/url-handling'
import PerkTooltip from '../../PerkTooltip'

type PerkColumnProps = {
  perks: FormattedPerk[]
}
const PerkColumn = ({ perks }: PerkColumnProps) => {
  const [activePerk, setActivePerk] = useState<FormattedPerk | null>(null)
  const perkOptions = perks.map((perk) => {
    return (
      <RadioGroup.Option key={perk.hash} value={perk} className={'rounded-full'}>
        {({ checked, active }) => (
          <Tooltip key={perk.hash}>
            <TooltipTrigger asChild={true}>
              <Image
                src={applyBungieDomain(perk.displayProperties.icon)}
                width={48}
                height={48}
                alt={`${perk.displayProperties.name}`}
                onClick={() => checked && setActivePerk(null)}
                className={`${checked ? 'bg-modifier-blue' : 'bg-transparent'} ${
                  active ? 'ring-2 ring-modifier-blue' : ''
                } rounded-full p-1 border border-[#707070] hover:ring-2 hover:ring-modifier-blue`}
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
        )}
      </RadioGroup.Option>
    )
  })
  return (
    <RadioGroup value={activePerk} onChange={setActivePerk} className="flex flex-col gap-2 items-center">
      <RadioGroup.Label className="sr-only">{perks[0].itemTypeDisplayName}</RadioGroup.Label>
      {perkOptions}
    </RadioGroup>
  )
}

export default PerkColumn
