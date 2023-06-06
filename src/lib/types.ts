import pptxgenjs from 'pptxgenjs'

export interface PaperInfo {
    title: string
    authors: string[]
    affiliations: string[]
}

export interface SlideOptions extends pptxgenjs.TextProps {
    titleFontSize: number
    authorsFontSize: number
    affilsFontSize: number
    textColor: string
    backgroundColor: string
}
