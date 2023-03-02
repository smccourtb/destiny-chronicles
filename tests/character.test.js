import next from 'next'
import { getProfile } from '../lib/character'
import { destinyComponents } from '../lib/character'
import { expect, test } from '@jest/globals'

next({ dev: true })

describe("Get a user's profile", () => {
  test('get profile component', async () => {
    const profile = await getProfile('4611686018440379685', 1, [destinyComponents.profile.toString()])
    expect(profile).toHaveProperty('data')
  })
  test('get profile component', async () => {
    const profile = await getProfile('4611686018440379685', 1, [destinyComponents.profile])
    expect(profile).toHaveProperty('error')
  })
})
