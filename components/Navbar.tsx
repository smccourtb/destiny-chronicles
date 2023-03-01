import React from 'react'

type NavbarProps = {
  background: string
}
export function Navbar({ background }: NavbarProps) {
  const style = {
    '--imageUrl': `url(${background})`,
  } as React.CSSProperties
  console.log(background)
  return (
    <>
      <header style={style} className="h-28 bg-[image:var(--imageUrl)] bg-center bg-repeat-[1]"></header>
    </>
  )
}
