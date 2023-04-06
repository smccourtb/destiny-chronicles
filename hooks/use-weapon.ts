import React, { useCallback, useState } from 'react'
import { getWeapon, WeaponData } from '../lib/items'

const useWeapon = (hash: number | string) => {
  const [data, setData] = useState<WeaponData | null>()
  const [error, setError] = useState<Error | null>()
  const [loading, setLoading] = useState<boolean>(false)

  const getWeaponData = useCallback(async () => {
    setLoading(true)
    const { data, error } = await getWeapon(hash)
    setData(data)
    setError(error)
    setLoading(false)
  }, [hash])

  React.useEffect(() => {
    getWeaponData().catch((err) => console.error(err))
  }, [getWeaponData])

  return { data, error, loading }
}

export default useWeapon
