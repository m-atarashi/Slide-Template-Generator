import axios from 'axios'
import { parseHTML } from 'linkedom'
import { chromium, Page } from 'playwright'

import { extractLocation } from './affiliation'
import fetchMetadata from './doi'

// Get titles
export const getTitles = async (page: Page) => {
    // Wait for the selector to appear
    const selector = 'div[class="ui divided list"] a'
    await page.waitForSelector(selector)

    // Extract titles
    const titles = await page.$$eval(selector, (nodes) => nodes.map((e) => e.textContent ?? ''))
    return titles
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
            return Array.from(nodes, (e) => e.textContent ?? '')
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
            return Array.from(nodes, (e) => e.textContent ?? '')
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

    // Get the organization names
    const promises = Promise.all(affiliationsList.map((e) => Promise.all(e.map(extractLocation))))
    const organizationsList = (await promises).map((e) => e.map((f) => f.fullOrganization))

    // Integrate the metadata
    const metadataList = titles.map((title, i) => {
        return { title, authors: authorsList[i], affiliations: organizationsList[i] }
    })
    return metadataList
}

// Fetch a list of doi in a session page
export const fetchDois = async (url: string) => {
    // Fetch html and get the document object
    const response = await axios.get(url)
    const { document } = parseHTML(response.data)

    // Extract the doi urls
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
    const metadataList = await Promise.all(dois.map(fetchMetadata))

    // Extract title, authors, and organizations
    const paperInfo = metadataList.map((e) => {
        const organizations = e.affiliations.map(({ organization }) => organization)
        return { ...e, affiliations: organizations }
    })
    return paperInfo
}
