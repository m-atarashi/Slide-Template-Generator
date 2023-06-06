import axios from 'axios'

import { parseAffiliationString } from './affiliation'

// Fetch the metadata of a paper such as title, authors and affiliations from a doi url from Crossref REST API
export const fetchFromCrossref = async (
    doi: string
): Promise<{
    title: string
    authors: string[]
    affiliations: string[]
}> => {
    // Fetch metadata from Crossref REST API
    const response = await axios.get(`https://api.crossref.org/works/${doi}`)
    const { message } = response.data

    // Validate the response
    if (response.status !== 200) {
        throw new Error('Failed to fetch metadata')
    }

    // Extract the title, authors and affiliations
    const title = message.title[0]
    const authors = message.author.map((e: any) => `${e.given} ${e.family}`)
    const affiliations = message.author.map((e: any) => e.affiliation[0].name ?? '')

    return { title, authors, affiliations }
}

// Fetch the metadata of a paper from a doi url
export const fetchMetadata = async (doi: string) => {
    const metadata = await fetchFromCrossref(doi)
    const affiliations = await Promise.all(metadata.affiliations.map(parseAffiliationString))
    return { ...metadata, affiliations }
}

export default fetchMetadata
