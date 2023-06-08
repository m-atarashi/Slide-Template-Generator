import PptxGenJS from 'pptxgenjs'

export interface PaperMetadata {
    title: string
    authors: string[]
    affiliations: string[][]
    award: string
    doi: string
}

export interface Theme {
    header: {
        general: any
        title: PptxGenJS.TextPropsOptions
        author: PptxGenJS.TextPropsOptions
        affiliation: PptxGenJS.TextPropsOptions
        award?: PptxGenJS.ImageProps
        titleLink?: 'underline' | 'over'
    }
}

export interface ThemeInformation {
    name: string
    description: string
    path: string
}
