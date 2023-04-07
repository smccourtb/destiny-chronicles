import {
  DestinyInventoryItemDefinitionTable,
  DestinyPlugSetDefinitionTable,
  DestinyStatDefinitionTable,
} from '../database.config'
import {
  DestinyDisplayProperties,
  DestinyInventoryItemDefinition,
  DestinyItemSocketBlockDefinition,
  DestinyItemStatBlockDefinition,
  DestinyStatDefinition,
} from '../types'

export type GetWeaponReturn = {
  data: WeaponData | null
  error: Error | null
}

export type WeaponData = {
  hash: number
  displayProperties: DestinyDisplayProperties
  perks: FormattedPerk[][]
  stats: FormattedStat[]
}

export type FormattedPerk = {
  displayProperties: DestinyDisplayProperties
  itemTypeDisplayName: string
  hash: number
}

export type FormattedStat = {
  name: string
  description: string
  icon: string
  value: number
  hash: number
}

export const getWeapon = async (hash: string | number): Promise<GetWeaponReturn> => {
  try {
    const data: DestinyInventoryItemDefinition = await DestinyInventoryItemDefinitionTable.get(hash.toString())
    if (!data) {
      return { data: null, error: new Error('No data found') }
    }
    const { loreHash, displayProperties, screenshot, flavorText, stats, sockets, hash: weaponHash } = data

    const formattedPerks = await getWeaponPerks(sockets)
    const formattedStats = await getWeaponStats(stats)
    return { data: { displayProperties, perks: formattedPerks, stats: formattedStats, hash: weaponHash }, error: null }
  } catch (err) {
    return { data: null, error: err as Error }
  }
}

export const getWeaponPerks = async (sockets: DestinyItemSocketBlockDefinition) => {
  const weaponPerksHash = 4241085061
  const perkSocketIndices =
    sockets.socketCategories.find((socket) => socket.socketCategoryHash === weaponPerksHash)?.socketIndexes || []
  const perkSockets = perkSocketIndices.map((index) => {
    return sockets.socketEntries[index]
  })
  const rawPerkData = []
  for (const socket of perkSockets) {
    const hasRandomPerks = socket?.randomizedPlugSetHash
    if (hasRandomPerks) {
      const perksByColumn = []
      const randomPerks = await DestinyPlugSetDefinitionTable.get(socket.randomizedPlugSetHash.toString())
      for (const perk of randomPerks?.reusablePlugItems) {
        const perkData = await DestinyInventoryItemDefinitionTable.get(perk.plugItemHash.toString())
        perksByColumn.push(perkData)
      }
      rawPerkData.push(perksByColumn)
    } else {
      const perkData = await DestinyInventoryItemDefinitionTable.get(socket.singleInitialItemHash.toString())
      rawPerkData.push([perkData])
    }
  }
  return rawPerkData.map((perkData) => {
    return perkData.map((perk) => {
      const { displayProperties, itemTypeDisplayName, hash } = perk
      return { displayProperties, itemTypeDisplayName, hash }
    })
  })
}

const getWeaponStats = async (weaponStats: DestinyItemStatBlockDefinition) => {
  const { stats } = weaponStats
  const statData = Object.values(stats)
  const statHashes = statData.map(({ statHash }) => String(statHash))

  const statDefinitions: DestinyStatDefinition[] = await DestinyStatDefinitionTable.bulkGet(statHashes)
  const formattedStats: FormattedStat[] = []

  statDefinitions.forEach((statDefinition, index) => {
    const { blacklisted, displayProperties, statCategory, hash } = statDefinition

    // I may want to pull the redacted property out at some point. Noting here for now.
    const { name, description, hasIcon } = displayProperties
    const icon = hasIcon ? displayProperties.icon : ''
    const { value } = statData[index]

    // statCategory === 1 is for weapon stats.
    if (!blacklisted && name && statCategory === 1) {
      formattedStats.push({ name, description, icon, value, hash })
    }
  })
  return formattedStats
}
