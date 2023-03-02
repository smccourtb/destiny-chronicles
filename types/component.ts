import { DestinyProfile } from './user'
import { VendorReceipts } from './vendor'

export type ComponentResponse = {
  [key in ComponentTitle]: ComponentData
}

export type ComponentResponseWrapper = {
  data: ComponentData
  privacy: number
  disabled: boolean | null
}

export type ComponentData = DestinyProfile | VendorReceipts

export type ComponentTitle =
  | 'profile'
  | 'vendorReceipts'
  | 'profileInventory'
  | 'profileCurrencies'
  | 'profileProgression'
  | 'platformSilver'
  | 'characters'
  | 'characterInventories'
  | 'characterProgressions'
  | 'characterRenderData'
  | 'characterActivities'
  | 'characterEquipment'
  | 'itemInstances'
  | 'itemObjectives'
  | 'itemPerks'
  | 'itemRenderData'
  | 'itemStats'
  | 'itemSockets'
  | 'itemTalentGrids'
  | 'itemCommonData'
  | 'itemPlugStates'
  | 'itemPlugObjectives'
  | 'itemReusablePlugs'
  | 'vendors'
  | 'vendorCategories'
  | 'vendorSales'
  | 'kiosks'
  | 'currencyLookups'
  | 'presentationNodes'
  | 'collectibles'
  | 'records'
  | 'transitory'
  | 'metrics'
  | 'stringVariables'
  | 'craftables'

export type DestinyComponentNumber =
  | 100
  | 101
  | 102
  | 103
  | 104
  | 105
  | 200
  | 201
  | 202
  | 203
  | 204
  | 205
  | 300
  | 301
  | 302
  | 303
  | 304
  | 305
  | 306
  | 307
  | 308
  | 309
  | 310
  | 400
  | 401
  | 402
  | 500
  | 600
  | 700
  | 800
  | 900
  | 1000
  | 1100
  | 1200
  | 1300
