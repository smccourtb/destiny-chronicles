import Weapon from '../../../components/Weapon'

export const metadata = {
  title: `The Destiny Chronicles`,
}
export default async function Page({ params }: { params: { hash: string } }) {
  return (
    <section>
      <Weapon hash={params.hash} />
    </section>
  )
}
