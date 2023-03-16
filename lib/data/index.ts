import { DestinyActivityDefinition } from '../../types/activities'

export const definitions = {
  DestinyActivityDefinition: 'activityHash',
  DestinyActivityTypeDefinition: 'activityTypeHash',
  DestinyClassDefinition: 'classHash',
  DestinyGenderDefinition: 'genderHash',
  DestinyInventoryBucketDefinition: 'bucketHash',
  DestinyInventoryItemDefinition: 'itemHash',
  DestinyProgressionDefinition: 'progressionHash',
  DestinyRaceDefinition: 'raceHash',
  DestinyTalentGridDefinition: 'talentGridHash',
  DestinyUnlockFlagDefinition: 'flagHash',
  DestinyHistoricalStatsDefinition: 'statId',
  DestinyDirectorBookDefinition: 'bookHash',
  DestinyStatDefinition: 'statHash',
  DestinySandboxPerkDefinition: 'perkHash',
  DestinyDestinationDefinition: 'destinationHash',
  DestinyPlaceDefinition: 'placeHash',
  DestinyActivityBundleDefinition: 'bundleHash',
  DestinyStatGroupDefinition: 'statGroupHash',
  DestinySpecialEventDefinition: 'eventHash',
  DestinyFactionDefinition: 'factionHash',
  DestinyVendorCategoryDefinition: 'categoryHash',
  DestinyEnemyRaceDefinition: 'raceHash',
  DestinyScriptedSkullDefinition: 'skullHash',
  DestinyGrimoireCardDefinition: 'cardId',
  DestinyCollectibleDefinition: 'collectibleHash',
  DestinyLoreDefinition: 'loreHash',
  DestinyItemCategoryDefinition: 'itemCategoryHash',
  DestinyDamageTypeDefinition: 'damageTypeHash',
  DestinyTraitDefinition: 'traitHash',
  DestinyEquipmentSlotDefinition: 'equipmentSlotTypeHash',
  DestinySeasonDefinition: 'seasonHash',
  DestinyMilestoneDefinition: 'milestoneHash',
}

export const hashToDefinition = {
  activityHash: 'DestinyActivityDefinition',
  activityTypeHash: 'DestinyActivityTypeDefinition',
  classHash: 'DestinyClassDefinition',
  genderHash: 'DestinyGenderDefinition',
  bucketHash: 'DestinyInventoryBucketDefinition',
  itemHash: 'DestinyInventoryItemDefinition',
  progressionHash: 'DestinyProgressionDefinition',
  raceHash: 'DestinyRaceDefinition',
  talentGridHash: 'DestinyTalentGridDefinition',
  flagHash: 'DestinyUnlockFlagDefinition',
  statId: 'DestinyHistoricalStatsDefinition',
  bookHash: 'DestinyDirectorBookDefinition',
  statHash: 'DestinyStatDefinition',
  perkHash: 'DestinySandboxPerkDefinition',
  destinationHash: 'DestinyDestinationDefinition',
  placeHash: 'DestinyPlaceDefinition',
  bundleHash: 'DestinyActivityBundleDefinition',
  statGroupHash: 'DestinyStatGroupDefinition',
  eventHash: 'DestinySpecialEventDefinition',
  factionHash: 'DestinyFactionDefinition',
  categoryHash: 'DestinyVendorCategoryDefinition',
  raceHash_: 'DestinyEnemyRaceDefinition', // FIXME: going to need to manually fix this one when calling enemies
  skullHash: 'DestinyScriptedSkullDefinition',
  cardId: 'DestinyGrimoireCardDefinition',
  collectibleHash: 'DestinyCollectibleDefinition',
  loreHash: 'DestinyLoreDefinition',
  itemCategoryHash: 'DestinyItemCategoryDefinition',
  damageTypeHash: 'DestinyDamageTypeDefinition',
  traitHash: 'DestinyTraitDefinition',
  equipmentSlotTypeHash: 'DestinyEquipmentSlotDefinition',
  seasonHash: 'DestinySeasonDefinition',
  milestoneHash: 'DestinyMilestoneDefinition',
}

/**
 * @description converts hash to an unsigned 32-bit integer which is the id in the json data
 * @param hash
 */
export const hashToId = (hash: number) => {
  return hash >> 32
}
