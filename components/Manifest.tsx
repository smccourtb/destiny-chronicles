'use client'
import React, { useEffect, useState } from 'react'
import { getDestinyManifest, populateManifestDatabase } from '../utils/formatTables'

const Manifest = () => {
  const [state, setState] = useState(false)
  const addData = async () => {
    setState(true)
    const { data } = await getDestinyManifest()
    data && (await populateManifestDatabase(data))
  }

  useEffect(() => {
    if (!state) {
      addData()
    }
  }, [state])

  return <></>
}

export default Manifest
