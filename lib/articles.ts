export interface BungieResponse<T> {
  Response: T
  ErrorCode: number
  ThrottleSeconds: number
  ErrorStatus: string
  Message: string
  MessageData: {}
}

export type NewsArticle = {
  Title: string
  Link: string
  PubDate: string
  UniqueIdentifier: string
  Description: string
  ImagePath: string
  OptionalMobileImagePath?: string
}

export type NewsArticleResponse = {
  NewsArticles: NewsArticle[]
  CurrentPaginationToken: number
  NextPaginationToken: number
  ResultCountThisPage: number
}

export async function getNewsArticles(pageNumber = 0) {
  const res = await fetch(`https://www.bungie.net/Platform/Content/Rss/NewsArticles/${pageNumber.toString()}/`, {
    method: 'GET',
    headers: {
      'X-API-Key': process.env.DESTINY_API_KEY as string,
    },
  })
  if (!res.ok) {
    return { error: { message: res.statusText }, data: null }
  }

  const { Response }: { Response: NewsArticleResponse } = await res.json()
  return { data: [...Response.NewsArticles], error: null }
}
