import React, { useState } from 'react'
import { getWeeklyNightfall } from '../lib/milestones'

const useWeeklyNightfall = () => {
  const [data, setData] = useState<any[] | null>(null)
  const [error, setError] = useState<Error | null>(null)
  const [loading, setLoading] = useState(false)

  const getNightfall = async () => {
    setLoading(true)
    const { data, error } = await getWeeklyNightfall()
    setData(data)
    setError(error)
    setLoading(false)
  }

  React.useEffect(() => {
    getNightfall()
  }, [])

  return { data, error, loading }
}

export default useWeeklyNightfall
