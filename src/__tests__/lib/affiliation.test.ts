import * as affils from '@lib/affiliation'

import cases from './affiliation.case.json'

describe('extractLocationWithGeonames', () => {
    // Positive testing
    test.each(cases.extractLocationWithGeonames.positive)(
        'Positive testing',
        async ({ input, output }) => {
            const location = await affils.extractLocationWithGeonames(input)
            expect(location).toEqual(output)
        }
    )
})

describe('extractLocationWithNinjas', () => {
    // Positive testing
    test.each(cases.extractLocationWithNinjas.positive)(
        'Positive testing',
        async ({ input, output }) => {
            const location = await affils.extractLocationWithNinjas(input)
            expect(location).toEqual(output)
        }
    )
})

describe('extractDepartmentWithROR', () => {
    // Positive testing
    test.each(cases.extractDepartmentWithROR.positive)(
        'Positive testing',
        async ({ input, output }) => {
            const organization = await affils.extractDepartmentWithROR(input)
            expect(organization).toEqual(output)
        }
    )
})

describe('parseAffiliationString', () => {
    // Positive testing
    test.each(cases.parseAffiliationString.positive)(
        'Positive testing',
        async ({ input, output }) => {
            const organization = await affils.parseAffiliationString(input)
            expect(organization).toEqual(output)
        }
    )
})
