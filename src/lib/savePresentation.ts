import pptxgenjs from 'pptxgenjs'

import SlideOptions from '@/slideOptions/demo.json'

import getAffilsTextProps from './getAffilsText'
import getAuthorsText from './getAuthorsText'
import { PaperInfo } from './types'

// Options
const options = SlideOptions.options as pptxgenjs.TextProps
const additionalOptions = SlideOptions.additionalOptions
const { titleFontSize, authorsFontSize, affilsFontSize, backgroundColor } = additionalOptions

export const savePresentation = (papersInfo: PaperInfo[]) => {
    // Create a new presentation
    let pres = new pptxgenjs()

    // Create slides
    papersInfo.forEach(({ title, authors, affils }) => {
        let y, h, fontSize

        // Add a slide
        let slide = pres.addSlide()

        // Background
        h = (titleFontSize * 2 * 1.5 + authorsFontSize * 1.5 + affilsFontSize * 1.5) / 72
        slide.addShape(pres.ShapeType.rect, { ...options, h, fill: { color: backgroundColor } })

        // Title
        y = 0
        fontSize = titleFontSize
        h = (fontSize * 2 * 1.5) / 72
        slide.addText(title, { ...options, y, h, fontSize, bold: true })

        // Authors
        y += h
        fontSize = authorsFontSize
        h = (fontSize * 1.5) / 72
        const authorsWithRef = getAuthorsText(authors, affils)
        slide.addText(authorsWithRef, { ...options, y, h, fontSize })

        // Affiliations
        y += h
        fontSize = affilsFontSize
        h = (fontSize * 1.5) / 72
        const affilsWithRef = getAffilsTextProps(affils)
        slide.addText(affilsWithRef, { ...options, y, h, fontSize })
    })

    // Save the presentation
    pres.writeFile()
}
