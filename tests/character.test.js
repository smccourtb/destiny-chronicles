import { getProfile } from '../lib/character'
import { destinyComponents } from '../lib/character'
import { expect, test } from '@jest/globals'
test('gets users profile', async () => {
  const profile = await getProfile('4611686018440379685', 1, [destinyComponents.profile])
  expect(profile).toHaveProperty('data')
})
