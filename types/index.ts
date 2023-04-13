export type DestinyInventoryItemDefinition = {
  displayProperties: DestinyDisplayProperties
  tooltipNotifications: DestinyItemTooltipNotification[]
  collectibleHash: DestinyCollectibleDefinition
  iconWatermark: string
  iconWatermarkShelved: string
  secondaryIcon: string
  secondaryOverlay: string
  secondarySpecial: string
  backgroundColor: DestinyColor
  screenshot: string
  itemTypeDisplayName: string
  flavorText: string
  uiItemDisplayStyle: string
  itemTypeAndTierDisplayName: string
  displaySource: string
  tooltipStyle: string
  action: DestinyItemActionBlockDefinition
  crafting: DestinyItemCraftingBlockDefinition
  inventory: DestinyItemInventoryBlockDefinition
  setData: DestinyItemSetBlockDefinition
  stats: DestinyItemStatBlockDefinition
  emblemObjectiveHash: number
  equippingBlock: {
    gearsetItemHash: number
    uniqueLabel: string
    uniqueLabelHash: number
    equipmentSlotTypeHash: number
    attributes: number
    ammoType: number
    displayStrings: string[]
  }
  translationBlock: {
    weaponPatternIdentifier: string
    weaponPatternHash: number
    defaultDyes: DestinyItemDyeReference[]
    lockedDyes: DestinyItemDyeReference[]
    customDyes: DestinyItemDyeReference[]
    arrangements: DestinyGearArtArrangementReference[]
    hasGeometry: boolean
  }
  preview: DestinyItemPreviewBlockDefinition
  quality: DestinyItemQualityBlockDefinition
  value: DestinyItemValueBlockDefinition
  sourceData: DestinyItemSourceBlockDefinition
  objectives: DestinyItemObjectiveBlockDefinition
  metrics: DestinyItemMetricBlockDefinition
  plug: DestinyItemPlugDefinition
  gearset: DestinyItemGearsetBlockDefinition
  sack: DestinyItemSackBlockDefinition
  sockets: DestinyItemSocketBlockDefinition
  summary: DestinyItemSummaryBlockDefinition
  talentGrid: DestinyItemTalentGridBlockDefinition
  investmentStats: DestinyItemInvestmentStatDefinition[]
  perks: DestinyItemPerkEntryDefinition[]
  loreHash: number
  summaryItemHash: number
  animations: DestinyAnimationReference[]
  allowActions: boolean
  links: DestinyLinkReference[]
  doesPostmasterPullHaveSideEffects: boolean
  nonTransferrable: boolean
  itemCategoryHashes: number[]
  specialItemType: number
  itemType: number
  itemSubType: number
  classType: number
  breakerType: number
  breakerTypeHash: number
  equippable: boolean
  damageTypeHashes: number[]
  damageTypes: number[]
  defaultDamageType: number
  defaultDamageTypeHash: number
  seasonHash: number
  isWrapper: boolean
  traitIds: string[]
  traitHashes: number[]
  hash: number
  index: number
  redacted: boolean
}

export type DestinyLinkReference = {
  title: string
  url: string
}

export type DestinyAnimationReference = {
  animName: string
  animIdentifier: string
  path: string
}

export type DestinyItemPerkEntryDefinition = {
  requirementDisplayString: string
  perkHash: number
  perkVisibility: number
}

export type DestinyItemInvestmentStatDefinition = {
  statTypeHash: number
  value: number
  isConditionallyActive: boolean
}

export type DestinyItemTalentGridBlockDefinition = {
  talentGridHash: number
  itemDetailString: string
  buildName: string
  hudDamageType: number
  hudIcon: string
}

export type DestinyItemSummaryBlockDefinition = {
  sortPriority: number
}

export type DestinyItemSocketBlockDefinition = {
  detail: string
  socketEntries: DestinyItemSocketEntryDefinition[]
  intrinsicSockets: DestinyItemIntrinsicSocketEntryDefinition[]
  socketCategories: DestinyItemSocketCategoryDefinition[]
}

export type DestinyItemSocketCategoryDefinition = {
  socketCategoryHash: number
  socketIndexes: number[]
}

export type DestinyItemIntrinsicSocketEntryDefinition = {
  plugItemHash: number
  socketTypeHash: number
  defaultVisible: boolean
}

export type DestinyItemSocketEntryDefinition = {
  socketTypeHash: number
  singleInitialItemHash: number
  reusablePlugItems: DestinyItemSocketEntryPlugItemDefinition[]
  preventInitializationOnVendorPurchase: boolean
  hidePerksInItemTooltip: boolean
  plugSources: number
  reusablePlugSetHash: number
  randomizedPlugSetHash: number
  defaultVisible: boolean
}

export type DestinyItemSocketEntryPlugItemDefinition = {
  plugItemHash: number
}
export type DestinyItemSackBlockDefinition = {
  detailAction: string
  openAction: string
  selectItemCount: number
  vendorSackType: string
  openOnAcquire: boolean
}

export type DestinyItemGearsetBlockDefinition = {
  trackingValueMax: number
  itemList: number[]
}

export type DestinyItemPlugDefinition = {
  insertionRules: DestinyPlugRuleDefinition[]
  plugCategoryIdentifier: string
  plugCategoryHash: number
  onActionRecreateSelf: boolean
  insertionMaterialRequirementHash: number
  previewItemOverrideHash: number
  enabledMaterialRequirementHash: number
  enabledRules: DestinyPlugRuleDefinition[]
  uiPlugLabel: string
  plugStyle: number
  plugAvailability: number
  alternateUiPlugLabel: string
  alternatePlugStyle: number
  isDummyPlug: boolean
  parentItemOverride: DestinyParentItemOverride
  energyCapacity: DestinyEnergyCapacityEntry
  energyCost: DestinyEnergyCostEntry
}

export type DestinyEnergyCostEntry = {
  energyCost: number
  energyTypeHash: number
  energyType: number
}

export type DestinyEnergyCapacityEntry = {
  capacityValue: number
  energyTypeHash: number
  energyType: number
}

export type DestinyParentItemOverride = {
  additionalEquipRequirementsDisplayStrings: string[]
  pipIcon: string
}

export type DestinyPlugRuleDefinition = {
  failureMessage: string
}

export type DestinyItemMetricBlockDefinition = {
  availableMetricCategoryNodeHashes: number[]
}

export type DestinyItemObjectiveBlockDefinition = {
  objectiveHashes: number[]
  displayActivityHashes: number[]
  requireFullObjectiveCompletion: boolean
  questlineItemHash: number
  narrative: string
  objectiveVerbName: string
  questTypeIdentifier: string
  questTypeHash: number
  perObjectiveDisplayProperties: DestinyObjectiveDisplayProperties[]
  displayAsStatTracker: boolean
}

export type DestinyObjectiveDisplayProperties = {
  activityHash: number
  displayOnItemPreviewScreen: boolean
}

export type DestinyItemSourceBlockDefinition = {
  sourceHashes: number[]
  sources: DestinyItemSourceDefinition[]
  exclusive: number
  vendorSources: DestinyItemVendorSourceReference[]
}

export type DestinyItemVendorSourceReference = {
  vendorHash: number
  vendorItemIndexes: number[]
}

export type DestinyItemSourceDefinition = {
  level: number
  minQuality: number
  maxQuality: number
  minLevelRequired: number
  maxLevelRequired: number
  computedStats: { [key: number]: DestinyItemStatDefinition }
  sourceHashes: { [key: number]: DestinyRewardSourceDefinition }
}

export type DestinyRewardSourceDefinition = {
  displayProperties: DestinyDisplayProperties
  category: number
  hash: number
  index: number
  redacted: boolean
}

export type DestinyItemStatDefinition = {
  statHash: number
  value: number
  minimum: number
  maximum: number
  displayMaximum: number
}

export type DestinyItemValueBlockDefinition = {
  itemValue: DestinyItemQuantity[]
  valueDescription: string
}

export type DestinyItemQuantity = {
  itemHash: number
  itemInstanceId: number
  quantity: number
  hasConditionalVisibility: boolean
}
export type DestinyItemQualityBlockDefinition = {
  itemLevels: number[]
  qualityLevel: number
  infusionCategoryName: string
  infusionCategoryHash: number
  infusionCategoryHashes: number[]
  progressionLevelRequirementHash: number
  currentVersion: number
  versions: DestinyItemVersionDefinition[]
  displayVersionWatermarkIcons: string[]
}

export type DestinyItemVersionDefinition = {
  powerCapHash: number
}

export type DestinyItemPreviewBlockDefinition = {
  screenStyle: string
  previewVendorHash: number
  artifactHash: number
  previewActionString: string
  derivedItemCategories: DestinyDerivedItemCategoryDefinition[]
}

export type DestinyDerivedItemCategoryDefinition = {
  categoryDescription: string
  items: DestinyDerivedItemDefinition[]
}

export type DestinyDerivedItemDefinition = {
  itemHash: number
  itemName: string
  itemDetail: string
  itemDescription: string
  iconPath: string
  vendorItemIndex: number
}
export type DestinyItemDyeReference = {
  channelHash: number
  dyeHash: number
}

export type DestinyGearArtArrangementReference = {
  classHash: number
  artArrangementHash: number
}

export type DestinyItemStatBlockDefinition = {
  disablePrimaryStatDisplay: boolean
  statGroupHash: number
  stats: { [key: number]: DestinyInventoryItemStatDefinition }
  hasDisplayableStats: boolean
  primaryBaseStatHash: number
}

export type DestinyStatDefinition = {
  displayProperties: DestinyDisplayProperties
  aggregationType: number
  hasComputedBlock: boolean
  statCategory: number
  hash: number
  index: number
  redacted: boolean
  blacklisted: boolean
}

export type DestinyInventoryItemStatDefinition = {
  statHash: number // DestinyStatDefinition
  value: number
  minimum: number
  maximum: number
  displayMaximum: number
}

export type DestinyItemSetBlockDefinition = {
  itemList: DestinyItemSetBlockEntryDefinition[]
  requireOrderedSetItemAdd: boolean
  setIsFeatured: boolean
  setType: string
  questLineName: string
  questLineDescription: string
  questStepSummary: string
}

export type DestinyItemSetBlockEntryDefinition = {
  trackingValue: number
  itemHash: number
}

export type DestinyItemInventoryBlockDefinition = {
  stackUniqueLabel: string
  maxStackSize: number
  bucketTypeHash: number
  recoveryBucketTypeHash: number
  isInstanceItem: boolean
  tierTypeName: string
  tierType: number
  expirationTooltip: string
  expiredInActivityMessage: string
  expiredInOrbitMessage: string
  suppressExpirationWhenObjectivesComplete: boolean
  recipeItemHash: number
}

export type DestinyItemCraftingBlockDefinition = {
  outputItemHash: number
  requiredSocketTypeHashes: number[]
  failedRequirementStrings: string[]
  baseMaterialRequirements: number
  bonusPlugs: number
}

export type DestinyItemActionBlockDefinition = {
  verbName: string
  verbDescription: string
  isPositive: boolean
  overlayScreenName: string
  overlayIcon: string
  requiredCooldownSeconds: number
  requiredItems: DestinyItemActionRequiredItemDefinition[]
  progressionRewards: DestinyProgressionRewardDefinition[]
  actionTypeLabel: string
  requiredLocation: string
  requiredCooldownHash: number
  deleteOnAction: boolean
  consumeEntireStack: boolean
  useOnAcquire: boolean
}

export type DestinyProgressionRewardDefinition = {
  progressionMappingHash: number
  amount: number
  applyThrottles: boolean
}

export type DestinyItemActionRequiredItemDefinition = {
  count: number
  itemHash: number
  deleteOnAction: boolean
}

export type DestinyColor = {
  red: number
  green: number
  blue: number
  alpha: number
}

export type DestinyCollectibleDefinition = {
  displayProperties: DestinyDisplayProperties
  scope: number
  sourceString: string
  sourceHash: number
  itemHash: number // mapped to DestinyInventoryItemDefinition
  acquisitionInfo: {
    acquireMaterialRequirementHash: number
    acquireTimestampUnlockValueHash: number
  }
  stateInfo: {
    obscuredOverrideItemHash: number
  }
  presentationInfo: {
    presentationNodeType: number
    parentPresentationNodeHashes: number[]
    displayStyle: number
  }
  presentationNodeType: number
  traitIds: string[]
  traitHashes: number[]
  parentNodeHashes: number[]
  hash: number
  index: number
  redacted: boolean
}

export type DestinyDisplayProperties = {
  description: string
  name: string
  icon: string
  iconSequences: DestinyIconSequenceDefinition[]
  highResIcon: string
  hasIcon: boolean
}

export type DestinyIconSequenceDefinition = {
  frames: string[]
}

export type DestinyItemTooltipNotification = {
  displayString: string
  displayStyle: string
}

export type DestinyPlugSetDefinition = {
  /**
   * Sometimes, we have large sets of reusable plugs that are defined identically and thus can
   * (and in some cases, are so large that they *must*) be shared across the places where they are used.
   * These are the definitions for those reusable sets of plugs.
   *
   * See DestinyItemSocketEntryDefinition.plugSource and reusablePlugSetHash for the relationship
   * between these reusable plug sets and the sockets that leverage them (for starters, Emotes).
   *
   * As of the release of Shadowkeep (Late 2019), these will begin to be sourced from game content directly -
   * which means there will be many more of them, but it also means we may not get all data that we used to get for them.
   *
   * DisplayProperties, in particular, will no longer be guaranteed to contain valid information.
   * We will make a best effort to guess what ought to be populated there where possible,
   * but it will be invalid for many/most plug sets.
   */
  displayProperties: DestinyDisplayProperties
  /**
   * This is a list of pre-determined plugs that can be plugged into this socket,
   * without the character having the plug in their inventory.
   *
   * If this list is populated, you will not be allowed to plug an arbitrary item in the socket:
   * you will only be able to choose from one of these reusable plugs.
   */
  reusablePlugItems: DestinyItemSocketEntryPlugItemDefinition[]

  /**
   * Mostly for our debugging or reporting bugs, BNet is making "fake" plug sets in a desperate effort to reduce socket sizes.
   *
   * If this is true, the plug set was generated by BNet: if it looks wrong, that's a good indicator that it's bungie.net that messed this up.
   */
  isFakePlugSet: boolean
  /**
   * The unique identifier for this entity. Guaranteed to be unique for the type of entity, but not globally.
   *
   * When entities refer to each other in Destiny content, it is this hash that they are referring to.
   */
  hash: number
  /**
   * The index of the entity as it was found in the investment tables.
   */
  index: number
  /**
   * If this is true, then there is an entity with this identifier/type combination,
   * but BNet is not yet allowed to show it. Sorry!
   */
  redacted: boolean
}

export type DestinyLoreDefinition = {
  /**
   * These are definitions for in-game "Lore," meant to be narrative enhancements of the game experience.
   *
   * DestinyInventoryItemDefinitions for interesting items point to these definitions,
   * but nothing's stopping you from scraping all of these and doing something cool with them. If they end up having cool data.
   */
  displayProperties: DestinyDisplayProperties
  /**
   * Type: string
   */
  subtitle: string
  /**
   * The unique identifier for this entity. Guaranteed to be unique for the type of entity, but not globally.
   *
   * When entities refer to each other in Destiny content, it is this hash that they are referring to.
   *
   * Type: uint32
   */
  hash: number
  /**
   * The index of the entity as it was found in the investment tables.
   *
   * Type: int32
   */
  index: number
  /**
   * If this is true, then there is an entity with this identifier/type combination,
   * but BNet is not yet allowed to show it. Sorry!
   *
   * Type: boolean
   */
  redacted: boolean
}

export enum DestinyItemSubType {
  None = 0,
  Crucible = 1, // DEPRECATED. Items can be both "Crucible" and something else interesting.
  Vanguard = 2, // DEPRECATED. An item can both be "Vanguard" and something else.
  Exotic = 5, // DEPRECATED. An item can both be Exotic and something else.
  AutoRifle = 6,
  Shotgun = 7,
  Machinegun = 8,
  HandCannon = 9,
  RocketLauncher = 10,
  FusionRifle = 11,
  SniperRifle = 12,
  PulseRifle = 13,
  ScoutRifle = 14,
  Crm = 16, // DEPRECATED. An item can both be CRM and something else.
  Sidearm = 17,
  Sword = 18,
  Mask = 19,
  Shader = 20,
  Ornament = 21,
  FusionRifleLine = 22,
  GrenadeLauncher = 23,
  SubmachineGun = 24,
  TraceRifle = 25,
  HelmetArmor = 26,
  GauntletsArmor = 27,
  ChestArmor = 28,
  LegArmor = 29,
  ClassArmor = 30,
  Bow = 31,
  DummyRepeatableBounty = 32,
  Glaive = 33,
}

export enum DestinyItemType {
  None = 0,
  Currency = 1,
  Armor = 2,
  Weapon = 3,
  Message = 7,
  Engram = 8,
  Consumable = 9,
  ExchangeMaterial = 10,
  MissionReward = 11,
  QuestStep = 12,
  QuestStepComplete = 13,
  Emblem = 14,
  Quest = 15,
  Subclass = 16,
  ClanBanner = 17,
  Aura = 18,
  Mod = 19,
  Dummy = 20,
  Ship = 21,
  Vehicle = 22,
  Emote = 23,
  Ghost = 24,
  Package = 25,
  Bounty = 26,
  Wrapper = 27,
  SeasonalArtifact = 28,
  Finisher = 29,
  Pattern = 30,
}
