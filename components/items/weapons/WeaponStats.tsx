import React from 'react'
import { FormattedStat } from '../../../lib/items'
import { Tooltip, TooltipContent, TooltipTrigger } from '../../tooltips/Tooltip'
import PerkTooltip from '../../tooltips/PerkTooltip'

type WeaponStatsProps = {
  stats: FormattedStat[]
}
type StatBarProps = {
  stat: FormattedStat
}

const StatBar = ({ stat }: StatBarProps) => {
  const { name, value, description, hash } = stat
  return (
    <div className="grid grid-cols-[33%_minmax(33%,_1fr)_10%] gap-2 items-center text-xl font-bold w-full">
      <Tooltip key={hash}>
        <TooltipTrigger asChild={true}>
          <p className="font-light text-md text-right truncate">{name}</p>
        </TooltipTrigger>
        <TooltipContent>
          <PerkTooltip name={name} type={''} description={description} />
        </TooltipContent>
      </Tooltip>
      <div className="bg-gray-500 bg-opacity-75 h-4 overflow-hidden">
        <div className={'h-full bg-white transition-all ease-in-out duration-500'} style={{ width: `${value}%` }} />
      </div>
      <p className="font-semibold">{value}</p>
    </div>
  )
}
const WeaponStats = ({ stats }: WeaponStatsProps) => {
  const progressBars = stats.filter((stat) => stat.progressBar)
  const otherStats = stats.filter((stat) => !stat.progressBar)
  return (
    <div className="flex flex-col gap-2 items-start justify-center">
      {progressBars.map((stat) => (
        <StatBar key={stat.hash} stat={stat} />
      ))}
      <div className="grid grid-cols-[33%_minmax(33%,_1fr)] gap-2 items-center text-xl font-bold w-full">
        {otherStats.map((stat) => (
          <React.Fragment key={stat.hash}>
            <Tooltip>
              <TooltipTrigger asChild={true}>
                <p key={stat.hash} className="font-light text-md text-right truncate">
                  {stat.name}:
                </p>
              </TooltipTrigger>
              <TooltipContent>
                <PerkTooltip name={stat.name} type={''} description={stat.description} />
              </TooltipContent>
            </Tooltip>
            <p className="font-semibold">{stat.value}</p>
          </React.Fragment>
        ))}
      </div>
    </div>
  )
}

export default WeaponStats
