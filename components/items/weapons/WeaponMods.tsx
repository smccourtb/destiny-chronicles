import React, { useState } from 'react'
import { FormattedMod } from '../../../lib/items'
import Image from 'next/image'
import { RadioGroup } from '@headlessui/react'
import { Tooltip, TooltipContent, TooltipTrigger } from '../../tooltips/Tooltip'
import PerkTooltip from '../../tooltips/PerkTooltip'

type WeaponModsProps = {
  mods: FormattedMod[]
}
const WeaponMods = ({ mods }: WeaponModsProps) => {
  const emptyMod = mods.find((mod) => mod.name.includes('Empty'))
  const [activeMod, setActiveMod] = useState(emptyMod ?? null)

  return (
    <section className="">
      <RadioGroup value={activeMod} onChange={setActiveMod} className="flex gap-2 flex-wrap">
        {mods.map((mod) => (
          <RadioGroup.Option key={mod.hash} value={mod} className="hover:brightness-125">
            {({ checked, active }) => (
              <Tooltip>
                <TooltipTrigger asChild={true}>
                  <Image
                    height={48}
                    width={48}
                    onClick={() => checked && setActiveMod(null)}
                    src={mod.icon ?? ''}
                    alt={mod.name}
                    className={`border border-2 ${checked ? 'border-white' : 'border-none'} hover:cursor-pointer`}
                  />
                </TooltipTrigger>
                <TooltipContent>
                  <PerkTooltip name={mod.name} type={mod.itemTypeDisplayName} description={mod.description} />
                </TooltipContent>
              </Tooltip>
            )}
          </RadioGroup.Option>
        ))}
      </RadioGroup>
    </section>
  )
}

export default WeaponMods
