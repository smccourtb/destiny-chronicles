import React, { useState } from 'react'
import { FormattedMasterworks } from '../../../lib/items'
import { RadioGroup } from '@headlessui/react'
import { Tooltip, TooltipContent, TooltipTrigger } from '../../tooltips/Tooltip'
import Image from 'next/image'
import PerkTooltip from '../../tooltips/PerkTooltip'

type WeaponMasterworkProps = {
  masterworks: FormattedMasterworks[]
}
const WeaponMasterwork = ({ masterworks }: WeaponMasterworkProps) => {
  const emptyMasterwork = masterworks.find((masterwork) => masterwork.name.includes('Empty'))
  const [activeMasterwork, setActiveMasterwork] = useState(emptyMasterwork ?? null)

  return (
    <section className="">
      <RadioGroup value={activeMasterwork} onChange={setActiveMasterwork} className="flex gap-2 flex-wrap">
        {masterworks.map((masterwork) => (
          <RadioGroup.Option key={masterwork.hash} value={masterwork} className="hover:brightness-125">
            {({ checked, active }) => (
              <Tooltip>
                <TooltipTrigger asChild={true}>
                  <div className="relative">
                    <Image
                      height={48}
                      width={48}
                      onClick={() => checked && setActiveMasterwork(null)}
                      src={masterwork.icon ?? ''}
                      alt={masterwork.name}
                      className={`border border-2 ${checked ? 'border-white' : 'border-none'} hover:cursor-pointer`}
                    />
                    {masterwork.iconWatermark && (
                      <Image
                        height={48}
                        width={48}
                        onClick={() => checked && setActiveMasterwork(null)}
                        src={masterwork.iconWatermark ?? ''}
                        alt={masterwork.name}
                        className={`border border-2 ${
                          checked ? 'border-white' : 'border-none'
                        } hover:cursor-pointer absolute top-0`}
                      />
                    )}
                  </div>
                </TooltipTrigger>
                <TooltipContent>
                  <PerkTooltip name={masterwork.name} type={''} description={masterwork.description} />
                </TooltipContent>
              </Tooltip>
            )}
          </RadioGroup.Option>
        ))}
      </RadioGroup>
    </section>
  )
}

export default WeaponMasterwork
