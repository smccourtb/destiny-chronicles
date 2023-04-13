import { DestinyInventoryItemStatDefinition, DestinyItemStatBlockDefinition, DestinyStatDefinition } from '../../types'
import { MockBulkGet, MockWeaponStats } from '../../tests/weapons.test'
import { IndexableType, PromiseExtended } from 'dexie'
import { FormattedStat } from '../items'
import { formatBasicDisplayData } from './sockets'

/**
 * Extracts the stat hashes from the given `weaponStats` object.
 *
 * @param {DestinyItemStatBlockDefinition | MockWeaponStats} weaponStats - The weapon stats to extract the hashes from.
 * @returns {string[]} An array of stat hashes.
 */
function getStatHashes(weaponStats: DestinyItemStatBlockDefinition | MockWeaponStats) {
  const { stats } = weaponStats
  return Object.values(stats)
    .filter((stat) => stat.statHash !== 1931675084)
    .map(({ statHash }) => String(statHash))
}

/**
 * Formats the given `statDefinitions` and `statData` arrays into an array of `FormattedStat` objects.
 *
 * @param {DestinyStatDefinition[]} statDefinitions - The stat definitions to format.
 * @param {any[]} statData - The stat data to use for the formatting.
 * @returns {FormattedStat[]} The formatted stats.
 */
function formatWeaponStats(
  statDefinitions: DestinyStatDefinition[],
  statData: ({ statHash: number; value: number } | DestinyInventoryItemStatDefinition)[]
) {
  const formattedStats: FormattedStat[] = []

  statDefinitions.forEach((statDefinition, index) => {
    const { blacklisted, displayProperties, statCategory, index: sortIndex } = statDefinition
    if (blacklisted || !displayProperties?.name || statCategory !== 1) {
      return
    }
    const { name, description, icon, hash } = formatBasicDisplayData(statDefinition)
    const { value } = statData[index]
    const progressBarNames = ['Rounds Per Minute', 'Recoil Direction', 'Magazine']
    const progressBar = !progressBarNames.includes(name)
    formattedStats.push({ name, description, icon, hash, value, progressBar, sortIndex })
  })
  return formattedStats.sort((a, b) => a.sortIndex - b.sortIndex)
}

/**
 * Retrieves the stat definitions from the given `statDefinitionProvider`.
 *
 * @param {{(keys: IndexableType[]): PromiseExtended<DestinyStatDefinition[]>}} statDefinitionProvider - The provider
 *     function to retrieve the stat definitions.
 * @param {string[]} statHashes - The stat hashes to retrieve definitions for.
 * @returns {Promise<DestinyStatDefinition[]>} A Promise that resolves with an array of stat definitions.
 */
async function getStatDefinitions(
  statDefinitionProvider:
    | {
        (keys: IndexableType[]): PromiseExtended<DestinyStatDefinition[]>
      }
    | MockBulkGet,
  statHashes: string[]
) {
  return statDefinitionProvider(statHashes)
}

/**
 * Retrieves the formatted weapon stats for the given `weaponStats` using the given `statDefinitionProvider`.
 *
 * @param {DestinyItemStatBlockDefinition | MockWeaponStats} weaponStats - The weapon stats to retrieve formatted stats
 *     for.
 * @param {{(keys: IndexableType[]): PromiseExtended<DestinyStatDefinition[]>} | MockBulkGet} statDefinitionProvider -
 *     The provider function to retrieve the stat definitions.
 * @returns {Promise<FormattedStat[]>} A Promise that resolves with the formatted weapon stats.
 **/
export const handleWeaponStats = async (
  weaponStats: DestinyItemStatBlockDefinition | MockWeaponStats,
  statDefinitionProvider:
    | {
        (keys: IndexableType[]): PromiseExtended<DestinyStatDefinition[]>
      }
    | MockBulkGet
) => {
  const statHashes = getStatHashes(weaponStats)
  const statDefinitions = await getStatDefinitions(statDefinitionProvider, statHashes)
  const { stats } = weaponStats
  const statData = Object.values(stats).filter((stat) => stat.statHash !== 1931675084)

  return formatWeaponStats(statDefinitions, statData)
}
