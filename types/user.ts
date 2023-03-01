import { BungieResponse } from '../lib/articles'

/**
 * @namespace BungieNetUser
 */
export type BungieNetUser = {
  membershipId: number
  uniqueName: string
  displayName: string
  profilePicture: number
  profileTheme: number
  userTitle: number
  successMessageFlags: number
  isDeleted: boolean
  about: string
  firstAccess: string
  lastUpdate: string
  context: {
    isFollowing: boolean
    ignoreStatus: { isIgnored: boolean; ignoreFlags: number }
    globalIgnoreEndDate: string | null
  }
  xboxDisplayName: string
  psnDisplayName: string
  showActivity: boolean
  locale: string
  localeInheritDefault: boolean
  showGroupMessaging: boolean
  profilePicturePath: string
  profileThemeName: string
  userTitleDisplay: string
  statusText: string
  statusDate: string
  steamDisplayName: string
  cachedBungieGlobalDisplayName: string
  cachedBungieGlobalDisplayNameCode: number
}

export enum BungieMembershipType {
  'TigerXbox' = 1,
  'TigerPsn' = 2,
  'TigerSteam' = 3,
}

/**
 * @namespace DestinyMembership
 * @property {string} LastSeenDisplayName - **This will be the display name the clan server last saw the user as. If
 *     the account is an active cross save override, this will be the display name to use. Otherwise, this will match
 *     the displayName property.**
 * @property {number} LastSeenDisplayNameType - **The platform of the LastSeenDisplayName.**
 * @see {@link DestinyUserInfo}
 */
export interface DestinyMembership extends DestinyUser {
  /**
   * @description This will be the display name the clan server last saw the user as. If
   *     the account is an active cross save override, this will be the display name to use. Otherwise, this will
   *     match the displayName property.
   */
  LastSeenDisplayName: string
  /**
   * @description The platform of the LastSeenDisplayName.
   */
  LastSeenDisplayNameType: number // enum BungieMembershipType
}

/**
 * @namespace DestinyProfile
 * @property {DestinyUser} userInfo - **If you need to render the Profile (their platform name, icon, etc...)
 *     somewhere, this property contains that information.**
 * @property {string} dateLastPlayed - **The last time the user played with any character on this Profile.**
 * @property {number} versionsOwned - **If you want to know what expansions they own, this will contain that data.**
 *
 *     **IMPORTANT:** This field may not return the data you're interested in for Cross-Saved users. It returns the last
 *     ownership data we saw for this account - which is to say, what they've purchased on the platform on which they
 *     last played, which now could be a different platform.
 *
 *     **If you don't care about per-platform ownership and only care about whatever platform it seems they
 *     are playing on most recently, then this should be "good enough." Otherwise, this should be considered
 *     deprecated. We do not have a good alternative to provide at this time with platform specific ownership data
 *     for DLC.**
 *
 * @property {number[]} charactersIds - **A list of the character IDs, for further querying on your part.**
 * @property {number[]} seasonHashes - **A list of hashes for event cards that a profile owns. Unlike most values in
 *     versionsOwned, these stay with the profile across all platforms.**
 * @property {number[]} eventCardHashesOwned - **A list of hashes for event cards that a profile owns. Unlike most
 *     values in versionsOwned, these stay with the profile across all platforms.**
 * @property {number} currentSeasonHash - **If populated, this is a reference to the season that is currently active.**
 * @property {number | null} currentSeasonRewardPowerCap - **If populated, this is the reward power cap for the current
 *     season.**
 * @property {number | null} activeEventCardHash - **The 'current' Guardian Rank value, which starts at rank 1.**
 * @property {number} currentGuardianRank - **The 'current' Guardian Rank value, which starts at rank 1.**
 * @property {number} lifetimeHighestGuardianRank - **The 'lifetime highest' Guardian Rank value, which starts at rank
 *     1.**
 * */

export type DestinyProfile = {
  /**
   * @description If you need to render the Profile (their platform name, icon, etc...) somewhere, this property
   *     contains that information.
   */
  userInfo: DestinyUser
  /**
   * @description The last time the user played with any character on this Profile.
   * @remarks This says its type date-time on the API docs. Noting here if I run into issues with my type as a string.
   *     It may be a Date type
   */
  dateLastPlayed: string
  /**
   * @description If you want to know what expansions they own, this will contain that data.
   *
   * @description IMPORTANT: This field may not return the data you're interested in for Cross-Saved users. It returns
   *     the last ownership data we saw for this account - which is to say, what they've purchased on the platform on
   *     which they last played, which now could be a different platform.
   *
   * @description If you don't care about per-platform ownership and only care about whatever platform it seems they
   *     are playing on most recently, then this should be "good enough." Otherwise, this should be considered
   *     deprecated. We do not have a good alternative to provide at this time with platform specific ownership data
   *     for DLC.
   */
  versionsOwned: number
  /**
   * @description A list of the character IDs, for further querying on your part.
   */
  characterIds: number[]
  /**
   * @description A list of seasons that this profile owns. Unlike versionsOwned, these stay with the profile across
   *     Platforms, and thus will be valid.
   *
   * @description It turns out that Stadia Pro subscriptions will give access to seasons but only while playing on
   *     Stadia and with an active subscription. So some users (users who have Stadia Pro but choose to play on some
   *     other platform) won't see these as available: it will be whatever seasons are available for the platform on
   *     which they last played.
   *
   * @remarks Use a value to search season related info
   */
  seasonHashes: number[]
  /**
   * @description A list of hashes for event cards that a profile owns. Unlike most values in versionsOwned, these
   *     stay with the profile across all platforms.
   */
  eventCardHashesOwned: number[]
  /**
   * @description If populated, this is a reference to the season that is currently active.
   */
  currentSeasonHash: number | null
  /**
   * @description If populated, this is the reward power cap for the current season.
   */
  currentSeasonRewardPowerCap: number | null
  /**
   * @description If populated, this is a reference to the event card that is currently active.
   */
  activeEventCardHash: number | null
  /**
   * @description The 'current' Guardian Rank value, which starts at rank 1.
   */
  currentGuardianRank: number
  /**
   * @description The 'lifetime highest' Guardian Rank value, which starts at rank 1.
   */
  lifetimeHighestGuardianRank: number
}

/**
 * @see {@link https://bungie-net.github.io/#/components/schemas/User.UserInfoCard}
 * @namespace DestinyUser
 * @property {string} supplementalDisplayName - **A platform specific additional display name**
 * @property {string} iconPath - **URL the Icon if available.**
 * @property {number} crossSaveOverride - **If there is a cross save override in effect, this value will tell you the
 *    type that is overriding this one.**
 * @property {number[]} applicableMembershipTypes - **The list of Membership Types indicating the platforms on which
 *   this Membership can be used.**
 * @property {boolean} isPublic - **If True, this is a public user membership.**
 * @property {number} membershipType - **The type of the membership. Not necessarily the native type.**
 * @property {string} membershipId - **The Destiny membership ID as they user is known in the Accounts service**
 * @property {string} displayName - **The display name the player has chosen for themselves. The display name is
 *     optional when the data type is used as input to a platform API.**
 * @property {string} bungieGlobalDisplayName - **The bungie global display name, if set.**
 * @property {number} bungieGlobalDisplayNameCode - **The bungie global display name code, if set.**
 */

export type DestinyUser = {
  /**
   * @description A platform specific additional display name
   * @example
   * psn Real Name, bnet Unique Name, etc.
   */
  supplementalDisplayName: string
  /**
   * @description URL the Icon if available.
   */
  iconPath: string
  /**
   * @description If there is a cross save override in effect, this value will tell you the type that is overriding
   *     this one.
   */
  crossSaveOverride: number
  /**
   * @description The list of Membership Types indicating the platforms on which this Membership can be used.
   *
   * @description Not in Cross Save = its original membership type. Cross Save Primary = Any membership types it is
   *     overriding, and its original membership type Cross Save Overridden = Empty list
   */
  applicableMembershipTypes: number[]
  /**
   * @description If True, this is a public user membership.
   */
  isPublic: boolean
  /**
   * @description Type of the membership. Not necessarily the native type.
   **/
  membershipType: number
  /**
   * @description The membership ID as they user is known in the Accounts service
   **/
  membershipId: string
  /**
   * @description Display Name the player has chosen for themselves. The display name is optional when the data type
   *     is used as input to a platform API.
   */
  displayName: string
  /**
   * @description The bungie global display name, if set.
   */
  bungieGlobalDisplayName: string
  /**
   * @description The bungie global display name code, if set.
   */
  bungieGlobalDisplayNameCode: number | null
}

/**
 * @namespace GetMembershipsForCurrentUserResponse
 * @property {DestinyMembership} destinyMemberships - **this allows you to see destiny memberships that are visible
 *     and linked to this account (regardless of whether they have characters on the world server)**
 */

export type UserMemberships = {
  bungieNetUser: BungieNetUser
  destinyMemberships: DestinyMembership[]
  primaryMembershipId: string
}

export type GetMembershipsForCurrentUserResponse = UserMemberships & BungieResponse
