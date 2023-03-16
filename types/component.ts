import { DestinyProfile } from './user'
import { VendorReceipts } from './vendor'

export type ComponentResponse = {
  [key in DestinyComponentNumber]: ComponentData
}

export type ComponentResponseWrapper = {
  data: ComponentData
  privacy: number
  disabled: boolean | null
}

export type ComponentData = DestinyProfile | VendorReceipts

export enum DestinyComponentNumber {
  profile = 100,
  vendorReceipts = 101,
  profileInventory = 102,
  profileCurrencies = 103,
  profileProgression = 104,
  platformSilver = 105,
  characters = 200,
  characterInventories = 201,
  characterProgressions = 202,
  characterRenderData = 203,
  characterActivities = 204,
  characterEquipment = 205,
  itemInstances = 300,
  itemObjectives = 301,
  itemPerks = 302,
  itemRenderData = 303,
  itemStats = 304,
  itemSockets = 305,
  itemTalentGrids = 306,
  itemCommonData = 307,
  itemPlugStates = 308,
  itemPlugObjectives = 309,
  itemReusablePlugs = 310,
  vendors = 400,
  vendorCategories = 401,
  vendorSales = 402,
  kiosks = 500,
  currencyLookups = 600,
  presentationNodes = 700,
  collectibles = 800,
  records = 900,
  transitory = 1000,
  metrics = 1100,
  stringVariables = 1200,
  craftables = 1300,
}
