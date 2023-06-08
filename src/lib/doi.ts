import axios from 'axios'

import { parseAffiliationString } from './parseAffiliation'

interface Metadata {
    title: string
    authors: string[]
    affiliations: string[]
}

// CrossRef REST API を利用して DOI の URL から論文のメタデータを取得する
// https://www.crossref.org/documentation/retrieve-metadata/rest-api/
export const fetchCrossref = async (doi: string): Promise<Metadata> => {
    const response = await axios.get(`https://api.crossref.org/works/${doi}`)
    const { message } = response.data
    if (response.status !== 200) {
        throw new Error('Failed to fetch metadata')
    }

    // タイトル、著者、所属 を抽出する
    const title = message.title[0]
    const authors = message.author.map((e: any) => e.given + ' ' + e.family)
    const affiliations = message.author.map((e: any) => e.affiliation[0].name)
    return { title, authors, affiliations }
}

// Fetch the metadata of a paper from a doi url
export const fetchMetadata = async (doi: string) => {
    const metadata = await fetchCrossref(doi)

    // 所属を専攻、大学・企業名、地名にパースする
    const affiliations = await Promise.all(metadata.affiliations.map(parseAffiliationString))
    return { ...metadata, affiliations }
}

export default fetchMetadata
