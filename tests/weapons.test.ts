import { handleWeaponStats } from '../lib/weapons/stats'
import { expect, it } from '@jest/globals'
import next from 'next'

next({ dev: true })

export type MockWeaponStats = {
  stats: {
    [key: string]: {
      statHash: number
      value: number
    }
  }
}

export type MockBulkGet = jest.Mock<Promise<any>, [statHashes: any], any>
describe('getWeaponStats', () => {
  it('returns an array of FormattedStat objects', async () => {
    const weaponStats: MockWeaponStats = {
      stats: {
        '1234': { statHash: 1234, value: 10 },
        '5678': { statHash: 5678, value: 5 },
      },
    }

    // Mock the bulkGet function from DestinyStatDefinitionTable to return the expected data.
    const mockBulkGet = jest.fn(async (statHashes) => {
      return statHashes.map((hash: number[]) => ({
        blacklisted: false,
        displayProperties: { name: 'Test Stat', description: 'Description', hasIcon: false },
        statCategory: 1,
        hash,
      }))
    })

    // Call the function with the mocked bulkGet.
    const formattedStats = await handleWeaponStats(weaponStats, mockBulkGet)

    expect(formattedStats).toHaveLength(2)
    expect(formattedStats[0]).toHaveProperty('name', 'Test Stat')
    expect(formattedStats[0]).toHaveProperty('value', 10)
    expect(formattedStats[1]).toHaveProperty('name', 'Test Stat')
    expect(formattedStats[1]).toHaveProperty('value', 5)

    // Make sure bulkGet was called with the correct arguments.
    expect(mockBulkGet).toHaveBeenCalledTimes(1)
    expect(mockBulkGet).toHaveBeenCalledWith(['1234', '5678'])
  })

  it('ignores blacklisted stats and stats that are not for weapons', async () => {
    const weaponStats = {
      stats: {
        '1234': { statHash: 1234, value: 10 },
        '5678': { statHash: 5678, value: 5 },
      },
    }

    // Mock the bulkGet function from DestinyStatDefinitionTable to return some blacklisted and non-weapon stats.
    const mockBulkGet = jest.fn(async (statHashes) => {
      return statHashes.map((hash: number | string, index: number) => {
        if (index === 1) {
          return { blacklisted: true }
        }
        return {
          blacklisted: false,
          displayProperties: { name: 'Test Stat', description: 'Description', hasIcon: false },
          statCategory: 2, // set as non-weapon stats
          hash,
        }
      })
    })

    // Call the function with the mocked bulkGet.
    const formattedStats = await handleWeaponStats(weaponStats, mockBulkGet)

    expect(formattedStats).toHaveLength(0)

    // Make sure bulkGet was called with the correct arguments.
    expect(mockBulkGet).toHaveBeenCalledTimes(1)
    expect(mockBulkGet).toHaveBeenCalledWith(['1234', '5678'])
  })
})
