import { destinyComponents } from './character'
import { hashToId } from './index'
import { DestinySeasonDefinitionTable } from '../database.config'
import { DestinyProfile } from '../types/user'

export const getCurrentSeasonHash = async () => {
  try {
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
      const { currentSeasonHash } = Response.profile.data as DestinyProfile
      return { data: currentSeasonHash, error: null }
    } else {
      return { data: null, error: new Error(getSeasonHash.statusText) }
    }
  } catch (error) {
    return { data: null, error }
  }
}
export const getCurrentSeason = async (seasonId: number | undefined) => {
  if (seasonId) {
    const season = await DestinySeasonDefinitionTable.get(seasonId)
    return { data: season, error: null }
  }

  const getSeasonHash = await getCurrentSeasonHash()
  if (getSeasonHash.error) {
    return { data: null, error: getSeasonHash.error }
  }

  const { data: seasonHash } = getSeasonHash
  if (!seasonHash) {
    return { data: null, error: new Error('No season hash found') }
  }

  const seasons = await DestinySeasonDefinitionTable.get(seasonHash)
  return { data: seasons[hashToId(seasonHash)], error: null }
}
