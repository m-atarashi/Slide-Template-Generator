import { PaperMetadata } from '@lib/types'
import { createContext, ReactNode, useState } from 'react'

interface PapersMetadataContext {
    papersMetadata: PaperMetadata[]
    setPapersMetadata: (PapersMetadata: PaperMetadata[]) => void
}
export const PapersMetadataContext = createContext<PapersMetadataContext>(
    {} as PapersMetadataContext
)

const initialData: PaperMetadata[] = [
    {
        title: '',
        authors: [],
        affiliations: [],
        doi: '',
        award: '',
    },
]

// _index.tsxで使用するProvider
export const PapersMetadataContextProvider = ({ children }: { children: ReactNode }) => {
    const [papersMetadata, setPapersMetadata] = useState<PaperMetadata[]>(initialData)
    return (
        <PapersMetadataContext.Provider value={{ papersMetadata, setPapersMetadata }}>
            {children}
        </PapersMetadataContext.Provider>
    )
}
