import NextAuth, { NextAuthOptions } from "next-auth";
import BungieProvider from "next-auth/providers/bungie";
import { BungieUser, User } from "../../../types/user";

export const authOptions: NextAuthOptions = {
  // Configure one or more authentication providers
  providers: [
    BungieProvider({
      clientId: `${process.env.DESTINY_CLIENT_ID}`,
      clientSecret: `${process.env.DESTINY_CLIENT_SECRET}`,
      authorization: {
        url: "https://www.bungie.net/en/OAuth/Authorize?reauth=true",
        params: {
          scope: "",
        },
      },
      httpOptions: {
        headers: {
          "X-API-Key": process.env.DESTINY_API_KEY,
        },
      },
      profile(profile) {
        const { Response }: { Response: BungieUser } = profile;
        const { displayName, profilePicturePath, membershipId } = Response;
        const bungieUser: User = {
          id: membershipId,
          name: displayName,
          email: null,
          image: `https://www.bungie.net${
            profilePicturePath.startsWith("/") ? "" : "/"
          }${profilePicturePath}`,
        };
        return bungieUser;
      },

      userinfo: `${
        process.env.DESTINY_API_ROOT_PATH
      }/User/GetBungieNetUserById/${8774919}/`,
    }),
  ],
  callbacks: {
    async signIn({ user, account, profile, email, credentials }) {
      console.log("Siging In: ", user, account, profile, email, credentials);
      return true;
    },
    async redirect({ url, baseUrl }) {
      console.log("Redirecting to: ", url);
      return baseUrl;
    },
    async session({ session, token }) {
      console.log("Session: ", session, token);

      return session;
    },
    async jwt({ token, user, account, profile, isNewUser }) {
      console.log("JWT: ", token, user, account, profile, isNewUser);
      return token;
    },
  },
};
export default NextAuth(authOptions);
