import Dexie from 'dexie'

const database = new Dexie('database', { autoOpen: true })
database.version(1).stores({
  DestinyNodeStepSummaryDefinition: 'key, data',
  DestinyArtDyeChannelDefinition: 'key, data',
  DestinyArtDyeReferenceDefinition: 'key, data',
  DestinyPlaceDefinition: 'key, data',
  DestinyActivityDefinition: 'key, data',
  DestinyActivityTypeDefinition: 'key, data',
  DestinyClassDefinition: 'key, data',
  DestinyGenderDefinition: 'key, data',
  DestinyInventoryBucketDefinition: 'key, data',
  DestinyRaceDefinition: 'key, data',
  DestinyTalentGridDefinition: 'key, data',
  DestinyUnlockDefinition: 'key, data',
  DestinySandboxPerkDefinition: 'key, data',
  DestinyStatGroupDefinition: 'key, data',
  DestinyProgressionMappingDefinition: 'key, data',
  DestinyFactionDefinition: 'key, data',
  DestinyVendorGroupDefinition: 'key, data',
  DestinyRewardSourceDefinition: 'key, data',
  DestinyUnlockValueDefinition: 'key, data',
  DestinyRewardMappingDefinition: 'key, data',
  DestinyRewardSheetDefinition: 'key, data',
  DestinyItemCategoryDefinition: 'key, data',
  DestinyDamageTypeDefinition: 'key, data',
  DestinyActivityModeDefinition: 'key, data',
  DestinyMedalTierDefinition: 'key, data',
  DestinyAchievementDefinition: 'key, data',
  DestinyActivityGraphDefinition: 'key, data',
  DestinyActivityInteractableDefinition: 'key, data',
  DestinyBondDefinition: 'key, data',
  DestinyCharacterCustomizationCategoryDefinition: 'key, data',
  DestinyCharacterCustomizationOptionDefinition: 'key, data',
  DestinyCollectibleDefinition: 'key, data',
  DestinyDestinationDefinition: 'key, data',
  DestinyEntitlementOfferDefinition: 'key, data',
  DestinyEquipmentSlotDefinition: 'key, data',
  DestinyEventCardDefinition: 'key, data',
  DestinyStatDefinition: 'key, data',
  DestinyInventoryItemDefinition: 'key, data',
  DestinyInventoryItemLiteDefinition: 'key, data',
  DestinyItemTierTypeDefinition: 'key, data',
  DestinyLoadoutColorDefinition: 'key, data',
  DestinyLoadoutIconDefinition: 'key, data',
  DestinyLoadoutNameDefinition: 'key, data',
  DestinyLocationDefinition: 'key, data',
  DestinyLoreDefinition: 'key, data',
  DestinyMaterialRequirementSetDefinition: 'key, data',
  DestinyMetricDefinition: 'key, data',
  DestinyObjectiveDefinition: 'key, data',
  DestinyPlatformBucketMappingDefinition: 'key, data',
  DestinyPlugSetDefinition: 'key, data',
  DestinyPowerCapDefinition: 'key, data',
  DestinyPresentationNodeDefinition: 'key, data',
  DestinyProgressionDefinition: 'key, data',
  DestinyProgressionLevelRequirementDefinition: 'key, data',
  DestinyRecordDefinition: 'key, data',
  DestinyRewardAdjusterPointerDefinition: 'key, data',
  DestinyRewardAdjusterProgressionMapDefinition: 'key, data',
  DestinyRewardItemListDefinition: 'key, data',
  DestinySackRewardItemListDefinition: 'key, data',
  DestinySandboxPatternDefinition: 'key, data',
  DestinySeasonDefinition: 'key, data',
  DestinySeasonPassDefinition: 'key, data',
  DestinySocialCommendationDefinition: 'key, data',
  DestinySocketCategoryDefinition: 'key, data',
  DestinySocketTypeDefinition: 'key, data',
  DestinyTraitDefinition: 'key, data',
  DestinyUnlockCountMappingDefinition: 'key, data',
  DestinyUnlockEventDefinition: 'key, data',
  DestinyUnlockExpressionMappingDefinition: 'key, data',
  DestinyVendorDefinition: 'key, data',
  DestinyMilestoneDefinition: 'key, data',
  DestinyActivityModifierDefinition: 'key, data',
  DestinyReportReasonCategoryDefinition: 'key, data',
  DestinyArtifactDefinition: 'key, data',
  DestinyBreakerTypeDefinition: 'key, data',
  DestinyChecklistDefinition: 'key, data',
  DestinyEnergyTypeDefinition: 'key, data',
  DestinySocialCommendationNodeDefinition: 'key, data',
  DestinyGuardianRankDefinition: 'key, data',
  DestinyGuardianRankConstantsDefinition: 'key, data',
  DestinyLoadoutConstantsDefinition: 'key, data',
})

export const DestinyNodeStepSummaryDefinitionTable = database.table('DestinyNodeStepSummaryDefinition')
export const DestinyArtDyeChannelDefinitionTable = database.table('DestinyArtDyeChannelDefinition')
export const DestinyArtDyeReferenceDefinitionTable = database.table('DestinyArtDyeReferenceDefinition')
export const DestinyPlaceDefinitionTable = database.table('DestinyPlaceDefinition')
export const DestinyActivityDefinitionTable = database.table('DestinyActivityDefinition')
export const DestinyActivityTypeDefinitionTable = database.table('DestinyActivityTypeDefinition')
export const DestinyClassDefinitionTable = database.table('DestinyClassDefinition')
export const DestinyGenderDefinitionTable = database.table('DestinyGenderDefinition')
export const DestinyInventoryBucketDefinitionTable = database.table('DestinyInventoryBucketDefinition')
export const DestinyRaceDefinitionTable = database.table('DestinyRaceDefinition')
export const DestinyTalentGridDefinitionTable = database.table('DestinyTalentGridDefinition')
export const DestinyUnlockDefinitionTable = database.table('DestinyUnlockDefinition')
export const DestinySandboxPerkDefinitionTable = database.table('DestinySandboxPerkDefinition')
export const DestinyStatGroupDefinitionTable = database.table('DestinyStatGroupDefinition')
export const DestinyProgressionMappingDefinitionTable = database.table('DestinyProgressionMappingDefinition')
export const DestinyFactionDefinitionTable = database.table('DestinyFactionDefinition')
export const DestinyVendorGroupDefinitionTable = database.table('DestinyVendorGroupDefinition')
export const DestinyRewardSourceDefinitionTable = database.table('DestinyRewardSourceDefinition')
export const DestinyUnlockValueDefinitionTable = database.table('DestinyUnlockValueDefinition')
export const DestinyRewardMappingDefinitionTable = database.table('DestinyRewardMappingDefinition')
export const DestinyRewardSheetDefinitionTable = database.table('DestinyRewardSheetDefinition')
export const DestinyItemCategoryDefinitionTable = database.table('DestinyItemCategoryDefinition')
export const DestinyDamageTypeDefinitionTable = database.table('DestinyDamageTypeDefinition')
export const DestinyActivityModeDefinitionTable = database.table('DestinyActivityModeDefinition')
export const DestinyMedalTierDefinitionTable = database.table('DestinyMedalTierDefinition')
export const DestinyAchievementDefinitionTable = database.table('DestinyAchievementDefinition')
export const DestinyActivityGraphDefinitionTable = database.table('DestinyActivityGraphDefinition')
export const DestinyActivityInteractableDefinitionTable = database.table('DestinyActivityInteractableDefinition')
export const DestinyBondDefinitionTable = database.table('DestinyBondDefinition')
export const DestinyCharacterCustomizationCategoryDefinitionTable = database.table(
  'DestinyCharacterCustomizationCategoryDefinition'
)
export const DestinyCharacterCustomizationOptionDefinitionTable = database.table(
  'DestinyCharacterCustomizationOptionDefinition'
)
export const DestinyCollectibleDefinitionTable = database.table('DestinyCollectibleDefinition')
export const DestinyDestinationDefinitionTable = database.table('DestinyDestinationDefinition')
export const DestinyEntitlementOfferDefinitionTable = database.table('DestinyEntitlementOfferDefinition')
export const DestinyEquipmentSlotDefinitionTable = database.table('DestinyEquipmentSlotDefinition')
export const DestinyEventCardDefinitionTable = database.table('DestinyEventCardDefinition')
export const DestinyStatDefinitionTable = database.table('DestinyStatDefinition')
export const DestinyInventoryItemDefinitionTable = database.table('DestinyInventoryItemDefinition')
export const DestinyInventoryItemLiteDefinitionTable = database.table('DestinyInventoryItemLiteDefinition')
export const DestinyItemTierTypeDefinitionTable = database.table('DestinyItemTierTypeDefinition')
export const DestinyLoadoutColorDefinitionTable = database.table('DestinyLoadoutColorDefinition')
export const DestinyLoadoutIconDefinitionTable = database.table('DestinyLoadoutIconDefinition')
export const DestinyLoadoutNameDefinitionTable = database.table('DestinyLoadoutNameDefinition')
export const DestinyLocationDefinitionTable = database.table('DestinyLocationDefinition')
export const DestinyLoreDefinitionTable = database.table('DestinyLoreDefinition')
export const DestinyMaterialRequirementSetDefinitionTable = database.table('DestinyMaterialRequirementSetDefinition')
export const DestinyMetricDefinitionTable = database.table('DestinyMetricDefinition')
export const DestinyObjectiveDefinitionTable = database.table('DestinyObjectiveDefinition')
export const DestinyPlatformBucketMappingDefinitionTable = database.table('DestinyPlatformBucketMappingDefinition')
export const DestinyPlugSetDefinitionTable = database.table('DestinyPlugSetDefinition')
export const DestinyPowerCapDefinitionTable = database.table('DestinyPowerCapDefinition')
export const DestinyPresentationNodeDefinitionTable = database.table('DestinyPresentationNodeDefinition')
export const DestinyProgressionDefinitionTable = database.table('DestinyProgressionDefinition')
export const DestinyProgressionLevelRequirementDefinitionTable = database.table(
  'DestinyProgressionLevelRequirementDefinition'
)
export const DestinyRecordDefinitionTable = database.table('DestinyRecordDefinition')
export const DestinyRewardAdjusterPointerDefinitionTable = database.table('DestinyRewardAdjusterPointerDefinition')
export const DestinyRewardAdjusterProgressionMapDefinitionTable = database.table(
  'DestinyRewardAdjusterProgressionMapDefinition'
)
export const DestinyRewardItemListDefinitionTable = database.table('DestinyRewardItemListDefinition')
export const DestinySackRewardItemListDefinitionTable = database.table('DestinySackRewardItemListDefinition')
export const DestinySandboxPatternDefinitionTable = database.table('DestinySandboxPatternDefinition')
export const DestinySeasonDefinitionTable = database.table('DestinySeasonDefinition')
export const DestinySeasonPassDefinitionTable = database.table('DestinySeasonPassDefinition')
export const DestinySocialCommendationDefinitionTable = database.table('DestinySocialCommendationDefinition')
export const DestinySocketCategoryDefinitionTable = database.table('DestinySocketCategoryDefinition')
export const DestinySocketTypeDefinitionTable = database.table('DestinySocketTypeDefinition')
export const DestinyTraitDefinitionTable = database.table('DestinyTraitDefinition')
export const DestinyUnlockCountMappingDefinitionTable = database.table('DestinyUnlockCountMappingDefinition')
export const DestinyUnlockEventDefinitionTable = database.table('DestinyUnlockEventDefinition')
export const DestinyUnlockExpressionMappingDefinitionTable = database.table('DestinyUnlockExpressionMappingDefinition')
export const DestinyVendorDefinitionTable = database.table('DestinyVendorDefinition')
export const DestinyMilestoneDefinitionTable = database.table('DestinyMilestoneDefinition')
export const DestinyActivityModifierDefinitionTable = database.table('DestinyActivityModifierDefinition')
export const DestinyReportReasonCategoryDefinitionTable = database.table('DestinyReportReasonCategoryDefinition')
export const DestinyArtifactDefinitionTable = database.table('DestinyArtifactDefinition')
export const DestinyBreakerTypeDefinitionTable = database.table('DestinyBreakerTypeDefinition')
export const DestinyChecklistDefinitionTable = database.table('DestinyChecklistDefinition')
export const DestinyEnergyTypeDefinitionTable = database.table('DestinyEnergyTypeDefinition')
export const DestinySocialCommendationNodeDefinitionTable = database.table('DestinySocialCommendationNodeDefinition')
export const DestinyGuardianRankDefinitionTable = database.table('DestinyGuardianRankDefinition')
export const DestinyGuardianRankConstantsDefinitionTable = database.table('DestinyGuardianRankConstantsDefinition')
export const DestinyLoadoutConstantsDefinitionTable = database.table('DestinyLoadoutConstantsDefinition')

export default database
