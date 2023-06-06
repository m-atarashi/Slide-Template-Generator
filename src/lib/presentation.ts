import pptxgenjs from 'pptxgenjs'

import SlideOptions from '@/slideOptions/demo.json'

import { PaperInfo } from './types'

// Get the authors separated by commas with reference numbers
// e.g. John Doe^1, Jane Doe^2, ...
const getAuthorsTextProps = (authors: string[], affiliations: string[]) => {
    const ret: pptxgenjs.TextProps[] = []
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

// Get the affiliations separated by commas with reference numbers
// e.g. ^1University of Tokyo, ^2Kyoto University, ...
const getAffiliationsTextProps = (affiliations: string[]) => {
    // Delete duplicates
    const affiliationUnique = [...new Set(affiliations.map((e) => e.split(',')[0]))]
    const ret: pptxgenjs.TextProps[] = []

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

// Options
const options = SlideOptions.options as pptxgenjs.TextProps
const additionalOptions = SlideOptions.additionalOptions
const { titleFontSize, authorFontSize, affiliationFontSize, backgroundColor } = additionalOptions

export const save = (papersInfo: PaperInfo[]) => {
    // Create a new presentation
    let pres = new pptxgenjs()

    // Create slides
    papersInfo.forEach(({ title, authors, affiliations }) => {
        let y, h, fontSize

        // Add a slide
        let slide = pres.addSlide()

        // Background
        h = (titleFontSize * 2 * 1.5 + authorFontSize * 1.5 + affiliationFontSize * 1.5) / 72
        slide.addShape(pres.ShapeType.rect, { ...options, h, fill: { color: backgroundColor } })

        // Title
        y = 0
        fontSize = titleFontSize
        h = (fontSize * 2 * 1.5) / 72
        slide.addText(title, { ...options, y, h, fontSize, bold: true })

        // Authors
        y += h
        fontSize = authorFontSize
        h = (fontSize * 1.5) / 72
        const authorsWithRef = getAuthorsTextProps(authors, affiliations)
        slide.addText(authorsWithRef, { ...options, y, h, fontSize })

        // Affiliations
        y += h
        fontSize = affiliationFontSize
        h = (fontSize * 1.5) / 72
        const affiliationsWithRef = getAffiliationsTextProps(affiliations)
        slide.addText(affiliationsWithRef, { ...options, y, h, fontSize })
    })

    // Save the presentation
    pres.writeFile()
}

export default save
