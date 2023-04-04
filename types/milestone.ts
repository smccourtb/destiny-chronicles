import { DestinyDisplayProperties, DestinyItemQuantity } from './index'

/**
 * @description Milestones are an in-game concept where they're attempting to tell you what you can do next in-game.
 *
 * If that sounds a lot like Advisors in Destiny 1, it is! So we threw out Advisors in the Destiny 2 API and tacked all
 *     of the data we would have put on Advisors onto Milestones instead.
 *
 * Each Milestone represents something going on in the game right now:
 *
 * - A "ritual activity" you can perform, like nightfall
 *
 * - A "special event" that may have activities related to it, like Taco Tuesday (there's no Taco Tuesday in Destiny 2)
 *
 * - A checklist you can fulfill, like helping your Clan complete all of its weekly objectives
 *
 * - A tutorial quest you can play through, like the introduction to the Crucible.
 *
 * Most of these milestones appear in game as well. Some of them are BNet only, because we're so extra. You're welcome.
 *
 * There are some important caveats to understand about how we currently render Milestones and their deficiencies. The
 *     game currently doesn't have any content that actually tells you oughtright *what* the Milestone is: that is to
 *     say, what you'll be doing. The best we get is either a description of the overall Milestone, or of the Quest
 *     that the Milestone is having you partake in: which is usually something that assumes you already know what it's
 *     talking about, like "Complete 5 Challenges". 5 Challenges for what? What's a challenge? These are not questions
 *     that the Milestone data will answer for you, unfortunately.
 *
 * This isn't great, and in the future I'd like to add some custom text to give you more contextual information to pass
 *     on to your users. But for now, you can do what we do to render what little display info we do have:
 *
 * Start by looking at the currently active quest (ideally, you've fetched DestinyMilestone or DestinyPublicMilestone
 *     data from the API, so you know the currently active quest for the Milestone in question). Look up the Quests
 *     property in the Milestone Definition, and check if it has display properties. If it does, show that as the
 *     description of the Milestone. If it doesn't, fall back on the Milestone's description.
 *
 * This approach will let you avoid, whenever possible, the even less useful (and sometimes nonexistent)
 *     milestone-level names and descriptions.
 */
export type DestinyMilestone = {
  displayProperties: DestinyDisplayProperties
  /**
   * @description A hint to the UI to indicate what to show as the display properties for this Milestone when showing
   *     "Live" milestone data. Feel free to show more than this if desired: this hint is meant to simplify our own
   *     UI, but it may prove useful to you as well.
   */
  displayPreference: number // maps to DestinyMilestoneDisplayPreference
  /**
   * @description A custom image someone made just for the milestone. Isn't that special?
   */
  image: string
  /**
   * @description An enumeration listing one of the possible types of milestones. Check out the DestinyMilestoneType
   *     enum for more info!
   */
  milestoneType: number
  /**
   * @description If True, then the Milestone has been integrated with BNet's recruiting feature.
   */
  recruitable: boolean
  /**
   * @description If the milestone has a friendly identifier for association with other features - such as Recruiting
   *     - that identifier can be found here. This is "friendly" in that it looks better in a URL than whatever the
   *     identifier for the Milestone actually is.
   */
  friendlyName: string
  /**
   * @description If TRUE, this entry should be returned in the list of milestones for the "Explore Destiny" (i.e.
   *     new BNet homepage) features of Bungie.net (as long as the underlying event is active) Note that this is a
   *     property specifically used by BNet and the companion app for the "Live Events" feature of the front
   *     page/welcome view: it's not a reflection of what you see in-game.
   */
  showInExplorer: boolean
  /**
   * @description Determines whether we'll show this Milestone in the user's personal Milestones list.
   */
  showInMilestones: boolean
  /**
   * @description If TRUE, "Explore Destiny" (the front page of BNet and the companion app) prioritize using the
   *     activity image over any overriding Quest or Milestone image provided. This unfortunate hack is brought to
   *     you by Trials of The Nine.
   */
  explorePrioritizesActivityImage: boolean
  /**
   * @description A shortcut for clients - and the server - to understand whether we can predict the start and end
   *     dates for this event. In practice, there are multiple ways that an event could have predictable date ranges,
   *     but not all events will be able to be predicted via any mechanism (for instance, events that are manually
   *     triggered on and off)
   */
  hasPredictableDates: boolean
  /**
   * @description
   * The full set of possible Quests that give the overview of the Milestone event/activity in question. Only one of
   *     these can be active at a time for a given Conceptual Milestone, but many of them may be "available" for the
   *     user to choose from. (for instance, with Milestones you can choose from the three available Quests, but only
   *     one can be active at a time) Keyed by the quest item.
   *
   * As of Forsaken (~September 2018), Quest-style Milestones are being removed for many types of activities. There
   *     will likely be further revisions to the Milestone concept in the future.
   */
  quests: { [key: number]: DestinyMilestoneQuest }
  /**
   * @description If this milestone can provide rewards, this will define the categories into which the individual
   *     reward entries are placed.
   *
   * This is keyed by the Category's hash, which is only guaranteed to be unique within a given Milestone.
   */
  rewards: { [key: number]: DestinyMilestoneRewardCategory }
  /**
   * @description If you're going to show Vendors for the Milestone, you can use this as a localized "header" for the
   *     section where you show that vendor data. It'll provide a more context-relevant clue about what the vendor's
   *     role is in the Milestone.
   */
  vendorsDisplayTitle: string
  /**
   * @description Sometimes, milestones will have rewards provided by Vendors. This definition gives the information
   *     needed to understand which vendors are relevant, the order in which they should be returned if order
   *     matters, and the conditions under which the Vendor is relevant to the user.
   */
  vendors: DestinyMilestoneVendor[]
  /**
   * @description Sometimes, milestones will have arbitrary values associated with them that are of interest to us or
   *     to third party developers. This is the collection of those values' definitions, keyed by the identifier of
   *     the value and providing useful definition information such as localizable names and descriptions for the
   *     value.
   */
  values: { [key: string]: DestinyMilestoneValue }
  /**
   * @description Some milestones are explicit objectives that you can see and interact with in the game. Some
   *     milestones are more conceptual, built by BNet to help advise you on activities and events that happen
   *     in-game but that aren't explicitly shown in game as Milestones. If this is TRUE, you can see this as a
   *     milestone in the game. If this is FALSE, it's an event or activity you can participate in, but you won't see
   *     it as a Milestone in the game's UI.
   */
  isInGameMilestone: boolean
  /**
   * @description A Milestone can now be represented by one or more activities directly (without a backing Quest),
   *     and that activity can have many challenges, modifiers, and related to it.
   */
  activities: DestinyMilestoneChallengeActivity[]
  defaultOrder: number
  /**
   * @description The unique identifier for this entity. Guaranteed to be unique for the type of entity, but not
   *     globally.
   *
   * When entities refer to each other in Destiny content, it is this hash that they are referring to.
   */
  hash: number
  /**
   * @description The index of the entity as it was found in the investment tables.
   */
  index: number
  /**
   * @description If this is true, then there is an entity with this identifier/type combination, but BNet is not yet
   *     allowed to show it. Sorry!
   */
  redacted: boolean
}

/**
 * @description A hint for the UI as to what display information ought to be shown. Defaults to showing the static
 *     MilestoneDefinition's display properties.
 *
 * If for some reason the indicated property is not populated, fall back to the MilestoneDefinition.displayProperties.
 */
export enum DestinyMilestoneDisplayPreference {
  /**
   * @description Indicates you should show DestinyMilestoneDefinition.displayProperties for this Milestone.
   */
  MilestoneDefinition = 0,
  /**
   * @description Indicates you should show the displayProperties for any currently active Quest Steps in
   *     DestinyMilestone.availableQuests.
   */
  CurrentQuestSteps = 1,
  /**
   * @description Indicates you should show the displayProperties for any currently active Activities and their
   *     Challenges in DestinyMilestone.activities.
   */
  CurrentActivityChallenges = 2,
}

/**
 * @description The type of milestone. Milestones can be Tutorials, one-time/triggered/non-repeating but not
 *     necessarily tutorials, or Repeating Milestones.
 */
export enum DestinyMilestoneType {
  Unknown = 0,
  /**
   * @description One-time milestones that are specifically oriented toward teaching players about new mechanics and
   *     gameplay modes.
   */
  Tutorial = 1,
  /**
   * @description Milestones that, once completed a single time, can never be repeated.
   */
  OneTime = 2,
  /**
   * @description Milestones that repeat/reset on a weekly basis. They need not all reset on the same day or time,
   *     but do need to reset weekly to qualify for this type.
   */
  Weekly = 3,
  /**
   * @description Milestones that repeat or reset on a daily basis.
   */
  Daily = 4,
  /**
   * @description Special indicates that the event is not on a daily/weekly cadence, but does occur more than once.
   *     For instance, Iron Banner in Destiny 1 or the Dawning were examples of what could be termed "Special"
   *     events.
   */
  Special = 5,
}

/**
 * @description Any data we need to figure out whether this Quest Item is the currently active one for the conceptual
 *     Milestone. Even just typing this description, I already regret it.
 */
export type DestinyMilestoneQuest = {
  /**
   * @description The item representing this Milestone quest. Use this hash to look up the
   *     DestinyInventoryItemDefinition for the quest to find its steps and human readable data.
   */
  questItemHash: number // mapped to DestinyInventoryItemDefinition
  /**
   * @description The individual quests may have different definitions from the overall milestone: if there's a
   *     specific active quest, use these displayProperties instead of that of the overall
   *     DestinyMilestoneDefinition.
   */
  displayProperties: DestinyDisplayProperties
  /**
   * @description If populated, this image can be shown instead of the generic milestone's image when this quest is
   *     live, or it can be used to show a background image for the quest itself that differs from that of the
   *     Activity or the Milestone.
   */
  overrideImage: string
  /**
   * @description The rewards you will get for completing this quest, as best as we could extract them from our data.
   *     Sometimes, it'll be a decent amount of data. Sometimes, it's going to be sucky. Sorry.
   */
  questRewards: DestinyMilestoneQuestRewards
  /**
   * @description The full set of all possible "conceptual activities" that are related to this Milestone. Tiers or
   *     alternative modes of play within these conceptual activities will be defined as sub-entities. Keyed by the
   *     Conceptual Activity Hash. Use the key to look up DestinyActivityDefinition.
   */
  activities: { [key: number]: DestinyMilestoneActivity } // key is mapped to DestinyActivityDefinition
  /**
   * @description Sometimes, a Milestone's quest is related to an entire Destination rather than a specific activity.
   *     In that situation, this will be the hash of that Destination. Hotspots are currently the only Milestones
   *     that expose this data, but that does not preclude this data from being returned for other Milestones in the
   *     future.
   */
  destinationHash: number // mapped to DestinyDestinationDefinition
}

/**
 * @description If rewards are given in a quest - as opposed to overall in the entire Milestone - there's way less to
 *     track. We're going to simplify this contract as a result. However, this also gives us the opportunity to
 *     potentially put more than just item information into the reward data if we're able to mine it out in the future.
 *     Remember this if you come back and ask "why are quest reward items nested inside of their own class?"
 */
export type DestinyMilestoneQuestRewards = {
  /**
   * @description The items that represent your reward for completing the quest.
   *
   * Be warned, these could be "dummy" items: items that are only used to render a good-looking in-game tooltip, but
   *     aren't the actual items themselves.
   *
   * For instance, when experience is given there's often a dummy item representing "experience", with quantity being
   *     the amount of experience you got. We don't have a programmatic association between those and whatever
   *     Progression is actually getting that experience... yet.
   */
  items: DestinyMilestoneQuestRewardItem[]
}

/**
 * @description  subclass of DestinyItemQuantity, that provides not just the item and its quantity but also information
 *     that BNet can - at some point - use internally to provide more robust runtime information about the item's
 *     qualities.
 *
 * If you want it, please ask! We're just out of time to wire it up right now. Or a clever person just may do it with
 *     our existing endpoints.
 */
export type DestinyMilestoneQuestRewardItem = {
  /**
   * @description The quest reward item *may* be associated with a vendor. If so, this is that vendor. Use this hash to
   *     look up the DestinyVendorDefinition.
   */
  vendorHash: number // mapped to DestinyVendorDefinition
  /**
   * @description The quest reward item *may* be associated with a vendor. If so, this is the index of the item being
   *     sold, which we can use at runtime to find instanced item information for the reward item.
   */
  vendorItemIndex: number
  /**
   * @description The hash identifier for the item in question. Use it to look up the item's
   *     DestinyInventoryItemDefinition.
   */
  itemHash: number // mapped to DestinyInventoryItemDefinition
  /**
   * @description If this quantity is referring to a specific instance of an item, this will have the item's instance
   *     ID. Normally, this will be null.
   */
  itemInstanceId: number
  /**
   * @description The amount of the item needed/available depending on the context of where DestinyItemQuantity is
   *     being used.
   */
  quantity: number
  /**
   * @description Indicates that this item quantity may be conditionally shown or hidden, based on various sources of
   *     state. For example: server flags, account state, or character progress.
   */
  hasConditionalVisibility: boolean
}

/**
 * @description
 * Milestones can have associated activities which provide additional information about the context, challenges,
 *     modifiers, state etc... related to this Milestone.
 *
 * Information we need to be able to return that data is defined here, along with Tier data to establish a relationship
 *     between a conceptual Activity and its difficulty levels and variants.
 */
export type DestinyMilestoneActivity = {
  /**
   * @description The "Conceptual" activity hash. Basically, we picked the lowest level activity and are treating it as
   *     the canonical definition of the activity for rendering purposes.
   *
   * If you care about the specific difficulty modes and variations, use the activities under "Variants".
   */
  conceptualActivityHash: number // mapped to DestinyActivityDefinition
  /**
   * @description A milestone-referenced activity can have many variants, such as Tiers or alternative modes of play.
   *
   * Even if there is only a single variant, the details for these are represented within as a variant definition.
   *
   * It is assumed that, if this DestinyMilestoneActivityDefinition is active, then all variants should be active.
   *
   * If a Milestone could ever split the variants' active status conditionally, they should all have their own
   *     DestinyMilestoneActivityDefinition instead! The potential duplication will be worth it for the obviousness of
   *     processing and use.
   */
  variants: { [key: number]: DestinyMilestoneActivityVariant } // key is mapped to DestinyActivityDefinition
}

export type DestinyMilestoneChallenge = {
  /**
   * @description The challenge related to this milestone.
   */
  challengeObjectiveHash: number // mapped to DestinyObjectiveDefinition
}

export type DestinyMilestoneChallengeActivityGraphNodeEntry = {
  activityGraphHash: number // mapped to DestinyActivityGraphDefinition
  activityGraphNodeHash: number
}

export type DestinyMilestoneChallengeActivityPhase = {
  /**
   * @description The hash identifier of the activity's phase.
   */
  phaseHash: number
}

/**
 * @description Represents a variant on an activity for a Milestone: a specific difficulty tier, or a specific activity
 *     variant for example.
 *
 * These will often have more specific details, such as an associated Guided Game, progression steps, tier-specific
 *     rewards, and custom values.
 */
export type DestinyMilestoneActivityVariant = {
  /**
   * @description The hash to use for looking up the variant Activity's definition (DestinyActivityDefinition), where
   *     you can find its distinguishing characteristics such as difficulty level and recommended light level.
   *
   * Frequently, that will be the only distinguishing characteristics in practice, which is somewhat of a bummer.
   */
  activityHash: number // mapped to DestinyActivityDefinition
  /**
   * @description If you care to do so, render the variants in the order prescribed by this value.
   *
   * When you combine live Milestone data with the definition, the order becomes more useful because you'll be
   *     cross-referencing between the definition and live data.
   */
  order: number
}

/**
 * @description The definition of a category of rewards, that contains many individual rewards.
 */
export type DestinyMilestoneRewardCategory = {
  /**
   * @description Identifies the reward category. Only guaranteed unique within this specific component!
   */
  categoryHash: number
  /**
   * @description The string identifier for the category, if you want to use it for some end. Guaranteed unique
   *     within the specific component.
   */
  categoryIdentifier: string
  displayProperties: DestinyDisplayProperties
  /**
   * @description If this milestone can provide rewards, this will define the sets of rewards that can be earned, the conditions under which they can be acquired, internal data that we'll use at runtime to determine whether you've already earned or redeemed this set of rewards, and the category that this reward should be placed under.
   */
  rewardEntries: { [key: number]: DestinyMilestoneRewardEntry }
  /**
   * @description If you want to use BNet's recommended order for rendering categories programmatically, use this value and compare it to other categories to determine the order in which they should be rendered. I don't feel great about putting this here, I won't lie.
   */
  order: number
}

/**
 * @d The definition of a specific reward, which may be contained in a category of rewards and that has optional information about how it is obtained.
 */
export type DestinyMilestoneRewardEntry = {
  /**
   * @description The identifier for this reward entry. Runtime data will refer to reward entries by this hash. Only guaranteed unique within the specific Milestone.
   */
  rewardEntryHash: number
  /**
   * @description The string identifier, if you care about it. Only guaranteed unique within the specific Milestone.
   */
  rewardEntryIdentifier: string
  /**
   * @description The items you will get as rewards, and how much of it you'll get.
   */
  items: DestinyItemQuantity[]
  /**
   * @description If this reward is redeemed at a Vendor, this is the hash of the Vendor to go to in order to redeem the reward. Use this hash to look up the DestinyVendorDefinition.
   */
  vendorHash: number // mapped to DestinyVendorDefinition
  /**
   * @description For us to bother returning this info, we should be able to return some kind of information about why these rewards are grouped together. This is ideally that information. Look at how confident I am that this will always remain true.
   */
  displayProperties: DestinyDisplayProperties
  /**
   * @description If you want to follow BNet's ordering of these rewards, use this number within a given category to order the rewards. Yeah, I know. I feel dirty too.
   */
  order: number
}

/**
 * @description If the Milestone or a component has vendors whose inventories could/should be displayed that are relevant to it, this will return the vendor in question.
 *
 * It also contains information we need to determine whether that vendor is actually relevant at the moment, given the user's current state.
 */
export type DestinyMilestoneVendor = {
  /**
   * @description The hash of the vendor whose wares should be shown as associated with the Milestone.
   */
  vendorHash: number // mapped to DestinyVendorDefinition
}

/**
 * @description The definition for information related to a key/value pair that is relevant for a particular Milestone or component within the Milestone.
 *
 * This lets us more flexibly pass up information that's useful to someone, even if it's not necessarily us.
 */
export type DestinyMilestoneValue = {
  key: string
  displayProperties: DestinyDisplayProperties
}

export type DestinyMilestoneChallengeActivity = {
  /**
   * @description The activity for which this challenge is active.
   */
  activityHash: number // mapped to DestinyActivityDefinition
  challenges: DestinyMilestoneChallenge[]
  /**
   * @description If the activity and its challenge is visible on any of these nodes, it will be returned.
   */
  activityGraphNodes: DestinyMilestoneChallengeActivityGraphNodeEntry[]
  phases: DestinyMilestoneChallengeActivityPhase[]
}

/**
 * @description Information about milestones, presented in a character state-agnostic manner. Combine this data with
 *     DestinyMilestoneDefinition to get a full picture of the milestone, which is basically a checklist of things to
 *     do in the game.
 */
export type DestinyPublicMilestone = {
  /**
   * @description The hash identifier for the milestone. Use it to look up the DestinyMilestoneDefinition for static
   *     data about the Milestone.
   */
  milestoneHash: number // mapped to DestinyMilestoneDefinition
  activities?: DestinyPublicMilestoneChallengeActivity[]
  /**
   * @description A milestone not need have even a single quest, but if there are active quests they will be returned
   *     here.
   */
  availableQuests?: DestinyPublicMilestoneQuest[]
  /**
   * @deprecated for the sake of the new "vendors" property that has more data. What was I thinking.
   */
  vendorHashes?: number[]
  /**
   * @description This is why we can't have nice things. This is the ordered list of vendors to be shown that relate
   *     to this milestone, potentially along with other interesting data.
   */
  vendors?: DestinyPublicMilestoneVendor[]
  /**
   * @description If known, this is the date when the Milestone started/became active.
   */
  startDate?: string // timestamp
  /**
   * @description If known, this is the date when the Milestone will expire/recycle/end.
   */
  endDate?: string // timestamp
  /**
   * @description Used for ordering milestones in a display to match how we order them in BNet. May pull from static
   *     data, or possibly in the future from dynamic information.
   */
  order: number
}

export type DestinyPublicMilestoneQuest = {
  /**
   * @description Quests are defined as Items in content. As such, this is the hash identifier of the
   *     DestinyInventoryItemDefinition that represents this quest. It will have pointers to all of the steps in the
   *     quest, and display information for the quest (title, description, icon etc) Individual steps will be referred
   *     to in the Quest item's DestinyInventoryItemDefinition.setData property, and themselves are Items with their
   *     own renderable data.
   */
  questItemHash: number // -> look in DestinyInventoryItemDefinition  (but it links to -> DestinyMilestoneDefinition
  // in docs)
  /**
   * @description A milestone need not have an active activity, but if there is one it will be returned here, along
   *     with any variant and additional information.
   */
  activity?: DestinyPublicMilestoneActivity
  /**
   * @description For the given quest there could be 0-to-Many challenges: mini quests that you can perform in the
   *     course of doing this quest, that may grant you rewards and benefits.
   */
  challenges: DestinyPublicMilestoneChallenge[]
}

export type DestinyPublicMilestoneChallengeActivity = {
  activityHash: number // mapped to DestinyActivityDefinition
  challengeObjectiveHashes: number[] // mapped to DestinyObjectiveDefinition (unconfirmed)
  /**
   * @description If the activity has modifiers, this will be the list of modifiers that all variants have in common.
   *     Perform lookups against DestinyActivityModifierDefinition which defines the modifier being applied to get at
   *     the modifier data.
   * @description Note that, in the DestiyActivityDefinition, you will see many more modifiers than this being
   *     referred to: those are all *possible* modifiers for the activity, not the active ones. Use only the active
   *     ones to match what's really live.
   */
  modifierHashes: number[] // mapped to DestinyActivityModifierDefinition
  /**
   * @description If returned, this is the index into the DestinyActivityDefinition's "loadouts" property, indicating
   *     the currently active loadout requirements.
   */
  loadoutRequirementIndex: number
  /**
   * @description The ordered list of phases for this activity, if any. Note that we have no human-readable info for
   *     phases, nor any entities to relate them to: relating these hashes to something human-readable is up to you,
   *     unfortunately.
   */
  phaseHashes: number[]
  /**
   * @description The set of activity options for this activity, keyed by an identifier that's unique for this
   *     activity
   *     (not guaranteed to be unique between or across all activities, though should be unique for every *variant*
   *     of
   *     a given *conceptual* activity: for instance, the original D2 Raid has many variant
   *     DestinyActivityDefinitions. While other activities could potentially have the same option hashes, for any
   *     given D2 base Raid variant the hash will be unique).
   *
   * As a concrete example of this data, the hashes you get for Raids will correspond to the currently active
   *     "Challenge Mode".
   *
   * We have no human-readable information for this data, so it's up to you if you want to associate it with such
   *     info
   *     to show it.
   */
  booleanActivityOptions: { [key: number]: boolean }
}

/**
 * @description A milestone may have one or more conceptual Activities associated with it, and each of those conceptual
 *     activities could have a variety of variants, modes, tiers, what-have-you. Our attempts to determine what
 *     qualifies as a conceptual activity are, unfortunately, janky. So if you see missing modes or modes that don't
 *     seem appropriate to you, let us know, and I'll buy you a beer if we ever meet up in person.
 */
export type DestinyPublicMilestoneActivity = {
  /**
   * @description The hash identifier of the activity that's been chosen to be considered the canonical "conceptual"
   *     activity definition. This may have many variants, defined herein.
   */
  activityHash: number // mapped to DestinyActivityDefinition
  /**
   * @description The activity may have 0-to-many modifiers: if it does, this will contain the hashes to the
   *     DestinyActivityModifierDefinition that defines the modifier being applied.
   */
  modifierHashes: number[] // mapped to DestinyActivityModifierDefinition
  /**
   * @description The activity may have 0-to-many modifiers: if it does, this will contain the hashes to the
   *     DestinyActivityModifierDefinition that defines the modifier being applied.
   */
  variants: number[] // mapped to DestinyActivityModifierDefinition
  /**
   * @description The hash identifier of the most specific Activity Mode under which this activity is played. This is
   *     useful for situations where the activity in question is - for instance - a PVP map, but it's not clear what
   *     mode the PVP map is being played under. If it's a playlist, this will be less specific: but hopefully useful
   *     in some way.
   */
  activityModeHash: number // mapped to DestinyActivityModeDefinition
  /**
   * @description The enumeration equivalent of the most specific Activity Mode under which this activity is played.
   */
  activityModeType: number // mapped to DestinyActivityModeType
}

/**
 * @description Represents a variant of an activity that's relevant to a milestone.
 */
export type DestinyPublicMilestoneActivityVariant = {
  /**
   * @description The hash identifier of this activity variant. Examine the activity's definition in the Manifest
   *     database to determine what makes it a distinct variant. Usually it will be difficulty level or whether or
   *     not it is a guided game variant of the activity, but theoretically it could be distinguished in any
   *     arbitrary way.
   */
  activityHash: number // mapped to DestinyActivityDefinition
  /**
   * @description The hash identifier of the most specific Activity Mode under which this activity is played. This is
   *     useful for situations where the activity in question is - for instance - a PVP map, but it's not clear what
   *     mode the PVP map is being played under. If it's a playlist, this will be less specific: but hopefully useful
   *     in some way.
   */
  activityModeHash: number // mapped to DestinyActivityModeDefinition
  /**
   * @description The enumeration equivalent of the most specific Activity Mode under which this activity is played.
   */
  activityModeType: number // mapped to DestinyActivityModeType
}

export type DestinyPublicMilestoneVendor = {
  /**
   * @description The hash identifier of the Vendor related to this Milestone. You can show useful things from this,
   *     such as thier Faction icon or whatever you might care about.
   */
  vendorHash: number // mapped to DestinyVendorDefinition
  /**
   * @description If this vendor is featuring a specific item for this event, this will be the hash identifier of that
   *     item. I'm taking bets now on how long we go before this needs to be a list or some other, more complex
   *     representation instead and I deprecate this too. I'm going to go with 5 months. Calling it now, 2017-09-14 at
   *     9:46pm PST.
   */
  previewItemHash: number // mapped to DestinyInventoryItemDefinition
}

/**
 * @description A Milestone can have many Challenges. Challenges are just extra Objectives that provide a fun way to
 *     mix-up play and provide extra rewards.
 */
export type DestinyPublicMilestoneChallenge = {
  /**
   * @description The objective for the Challenge, which should have human-readable data about what needs to be done
   *     to accomplish the objective. Use this hash to look up the DestinyObjectiveDefinition.
   */
  objectiveHash: number // mapped to DestinyObjectiveDefinition
  /**
   * @description IF the Objective is related to a specific Activity, this will be that activity's hash. Use it to
   *     look up the DestinyActivityDefinition for additional data to show.
   */
  activityHash: number // mapped to DestinyActivityDefinition
}

export enum DestinyActivityModeType {
  None = 0,
  Story = 2,
  Strike = 3,
  Raid = 4,
  AllPvP = 5,
  Patrol = 6,
  AllPvE = 7,
  Reserved9 = 9,
  Control = 10,
  Reserved11 = 11,
  Clash = 12, // Clash -> Destiny's name for Team Deathmatch. 4v4 combat, the team with the highest kills at the end
  // of time wins.
  Reserved13 = 13,
  CrimsonDoubles = 15,
  Nightfall = 16,
  HeroicNightfall = 17,
  AllStrikes = 18,
  IronBanner = 19,
  Reserved20 = 20,
  Reserved21 = 21,
  Reserved22 = 22,
  Reserved24 = 24,
  AllMayhem = 25,
  Reserved26 = 26,
  Reserved27 = 27,
  Reserved28 = 28,
  Reserved29 = 29,
  Reserved30 = 30,
  Supremacy = 31,
  PrivateMatchesAll = 32,
  Survival = 37,
  Countdown = 38,
  TrialsOfTheNine = 39,
  Social = 40,
  TrialsCountdown = 41,
  TrialsSurvival = 42,
  IronBannerControl = 43,
  IronBannerClash = 44,
  IronBannerSupremacy = 45,
  ScoredNightfall = 46,
  ScoredHeroicNightfall = 47,
  Rumble = 48,
  AllDoubles = 49,
  Doubles = 50,
  PrivateMatchesClash = 51,
  PrivateMatchesControl = 52,
  PrivateMatchesSupremacy = 53,
  PrivateMatchesCountdown = 54,
  PrivateMatchesSurvival = 55,
  PrivateMatchesMayhem = 56,
  PrivateMatchesRumble = 57,
  HeroicAdventure = 58,
  Showdown = 59,
  Lockdown = 60,
  Scorched = 61,
  ScorchedTeam = 62,
  Gambit = 63,
  AllPvECompetitive = 64,
  Breakthrough = 65,
  BlackArmoryRun = 66,
  Salvage = 67,
  IronBannerSalvage = 68,
  PvPCompetitive = 69,
  PvPQuickplay = 70,
  ClashQuickplay = 71,
  ClashCompetitive = 72,
  ControlQuickplay = 73,
  ControlCompetitive = 74,
  GambitPrime = 75,
  Reckoning = 76,
  Menagerie = 77,
  VexOffensive = 78,
  NightmareHunt = 79,
  Elimination = 80,
  Momentum = 81,
  Dungeon = 82,
  Sundial = 83,
  TrialsOfOsiris = 84,
  Dares = 85,
  Offensive = 86,
  LostSector = 87,
  Rift = 88,
  ZoneControl = 89,
  IronBannerRift = 90,
  IronBannerZoneControl = 91,
}
