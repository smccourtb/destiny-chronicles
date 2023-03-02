import { DefaultSession } from 'next-auth'
import { BungieNetUser, DestinyMembership, UserMemberships } from './user'
import { JWT } from 'next-auth/jwt'
declare module 'next-auth' {
  /**
   * Returned by `useSession`, `getSession` and received as a prop on the `SessionProvider` React Context
   */
  interface Session {
    user: {
      /** The user's bungie membership id. */
      id: string
      bungieNetUser: BungieNetUser
      destinyMemberships: DestinyMembership[]
      primaryMembershipId: string
    } & DefaultSession['user']
    token: JWT
  }

  /**
   * The shape of the user object returned in the OAuth providers' `profile` callback,
   * or the second parameter of the `session` callback, when using a database.
   */
  interface User {}

  /**
   * Usually contains information about the provider being used
   * and also extends `TokenSet`, which is different tokens returned by OAuth Providers.
   */
  interface Account {}

  /** The OAuth profile returned from your provider */
  interface Profile {
    Response: UserMemberships
  }
}
