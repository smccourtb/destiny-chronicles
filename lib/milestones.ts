import { BungieResponse } from './articles'
import type { DestinyPublicMilestone } from '../types/milestone'
import {
  DestinyActivityDefinitionTable,
  DestinyActivityModifierDefinitionTable,
  DestinyInventoryItemDefinitionTable,
} from '../database.config'
import { applyBungieDomain } from '../utils/url-handling'
import { DestinyActivityDefinition, DestinyActivityModifierDefinition } from '../types/activities'
import { DestinyInventoryItemDefinition } from '../types'

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
  const response = await fetch(applyBungieDomain('/Platform/Destiny2/Milestones/'), {
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

/**
 * @remark Vanguard Ops is usually the first element. Nightfall:Hero is the second.
 */
export const getWeeklyNightfall = async (data: DestinyPublicMilestone[]): Promise<GetWeeklyNightfallReturn> => {
  const potentialNightFallHash = 1942283261
  const nightfall = data.find((milestone) => milestone.milestoneHash === potentialNightFallHash)
  if (!nightfall) {
    // TODO implement a search for the nightfall manually
    return { data: null, error: new Error('No Nightfall found') }
  }

  // List of activities for the nightfall (Hero, Legend, Master, Grandmaster)
  const { activities } = nightfall
  if (!activities) {
    return { data: null, error: new Error('No activities found') }
  }

  const activityHashes = activities.map((activity) => activity.activityHash.toString())
  const modifierHashes = activities.map((activity) =>
    activity.modifierHashes.map((modifierHash) => modifierHash.toString())
  )
  // Remove the first element because it's Vanguard Ops
  const onlyNightfallActivities = activityHashes.slice(1)
  const onlyNightfallModifiers = modifierHashes.slice(1)
  const nightfallActivities: DestinyActivityDefinition[] = await DestinyActivityDefinitionTable.bulkGet(
    onlyNightfallActivities
  )
  const formattedNightfalls = await Promise.all(
    nightfallActivities.map(
      async (nightfallActivity: DestinyActivityDefinition, index: number): Promise<FormattedMilestone> => {
        const { hash, displayProperties, pgcrImage, rewards, selectionScreenDisplayProperties } = nightfallActivity
        const modifierDefinitions: DestinyActivityModifierDefinition[] =
          await DestinyActivityModifierDefinitionTable.bulkGet(onlyNightfallModifiers[index])
        const formattedModifiers = modifierDefinitions
          .filter((modifier) => !modifier.blacklisted && modifier.displayInActivitySelection && !modifier.redacted)
          .map((modifier: DestinyActivityModifierDefinition) => {
            const { displayProperties, hash } = modifier
            return {
              name: displayProperties.name,
              description: displayProperties.description,
              icon: displayProperties?.icon || '',
              hash,
            }
          })

        const rewardItemHashes =
          rewards.length > 0
            ? rewards[0].rewardItems.map((rewardItem: { itemHash: number }) => rewardItem.itemHash.toString())
            : []

        const rewardItems: DestinyInventoryItemDefinition[] = rewardItemHashes
          ? await DestinyInventoryItemDefinitionTable.bulkGet(rewardItemHashes)
          : []
        const formattedRewardItems = await Promise.all(
          rewardItems
            ? rewardItems.map((rewardItem: DestinyInventoryItemDefinition) => {
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
          name: selectionScreenDisplayProperties.name,
          description: displayProperties.description,
          icon: displayProperties?.icon,
          modifiers: formattedModifiers,
          rewards: formattedRewardItems,
        }
      }
    )
  )
  return { data: formattedNightfalls, error: null }
}

export type FormattedReward = {
  name: string
  icon: string
  hash: number
}

export type FormattedModifier = {
  name: string
  description: string
  icon: string
  hash: number
}

export type FormattedMilestone = {
  hash: number
  name: string
  description: string
  icon: string
  image: string
  rewards: FormattedReward[]
  modifiers: FormattedModifier[]
}

export type GetWeeklyNightfallReturn = {
  data: FormattedMilestone[] | null
  error: Error | null
}
