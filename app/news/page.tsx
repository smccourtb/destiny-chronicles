import { authOptions } from '../../pages/api/auth/[...nextauth]'
import { getServerSession } from 'next-auth/next'
import { SignInButton } from '../../components/buttons/SignInButton'
import Link from 'next/link'
import Image from 'next/image'
import { getNewsArticles } from '../../lib/articles'
export const metadata = {
    title: 'The Destiny Chronicles',
}

export default async function Page() {
    const session = await getServerSession(authOptions)
    const { data: articles, error } = await getNewsArticles(0)

    return (
        <>
            <h1 className={'text-6xl font-semibold uppercase tracking-wide border-b pb-2 mx-16 border-1 my-4'}>Articles</h1>
            <div className="grid grid-cols-3 gap-10 m-16">
        {articles?.map((article) => {
            return (
                <a
                    href={`https://www.bungie.net${article.Link}`}
            key={article.UniqueIdentifier}
            className={'h-[150px] flex text-lg font-[300] outline-1 outline-white outline-offset-4 outline'}
                >
                {/*<div className="w-1/2 min-w-1/2 relative">*/}
                <Image
            alt={''}
            src={article.OptionalMobileImagePath || article.ImagePath}
            // fill
            width={200}
            height={150}
            placeholder="blur"
            blurDataURL={'data:image/gif;base64,R0lGODlhAQABAIAAAP///wAAACH5BAEAAAAALAAAAAABAAEAAAICRAEAOw=='}
            className="object-cover object-center-bottom"
                />
                {/*</div>*/}
                <div className="p-4 flex flex-col gap-4 max-h-24">
            <h2 className="uppercase font-semibold text-xl">{article.Title}</h2>
                <p className="text-sm text-ellipsis">{article.Description}</p>
                </div>
                </a>
        )
        })}
    </div>
    </>
)
}
