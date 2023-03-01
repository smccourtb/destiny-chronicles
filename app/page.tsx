import { authOptions } from '../pages/api/auth/[...nextauth]'
import { getServerSession } from 'next-auth/next'
import { SignInButton } from '../components/buttons/SignInButton'
import { destinyComponents, getProfile } from '../lib/character'
export const metadata = {
  title: 'The Destiny Chronicles',
}

export default async function Page() {
  const session = await getServerSession(authOptions)
  // const { data, error } = await getNewsArticles(0)
  if (session) {
    const { data: profile, error: characterError } = await getProfile(session.user.primaryMembershipId, 1, [
      destinyComponents.vendorReceipts,
      105,
    ])
    profile && console.log(profile)
    characterError && console.error(characterError as Error)
  }
  return (
    <>
      {/*<Navbar*/}
      {/*  background={`https://www.bungie.net${character.emblemBackgroundPath}`}*/}
      {/*/>*/}
      <SignInButton isSignedIn={!!session?.user} />
      {!!session?.user && (
        <>
          <p className={'text-2xl text-red-500'}>{session?.user && `HI ${session.user.name}`}</p>
          <p className={'text-white text-lg font-[700]'}>THIS WEEK AT BUNGIE</p>
          <div className="grid grid-cols-3 gap-10">
            {/*{data &&*/}
            {/*  data.map((article) => {*/}
            {/*    return (*/}
            {/*      <div key={article.UniqueIdentifier} className={'text-white text-lg font-[300]'}>*/}
            {/*        <Image*/}
            {/*          alt={article.Title}*/}
            {/*          src={article.ImagePath}*/}
            {/*          height={150}*/}
            {/*          width={300}*/}
            {/*          className="rounded-lg"*/}
            {/*        />*/}
            {/*        <p>{article.Title}</p>*/}
            {/*        <p>{article.Description}</p>*/}
            {/*      </div>*/}
            {/*    )*/}
            {/*  })}*/}
          </div>
        </>
      )}
    </>
  )
}
