export type GroupUserInfoCard = {
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
   * @description Display Name the player has chosen for themselves. The display name is optional when the json type
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
