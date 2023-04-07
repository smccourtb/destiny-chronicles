import React from 'react'
import { FormattedStat } from '../../../lib/items'

type WeaponStatsProps = {
  stats: FormattedStat[]
}
type StatBarProps = {
  stat: FormattedStat
}

const StatBar = ({ stat }: StatBarProps) => {
  const { name, value, description, hash } = stat
  return (
    <div key={hash} className="flex flex-col items-center w-full">
      <div className="flex items-end justify-between text-xl font-bold w-full">
        <p>{name}</p>
        <p>{value}</p>
      </div>
      <div className="bg-gray-500 h-2 rounded-full overflow-hidden w-full">
        <div className={'h-full bg-white transition-all ease-in-out duration-500'} style={{ width: `${value}%` }} />
      </div>
    </div>
  )
}
const WeaponStats = ({ stats }: WeaponStatsProps) => {
  return (
    <div className="flex flex-col items-start justify-center">
      {stats.map((stat) => (
        <StatBar key={stat.hash} stat={stat} />
      ))}
    </div>
  )
}

export default WeaponStats
