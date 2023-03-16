import { authOptions } from '../../pages/api/auth/[...nextauth]'
import { getServerSession } from 'next-auth/next'
import { SignInButton } from '../../components/buttons/SignInButton'
import { destinyComponents, getProfile, getSeasonData } from '../../lib/character'
import { logDebug, logError, logInfo, setDebug } from '../../logger/logger'
import { Navbar } from '../../components/Navbar'
export const metadata = {
  title: 'The Destiny Chronicles',
}

export default async function Page() {
  const session = await getServerSession(authOptions)
  logDebug('SESSION ON PAGE: ', session)
  // const { json, error } = await getNewsArticles(0)
  if (session) {
    const { profile, characters } = destinyComponents
    const { data, error } = await getProfile(session.user.primaryMembershipId, 1, [profile, characters])
    const { data: season, error: seasonError } = await getSeasonData(data.profile.currentSeasonHash)
    return (
      <>
        {/* @ts-expect-error Server Component */}
        <Navbar
          emblemHash={data && data.characters[data.profile.characterIds[0]].emblemHash}
          characterDisplayName={session.user.name as string}
          seasonIcon={season && season.seasonIcon}
          seasonNumber={season && season.seasonNumber}
          lightLevel={data && data.characters[data.profile.characterIds[0]].light}
          guardianRank={data && data.profile.currentGuardianRank}
        />
      </>
    )
  } else {
    return (
      <div className="h-screen w-screen flex items-center justify-center">
        <SignInButton isSignedIn={false} />
      </div>
    )
  }
}
