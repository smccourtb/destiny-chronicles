'use client'
import React, { useEffect } from 'react'
import { getDestinyManifest, populateManifestDatabase } from '../utils/formatTables'

const Manifest = () => {
  const addData = async () => {
    const { data } = await getDestinyManifest()
    data && (await populateManifestDatabase(data))
  }

  useEffect(() => {
    addData()
  }, [])

  return <></>
}

export default Manifest
