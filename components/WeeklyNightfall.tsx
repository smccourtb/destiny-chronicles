'use client'
import React, { useEffect, useState } from 'react'
import useWeeklyNightfall from '../hooks/use-weekly-nightfall'
import WeeklyCard from './WeeklyCard'
import { DestinyPublicMilestone } from '../types/milestone'
import Image from 'next/image'
import { applyBungieDomain } from '../utils/url-handling'
import { FormattedMilestone } from '../lib/milestones'

type WeeklyNightfallProps = {
  milestones: DestinyPublicMilestone[]
}
const WeeklyNightfall = ({ milestones }: WeeklyNightfallProps) => {
  const { data: nightfalls, loading, baseModifiers } = useWeeklyNightfall(milestones)
  const [current, setCurrent] = useState<string>()

  useEffect(() => {
    if (nightfalls) {
      setCurrent(Object.keys(nightfalls)[0])
    }
  }, [nightfalls])

  if (!nightfalls) {
    return null
  }

  const { icon } = current ? nightfalls[current] : { icon: '' }

  const activityNames = Object.keys(nightfalls)

  const activityLinks = activityNames.map((name) => {
    return (
      <li
        key={name}
        className={`${
          current !== name ? 'opacity-50' : 'font-normal'
        } font-thin cursor-pointer flex items-center justify-center transition-colors duration-100 hover:opacity-100`}
        onClick={(e) => {
          if (nightfalls) {
            setCurrent(e.currentTarget.innerText)
          }
        }}
      >
        {name}
      </li>
    )
  })

  return (
    <div className={'flex flex-col gap-4 p-4'}>
      <Image src={applyBungieDomain(icon)} width={48} height={48} alt={'icon'} className="self-center" />
      <h1 className="text-4xl text-center font-thin">Nightfall</h1>
      <nav className="flex flex-wrap gap-2 justify-center">{activityLinks}</nav>

      <div>{!loading && current && <WeeklyCard key={nightfalls[current].hash} activity={nightfalls[current]} />}</div>
    </div>
  )
}

export default WeeklyNightfall
