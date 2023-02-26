export type User = {
  id: string;
  name: string;
  email: null; //TODO: figure out how to get email or remove it. DO I need it?
  image: string;
};

export type BungieUser = {
  membershipId: string;
  uniqueName: string;
  displayName: string;
  profilePicture: number;
  profileTheme: number;
  userTitle: number;
  successMessageFlags: string;
  isDeleted: boolean;
  about: string;
  firstAccess: string;
  lastUpdate: string;
  context: {
    isFollowing: boolean;
    ignoreStatus: { isIgnored: boolean; ignoreFlags: number };
  };
  xboxDisplayName: string;
  psnDisplayName: string;
  showActivity: boolean;
  locale: string;
  localeInheritDefault: boolean;
  showGroupMessaging: boolean;
  profilePicturePath: string;
  profileThemeName: string;
  userTitleDisplay: string;
  statusText: string;
  statusDate: string;
  steamDisplayName: string;
  cachedBungieGlobalDisplayName: string;
  cachedBungieGlobalDisplayNameCode: number;
};
