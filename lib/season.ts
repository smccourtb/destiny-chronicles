import { destinyComponents } from './character'
import { getJsonData, hashToDefinition, hashToId } from './data'
import { DestinyActivityModifierDefinition } from '../types/activities'

export const getCurrentSeasonHash = async () => {
  const getSeasonHash = await fetch(
    `https://www.bungie.net/Platform/Destiny2/1/Profile/${process.env.DESTINY_MEMBERSHIP_ID}/?components=${destinyComponents.profile}`,
    {
      method: 'GET',
      headers: {
        'X-API-Key': process.env.DESTINY_API_KEY as string,
      },
    }
  )
  if (getSeasonHash.ok) {
    const data = await getSeasonHash.json()
    const { Response } = data
    const { currentSeasonHash } = Response.profile.data
    return { data: currentSeasonHash, error: null }
  } else {
    return { data: null, error: new Error(getSeasonHash.statusText) }
  }
}

export const getCurrentSeason = async () => {
  const getSeasonHash = await getCurrentSeasonHash()
  if (getSeasonHash.error) {
    return { data: null, error: getSeasonHash.error }
  }
  const { data: seasonHash } = getSeasonHash
  const seasons = await getJsonData('DestinySeasonDefinition')
  return { data: seasons[hashToId(seasonHash)], error: null }
}
