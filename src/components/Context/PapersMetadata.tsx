import { PaperMetadata } from '@lib/types'
import { createContext, ReactNode, useState } from 'react'

interface PapersMetadataContext {
    papersMetadata: PaperMetadata[]
    setPapersMetadata: (PapersMetadata: PaperMetadata[]) => void
}
export const PapersMetadataContext = createContext<PapersMetadataContext>(
    {} as PapersMetadataContext
)

export const dummy: PaperMetadata[] = [
    {
        title: 'Human performance using computer input devices in the preferred and non-preferred hands',
        authors: ['Paul Kabbash', 'I. Scott MacKenzie', 'William Buxton'],
        affiliations: [
            ['University of Toronto'],
            ['University of Guelph'],
            ['University of Toronto', 'Xerox PARC'],
        ],
        doi: 'https://dl.acm.org/doi/abs/10.1145/169059.169414',
    },
]

// _index.tsxで使用するProvider
export const PapersMetadataContextProvider = ({ children }: { children: ReactNode }) => {
    const [papersMetadata, setPapersMetadata] = useState<PaperMetadata[]>(dummy)
    return (
        <PapersMetadataContext.Provider value={{ papersMetadata, setPapersMetadata }}>
            {children}
        </PapersMetadataContext.Provider>
    )
}
