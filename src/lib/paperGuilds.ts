import axios from 'axios'
import { parseHTML } from 'linkedom'
import { chromium, Page } from 'playwright'

import fetchMetadata from './doi'

// Get titles
export const getTitles = async (page: Page) => {
    // Wait for the selector to appear
    const selector = 'div[class="ui divided list"]'
    await page.waitForSelector(selector)

    const titles = await page.$$eval(selector, (nodes) =>
        nodes.map((e) => (e as HTMLElement).innerText)
    )
    return titles[0].split('\n')
}

// Get authors
export const getAuthors = async (page: Page) => {
    // Wait for the selector to appear
    const selector = '.main div[class="ui divided horizontal list"]'
    await page.waitForSelector(selector)

    // Extract author names
    const authorsAll = await page.$$eval(selector, (nodes) => {
        return nodes.map((e) => {
            const nodes = e.querySelectorAll('.header')
            return Array.from(nodes, (e) => e.textContent)
        })
    })
    return authorsAll
}

// Get affiliations
export const getAffiliations = async (page: Page) => {
    // Wait for the selector to appear
    const selector = '.main div[class="ui divided horizontal list"]'
    await page.waitForSelector(selector)

    // Extract organization names
    const affiliationsList = await page.$$eval(selector, (nodes) => {
        return nodes.map((e) => {
            const nodes = e.querySelectorAll('.description')
            return Array.from(nodes, (e) => e.textContent)
        })
    })
    return affiliationsList
}

// Get a list of metadata of papers in a session page
export const fetchMetadataList = async (url: string) => {
    // Fetch html and get the document object
    const browser = await chromium.launch()
    const context = await browser.newContext()
    const page = await context.newPage()
    await page.goto(url)

    // Get metadata for each paper
    const titles = await getTitles(page)
    const authorsList = await getAuthors(page)
    const affiliationsList = await getAffiliations(page)

    // Close the browser
    await page.close()
    await browser.close()

    // // Iterate over each paper to get metadata
    const metadata = titles.map((title, i) => ({
        title,
        authors: authorsList[i],
        affiliations: affiliationsList[i],
    }))
    return metadata
}

// Fetch a list of doi in a session page
export const fetchDois = async (url: string) => {
    // Fetch html and get the document object
    const response = await axios.get(url)
    const { document } = parseHTML(response.data)

    // Get the doi list
    const selector = 'div[class="ui top attached segment"] > div > a'
    const nodes = document.querySelectorAll(selector)
    const dois = Array.from(nodes, (e) => e.textContent ?? '')
    return dois
}

// Get a list of metadata of papers in a session page via doi
export const fetchMetadataListViaDoi = async (url: string) => {
    // Get the doi uri list from the session page
    const dois = await fetchDois(url)

    // Get the metadata of the papers via Crossref REST API
    const paperMetadataList = await Promise.all(dois.map(fetchMetadata))
    return paperMetadataList
}
