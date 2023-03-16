import React from 'react'
import Manifest from '../components/Manifest'
const dayjs = require('dayjs')
const relativeTime = require('dayjs/plugin/relativeTime')
dayjs.extend(relativeTime)

export const metadata = {
  title: 'The Destiny Chronicles',
}

export default async function Page() {
  return (
    <section className="relative mx-10 ">
      <Manifest />
    </section>
  )
}
