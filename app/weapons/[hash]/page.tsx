import useWeapon from '../../../hooks/use-weapon'
import Weapon from '../../../components/Weapon'

export default async function Page({ params }: { params: { hash: string } }) {
  // royal executioner = 1720503118
  return (
    <section>
      <Weapon hash={params.hash} />
    </section>
  )
}
