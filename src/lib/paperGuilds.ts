import puppeteer, { Page } from 'puppeteer'

// Get titles
export const getTitles = async (page: Page) => {
    const titles = await page.$$eval('div[class="ui divided list"]', (nodes) =>
        nodes.map((e) => (e as HTMLElement).innerText)
    )
    return titles[0].split('\n')
}

// Get authors
export const getAuthors = async (page: Page) => {
    const authorsAll = await page.evaluate(() => {
        // Get all of authors information with affiliations
        const authorsWithAffilsAll = Array.from(
            document.querySelectorAll('.main div[class="ui divided horizontal list"]')
        )

        // Extract author names
        return authorsWithAffilsAll.map((e) => {
            const nodes = e.querySelectorAll('.header')
            return Array.from(nodes, (node) => node.textContent)
        })
    })
    return authorsAll
}

// Get affiliations
export const getAffils = async (page: Page) => {
    const affilsAll = await page.evaluate(() => {
        // Get all of authors information with affiliations
        const authorsWithAffilsAll = Array.from(
            document.querySelectorAll('.main div[class="ui divided horizontal list"]')
        )

        // Extract organization names
        return authorsWithAffilsAll.map((e) => {
            const nodes = e.querySelectorAll('.description')
            return Array.from(nodes, (node) => node.textContent)
        })
    })
    return affilsAll
}

export const fetchPapersInfo = async (url: string) => {
    // Fetch html and get the document object
    const browser = await puppeteer.launch({ headless: 'new' })
    const page = await browser.newPage()
    await page.goto(url, { waitUntil: 'networkidle0' })

    // Get metadata for each paper
    const titles = await getTitles(page)
    const authorsAll = await getAuthors(page)
    const affilsAll = await getAffils(page)

    // Close the browser
    await page.close()
    await browser.close()

    // Iterate over each paper to get metadata
    return titles.map((title, i) => ({ title, authors: authorsAll[i], affils: affilsAll[i] }))
}

export default fetchPapersInfo
