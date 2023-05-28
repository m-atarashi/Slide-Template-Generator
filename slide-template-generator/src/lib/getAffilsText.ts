import pptxgen from 'pptxgenjs'

// Get the affiliations separated by commas with reference numbers
// e.g. ^1University of Tokyo, ^2Kyoto University, ...
const getAffilsTextProps = (affils: string[]) => {
    // Delete duplicates
    const affilsUnique = [...new Set(affils.map((e) => e.split(',')[0]))]
    const ret: pptxgen.TextProps[] = []

    affilsUnique.forEach((affil, index) => {
        // Add the reference number
        ret.push({
            text: (index + 1).toString(),
            options: { superscript: true },
        })
        // Add the affiliation
        ret.push({ text: affil })
        // Add the separator
        if (index !== affilsUnique.length - 1) ret.push({ text: ', ' })
    })
    return ret
}

export default getAffilsTextProps
