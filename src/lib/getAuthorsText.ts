import pptxgen from 'pptxgenjs'

// Get the authors separated by commas with reference numbers
// e.g. John Doe^1, Jane Doe^2, ...
const getAuthorsTextProps = (authors: string[], affiliations: string[]) => {
    const ret: pptxgen.TextProps[] = []
    const affiliationUnique = [...new Set(affiliations)]

    authors.forEach((author, index) => {
        // Add the author
        ret.push({ text: author })

        // Add the reference number
        const num = affiliationUnique.findIndex((e) => e === affiliations[index]) + 1
        ret.push({
            text: num.toString(),
            options: { superscript: true },
        })

        // Add the separator
        if (index === authors.length - 2) ret.push({ text: ' and ' })
        else if (index !== authors.length - 1) ret.push({ text: ', ' })
    })
    return ret
}

export default getAuthorsTextProps
