'use client'
import React, { useEffect } from 'react'
import { getDestinyManifest, populateManifestDatabase } from '../utils/formatTables'
import useWeeklyNightfall from '../hooks/weeklyNightfall'
import Image from 'next/image'
import { applyBungieDomain } from '../utils/url-handling'

const Manifest = () => {
  const { data, error, loading } = useWeeklyNightfall()
  const addData = async () => {
    const { data } = await getDestinyManifest()
    data && (await populateManifestDatabase(data))
  }

  useEffect(() => {
    addData()
  }, [])

  // const weeklyHeroNightfall = useLiveQuery(
  //   () => customerTable.where('dept').between(lower, upper).toArray(),
  //   [lower, upper]
  // )
  console.log(data, error, loading)

  return <>{data && data.map((activity) => <VanguardActivity key={activity.key} activity={activity} />)}</>
}

export default Manifest

export const VanguardActivity = ({ activity }: { activity: any }) => {
  const { description, modifiers, icon, image, name, rewards } = activity

  return (
    <article>
      <h2>{name}</h2>
      <p>{description}</p>
      <Image src={applyBungieDomain(icon)} width={16} height={16} alt={'icon'} />
      <Image src={applyBungieDomain(image)} width={16} height={16} alt={'image'} />
    </article>
  )
}
