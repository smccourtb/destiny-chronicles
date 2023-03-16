import { BungieResponse } from './articles'
import type { DestinyPublicMilestone } from '../types/milestone'
import {
  DestinyActivityDefinitionTable,
  DestinyActivityModifierDefinitionTable,
  DestinyInventoryItemDefinitionTable,
} from '../database.config'

export type GetMilestoneResponse = {
  [key: string]: DestinyPublicMilestone
}

/**
 * @description Returns a list of currently available public milestones.
 * @returns an object of milestoneHashes for keys and their corresponding DestinyPublicMilestone data
 * @example
 * {"123456789": {milestoneHash: 123456789, activities: [], availableQuests: [], ... }, .....}
 */
export const getPublicMilestones = async () => {
  const response = await fetch('https://www.bungie.net/Platform/Destiny2/Milestones/', {
    method: 'GET',
    headers: {
      'X-API-Key': process.env.DESTINY_API_KEY as string,
    },
  })
  if (response.ok) {
    const data: BungieResponse<GetMilestoneResponse> = await response.json()
    const { Response } = data
    return { data: Response, error: null }
  } else {
    return { data: null, error: new Error(response.statusText) }
  }
}

/**
 * @description Returns a list of currently available public milestones. This is just the public milestone fetch results
 * filtered by the ones that have a start and end date.
 */
export const getWeeklyMilestones = async () => {
  const publicMilestonesResponse = await getPublicMilestones()
  if (publicMilestonesResponse.error || !publicMilestonesResponse.data) {
    return { data: null, error: publicMilestonesResponse.error }
  }
  const { data } = publicMilestonesResponse
  const weeklyMilestones = Object.values(data).filter((milestone) => milestone.startDate && milestone.endDate)
  return { data: weeklyMilestones, error: null }
}

export const getWeeklyNightfall = async () => {
  /**
   * @remark Vanguard Ops is usually the first element. Nightfall:Hero is the second.
   */
  const getWeeklyMilestonesResponse = await getWeeklyMilestones()
  if (getWeeklyMilestonesResponse.error) {
    return { data: null, error: getWeeklyMilestonesResponse.error }
  }
  const { data } = getWeeklyMilestonesResponse
  const potentialNightFallHash = 1942283261
  const nightfall = data.find((milestone) => milestone.milestoneHash === potentialNightFallHash)
  if (!nightfall) {
    // TODO implement a search for the nightfall manually
    return { data: null, error: new Error('No Nightfall found') }
  }
  const { activities } = nightfall
  if (!activities) {
    return { data: null, error: new Error('No activities found') }
  }

  const activityHashes = activities.map((activity) => activity.activityHash.toString())
  const nightfallActivities = await DestinyActivityDefinitionTable.bulkGet(activityHashes)
  const formattedNightfalls = await Promise.all(
    nightfallActivities.map(async (nightfallActivity) => {
      const { hash, displayProperties, pgcrImage, rewards, modifiers } = nightfallActivity
      const modifierHashes = modifiers.map((modifier: { activityModifierHash: number }) =>
        modifier.activityModifierHash.toString()
      )
      const modifierDefinitions = await DestinyActivityModifierDefinitionTable.bulkGet(modifierHashes)
      const formattedModifiers = modifierDefinitions
        .map((modifier) => {
          const { displayProperties, hash } = modifier
          return {
            name: displayProperties.name,
            description: displayProperties.description,
            icon: displayProperties?.icon || '',
            hash,
          }
        })
        .filter((modifier) => modifier.name)

      const rewardItemHashes =
        rewards.length > 0 &&
        rewards[0].rewardItems.map((rewardItem: { itemHash: number }) => rewardItem.itemHash.toString())
      const rewardItems = rewardItemHashes ? await DestinyInventoryItemDefinitionTable.bulkGet(rewardItemHashes) : []
      const formattedRewardItems = await Promise.all(
        rewardItems
          ? rewardItems.map((rewardItem) => {
              const { displayProperties, hash } = rewardItem
              return {
                name: displayProperties.name,
                icon: displayProperties?.icon || '',
                hash,
              }
            })
          : []
      )

      return {
        hash,
        image: pgcrImage,
        name: displayProperties.name,
        description: displayProperties.description,
        icon: displayProperties?.icon,
        modifiers: formattedModifiers,
        rewards: formattedRewardItems,
      }
    })
  )
  return { data: formattedNightfalls, error: null }
}
