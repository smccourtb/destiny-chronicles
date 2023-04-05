import { DestinyInventoryItemDefinitionTable, DestinyPlugSetDefinitionTable } from '../database.config'
import { DestinyDisplayProperties, DestinyInventoryItemDefinition } from '../types'

export type GetWeaponReturn = {
  data: WeaponData | null
  error: Error | null
}

export type WeaponData = {
  hash: number
  displayProperties: DestinyDisplayProperties
  perks: FormattedPerks[][]
}

export type FormattedPerks = {
  displayProperties: DestinyDisplayProperties
  itemTypeDisplayName: string
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
    return { data: { displayProperties, perks: formattedPerks, hash: weaponHash }, error: null }
  } catch (err) {
    return { data: null, error: err as Error }
  }
}

export const getWeaponPerks = async (sockets) => {
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
