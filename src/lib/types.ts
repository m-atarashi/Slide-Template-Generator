import PptxGenJS from 'pptxgenjs'

export interface PaperMetadata {
    title: string
    authors: string[]
    affiliations: string[][]
    doi: string
    award?: string
}

export interface Theme {
    name: string,
    header: {
        general: any
        title: PptxGenJS.TextPropsOptions
        author: PptxGenJS.TextPropsOptions
        affiliation: PptxGenJS.TextPropsOptions
        award?: PptxGenJS.ImageProps
    }
}

export interface ThemeInformation {
    name: string
    description: string
    path: string
}
