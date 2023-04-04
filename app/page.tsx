import React from 'react'
import Manifest from '../components/Manifest'
import WeeklyNightfall from '../components/WeeklyNightfall'
const dayjs = require('dayjs')
const relativeTime = require('dayjs/plugin/relativeTime')
dayjs.extend(relativeTime)

export const metadata = {
  title: 'The Destiny Chronicles',
}

export default async function Page() {
  return <section className="relative mx-10 "></section>
}
