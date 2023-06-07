import PptxGenJS from 'PptxGenJS'

export interface PaperMetadata {
    title: string
    authors: string[]
    affiliations: string[][]
    award: string
    doi: string
}

export interface SlideOptions {
    header: {
        general: any
        title: PptxGenJS.TextPropsOptions
        author: PptxGenJS.TextPropsOptions
        affiliation: PptxGenJS.TextPropsOptions
        award?: PptxGenJS.ImageProps
        titleLink?: 'underline' | 'over'
    }
}
