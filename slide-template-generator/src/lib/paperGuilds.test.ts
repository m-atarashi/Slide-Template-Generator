import puppeteer from 'puppeteer'

import { getAffils, getAuthors, getTitles } from '@/lib/paperGuilds'

describe('getPapersInfo', () => {
    const url = 'https://pgl.jp/seminars/chi2023/sessions/646bb5fb7fb3e6002aabf6aa'

    // titles
    test('fetch titles from a session page', async () => {
        const browser = await puppeteer.launch({ headless: 'new' })
        const page = await browser.newPage()
        await page.goto(url, { waitUntil: 'networkidle0' })

        const result = await getTitles(page)
        expect(result).toEqual([
            'Charagraph: Interactive Generation of Charts for Realtime Annotation of Data-Rich Paragraphs',
            'ChartDetective: Easy and Accurate Interactive Data Extraction from Complex Vector Charts',
            'Understanding and Supporting Debugging Workflows in Multiverse Analysis',
            'multiverse: Multiplexing Alternative Data Analyses in R Notebooks',
            'Z-Ring: Single-point Bio-impedance Sensing for Gesture, Touch, Object and User Recognition',
            'A Framework and Call to Action for the Future Development of EMG-Based Input in HCI',
        ])

        await page.close()
        await browser.close()
    }, 10000)

    // authors
    test('fetch authors from a session page', async () => {
        const browser = await puppeteer.launch({ headless: 'new' })
        const page = await browser.newPage()
        await page.goto(url, { waitUntil: 'networkidle0' })

        const result = await getAuthors(page)
        expect(result).toEqual([
            ['Damien Masson', 'Sylvain Malacria', 'Géry Casiez', 'Daniel Vogel'],
            ['Damien Masson', 'Sylvain Malacria', 'Daniel Vogel', 'Edward Lank', 'Géry Casiez'],
            ['Ken Gu', 'Eunice Jun', 'Tim Althoff'],
            [
                'Abhraneel Sarma',
                'Alex Kale',
                'Michael Jongho. Moon',
                'Nathan Taback',
                'Fanny Chevalier',
                'Jessica Hullman',
                'Matthew Kay',
            ],
            [
                'Anandghan Waghmare',
                'Youssef Ben Taleb',
                'Ishan Chatterjee',
                'Arjun Narendra',
                'Shwetak Patel',
            ],
            ['Ethan Eddy', 'Erik J. Scheme', 'Scott Bateman'],
        ])

        await page.close()
        await browser.close()
    }, 10000)

    // affilations
    test('fetch affilations from a session page', async () => {
        const browser = await puppeteer.launch({ headless: 'new' })
        const page = await browser.newPage()
        await page.goto(url, { waitUntil: 'networkidle0' })

        const result = await getAffils(page)
        expect(result).toEqual([
            [
                'University of Waterloo, Waterloo, Ontario, Canada',
                'Univ. Lille, Inria, CNRS, Centrale Lille, UMR 9189 - CRIStAL, Lille, France',
                'Université de Lille, Lille, France',
                'University of Waterloo, Waterloo, Ontario, Canada',
            ],
            [
                'University of Waterloo, Waterloo, Ontario, Canada',
                'Univ. Lille, Inria, CNRS, Centrale Lille, UMR 9189 - CRIStAL, Lille, France',
                'University of Waterloo, Waterloo, Ontario, Canada',
                'University of Waterloo, Waterloo, Ontario, Canada',
                'Univ. Lille, CNRS, Inria, Centrale Lille, UMR 9189 CRIStAL, Lille, France',
            ],
            [
                'University of Washington, Seattle, Washington, United States',
                'University of Washington, Seattle, Washington, United States',
                'University of Washington, Seattle, Washington, United States',
            ],
            [
                'Northwestern University, Evanston, Illinois, United States',
                'University of Washington, Seattle, Washington, United States',
                'University of Toronto, Toronto, Ontario, Canada',
                'University of Toronto, Toronto, Ontario, Canada',
                'University of Toronto, Toronto, Ontario, Canada',
                'Northwestern University, Evanston, Illinois, United States',
                'Northwestern University, Chicago, Illinois, United States',
            ],
            [
                'University of Washington, Seattle, Washington, United States',
                'University of Washington, Seattle, Washington, United States',
                'University of Washington, Seattle, Washington, United States',
                'University of Washington, Seattle, Seattle, Washington, United States',
                'University of Washington, Seattle, Washington, United States',
            ],
            [
                'University of New Brunswick, Fredericton, New Brunswick, Canada',
                'University of New Brunswick, Fredericton, New Brunswick, Canada',
                'University of New Brunswick, Fredericton, New Brunswick, Canada',
            ],
        ])

        await page.close()
        await browser.close()
    }, 10000)
})
