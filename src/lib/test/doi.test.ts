import {
    extractInstitution,
    extractPlaceByGeonames,
    extractPlaceByNinjas,
    fetchCrossref,
    fetchMetadata,
} from '../doi'
import cases from './doi.case.json'

describe('fetchCrossref', () => {
    // Positive testing
    test.each(cases.fetchCrossref.positive)('Positive testing', async ({ input, output }) => {
        const metadata = await fetchCrossref(input)
        expect(metadata).toEqual(output)
    })
})

describe('extractPlaceByGeonames', () => {
    // Positive testing
    test.each(cases.extractPlaceByGeonames.positive)(
        'Positive testing',
        async ({ input, output }) => {
            const place = await extractPlaceByGeonames(input)
            expect(place).toEqual(output)
        }
    )
})

describe('extractPlaceByNinjas', () => {
    // Positive testing
    test.each(cases.extractPlaceByNinjas.positive)(
        'Positive testing',
        async ({ input, output }) => {
            const place = await extractPlaceByNinjas(input)
            expect(place).toEqual(output)
        }
    )
})

describe('extractInstitution', () => {
    // Positive testing
    test.each(cases.extractInstitution.positive)('Positive testing', async ({ input, output }) => {
        const institution = await extractInstitution(input)
        expect(institution).toEqual(output)
    })
})

describe('fetchMetadata', () => {
    // Positive testing
    test.each(cases.fetchMetadata.positive)('Positive testing', async ({ input, output }) => {
        const metadata = await fetchMetadata(input)
        expect(metadata).toEqual(output)
    })
})
