import { chromium } from 'playwright'

import { fetchMetadataList, getAffils, getAuthors, getTitles } from '../paperGuilds'
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

            const result = await getTitles(page)
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

            const result = await getAuthors(page)
            expect(result).toEqual(output)

            await page.close()
            await browser.close()
        },
        10000
    )
})

describe('fetchAffils', () => {
    // Positive testing
    test.each(cases.getAffils.positive)(
        'Positive testing',
        async ({ input, output }) => {
            const browser = await chromium.launch()
            const context = await browser.newContext()
            const page = await context.newPage()
            await page.goto(input)

            const result = await getAffils(page)
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
            const metadataList = await fetchMetadataList(input)
            expect(metadataList).toEqual(output)
        },
        10000
    )
})
