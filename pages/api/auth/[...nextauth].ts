import NextAuth, { NextAuthOptions } from 'next-auth'
import BungieProvider from 'next-auth/providers/bungie'
import { applyBungieDomain } from '../../../utils/url-handling'

export const authOptions: NextAuthOptions = {
  // Configure one or more authentication providers
  providers: [
    BungieProvider({
      clientId: `${process.env.DESTINY_CLIENT_ID}`,
      clientSecret: `${process.env.DESTINY_CLIENT_SECRET}`,
      authorization: {
        url: 'https://www.bungie.net/en/OAuth/Authorize?reauth=true',
        params: {
          scope: '',
        },
      },
      httpOptions: {
        headers: {
          'X-API-Key': process.env.DESTINY_API_KEY,
        },
      },

      profile(profile) {
        const { bungieNetUser } = profile.Response
        const { membershipId, displayName, profilePicturePath } = bungieNetUser
        return {
          id: membershipId,
          name: displayName,
          email: null,
          image: applyBungieDomain(profilePicturePath),
        }
      },

      userinfo: {
        url: 'https://www.bungie.net/Platform/User/GetMembershipsForCurrentUser/',
      },
    }),
  ],
  debug: true,
  callbacks: {
    async signIn({ user, account, profile }) {
      // profile seems to be the response from the Bungie API -> GetMembershipsForCurrentUser.
      console.debug('Sign In: ', user, account, profile)
      return true
    },
    async redirect({ url, baseUrl }) {
      // console.debug('Redirect: ', url, baseUrl)
      return baseUrl
    },
    async session({ session, token, user }) {
      console.debug('Session: ', session, token, user)
      /*
      when jwt is called we slice in the profile data retrieved from the Bungie API in the profile() callback in the
      property user.
      */
      if (token) {
        const { user, ...rest } = token as any
        session.user = { ...session.user, ...user }
        session.token = rest
      }
      return session
    },
    async jwt({ token, user, account, profile, isNewUser }) {
      console.debug('JWT: ', token, user, account, profile, isNewUser)
      if (profile) {
        const { Response } = profile
        const { bungieNetUser, destinyMemberships, primaryMembershipId } = Response
        token = {
          ...token,
          user: {
            bungieNetUser,
            destinyMemberships,
            primaryMembershipId,
          },
        }
      }
      return token
    },
  },
}
export default NextAuth(authOptions)
