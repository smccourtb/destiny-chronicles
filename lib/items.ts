import {
  DestinyDamageTypeDefinitionTable,
  DestinyInventoryItemDefinitionTable,
  DestinyLoreDefinitionTable,
  DestinyPresentationNodeDefinitionTable,
  DestinyStatDefinitionTable,
} from '../database.config'
import { DestinyDisplayProperties, DestinyInventoryItemDefinition, DestinyLoreDefinition } from '../types'
import { applyBungieDomain } from '../utils/url-handling'
import { handleWeaponStats } from './weapons/stats'
import { formatBasicDisplayData, handleWeaponSockets } from './weapons/sockets'

export type GetWeaponReturn = {
  data: WeaponData | null
  error: Error | null
}

export type WeaponData = {
  hash: number
  name: string
  icon: string | null
  rarity: string
  type: string
  damageType: FormattedDamageType
  ammoType: FormattedDisplay | null
  screenshot: string | null
  flavorText: string | null
  perks: FormattedPerk[][]
  stats: FormattedStat[]
  mods: FormattedMod[] | null
  deepsight: any | null
  masterwork: any[] | null
  catalyst: FormattedDisplay[] | null
  intrinsic: FormattedDisplay | null
  lore: FormattedLore | null
}

export interface FormattedLore extends FormattedDisplay {
  subtitle: string
}

export type FormattedDisplay = {
  name: string
  description: string
  icon: string | null
  hash: number
}

export type FormattedPerk = {
  displayProperties: DestinyDisplayProperties
  itemTypeDisplayName: string
  hash: number
}

export type FormattedDamageType = {
  name: string
  description: string
  icon: string | null
}

export interface FormattedStat extends FormattedDisplay {
  value: number
  progressBar: boolean
  sortIndex: number
}

export interface FormattedMod extends FormattedDisplay {
  itemTypeDisplayName: string
}

export const getWeapon = async (hash: string | number): Promise<GetWeaponReturn> => {
  try {
    const data: DestinyInventoryItemDefinition = await DestinyInventoryItemDefinitionTable.get(hash.toString())
    if (!data) {
      return { data: null, error: new Error('No data found') }
    }
    const {
      loreHash,
      equippingBlock,
      displayProperties,
      screenshot,
      flavorText,
      defaultDamageTypeHash,
      iconWatermark,
      itemTypeAndTierDisplayName,
      stats,
      sockets,
      hash: weaponHash,
    } = data
    console.log('data', data)

    const icon = handleIcon(displayProperties)
    const { name } = displayProperties
    const [rarity, ...typeArr] = itemTypeAndTierDisplayName.split(' ')
    const type = typeArr.join(' ')
    const baseData = { name, icon, screenshot: applyBungieDomain(screenshot), flavorText, iconWatermark, rarity, type }
    const damageType = await handleWeaponDamageType(defaultDamageTypeHash)
    const ammoType = await handleAmmoType(equippingBlock?.ammoType)
    const lore = await handleWeaponLore(loreHash)
    const { perks, mods, masterwork, deepsight, catalyst, intrinsic } = await handleWeaponSockets(sockets, type)

    const formattedStats = await handleWeaponStats(
      stats,
      DestinyStatDefinitionTable.bulkGet.bind(DestinyStatDefinitionTable)
    )
    return {
      data: {
        ...baseData,
        perks,
        stats: formattedStats,
        mods,
        deepsight,
        masterwork,
        damageType,
        ammoType,
        catalyst,
        intrinsic,
        lore,
        hash: weaponHash,
      },
      error: null,
    }
  } catch (err) {
    return { data: null, error: err as Error }
  }
}

export const handleAmmoType = async (ammoType: number) => {
  let ammoTypeHash = null
  switch (ammoType) {
    case 1:
      ammoTypeHash = 1731162900 // Kinetic
      break
    case 2:
      ammoTypeHash = 3098463839 // Special
      break
    case 3:
      ammoTypeHash = 3253265639 // Heavy
      break
    default:
      return null // Return null for invalid ammo types
  }

  const ammoTypeDefinition = await DestinyPresentationNodeDefinitionTable.get(ammoTypeHash.toString())
  return formatBasicDisplayData(ammoTypeDefinition)
}

export const handleIcon = (displayProperties: DestinyDisplayProperties) => {
  const { hasIcon } = displayProperties
  if (hasIcon) {
    return applyBungieDomain(displayProperties.icon)
  }
  return null
}

export const handleWeaponDamageType = async (damageTypeHash: number) => {
  const damageType = await DestinyDamageTypeDefinitionTable.get(damageTypeHash.toString())
  return formatBasicDisplayData(damageType)
}

export const handleWeaponLore = async (loreHash: number) => {
  if (!loreHash) {
    return null
  }
  const lore: DestinyLoreDefinition = await DestinyLoreDefinitionTable.get(loreHash.toString())
  const { subtitle } = lore
  const basicData = formatBasicDisplayData(lore)
  return { ...basicData, subtitle }
}
