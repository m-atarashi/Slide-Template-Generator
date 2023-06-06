// When ERR_SOCKET_CONNECTION_TIMEOUT occurs, try to set keepAlive to true by adding "httpsAgent: new https.Agent({ keepAlive: true })" in axios.get()

import axios from 'axios'
import dotenv from 'dotenv'

// Load environment variables
dotenv.config()

// Separate an affiliation string into a location string and an organization string with Geonames API
export const extractLocationWithGeonames = async (affiliationString: string) => {
    // Split the affiliation string into segments
    let segments = affiliationString.split(', ').reverse()

    // The last segment is always an location and the first segment is always an organization
    let location = segments[0]
    segments = segments.slice(1, -1)

    // Whether the segment is A country, state, region,... or P city, village,...
    const featureClass = ['A', 'P'].join('&featureClass=')

    for (const e of segments) {
        const url = `http://api.geonames.org/searchJSON?maxRows=1&featureClass=${featureClass}`
        const res = await axios.get(url, {
            params: {
                username: process.env.GEONAMES_USERNAME,
                name_equals: `"${e}"`,
                // Narrow down the search by adding the previous location
                q: `"${location}"`,
            },
        })

        // If the segment is a location, Add to the location string
        if (res.data.geonames.length === 0) break
        location = e + ', ' + location
    }

    // -2 means the length of ', ' between the location and the organization
    const fullOrganization = affiliationString.slice(0, -location.length - 2)
    return { fullOrganization, location }
}

// Not recommended due to a low accuracy
// Separate an affiliation string into a location string and an organization string with Ninjas City API
export const extractLocationWithNinjas = async (affiliationString: string) => {
    // Split the affiliation string into segments
    let segments = affiliationString.split(', ').reverse()

    // The last segment is always an location and the first segment is always an organization
    let location = segments[0]
    segments = segments.slice(1, -1)

    // Whether the segment is a city or a country name
    for (const e of segments) {
        const res = await axios.get(`https://api.api-ninjas.com/v1/city`, {
            headers: { 'X-Api-Key': process.env.NINJAS_API_KEY },
            params: { name: `${e}` },
        })

        // If the segment is a location, Add to the location string
        if (res.data.length === 0) break
        if (res.data[0].name.toLowerCase() !== e.toLowerCase()) break
        location = e + ', ' + location
    }

    // -2 means the length of ', ' between the location and the organization
    const fullOrganization = affiliationString.slice(0, -location.length - 2)
    return { fullOrganization, location }
}

// Not recommended due to a low accuracy
// Extract a organization string from an organization string with ROR API
export const extractDepartmentWithROR = async (affiliationString: string, countryName?: string) => {
    // Split the affiliation string into segments
    let segments = affiliationString.split(', ')
    let departments = []

    // Search the segment in ROR API
    for (const e of segments) {
        const response = await axios.get(`https://api.ror.org/organizations`, {
            params: {
                query: `"${e}"`,
                // filter: `country.country_name:${countryName}`,
            },
        })

        // If the segment is a location, Add to the location string
        if (response.data.number_of_results > 0) break
        departments.push(e)
    }

    const department = departments.join(', ')
    const organization = segments.slice(departments.length).join(', ')
    return { department, organization }
}

// Separate an affiliation string into departments, organizations and locations
export const parseAffiliationString = async (affiliationString: string) => {
    // Extract the location
    const { fullOrganization, location } = await extractLocationWithGeonames(affiliationString)
    const { department, organization } = await extractDepartmentWithROR(fullOrganization, location)
    return { department, organization, location }
}

export const extractLocation = extractLocationWithGeonames
export const extractDepartment = extractDepartmentWithROR
