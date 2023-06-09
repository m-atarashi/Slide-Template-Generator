import PptxGenJS from 'pptxgenjs'

import { enumerateAffils, enumerateAuthors } from '../parseAffiliation'

// e.g. John Doe^1, ^2, Jane Doe^2, ...
export const getAuthorsTextProps = (authors: string[], affils: string[][]) => {
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
export const getAffiliationsTextProps = (affils: string[][]) => {
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
