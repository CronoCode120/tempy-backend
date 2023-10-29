import { describe, it, beforeAll, expect } from 'vitest'
import { CountryRepositoryMongo } from './CountryRepositoryMongo.ts'

const countryList = [
    {
        name: "España",
        ip: "103.202.235.255",
    },
    {
        name: "Francia",
        ip: "1.1.1.1",
    },
    {
        name: "Portugal",
        ip: "2.2.2.2",
    },
]

describe('CountryRepositoryMongo', () => {
    let countryRepository: CountryRepositoryMongo
    beforeAll(() => {
        countryRepository = new CountryRepositoryMongo()
    })
    it('gets country list from database', async () => {
        await countryRepository.connect()

        const list = await countryRepository.getCountryList()

        expect(list).toEqual(countryList)
    })
})
