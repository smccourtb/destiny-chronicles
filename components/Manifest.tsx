'use client'
import React, { useEffect, useState } from 'react'
import { getDestinyManifest, populateManifestDatabase } from '../utils/formatTables'
import { getWeeklyNightfall } from '../lib/milestones'

const Manifest = () => {
  const [state, setState] = useState(false)
  const addData = async () => {
    setState(true)
    const { data } = await getDestinyManifest()
    data && (await populateManifestDatabase(data))
    const x = await getWeeklyNightfall()
    console.log(x)
  }

  useEffect(() => {
    if (!state) {
      addData()
    }
  }, [state])

  // const weeklyHeroNightfall = useLiveQuery(
  //   () => customerTable.where('dept').between(lower, upper).toArray(),
  //   [lower, upper]
  // )

  return <></>
}

export default Manifest
