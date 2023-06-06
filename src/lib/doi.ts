import axios from 'axios'
import dotenv from 'dotenv'
dotenv.config()

// Fetch the metadata of a paper such as title, authors and affiliations from a doi url via Crossref REST API
export const fetchCrossref = async (
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

// Extract a place string from an affiliation string by Geonames API
export const extractPlaceByGeonames = async (affiliation: string) => {
    const segments = affiliation.split(', ')

    // Whether the segment is a country, state, region, city or village
    let i
    for (i = segments.length - 1; i >= 0; i--) {
        const url = 'http://api.geonames.org/searchJSON?maxRows=1&featureClass=P&featureClass=A'
        const res = await axios.get(url, {
            params: {
                name: segments[i],
                username: process.env.GEONAMES_USERNAME,
            },
        })
        if (res.data.totalResultsCount === 0) break
    }

    const organization = segments.slice(0, i + 1).join(', ')
    const place = segments.slice(i + 1).join(', ')
    return { organization, place }
}

// Extract a place string from an affiliation string by Ninjas City API
export const extractPlaceByNinjas = async (affiliation: string) => {
    const segments = affiliation.split(', ')

    // Whether the segment is a city or a country name
    let i
    for (i = 0; i < segments.length; i++) {
        const res = await axios.get(`https://api.api-ninjas.com/v1/city`, {
            params: { name: segments[i] },
            headers: { 'X-Api-Key': process.env.NINJAS_API_KEY },
        })
        if (res.data.length !== 0) break
    }

    const organization = segments.slice(0, i).join(', ')
    const place = segments.slice(i).join(', ')
    return { organization, place }
}

// Extract a institution string from an organization string using ROR API
export const extractInstitution = async (affiliation: string) => {
    const { organization, place } = await extractPlaceByGeonames(affiliation)
    const country_name = place.split(', ').slice(-1)[0]
    const segments = organization.split(', ')

    // Search the segment in ROR API
    let i
    for (i = 0; i < segments.length; i++) {
        const response = await axios.get(`https://api.ror.org/organizations`, {
            params: {
                query: `"${segments[i]}"`,
                filter: `country.country_name:${country_name}`,
            },
        })
        if (response.data.number_of_results > 0) break
    }

    const department = segments.slice(0, i).join(', ')
    const institution = segments.slice(i).join(', ')
    return { department, institution, place }
}

// Fetch the metadata of a paper from a doi url
export const fetchMetadata = async (doi: string) => {
    const metadata = await fetchCrossref(doi)
    const affiliations = await Promise.all(metadata.affiliations.map(extractInstitution))
    return { ...metadata, affiliations }
}

export default fetchMetadata
