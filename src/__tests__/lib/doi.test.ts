import { fetchFromCrossref, fetchMetadata } from '@lib/doi'

import cases from './doi.case.json'

describe('fetchCrossref', () => {
    // Positive testing
    test.each(cases.fetchCrossref.positive)('Positive testing', async ({ input, output }) => {
        const metadata = await fetchFromCrossref(input)
        expect(metadata).toEqual(output)
    })
})

describe('fetchMetadata', () => {
    // Positive testing
    test.each(cases.fetchMetadata.positive)('Positive testing', async ({ input, output }) => {
        const metadata = await fetchMetadata(input)
        expect(metadata).toEqual(output)
    })
})
