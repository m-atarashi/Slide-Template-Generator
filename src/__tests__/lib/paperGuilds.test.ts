import * as paperGuilds from '@lib/paperGuilds'
import { chromium } from 'playwright'

import cases from './paperGuilds.case.json'

describe('fetchTitles', () => {
    // Positive testing
    test.each(cases.getTitles.positive)(
        'Positive testing',
        async ({ input, output }) => {
            const browser = await chromium.launch()
            const context = await browser.newContext()
            const page = await context.newPage()
            await page.goto(input)

            const result = await paperGuilds.getTitles(page)
            expect(result).toEqual(output)

            await page.close()
            await browser.close()
        },
        10000
    )
})

describe('fetchAuthors', () => {
    // Positive testing
    test.each(cases.getAuthors.positive)(
        'Positive testing',
        async ({ input, output }) => {
            const browser = await chromium.launch()
            const context = await browser.newContext()
            const page = await context.newPage()
            await page.goto(input)

            const result = await paperGuilds.getAuthors(page)
            expect(result).toEqual(output)

            await page.close()
            await browser.close()
        },
        10000
    )
})

describe('fetchAffiliations', () => {
    // Positive testing
    test.each(cases.getAffiliations.positive)(
        'Positive testing',
        async ({ input, output }) => {
            const browser = await chromium.launch()
            const context = await browser.newContext()
            const page = await context.newPage()
            await page.goto(input)

            const result = await paperGuilds.getAffiliations(page)
            expect(result).toEqual(output)

            await page.close()
            await browser.close()
        },
        10000
    )
})

describe('fetchMetadataList', () => {
    // Positive testing
    test.each(cases.fetchMetadataList.positive)(
        'Positive testing',
        async ({ input, output }) => {
            const metadataList = await paperGuilds.fetchMetadataList(input)
            expect(metadataList).toEqual(output)
        },
        10000
    )
})

describe('fetchDois', () => {
    // Positive testing
    test.each(cases.fetchDois.positive)('Positive testing', async ({ input, output }) => {
        const dois = await paperGuilds.fetchDois(input)
        expect(dois).toEqual(output)
    })
})

describe('fetchMetadataListViaDoi', () => {
    // Positive testing
    test.each(cases.fetchMetadataListViaDoi.positive)(
        'Positive testing',
        async ({ input, output }) => {
            const metadataList = await paperGuilds.fetchMetadataListViaDoi(input)
            expect(metadataList).toEqual(output)
        },
        10000
    )
})
