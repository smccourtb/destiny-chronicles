import {
  DestinyDisplayProperties,
  DestinyInventoryItemDefinition,
  DestinyItemSocketBlockDefinition,
  DestinyItemSocketEntryDefinition,
  DestinyPlugSetDefinition,
} from '../../types'
import {
  DestinyInventoryItemDefinitionTable,
  DestinyPlugSetDefinitionTable,
  DestinySandboxPerkDefinitionTable,
  DestinyStatDefinitionTable,
} from '../../database.config'
import { handleIcon } from '../items'
import { applyBungieDomain } from '../../utils/url-handling'

export const formatBasicDisplayData = (data: { displayProperties: DestinyDisplayProperties; hash: number }) => {
  const { displayProperties, hash } = data
  const { name, description } = displayProperties
  const icon = handleIcon(displayProperties)
  return { name, description, icon, hash }
}
export const handleWeaponPerks = async (socketCategoryHash: number, sockets: DestinyItemSocketBlockDefinition) => {
  const perkSockets = getSocketEntriesFromCategory(socketCategoryHash, sockets)
  const rawPerkData = []
  for (const socket of perkSockets) {
    if (!socket.singleInitialItemHash) continue
    const hasRandomPerks = socket?.randomizedPlugSetHash
    if (hasRandomPerks) {
      const randomPerks: DestinyPlugSetDefinition = await DestinyPlugSetDefinitionTable.get(
        socket.randomizedPlugSetHash.toString()
      )
      const perkHashes = randomPerks.reusablePlugItems.map((perk) => perk.plugItemHash.toString())
      const perksByColumn = await DestinyInventoryItemDefinitionTable.bulkGet(perkHashes)
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

export const handleModSockets = async (
  socketCategoryHash: number,
  sockets: DestinyItemSocketBlockDefinition,
  type: string
) => {
  const modSockets = getSocketEntriesFromCategory(socketCategoryHash, sockets)
  const deepsight = await handleDeepsight(modSockets)
  const mods = await handleWeaponMods(modSockets)
  const masterwork = await handleWeaponMasterwork(modSockets, type)
  const catalyst = await handleCatalyst(modSockets)
  return { mods, deepsight, masterwork, catalyst }
}

export const handleWeaponMods = async (data: DestinyItemSocketEntryDefinition[]) => {
  // the only constant i've found between weapon mods is that they all have a singleInitialItemHash of 2323986101
  // seems to be outdated info or something its returning Adept versions of mods that I assume were around before the big mod changes. Before my time.
  const emptyModSocketHash = 2323986101
  // if (data.length === 0) return null
  const currentModsMap = {
    2788909693: 'Boss Spec',
    1588595445: 'Counterbalance Stock',
    3336648220: 'Backup Mag',
    736000386: 'Freehand Grip',
    941997506: 'Icarus Grip',
    984527513: 'Major Spec',
    4091000557: 'Minor Spec',
    371216963: 'Radar Tuner',
    1513326571: 'Taken Spec',
    3228611386: 'Targeting Adjuster',
    3785661089: 'Radar Booster',
    518387148: 'Sprint Grip',
    1334978104: 'Quick Access Sling',
  }
  const rawWeaponMods = await DestinyInventoryItemDefinitionTable.bulkGet([...Object.keys(currentModsMap)])
  const rawEmptyMod = await DestinyInventoryItemDefinitionTable.get(emptyModSocketHash.toString())
  const { itemTypeDisplayName } = rawEmptyMod
  const formattedEmptyMod = { ...formatBasicDisplayData(rawEmptyMod), itemTypeDisplayName }

  const formattedMods = rawWeaponMods.map((mod) => {
    const { itemTypeDisplayName } = mod
    const displayInfo = formatBasicDisplayData(mod)
    return { ...displayInfo, itemTypeDisplayName }
  })

  const modPerkHashes = rawWeaponMods.map((mod) => mod.perks[0].perkHash.toString())

  const rawModPerks = await DestinySandboxPerkDefinitionTable.bulkGet(modPerkHashes)
  //  the first call to the db returns an empty description, so we need to make another call to get the description from the sandboxPerkDef
  const finalFormat = rawModPerks.map((mod, index) => {
    const { displayProperties } = mod
    const { description } = displayProperties
    return { ...formattedMods[index], description }
  })
  return [...finalFormat, formattedEmptyMod]
}

export const handleDeepsight = async (data: DestinyItemSocketEntryDefinition[]) => {
  if (data.length === 0) return null

  const deepsightHash = 1085237186
  const deepsightSocketEntry = data.find((socket) => socket.socketTypeHash === deepsightHash)
  if (!deepsightSocketEntry) return null

  const deepsightSocketHash = deepsightSocketEntry.reusablePlugItems[0].plugItemHash
  // TODO: add logic to handle not finding this hash
  const deepsightSocketData = await DestinyInventoryItemDefinitionTable.get(deepsightSocketHash.toString())
  return formatBasicDisplayData(deepsightSocketData)
}

export const handleWeaponMasterwork = async (data: DestinyItemSocketEntryDefinition[], weaponType: string) => {
  if (data.length === 0) return null
  const masterworkHash = 2218962841
  const masterworkSocketEntry = data.find((socket) => socket.socketTypeHash === masterworkHash)
  console.log('masterworkSocketEntry', masterworkSocketEntry)
  const emptyMasterworkSocketHash = 236077174

  if (!masterworkSocketEntry) return null
  const masterworkHashMap = {
    stability: 384158423, // all weapons -> not glaives?
    handling: 186337601, // all weapons
    range: 2697220197, // all weapons
    reload: 758092021, // all weapons
    damage: 3486498337, // impact -> swords only
    blast_radius: 3803457565, // grenade launchers only
    projectile_speed: 1154004463, // projectile velocity -> grenade launchers only
    charge_time: 3128594062, // fusion rifles only (linear too?)
    draw_time: 1639384016, // bows only
    accuracy: 2993547493, // bows only
    shield_duration: 266016299, // glaives only
  }
  const base = [
    masterworkHashMap.stability,
    masterworkHashMap.handling,
    masterworkHashMap.range,
    masterworkHashMap.reload,
  ]

  const glaiveBase = base.slice(1, 4)
  const glaive = [masterworkHashMap.shield_duration, ...glaiveBase]
  const sword = [masterworkHashMap.damage, ...base]
  const grenadeLauncher = [masterworkHashMap.blast_radius, masterworkHashMap.projectile_speed, ...base]
  const fusionRifle = [masterworkHashMap.charge_time, ...base]
  const bow = [masterworkHashMap.draw_time, masterworkHashMap.accuracy, ...base]

  const determineMasterwork = (weaponType: string) => {
    switch (weaponType) {
      case 'Glaive':
        return glaive
      case 'Sword':
        return sword
      case 'Grenade Launcher':
        return grenadeLauncher
      case 'Fusion Rifle':
      case 'Linear Fusion Rifle':
        return fusionRifle
      case 'Bow':
        return bow
      default:
        return base
    }
  }

  const weaponModHashes = determineMasterwork(weaponType)

  const masterworkSocketHashes = masterworkSocketEntry.reusablePlugItems
    .filter((plug) => weaponModHashes.includes(plug.plugItemHash))
    .map((plug) => plug.plugItemHash.toString())

  const rawMasterworkData: DestinyInventoryItemDefinition[] = await DestinyInventoryItemDefinitionTable.bulkGet([
    ...masterworkSocketHashes,
    emptyMasterworkSocketHash.toString(),
  ])

  return await Promise.all(
    rawMasterworkData.map(async (masterwork) => {
      console.log('masterwork', masterwork)

      const { iconWatermark, investmentStats, displayProperties, hash } = masterwork
      const { description } = displayProperties
      const icon = handleIcon(displayProperties)
      const watermark = applyBungieDomain(iconWatermark)
      if (masterwork.hash === emptyMasterworkSocketHash) {
        const name = 'Empty Masterwork Socket'
        return { name, description, icon, iconWatermark: watermark, hash }
      }
      const statHash = investmentStats.find((stat) => !stat.isConditionallyActive)!.statTypeHash
      const stat = await DestinyStatDefinitionTable.get(statHash.toString())
      const { displayProperties: statDisplayProperties } = stat
      const { name: statName, description: statDescription } = statDisplayProperties

      return {
        iconWatermark: watermark,
        name: statName,
        description: statDescription,
        icon,
        hash,
      }
    })
  )
}
const getSocketEntriesFromCategory = (hash: number, sockets: DestinyItemSocketBlockDefinition) => {
  const socketIndices =
    sockets.socketCategories.find((socket) => socket.socketCategoryHash === hash)?.socketIndexes || []
  return socketIndices.map((socketIndex: number) => {
    return sockets.socketEntries[socketIndex]
  })
}

export const handleIntrinsic = async (sockets: DestinyItemSocketBlockDefinition) => {
  const intrinsicHash = 3956125808
  const intrinsicSocketEntry = getSocketEntriesFromCategory(intrinsicHash, sockets)
  if (intrinsicSocketEntry.length === 0) return null
  const intrinsicSocketHash = intrinsicSocketEntry[0].singleInitialItemHash
  const intrinsicSocketData = await DestinyInventoryItemDefinitionTable.get(intrinsicSocketHash.toString())
  return formatBasicDisplayData(intrinsicSocketData)
}
export const handleCatalyst = async (data: DestinyItemSocketEntryDefinition[]) => {
  if (data.length === 0) return null
  const catalystHash = 1498917124 // this is actually the hash for the empty catalyst. Using this to find the catalyst socket entry
  const catalystSocketEntry = data.find((socket) => socket.singleInitialItemHash === catalystHash)
  if (!catalystSocketEntry) return null
  const catalystSocketHash = catalystSocketEntry.reusablePlugItems[0].plugItemHash
  const catalystSocketData = await DestinyInventoryItemDefinitionTable.bulkGet([
    catalystSocketHash.toString(),
    catalystSocketEntry.singleInitialItemHash.toString(),
  ])
  return catalystSocketData.map((socketItem) => formatBasicDisplayData(socketItem))
}
export const handleWeaponSockets = async (sockets: DestinyItemSocketBlockDefinition, type: string) => {
  // mods returns -> mods, deepsight, masterwork, catalyst
  // <= legendary -> mods, deepsight, masterwork
  // exotic -> deepsight, catalyst
  // socketCategories
  const perksHash = 4241085061
  const modsHash = 2685412949
  const intrinsic = await handleIntrinsic(sockets)
  const perks = await handleWeaponPerks(perksHash, sockets)
  const { mods, deepsight, catalyst, masterwork } = await handleModSockets(modsHash, sockets, type)

  return { intrinsic, perks, deepsight, mods, masterwork, catalyst }
}
