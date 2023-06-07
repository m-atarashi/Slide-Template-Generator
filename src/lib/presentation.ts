import PptxGenJS from 'PptxGenJS'

import { PaperMetadata, SlideOptions } from './types'

// Get the authors separated by commas with reference numbers
// e.g. John Doe^1, ^2, Jane Doe^2, ...
const getAuthorsTextProps = (authors: string[], affiliations: string[][]) => {
    // Vancouver style
    if (authors.length >= 7) {
        authors = authors.slice(0, 6)
        authors.push('et al.')
        affiliations = affiliations.slice(0, 6)
        affiliations.push([])
    }

    // Delete duplicate
    const affiliationUnique = [...new Set(affiliations.flat())]

    const textProps: PptxGenJS.TextProps[] = []
    authors.forEach((author, index) => {
        // Add the author
        textProps.push({ text: author })

        // Add the reference numbers
        const nums = affiliations[index]
            .map((affiliation) => affiliationUnique.findIndex((e) => e === affiliation) + 1)
            .sort()
        // Add the reference numbers
        textProps.push({ text: nums.join(', '), options: { superscript: true } })

        // Add the separator
        if (index === authors.length - 2) {
            // a separator between last two authors
            if (authors.length < 7) textProps.push({ text: ' and ' })
            else textProps.push({ text: ', ' })
        } else if (index !== authors.length - 1) textProps.push({ text: ', ' })
    })
    return textProps
}

// Get the affiliations separated by commas with reference numbers
// e.g. ^1University of Tokyo, ^2Kyoto University, ...
const getAffiliationsTextProps = (affiliations: string[][]) => {
    // Vancouver style
    if (affiliations.length >= 7) {
        affiliations = affiliations.slice(0, 6)
    }

    // Delete duplicate
    const affiliationUnique = [...new Set(affiliations.flat())]

    const textProps: PptxGenJS.TextProps[] = []
    affiliationUnique.forEach((affiliation, index) => {
        // Add the reference number
        textProps.push({
            text: (index + 1).toString(),
            options: { superscript: true },
        })
        // Add the affiliation
        textProps.push({ text: affiliation })

        // Add the separator
        if (index !== affiliationUnique.length - 1) textProps.push({ text: ', ' })
    })
    return textProps
}

// Save the presentation
export const save = async (papersMetadata: PaperMetadata[], slideOptions: SlideOptions) => {
    const { header } = slideOptions
    // Create a new presentation
    let pptx = new PptxGenJS()

    // Create slides
    papersMetadata.forEach(({ title, authors, affiliations, doi }) => {
        // Add a slide
        let slide = pptx.addSlide()

        const titleProps = { text: title, options: header.title }
        // Add a hyperlink to the title text
        if (header.titleLink === 'underline') {
            titleProps.options.hyperlink = { url: doi }
        }

        const authorProps = getAuthorsTextProps(authors, affiliations).map((e) => ({
            text: e.text,
            options: { ...header.author, ...e.options },
        }))

        const affiliationProps = getAffiliationsTextProps(affiliations).map((e) => ({
            text: e.text,
            options: { ...header.affiliation, ...e.options },
        }))

        // Add texts of the title, authors and affiliations
        slide.addText([titleProps, ...authorProps, { text: '\n' }, ...affiliationProps], {
            ...header.general,
        })

        // Add a hyperlink rectangle on the title
        if (header.titleLink === 'over') {
            addHyperlinkRect(slide, header.general, doi)
        }
    })

    // Save the presentation
    await pptx.writeFile()
}

// Add a hyperlink rectangle
export const addHyperlinkRect = (
    slide: PptxGenJS.Slide,
    shapeProps: PptxGenJS.ShapeProps,
    url: string
) => {
    slide.addShape('rect', {
        ...shapeProps,
        line: { color: '000000', transparency: 100 },
        fill: { color: '000000', transparency: 100 },
        hyperlink: { url },
    })
}

export default save
