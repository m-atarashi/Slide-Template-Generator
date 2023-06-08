// When ERR_SOCKET_CONNECTION_TIMEOUT occurs, try to set keepAlive to true by adding "httpsAgent: new https.Agent({ keepAlive: true })" in axios.get()

import axios from 'axios'
import dotenv from 'dotenv'
dotenv.config()

// Geonames API を用いて所属を地名とそれ以外に分割する
export const extractLocationWithGeonames = async (affiliationString: string) => {
    let segments = affiliationString.split(', ')
    segments = segments.reverse() // 便宜的に逆順にする

    let location = segments[0] // 最後の要素は常に地名であり、
    segments = segments.slice(1, -1) // 最初の要素は地名ではないとする

    for (const e of segments) {
        const url = `http://api.geonames.org/searchJSON?maxRows=1`
        const res = await axios.get(url, {
            params: {
                name_equals: `"${e}"`, // 完全一致
                q: `"${location}"`, // 親子関係にある既知の地名を検索語に含める
                featureClass: ['A', 'P'].join('&featureClass='), // 地名を表す属性でフィルタリングする
                username: process.env.GEONAMES_USERNAME,
            },
        })

        if (res.data.geonames.length === 0) break
        location = e + ', ' + location
    }

    const fullOrganization = affiliationString.slice(0, -location.length - 2)
    return { fullOrganization, location }
}

// ROR API を用いて所属を専攻とそれ以外に分割する。精度が低いため非推奨
export const extractDepartmentWithROR = async (affiliationString: string, countryName?: string) => {
    let segments = affiliationString.split(', ')

    let departments = []
    for (const e of segments) {
        const response = await axios.get(`https://api.ror.org/organizations`, {
            params: {
                query: `"${e}"`,
                filter: `country.country_name:${countryName}`,
            },
        })
        if (response.data.number_of_results > 0) break
        departments.push(e)
    }

    return {
        department: departments.join(', '),
        organization: segments.slice(departments.length).join(', '),
    }
}

// 所属を専攻、組織、地名にパースする
export const parseAffiliationString = async (affiliationString: string) => {
    const { fullOrganization, location } = await extractLocationWithGeonames(affiliationString)
    const { department, organization } = await extractDepartmentWithROR(fullOrganization, location)

    return { department, organization, location }
}

// 所属への参照を含む著者の情報を取得する
export const enumerateAuthors = (authors: string[], affils: string[][]) => {
    // 7人目以降の著者は省略する
    if (authors.length >= 7) {
        authors = authors.slice(0, 6)
        authors.push('et al.')

        affils = affils.slice(0, 6)
        affils.push([])
    }

    const uniqueAffils = [...new Set(affils.flat())]

    return authors.map((author, index) => {
        const refs = affils[index]
            .map((affil) => uniqueAffils.findIndex((uniqueAffil) => uniqueAffil === affil))
            .map((ref) => ref + 1)
            .sort()
        return { author, refs }
    })
}

// すべての著者の所属を平坦化する
export const enumerateAffils = (affils: string[][]) => {
    affils = affils.slice(0, 6)
    return [...new Set(affils.flat())]
}

export const extractLocation = extractLocationWithGeonames
export const extractDepartment = extractDepartmentWithROR
