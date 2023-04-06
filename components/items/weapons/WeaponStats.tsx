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
    <div key={hash} className="grid grid-cols-5 items-center">
      <p className="text-xl font-bold col-span-2">{name}</p>
      <div className="bg-gray-500 h-2 w-full rounded-full col-span-3">
        <div className="bg-white h-2 w-full rounded-full" style={{ width: `${value}%` }} />
      </div>
    </div>
  )
}
const WeaponStats = ({ stats }: WeaponStatsProps) => {
  return (
    <div className="">
      {stats.map((stat) => (
        <StatBar key={stat.hash} stat={stat} />
      ))}
    </div>
  )
}

export default WeaponStats
