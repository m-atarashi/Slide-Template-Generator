import axios from 'axios'
import { parseHTML } from 'linkedom'

// Validate the URL
export const validateSessionPage = (url: string) => {
    // Check if the URL is session page
    const isSessionPage = RegExp('^https://pgl.jp/seminars/.+/sessions/.+$')
    if (isSessionPage.test(url) === false) throw new Error('Invalid URL')

    // Session id is 24-digit hexadecimal number
    const isExists = RegExp('^https://pgl.jp/seminars/.+/sessions/[a-fA-F0-9]{24}$')
    if (isExists.test(url) === false) throw new Error('Invalid URL')
}

// Get the conference name
export const getConferenceName = (url: string) => {
    // Validate the URL
    validateSessionPage(url)

    // Extract the conference name
    const regex = RegExp('^https://pgl\\.jp/seminars/(.+?)/sessions/.+$')
    const match = url.match(regex)
    if (match === null) throw new Error('Invalid URL')
    return match[1]
}

// Get the session name
export const fetchSessionName = async (url: string) => {
    // Validate the URL
    validateSessionPage(url)

    // Fetch html and get the document object
    const response = await axios.get(url)
    const { document } = parseHTML(response.data)

    // Extract the session name
    const selector = 'div.main h1.header'
    let sessionName = document.querySelector(selector)?.textContent ?? ''

    // Remove the session number
    sessionName = sessionName.split('. ').splice(1).join('')
    return sessionName
}

// Get a list of metadata of papers in a session page
export const getMetadata = async (url: string) => {
    // Validate the URL
    validateSessionPage(url)

    // Get the conference program
    const conferenceName = getConferenceName(url)
    const program = await import(`../data/programs/${conferenceName}.json`)

    // Get the session data
    const sessionName = await fetchSessionName(url)
    const session = program.sessions.find((e: any) => e.name === sessionName)

    // Get the papers
    const papers = session.contentIds.map((contentId: number) =>
        program.contents.find((e: any) => e.id === contentId)
    )

    const metadataList = []

    // Get the metadata for each paper
    for (const paper of papers) {
        // Get the authors
        const authors: string[] = paper.authors.map((author: any) => {
            const person = program.people.find((e: any) => e.id === author.personId)
            return person.firstName + ' ' + person.lastName
        })

        // Get the affiliations
        const affiliations: string[][] = paper.authors.map((author: any) => {
            const institutions: string[] = author.affiliations.map((e: any) => e.institution)
            return [...new Set(institutions)]
        })

        // Get other metadata
        const award: string = paper.award ?? ''
        const doi: string = paper.addons.doi.url ?? ''

        const metadata = { title: paper.title as string, authors, affiliations, award, doi }
        metadataList.push(metadata)
    }

    return metadataList
}

getMetadata('https://pgl.jp/seminars/chi2023/sessions/646bb5fb7fb3e6002aabf6a7').then((res) =>
    console.log(JSON.stringify(res, null, 4))
)
