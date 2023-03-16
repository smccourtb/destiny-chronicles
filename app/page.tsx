import Image from 'next/image'
import React from 'react'
import Countdown from '../components/Countdown'
import { getFormattedWeeklyMilestones, getWeeklyMilestones, getWeeklyNightfall } from '../lib/milestones'
import { searchByGlobalNamePost } from '../lib/user'
import { getCurrentSeason } from '../lib/season'
import { applyBungieDomain } from '../utils/url-handling'
const dayjs = require('dayjs')
const relativeTime = require('dayjs/plugin/relativeTime')
dayjs.extend(relativeTime)
export const metadata = {
  title: 'The Destiny Chronicles',
}

export default async function Page() {
  // when getting the weekly nightfall I would want to display:
  // TODO: the title, blurb, image, modifiers+icons, start/end date, rewards - for each difficulty
  const { data } = await getCurrentSeason()
  // const { data: nightfall } = await getWeeklyNightfall()
  const { data: milestones } = await getFormattedWeeklyMilestones()
  // if (nightfall) {
  //   console.log('nightfall: ', nightfall[1])
  // }
  if (milestones) {
    console.log('milestones: ', milestones)
  }

  // console.log(data)
  return (
    <section className="relative mx-10 ">
      <Image
        src={applyBungieDomain(data.backgroundImagePath)}
        className="max-h-10 object-cover -z-10 opacity-50"
        fill
        alt={''}
      />
      <h2 className="flex justify-between my-4 font-display">
        <p className="flex items-baseline gap-0.5">
          <span className="text-xl">Lightfall</span>
          <span className="opacity-70 text-lg">{' // '}</span>
          <span className="text-xl">{data.displayProperties.name.split(' ')[2]}</span>
          <Image src={applyBungieDomain(data.displayProperties.icon)} height={32} width={32} alt={''} className="" />
        </p>

        <Countdown timestamp={data.endDate} />
      </h2>
      <section>
        <h2 className="border-b border-white w-1/4">Weeklies</h2>
      </section>
    </section>
  )
}
