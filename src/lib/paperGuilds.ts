import { chromium, Page } from 'playwright'

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
export const getAffils = async (page: Page) => {
    // Wait for the selector to appear
    const selector = '.main div[class="ui divided horizontal list"]'
    await page.waitForSelector(selector)

    // Extract organization names
    const affilsAll = await page.$$eval(selector, (nodes) => {
        return nodes.map((e) => {
            const nodes = e.querySelectorAll('.description')
            return Array.from(nodes, (e) => e.textContent)
        })
    })
    return affilsAll
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
    const authorsAll = await getAuthors(page)
    const affilsAll = await getAffils(page)

    // Close the browser
    await page.close()
    await browser.close()

    // // Iterate over each paper to get metadata
    const metadata = titles.map((title, i) => ({
        title,
        authors: authorsAll[i],
        affiliations: affilsAll[i],
    }))
    return metadata
}
