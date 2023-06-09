import PptxGenJS from 'pptxgenjs'

import { enumerateAffils, enumerateAuthors } from './parseAffiliation'
import { PaperMetadata, Theme } from './types'

// e.g. John Doe^1, ^2, Jane Doe^2, ...
const getAuthorsTextProps = (authors: string[], affils: string[][]) => {
    const textProps: PptxGenJS.TextProps[] = []

    const enumeration = enumerateAuthors(authors, affils)
    enumeration.forEach(({ author, refs }, i) => {
        textProps.push({ text: author })
        textProps.push({ text: refs.join(', '), options: { superscript: true } })

        if (i < authors.length - 1) {
            textProps.push({ text: ', ' })
        }
    })
    return textProps
}

// e.g. ^1University of Tokyo, ^2Kyoto University, ...
const getAffiliationsTextProps = (affils: string[][]) => {
    const textProps: PptxGenJS.TextProps[] = []

    const enumeration = enumerateAffils(affils)
    enumeration.forEach((affil, i) => {
        textProps.push({ text: (i + 1).toString(), options: { superscript: true } })
        textProps.push({ text: affil })

        if (i < affils.length - 1) {
            textProps.push({ text: ', ' })
        }
    })
    return textProps
}

// pptx 形式でプレゼンテーションを保存する
export const save = async (papersMetadata: PaperMetadata[], Theme: Theme) => {
    const { header } = Theme

    let pptx = new PptxGenJS()

    // 論文ごとにスライドを追加する
    papersMetadata.forEach(({ title, authors, affiliations, doi }) => {
        let slide = pptx.addSlide()

        const titleProps = { text: title, options: header.title }
        if (header.title.hyperlink?.url === 'underline') {
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

        slide.addText(
            [titleProps, { text: '\n' }, ...authorProps, { text: '\n' }, ...affiliationProps],
            header.general
        )
        // タイトルにリンクを張る（下線なし）
        if (header.title.hyperlink?.url === 'over') {
            addHyperlinkRect(slide, header.general, doi)
        }
    })
    await pptx.writeFile()
}

// 下線をつけずにテキストにリンクを張るための矩形を追加する
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
