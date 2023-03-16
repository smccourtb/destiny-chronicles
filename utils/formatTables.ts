import {
  DestinyAchievementDefinitionTable,
  DestinyActivityDefinitionTable,
  DestinyActivityGraphDefinitionTable,
  DestinyActivityInteractableDefinitionTable,
  DestinyActivityModeDefinitionTable,
  DestinyActivityModifierDefinitionTable,
  DestinyActivityTypeDefinitionTable,
  DestinyArtDyeChannelDefinitionTable,
  DestinyArtDyeReferenceDefinitionTable,
  DestinyArtifactDefinitionTable,
  DestinyBondDefinitionTable,
  DestinyBreakerTypeDefinitionTable,
  DestinyCharacterCustomizationCategoryDefinitionTable,
  DestinyCharacterCustomizationOptionDefinitionTable,
  DestinyChecklistDefinitionTable,
  DestinyClassDefinitionTable,
  DestinyCollectibleDefinitionTable,
  DestinyDamageTypeDefinitionTable,
  DestinyDestinationDefinitionTable,
  DestinyEnergyTypeDefinitionTable,
  DestinyEntitlementOfferDefinitionTable,
  DestinyEquipmentSlotDefinitionTable,
  DestinyEventCardDefinitionTable,
  DestinyFactionDefinitionTable,
  DestinyGenderDefinitionTable,
  DestinyGuardianRankConstantsDefinitionTable,
  DestinyGuardianRankDefinitionTable,
  DestinyInventoryBucketDefinitionTable,
  DestinyInventoryItemDefinitionTable,
  DestinyInventoryItemLiteDefinitionTable,
  DestinyItemCategoryDefinitionTable,
  DestinyItemTierTypeDefinitionTable,
  DestinyLoadoutColorDefinitionTable,
  DestinyLoadoutConstantsDefinitionTable,
  DestinyLoadoutIconDefinitionTable,
  DestinyLoadoutNameDefinitionTable,
  DestinyLocationDefinitionTable,
  DestinyLoreDefinitionTable,
  DestinyMaterialRequirementSetDefinitionTable,
  DestinyMedalTierDefinitionTable,
  DestinyMetricDefinitionTable,
  DestinyMilestoneDefinitionTable,
  DestinyNodeStepSummaryDefinitionTable,
  DestinyObjectiveDefinitionTable,
  DestinyPlaceDefinitionTable,
  DestinyPlatformBucketMappingDefinitionTable,
  DestinyPlugSetDefinitionTable,
  DestinyPowerCapDefinitionTable,
  DestinyPresentationNodeDefinitionTable,
  DestinyProgressionDefinitionTable,
  DestinyProgressionLevelRequirementDefinitionTable,
  DestinyProgressionMappingDefinitionTable,
  DestinyRaceDefinitionTable,
  DestinyRecordDefinitionTable,
  DestinyReportReasonCategoryDefinitionTable,
  DestinyRewardAdjusterPointerDefinitionTable,
  DestinyRewardAdjusterProgressionMapDefinitionTable,
  DestinyRewardItemListDefinitionTable,
  DestinyRewardMappingDefinitionTable,
  DestinyRewardSheetDefinitionTable,
  DestinyRewardSourceDefinitionTable,
  DestinySackRewardItemListDefinitionTable,
  DestinySandboxPatternDefinitionTable,
  DestinySandboxPerkDefinitionTable,
  DestinySeasonDefinitionTable,
  DestinySeasonPassDefinitionTable,
  DestinySocialCommendationDefinitionTable,
  DestinySocialCommendationNodeDefinitionTable,
  DestinySocketCategoryDefinitionTable,
  DestinySocketTypeDefinitionTable,
  DestinyStatDefinitionTable,
  DestinyStatGroupDefinitionTable,
  DestinyTalentGridDefinitionTable,
  DestinyTraitDefinitionTable,
  DestinyUnlockCountMappingDefinitionTable,
  DestinyUnlockDefinitionTable,
  DestinyUnlockEventDefinitionTable,
  DestinyUnlockExpressionMappingDefinitionTable,
  DestinyUnlockValueDefinitionTable,
  DestinyVendorDefinitionTable,
  DestinyVendorGroupDefinitionTable,
} from '../database.config'
import { IndexableType, Table } from 'dexie'

const { applyBungieDomain } = require('./url-handling')

export async function getDestinyManifest() {
  const manifestResponse = await fetch(applyBungieDomain('/Platform/Destiny2/Manifest/'), {
    method: 'GET',
  })
  if (manifestResponse.ok) {
    console.log('first manifest response is okay')
    const manifest = await manifestResponse.json()
    const { version, jsonWorldContentPaths } = manifest.Response
    const currentManifestVersion = localStorage.getItem('manifestVersion')
    if (currentManifestVersion === version) {
      console.log('manifest is up to date')
      return { error: null, data: null }
    }
    localStorage.setItem('manifestVersion', version)
    const mobileWorldContentPath = jsonWorldContentPaths.en
    const manifestUrl = applyBungieDomain(mobileWorldContentPath)
    const manifestUrlResponse = await fetch(manifestUrl, {
      method: 'GET',
    })
    if (manifestUrlResponse.ok) {
      console.log('second manifest is okay, start parsing')
      const manifestFile = await manifestUrlResponse.json()
      const manifest: [string, IndexableType][] = Object.entries(manifestFile)
      console.log('parsing complete sending data over to database')
      return { data: manifest, error: null }
    } else {
      return { error: new Error(manifestUrlResponse.statusText), data: null }
    }
  } else {
    return { error: new Error(manifestResponse.statusText), data: null }
  }
}

export const populateManifestDatabase = async (data: [string, IndexableType][]) => {
  console.log('populating database')
  if (!data) return
  for (const d of data) {
    const name: string = d[0]
    const values = Object.entries(d[1]).map(([key, value]) => ({ key, ...value }))
    const dbTable = dbTableMap[name]
    console.log('populating table: ', name)
    await dbTable.bulkPut(values).catch((e) => {
      console.log('error: ', e)
    })
    console.log('population complete: ', name)
  }
  console.log('database populated')
  return
}

const dbTableMap: { [key: string]: Table } = {
  DestinyNodeStepSummaryDefinition: DestinyNodeStepSummaryDefinitionTable,
  DestinyArtDyeChannelDefinition: DestinyArtDyeChannelDefinitionTable,
  DestinyArtDyeReferenceDefinition: DestinyArtDyeReferenceDefinitionTable,
  DestinyPlaceDefinition: DestinyPlaceDefinitionTable,
  DestinyActivityDefinition: DestinyActivityDefinitionTable,
  DestinyActivityTypeDefinition: DestinyActivityTypeDefinitionTable,
  DestinyClassDefinition: DestinyClassDefinitionTable,
  DestinyGenderDefinition: DestinyGenderDefinitionTable,
  DestinyInventoryBucketDefinition: DestinyInventoryBucketDefinitionTable,
  DestinyRaceDefinition: DestinyRaceDefinitionTable,
  DestinyTalentGridDefinition: DestinyTalentGridDefinitionTable,
  DestinyUnlockDefinition: DestinyUnlockDefinitionTable,
  DestinySandboxPerkDefinition: DestinySandboxPerkDefinitionTable,
  DestinyStatGroupDefinition: DestinyStatGroupDefinitionTable,
  DestinyProgressionMappingDefinition: DestinyProgressionMappingDefinitionTable,
  DestinyFactionDefinition: DestinyFactionDefinitionTable,
  DestinyVendorGroupDefinition: DestinyVendorGroupDefinitionTable,
  DestinyRewardSourceDefinition: DestinyRewardSourceDefinitionTable,
  DestinyUnlockValueDefinition: DestinyUnlockValueDefinitionTable,
  DestinyRewardMappingDefinition: DestinyRewardMappingDefinitionTable,
  DestinyRewardSheetDefinition: DestinyRewardSheetDefinitionTable,
  DestinyItemCategoryDefinition: DestinyItemCategoryDefinitionTable,
  DestinyDamageTypeDefinition: DestinyDamageTypeDefinitionTable,
  DestinyActivityModeDefinition: DestinyActivityModeDefinitionTable,
  DestinyMedalTierDefinition: DestinyMedalTierDefinitionTable,
  DestinyAchievementDefinition: DestinyAchievementDefinitionTable,
  DestinyActivityGraphDefinition: DestinyActivityGraphDefinitionTable,
  DestinyActivityInteractableDefinition: DestinyActivityInteractableDefinitionTable,
  DestinyBondDefinition: DestinyBondDefinitionTable,
  DestinyCharacterCustomizationCategoryDefinition: DestinyCharacterCustomizationCategoryDefinitionTable,
  DestinyCharacterCustomizationOptionDefinition: DestinyCharacterCustomizationOptionDefinitionTable,
  DestinyCollectibleDefinition: DestinyCollectibleDefinitionTable,
  DestinyDestinationDefinition: DestinyDestinationDefinitionTable,
  DestinyEntitlementOfferDefinition: DestinyEntitlementOfferDefinitionTable,
  DestinyEquipmentSlotDefinition: DestinyEquipmentSlotDefinitionTable,
  DestinyEventCardDefinition: DestinyEventCardDefinitionTable,
  DestinyStatDefinition: DestinyStatDefinitionTable,
  DestinyInventoryItemDefinition: DestinyInventoryItemDefinitionTable,
  DestinyInventoryItemLiteDefinition: DestinyInventoryItemLiteDefinitionTable,
  DestinyItemTierTypeDefinition: DestinyItemTierTypeDefinitionTable,
  DestinyLoadoutColorDefinition: DestinyLoadoutColorDefinitionTable,
  DestinyLoadoutIconDefinition: DestinyLoadoutIconDefinitionTable,
  DestinyLoadoutNameDefinition: DestinyLoadoutNameDefinitionTable,
  DestinyLocationDefinition: DestinyLocationDefinitionTable,
  DestinyLoreDefinition: DestinyLoreDefinitionTable,
  DestinyMaterialRequirementSetDefinition: DestinyMaterialRequirementSetDefinitionTable,
  DestinyMetricDefinition: DestinyMetricDefinitionTable,
  DestinyObjectiveDefinition: DestinyObjectiveDefinitionTable,
  DestinyPlatformBucketMappingDefinition: DestinyPlatformBucketMappingDefinitionTable,
  DestinyPlugSetDefinition: DestinyPlugSetDefinitionTable,
  DestinyPowerCapDefinition: DestinyPowerCapDefinitionTable,
  DestinyPresentationNodeDefinition: DestinyPresentationNodeDefinitionTable,
  DestinyProgressionDefinition: DestinyProgressionDefinitionTable,
  DestinyProgressionLevelRequirementDefinition: DestinyProgressionLevelRequirementDefinitionTable,
  DestinyRecordDefinition: DestinyRecordDefinitionTable,
  DestinyRewardAdjusterPointerDefinition: DestinyRewardAdjusterPointerDefinitionTable,
  DestinyRewardAdjusterProgressionMapDefinition: DestinyRewardAdjusterProgressionMapDefinitionTable,
  DestinyRewardItemListDefinition: DestinyRewardItemListDefinitionTable,
  DestinySackRewardItemListDefinition: DestinySackRewardItemListDefinitionTable,
  DestinySandboxPatternDefinition: DestinySandboxPatternDefinitionTable,
  DestinySeasonDefinition: DestinySeasonDefinitionTable,
  DestinySeasonPassDefinition: DestinySeasonPassDefinitionTable,
  DestinySocialCommendationDefinition: DestinySocialCommendationDefinitionTable,
  DestinySocketCategoryDefinition: DestinySocketCategoryDefinitionTable,
  DestinySocketTypeDefinition: DestinySocketTypeDefinitionTable,
  DestinyTraitDefinition: DestinyTraitDefinitionTable,
  DestinyUnlockCountMappingDefinition: DestinyUnlockCountMappingDefinitionTable,
  DestinyUnlockEventDefinition: DestinyUnlockEventDefinitionTable,
  DestinyUnlockExpressionMappingDefinition: DestinyUnlockExpressionMappingDefinitionTable,
  DestinyVendorDefinition: DestinyVendorDefinitionTable,
  DestinyMilestoneDefinition: DestinyMilestoneDefinitionTable,
  DestinyActivityModifierDefinition: DestinyActivityModifierDefinitionTable,
  DestinyReportReasonCategoryDefinition: DestinyReportReasonCategoryDefinitionTable,
  DestinyArtifactDefinition: DestinyArtifactDefinitionTable,
  DestinyBreakerTypeDefinition: DestinyBreakerTypeDefinitionTable,
  DestinyChecklistDefinition: DestinyChecklistDefinitionTable,
  DestinyEnergyTypeDefinition: DestinyEnergyTypeDefinitionTable,
  DestinySocialCommendationNodeDefinition: DestinySocialCommendationNodeDefinitionTable,
  DestinyGuardianRankDefinition: DestinyGuardianRankDefinitionTable,
  DestinyGuardianRankConstantsDefinition: DestinyGuardianRankConstantsDefinitionTable,
  DestinyLoadoutConstantsDefinition: DestinyLoadoutConstantsDefinitionTable,
}
