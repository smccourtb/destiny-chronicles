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

export type DestinyInventoryItemStatDefinition = {
  statHash: number
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
