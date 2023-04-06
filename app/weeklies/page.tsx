import React from 'react'
import WeeklyNightfall from '../../components/WeeklyNightfall'
import { getWeeklyMilestones } from '../../lib/milestones'
import Countdown from '../../components/Countdown'
const dayjs = require('dayjs')
const relativeTime = require('dayjs/plugin/relativeTime')
dayjs.extend(relativeTime)

export const metadata = {
  title: 'The Destiny Chronicles: Weeklies',
}

export default async function Page() {
  const { data, error } = await getWeeklyMilestones()
  return (
    <section className="relative mx-10">
      {!error && <Countdown timestamp={data[0].endDate!} />}
      {!error && <WeeklyNightfall milestones={data} />}
    </section>
  )
}
