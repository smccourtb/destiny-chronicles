import type { UserMembershipData, UserSearchPrefixRequest, UserSearchResponse } from '../types/user'
import { BungieResponse } from './articles'

export const searchByGlobalNamePost = async (globalName: string, page = 0) => {
  const body: UserSearchPrefixRequest = { displayNamePrefix: globalName }
  const response = await fetch(`https://www.bungie.net/Platform/User/Search/GlobalName/${page}/`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'X-API-Key': process.env.DESTINY_API_KEY as string,
    },
    body: JSON.stringify(body),
  })
  if (response.ok) {
    const { Response }: BungieResponse<UserSearchResponse> = await response.json()
    return { data: Response, error: null }
  } else {
    return { data: null, error: new Error(response.statusText) }
  }
}

/**
 * @description Returns a list of accounts associated with signed-in user. This is useful for OAuth implementations
 *     that do not give you access to the token response.
 */
export const getMembershipDataForCurrentUser = async () => {
  const response = await fetch('https://www.bungie.net/Platform/User/GetMembershipsForCurrentUser/', {
    method: 'GET',
    headers: {
      'X-API-Key': process.env.DESTINY_API_KEY as string,
    },
  })
  if (response.ok) {
    const { Response }: BungieResponse<UserMembershipData> = await response.json()
  }
}
