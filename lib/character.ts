import { DestinyProfile } from '../types/user'
import { BungieResponse } from './articles'

/**
 * @description Returns Destiny Profile information for the supplied membership.
 * @param destinyMembershipId - Destiny membership ID. We can get this from session.user.primaryMembershipId
 * @param membershipType Destiny membership type. See {@link BungieMembershipType}
 * @param components - An array of numbers. See {@link destinyComponents}
 * @example
 *  getProfile("4611686018450406185", 3, [100, 200]) => { data: [ DestinyProfile, DestinyCharacterComponent[] ], error:
 *     null }
 * @returns data related to the components requested stored in an array. If an error occurs, the error will be returned
 */
export async function getProfile(
  destinyMembershipId: string,
  membershipType: number, // enum BungieMembershipType
  components: number[]
) {
  try {
    const query = components.map((component) => component).join(',')

    const res = await fetch(
      `${
        process.env.DESTINY_API_ROOT_PATH
      }/Platform/Destiny2/${membershipType.toString()}/Profile/${destinyMembershipId}/?components=${query}`,
      {
        method: 'GET',
        headers: {
          'X-API-Key': process.env.DESTINY_API_KEY as string,
        },
      }
    )
    if (!res.ok) {
      return { error: { message: res.statusText }, data: null }
    }

    const searchedComponents: string[] = components.map((component) => destinyComponentMap[component])

    const response: GetProfileResponse = await res.json()
    const { Response } = response

    const data = searchedComponents.map((key) => {
      const searchedData = Response[key].data
      if (!searchedData) {
        const privacy = Response[key].privacy
        throw Error(
          `No data property found, check to make sure what you are searching for has the data property at the top level ${
            privacy > 1 && 'This is most likely because the users privacy setting is not public'
          }`
        )
      }
      return searchedData
    })
    return { data, error: null }
  } catch (error) {
    return { error, data: null }
  }
}

export type DestinyComponents = {
  [key: string]: number
}

/**
 * @namespace DestinyComponents
 */
export const destinyComponents: DestinyComponents = {
  /**
   * @description profile is the most basic component, only relevant when calling GetProfile. This returns basic
   *     information about the profile, which is almost nothing: a list of characterIds, some information about
   *     the last time you logged in, and that most sobering statistic: how long you've played.
   */
  profile: 100,
  vendorReceipts: 101,
  profileInventories: 102,
  profileCurrencies: 103,
  profileProgression: 104,
  platformSilver: 105,
  characters: 200,
  characterInventories: 201,
  characterProgressions: 202,
  characterRenderData: 203,
  characterActivities: 204,
  characterEquipment: 205,
  itemInstances: 300,
  itemObjectives: 301,
  itemPerks: 302,
  itemRenderData: 303,
  itemStats: 304,
  itemSockets: 305,
  itemTalentGrids: 306,
  itemCommonData: 307,
  itemPlugStates: 308,
  itemPlugObjectives: 309,
  itemReusablePlugs: 310,
  vendors: 400,
  vendorCategories: 401,
  vendorSales: 402,
  kiosks: 500,
  currencyLookups: 600,
  presentationNodes: 700,
  collectibles: 800,
  records: 900,
  transitory: 1000,
  metrics: 1100,
  stringVariables: 1200,
  craftables: 1300,
}

export type DestinyComponentMap = {
  [key: number]: string
}

export const destinyComponentMap: DestinyComponentMap = {
  100: 'profile',
  101: 'vendorReceipts',
  102: 'profileInventories',
  103: 'profileCurrencies',
  104: 'profileProgression',
  105: 'platformSilver',
  200: 'characters',
  201: 'characterInventories',
  202: 'characterProgressions',
  203: 'characterRenderData',
  204: 'characterActivities',
  205: 'characterEquipment',
  300: 'itemInstances',
  301: 'itemObjectives',
  302: 'itemPerks',
  303: 'itemRenderData',
  304: 'itemStats',
  305: 'itemSockets',
  306: 'itemTalentGrids',
  307: 'itemCommonData',
  308: 'itemPlugStates',
  309: 'itemPlugObjectives',
  310: 'itemReusablePlugs',
  400: 'vendors',
  401: 'vendorCategories',
  402: 'vendorSales',
  500: 'kiosks',
  600: 'currencyLookups',
  700: 'presentationNodes',
  800: 'collectibles',
  900: 'records',
  1000: 'transitory',
  1100: 'metrics',
  1200: 'stringVariables',
  1300: 'craftables',
}

/**
 * @namespace ItemQuantity
 * @description Used in a number of Destiny contracts to return data about an item stack and its quantity. Can
 *     optionally return an itemInstanceId if the item is instanced - in which case, the quantity returned will be 1.
 *     If it's not... uh, let me know okay? Thanks.
 */
export type ItemQuantity = {
  itemHash: number
  itemInstanceId: number
  quantity: number
  hasConditionalVisibility: boolean
}

/**
 * @namespace VendorReceipt
 * @description If a character purchased an item that is refundable, a Vendor Receipt will be created on the user's
 *     Destiny Profile. These expire after a configurable period of time, but until then can be used to get refunds on
 *     items. BNet does not provide the ability to refund a purchase *yet*, but you know.
 */
export type VendorReceipt = {
  currencyPaid: ItemQuantity[]
  itemReceived: ItemQuantity
  licenseUnlockHash: number
  purchasedByCharacterId: number
  refundPolicy: number
  sequenceNumber: number
  timeToExpiration: number
  expiresOn: string
}
export type VendorReceipts = { receipts: VendorReceipt[] }

/**
 * @see {@link VendorReceipt}
 */
export type VendorReceiptsWrapper = {
  data: VendorReceipts
  privacy: number
  disabled: boolean | null
}

export type BungieResponseWrapper<T> = {
  data: T
  privacy: number
  disabled: boolean | null
}

export type GetProfile = {
  [key: string]: any
  profile?: BungieResponseWrapper<DestinyProfile>
  vendorReceipts?: VendorReceiptsWrapper
}

type GetProfileResponse = BungieResponse<GetProfile>

export type InternalFetchResponse<T> = { data: T | null; error: Error | null }
