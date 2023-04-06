import React, { useCallback, useState } from 'react'
import { FormattedMilestone, getWeeklyNightfall } from '../lib/milestones'
import { DestinyPublicMilestone } from '../types/milestone'

const useWeeklyNightfall = (activities: DestinyPublicMilestone[]) => {
  const [data, setData] = useState<{ [key: string]: FormattedMilestone } | null>(null)
  const [error, setError] = useState<Error | null>(null)
  const [loading, setLoading] = useState(false)

  const getNightfall = useCallback(async () => {
    setLoading(true)
    const { data, error } = await getWeeklyNightfall(activities)
    if (data && !error) {
      // convert array into object with activity name as key for easy lookup
      const formattedData = data!.reduce((acc, cur) => {
        acc[cur.name] = cur
        return acc
      }, {} as { [key: string]: FormattedMilestone })

      setData(formattedData)
    } else {
      setData(null)
    }
    setError(error)
    setLoading(false)
  }, [activities])

  React.useEffect(() => {
    getNightfall().catch((err) => console.error(err))
  }, [getNightfall])

  const baseModifiers = () => {
    if (!data) {
      return null
    }
    const modifiers = Object.values(data).map((activity) => {
      return activity.modifiers
    })
    const heroModifiers = modifiers[0]
    const heroModifierNames = heroModifiers.map((modifier) => modifier.name)
    const legendModifiers = modifiers[1].filter((modifier) => !heroModifierNames.includes(modifier.name))
    const masterModifiers = modifiers[2].filter((modifier) => !heroModifierNames.includes(modifier.name))
    const grandmasterModifiers = modifiers[3].filter((modifier) => !heroModifierNames.includes(modifier.name))
    return { hero: heroModifiers, legend: legendModifiers, master: masterModifiers, grandmaster: grandmasterModifiers }
  }

  return { data, error, loading, baseModifiers }
}

export default useWeeklyNightfall
