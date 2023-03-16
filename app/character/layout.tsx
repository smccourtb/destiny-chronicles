import React from 'react'

export default async function CharacterLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className={`bg-gotham bg-cover bg-no-repeat bg-center h-screen w-screen`}>{children}</body>
    </html>
  )
}
