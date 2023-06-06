import pptxgen from 'pptxgenjs'

// Get the affiliations separated by commas with reference numbers
// e.g. ^1University of Tokyo, ^2Kyoto University, ...
const getAffiliationsTextProps = (affiliations: string[]) => {
    // Delete duplicates
    const affiliationUnique = [...new Set(affiliations.map((e) => e.split(',')[0]))]
    const ret: pptxgen.TextProps[] = []

    affiliationUnique.forEach((affiliation, index) => {
        // Add the reference number
        ret.push({
            text: (index + 1).toString(),
            options: { superscript: true },
        })
        // Add the affiliation
        ret.push({ text: affiliation })
        // Add the separator
        if (index !== affiliationUnique.length - 1) ret.push({ text: ', ' })
    })
    return ret
}

export default getAffiliationsTextProps
