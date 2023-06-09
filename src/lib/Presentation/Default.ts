import PptxGenJS from 'pptxgenjs'

import { PaperMetadata, Theme } from '../types'
import { addHyperlinkRect, getAffiliationsTextProps, getAuthorsTextProps } from './utils'

export const exportPresentation = async (papers: PaperMetadata[], theme: Theme) => {
    if (theme.extends) {
        theme = { ...require(`./${theme.extends}`), ...theme }
    }
    const { header } = theme

    let pptx = new PptxGenJS()

    papers.forEach((paper) => {
        let slide = pptx.addSlide()

        const titleProps = { text: paper.title, options: header?.title ?? {} }
        if (header?.title?.hyperlink?.url === 'underline') {
            titleProps.options.hyperlink = { url: paper.doi }
        }

        let authorProps = getAuthorsTextProps(paper.authors, paper.affiliations)
        authorProps = authorProps.map((props) => ({
            text: props.text,
            options: { ...header?.author, ...props.options },
        }))

        let affiliationProps = getAffiliationsTextProps(paper.affiliations)
        affiliationProps = affiliationProps.map((props) => ({
            text: props.text,
            options: { ...header?.affiliation, ...props.options },
        }))

        slide.addText(
            [titleProps, ...authorProps, { text: '\n' }, ...affiliationProps],
            header?.general
        )
        // タイトルにリンクを張る（下線なし）
        if (header?.title?.hyperlink?.url === 'over') {
            addHyperlinkRect(slide, header.general, paper.doi)
        }
    })
    await pptx.writeFile()
}

export default exportPresentation
