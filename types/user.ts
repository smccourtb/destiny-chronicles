import { GroupUserInfoCard } from './groups'

export type GeneralUser = {
  membershipId: number
  uniqueName: string
  normalizedName: string
  displayName: string
  profilePicture: number
  profileTheme: number
  userTitle: number
  successMessageFlags: number
  isDeleted: boolean
  about: string
  firstAccess: string
  lastUpdate: string
  legacyPortalUID?: number
  context: UserToUserContext
  xboxDisplayName: string
  psnDisplayName: string
  fbDisplayName: string
  showActivity?: boolean
  locale: string
  localeInheritDefault: boolean
  lastBanReportId?: number
  showGroupMessaging: boolean
  profilePicturePath: string
  profilePictureWidePath: string
  profileThemeName: string
  userTitleDisplay: string
  statusText: string
  statusDate: string
  profileBanExpire?: string
  blizzardDisplayName: string
  steamDisplayName: string
  stadiaDisplayName: string
  twitchDisplayName: string
  cachedBungieGlobalDisplayName: string
  cachedBungieGlobalDisplayNameCode: number
  egsDisplayName: string
}

export type DestinyProfile = {
  /**
   * @description If you need to render the Profile (their platform name, icon, etc...) somewhere, this property
   *     contains that information.
   */
  userInfo: UserInfoCard
  /**
   * @description The last time the user played with any character on this Profile.
   * @remarks This says its type date-time on the API docs. Noting here if I run into issues with my type as a string.
   *     It may be a Date type
   */
  dateLastPlayed: string
  /**
   * @description If you want to know what expansions they own, this will contain that json.
   *
   * @description IMPORTANT: This field may not return the json you're interested in for Cross-Saved users. It returns
   *     the last ownership json we saw for this account - which is to say, what they've purchased on the platform on
   *     which they last played, which now could be a different platform.
   *
   * @description If you don't care about per-platform ownership and only care about whatever platform it seems they
   *     are playing on most recently, then this should be "good enough." Otherwise, this should be considered
   *     deprecated. We do not have a good alternative to provide at this time with platform specific ownership json
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

export type UserMembershipData = {
  bungieNetUser: GeneralUser
  /**
   * @description this allows you to see destiny memberships that are visible and linked to this account (regardless of whether or not they have characters on the world server)
   */
  destinyMemberships: GroupUserInfoCard[]
  /**
   * @description If this property is populated, it will have the membership ID of the account considered to be "primary" in this user's cross save relationship.
   *
   * If null, this user has no cross save relationship, nor primary account.
   */
  primaryMembershipId: string | null
}

export type UserSearchPrefixRequest = {
  displayNamePrefix: string
}

export type UserSearchResponse = {
  searchResults: UserSearchResponseDetail[]
  page: number
  hasMore: boolean
}

export type UserSearchResponseDetail = {
  bungieGlobalDisplayName: string
  bungieGlobalDisplayNameCode: number | null
  bungieNetMembershipId: number | null
  destinyMemberships: UserInfoCard[]
}

/**
 * @description This contract supplies basic information commonly used to display a minimal amount of information about a user. Take care to not add more properties here unless the property applies in all (or at least the majority) of the situations where UserInfoCard is used. Avoid adding game specific or platform specific details here. In cases where UserInfoCard is a subset of the data needed in a contract, use UserInfoCard as a property of other contracts.
 */
export type UserInfoCard = {
  /**
   * @description A platform specific additional display name - ex: psn Real Name, bnet Unique Name, etc.
   */
  supplementalDisplayName: string
  /**
   * @description URL the Icon if available.
   */
  iconPath: string
  /**
   * @description If there is a cross save override in effect, this value will tell you the type that is overridding this one.
   */
  crossSaveOverride: number
  /**
   * @description The list of Membership Types indicating the platforms on which this Membership can be used.
   *
   * Not in Cross Save = its original membership type. Cross Save Primary = Any membership types it is overridding, and its original membership type Cross Save Overridden = Empty list
   */
  applicableMembershipTypes: number[]
  /**
   * @description If True, this is a public user membership.
   */
  isPublic: boolean
  /**
   * @description Membership ID as the user is known in the Accounts service
   */
  membershipType: number
  /**
   * @description Display Name the player has chosen for themselves. The display name is optional when the data type is used as input to a platform API.
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

export type UserToUserContext = {
  isFollowing: boolean
  ignoreStatus: { isIgnored: boolean; ignoreFlags: number }
  globalIgnoreEndDate: string | null
}

export enum BungieMembershipType {
  None = 0,
  TigerXbox = 1,
  TigerPsn = 2,
  TigerSteam = 3,
  TigerBlizzard = 4,
  TigerStadia = 5,
  TigerEgs = 6,
  TigerDemon = 10,
  BungieNext = 254,
  All = -1,
}
