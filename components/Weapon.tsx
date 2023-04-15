'use client'
import useWeapon from '../hooks/use-weapon'
import Image from 'next/image'
import WeaponPerkGrid from './items/weapons/WeaponPerkGrid'
import WeaponStats from './items/weapons/WeaponStats'
import WeaponMods from './items/weapons/WeaponMods'
import WeaponMasterwork from './items/weapons/WeaponMasterwork'

type WeaponProps = {
  hash: string | number
}

const Weapon = ({ hash }: WeaponProps) => {
  const { data, error } = useWeapon(hash)
  if (!data || error) {
    // TODO: implement routing logic/error handling
    return null
  }
  console.log('data', data)

  const {
    name,
    icon,
    flavorText,
    type,
    rarity,
    ammoType,
    damageType,
    screenshot,
    perks,
    stats,
    deepsight,
    mods,
    masterwork,
  } = data
  return (
    <main className="grid grid-cols-3">
      <div className="col-span-1 flex flex-col gap-8">
        <Image
          alt={''}
          src={screenshot!}
          width="0"
          height="0"
          sizes="100vw"
          className={`${
            rarity === 'Legendary' ? 'rounded-t-xl border-t-[6px] border-t-legendary' : ''
          } w-full h-auto rounded-xl`}
          placeholder="blur"
          blurDataURL={'data:image/gif;base64,R0lGODlhAQABAIAAAP///wAAACH5BAEAAAAALAAAAAABAAEAAAICRAEAOw=='}
        />

        <div className="flex gap-2 items-center">
          <>
            <Image src={damageType.icon || ''} width={24} height={24} priority alt={damageType.name} />
            <p className="whitespace-pre-line">{damageType.name}</p>
          </>
          {ammoType && (
            <>
              <Image src={ammoType.icon || ''} width={24} height={24} priority alt={ammoType.name} />
              <p className="whitespace-pre-line">{ammoType.name}</p>
            </>
          )}
        </div>
        <div className="flex gap-2">
          {icon && (
            <Image
              src={icon}
              width={48}
              height={48}
              priority
              alt={name}
              className={`${deepsight ? 'border border-red-500' : ''} h-20 w-20`}
            />
          )}

          <div className="flex flex-col justify-center">
            <h1 className="font-bold text-2xl">{name}</h1>
            <p className="whitespace-pre-line">{type}</p>
          </div>
        </div>
        <p className="whitespace-pre-line">{flavorText}</p>
        {deepsight && (
          <div className="flex gap-2 items-center">
            <Image src={deepsight.icon} width={24} height={24} priority alt={deepsight.name} />
            <p className="whitespace-pre-line">Pattern can be extracted</p>
          </div>
        )}
        <WeaponStats stats={stats} />
      </div>
      <div className="col-span-2 flex flex-col">
        <WeaponPerkGrid perks={perks} />
        <WeaponMods mods={mods} />
        {masterwork && <WeaponMasterwork masterworks={masterwork} />}
      </div>
    </main>
  )
}

export default Weapon
