export type DestinyActivityDefinitionJSON = {
  [key: string]: DestinyActivityDefinition
}

export type DestinyActivityModifierDefinitionJSON = {
  [key: string]: DestinyActivityModifierDefinition
}

export type DestinyActivityDefinition = {
  displayProperties: {
    description: string
    name: string
    icon: string
    hasIcon: boolean
  }
  originalDisplayProperties: {
    description: string
    name: string
    icon: string
    hasIcon: boolean
  }
  selectionScreenDisplayProperties: {
    description: string
    name: string
    icon: string
    hasIcon: boolean
  }
  releaseIcon: string
  releaseTime: number
  completionUnlockHash: number
  activityLightLevel: number
  destinationHash: number
  placeHash: number
  activityTypeHash: number
  tier: number
  pgcrImage: number
  rewards: [
    {
      rewardItems: [
        {
          itemHash: number
          quantity: number
          hasConditionalVisibility: boolean
        }
      ]
    }
  ]
  modifiers: [
    {
      activityModifierHash: number
    }
  ]
  isPlaylist: boolean
  challenges: [
    {
      rewardSiteHash: number
      inhibitRewardsUnlockHash: number
      objectiveHash: number
      dummyRewards: [
        {
          itemHash: number
          quantity: number
          hasConditionalVisibility: boolean
        }
      ]
    },
    {
      rewardSiteHash: 0
      inhibitRewardsUnlockHash: 0
      objectiveHash: 537457947
      dummyRewards: [
        {
          itemHash: 73143230
          quantity: 1
          hasConditionalVisibility: false
        }
      ]
    }
  ]
  optionalUnlockStrings: []
  inheritFromFreeRoam: boolean
  suppressOtherRewards: boolean
  playlistItems: []
  matchmaking: {
    isMatchmade: boolean
    minParty: number
    maxParty: number
    maxPlayers: number
    requiresGuardianOath: boolean
  }
  directActivityModeHash: number
  directActivityModeType: number
  loadouts: []
  activityModeHashes: number[]
  activityModeTypes: number[]
  isPvP: boolean
  insertionPoints: []
  activityLocationMappings: []
  hash: number
  index: number
  redacted: boolean
  blacklisted: boolean
}

export type DestinyActivityModifierDefinition = {
  displayProperties: {
    description: string
    name: string
    icon: string
    iconSequences: [
      {
        frames: string[]
      }
    ]
    hasIcon: boolean
  }
  displayInNavMode: boolean
  displayInActivitySelection: boolean
  hash: number
  index: number
  redacted: boolean
  blacklisted: boolean
}
