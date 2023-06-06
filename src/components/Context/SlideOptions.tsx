import { SlideOptions } from '@lib/types'
import { createContext, ReactNode, useState } from 'react'

interface SlideOptionsContext {
    slideOptions: SlideOptions
    SetSlideOptions: (SlideOptions: SlideOptions) => void
}
export const SlideOptionsContext = createContext<SlideOptionsContext>({} as SlideOptionsContext)

// _index.tsxで使用するProvider
export const SlideOptionsContextProvider = ({ children }: { children: ReactNode }) => {
    const [slideOptions, SetSlideOptions] = useState<SlideOptions>({} as SlideOptions)
    return (
        <SlideOptionsContext.Provider value={{ slideOptions, SetSlideOptions }}>
            {children}
        </SlideOptionsContext.Provider>
    )
}
