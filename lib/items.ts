import {
  DestinyInventoryItemDefinitionTable,
  DestinyPlugSetDefinitionTable,
  DestinySocketTypeDefinitionTable,
} from '../database.config'
import { DestinyInventoryItemDefinition } from '../types'
import { hashToId } from './index'
import { log } from 'util'

export type GetWeaponReturn = {
  data: { displayProperties: any; perks: any[] } | null
  error: Error | null
}
export const getWeapon = async (hash: string | number): Promise<GetWeaponReturn> => {
  try {
    const data = await DestinyInventoryItemDefinitionTable.get(hash.toString())
    if (!data) {
      return { data: null, error: new Error('No data found') }
    }
    const { loreHash, displayProperties, screenshot, itemDisplayName, flavorText, stats, sockets } = data
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
    const formattedPerks = rawPerkData.map((perkData) => {
      return perkData.map((perk) => {
        const { displayProperties, itemTypeDisplayName } = perk
        return { displayProperties, itemTypeDisplayName }
      })
    })
    return { data: { displayProperties, perks: formattedPerks }, error: null }
  } catch (err) {
    return { data: null, error: err as Error }
  }
}
