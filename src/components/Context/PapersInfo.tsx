import { createContext, ReactNode, useState } from 'react'

import { PaperInfo } from '@/lib/types'

interface PapersInfoContext {
    papersInfo: PaperInfo[]
    setPapersInfo: (papersInfo: PaperInfo[]) => void
}
export const PapersInfoContext = createContext<PapersInfoContext>({} as PapersInfoContext)

// _index.tsxで使用するProvider
export const PapersInfoContextProvider = ({ children }: { children: ReactNode }) => {
    const [papersInfo, setPapersInfo] = useState<PaperInfo[]>([])
    return (
        <PapersInfoContext.Provider value={{ papersInfo, setPapersInfo }}>
            {children}
        </PapersInfoContext.Provider>
    )
}
