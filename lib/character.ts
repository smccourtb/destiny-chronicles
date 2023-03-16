import { BungieResponse } from './articles'
import { ComponentResponse, ComponentResponseWrapper } from '../types/component'
import { logError, logInfo } from '../logger/logger'

export const destinyComponents = {
  /**
   * @description profile is the most basic component, only relevant when calling GetProfile. This returns basic
   *     information about the profile, which is almost nothing: a list of characterIds, some information about
   *     the last time you logged in, and that most sobering statistic: how long you've played.
   */
  profile: 100,
  vendorReceipts: 101,
  /**
   * @description profileInventory is the set of items on your profile (not on your characters). Items in inventory tab
   *     in-game, and the vault
   */
  profileInventory: 102,
  profileCurrencies: 103,
  profileProgression: 104,
  platformSilver: 105,
  characters: 200,
  /** @description characterInventories is the set of items on your character(s) */
  characterInventories: 201,
  characterProgressions: 202,
  /**
   * @description characterRenderData is a set of cosmetic information that we use to render your character in 3D. THe
   *     property peerView holds the characters **equipped** inventory
   */
  characterRenderData: 203,
  characterActivities: 204,
  /**
   * @description characterEquipment is the set of items on your character(s) that are equipped. Better than from
   *     {@link characterRenderData}
   */
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

export const destinyComponentMap: { [key: number | string]: string } = {
  100: 'profile',
  101: 'vendorReceipts',
  102: 'profileInventory',
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
 * @description Returns Destiny Profile information for the supplied membership. the components can tailor the response
 *     type
 * @param destinyMembershipId - Destiny membership ID. We can get this from session.user.primaryMembershipId
 * @param membershipType Destiny membership type. See {@link BungieMembershipType}
 * @param components - An array of numbers. See {@link destinyComponents}
 * @example
 *  getProfile("4611686018450406185", 3, [100, 200]) => { json: [ DestinyProfile, DestinyCharacterComponent[] ], error:
 *     null }
 * @returns json related to the components requested stored in an array. If an error occurs, the error will be returned
 */
export async function getProfile(
  destinyMembershipId: string | number,
  membershipType: string | number, // enum BungieMembershipType
  components: string[] | number[]
) {
  const query = components.map((component) => component).join(',')
  const res = await fetch(
    `https://www.bungie.net/Platform/Destiny2/${membershipType.toString()}/Profile/${destinyMembershipId}/?components=${query}`,
    {
      method: 'GET',
      headers: {
        'X-API-Key': process.env.DESTINY_API_KEY as string,
      },
    }
  )
  if (!res.ok) {
    return { error: new Error(res.statusText), data: null }
  }

  const response: GetProfileApiResponse = await res.json()
  const { Response } = response

  // convert the components to the correct string, so we can access the response json. It's nested as the property name
  const convertedProperties: string[] = components.map((component) => destinyComponentMap[component])

  const data = {}
  convertedProperties.forEach((key) => {
    const searchedData = Response[key]?.data
    if (!searchedData) {
      console.warn(`No data property found Response.${key}, returning data from Response instead`)
      Object.assign(data, { [key]: Response[key] })
    } else {
      Object.assign(data, { [key]: searchedData })
    }
  })
  // check that length of json is equal to length of components
  if (Object.keys(data).length > 0) {
    return { data, error: null } as { data: ComponentResponse; error: null }
  } else {
    return { data: null, error: new Error('No data found') }
  }
}

export const getEmblemBackground = async (itemHash: string | number) => {
  const response = await fetch(
    `https://bungie.net/Platform/Destiny2/Manifest/DestinyInventoryItemDefinition/${itemHash}/`,
    {
      method: 'GET',
      headers: {
        'X-API-Key': process.env.DESTINY_API_KEY as string,
      },
    }
  )
  if (response.ok) {
    const data = await response.json()
    const { Response } = data
    const { secondarySpecial, secondaryOverlay } = Response
    return { data: { secondarySpecial, secondaryOverlay }, error: null }
  } else {
    return { data: null, error: new Error(response.statusText) }
  }
}

export const getSeasonData = async (seasonHash: string | number) => {
  const response = await fetch(
    `https://www.bungie.net/Platform/Destiny2/Manifest/DestinySeasonDefinition/${seasonHash}/`,
    {
      method: 'GET',
      headers: {
        'X-API-Key': process.env.DESTINY_API_KEY as string,
      },
    }
  )
  if (response.ok) {
    logInfo('Season data fetched successfully')
    const data = await response.json()
    console.log(data)
    const { Response } = data
    const { displayProperties, seasonNumber } = Response
    return { data: { seasonIcon: displayProperties.icon, seasonNumber }, error: null }
  } else {
    logError('Error fetching season data')
    return { data: null, error: new Error(response.statusText) }
  }
}
type GetProfileResponse = {
  [key: string]: ComponentResponseWrapper
}

type GetProfileApiResponse = BungieResponse<GetProfileResponse>
