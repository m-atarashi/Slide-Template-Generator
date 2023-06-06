import { fetchSessionName, getConferenceName, validateSessionPage } from '@/lib/PaperGuilds'

import cases from './PaperGuilds.case.json'

describe('validateSessionPage', () => {
    // Positive testing
    test.each([
        'https://pgl.jp/seminars/chi2023/sessions/646bb5fb7fb3e6002aabf6aa',
        'https://pgl.jp/seminars/chi2023/sessions/646bb5fb7fb3e6002aabf6c2',
    ])('Valid url', async (input) => {
        const func = () => validateSessionPage(input)
        expect(func).not.toThrow()
    })

    // Negative testing
    test('Empty url', async () => {
        const func = async () => await fetchSessionName('')
        expect(func).rejects.toThrow('Invalid URL')
    })

    test.each([
        'https://pgl.jp/seminars/chi2023/sessions/a',
        'https://pgl.jp/seminars/chi2023/',
        "https://pgl.jp/seminars/chi2023/sessions/646bb5fb7fb3e6002aabf6c2aaaaa'",
    ])('Invalid url', async (input) => {
        const func = async () => await fetchSessionName(input)
        expect(func).rejects.toThrow('Invalid URL')
    })
})

describe('getConferenceName', () => {
    // Positive testing
    test.each(cases.getConferenceName.positive)('Valid url', async ({ input, output }) => {
        const result = getConferenceName(input)
        expect(result).toEqual(output)
    })
})

describe('fetchSessionName', () => {
    // Positive testing
    test.each(cases.fetchSessionName.positive)('Positive testing', async ({ input, output }) => {
        const result = await fetchSessionName(input)
        expect(result).toEqual(output)
    })
})
