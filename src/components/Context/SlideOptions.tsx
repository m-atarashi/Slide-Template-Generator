import { SlideOptions } from '@lib/types'
import defaultSlideOptions from '@slideOptions/demo.json'
import { createContext, ReactNode, useState } from 'react'

interface SlideOptionsContext {
    slideOptions: SlideOptions
    setSlideOptions: (slideOptions: SlideOptions) => void
}
export const SlideOptionsContext = createContext<SlideOptionsContext>({} as SlideOptionsContext)

// _index.tsxで使用するProvider
export const SlideOptionsContextProvider = ({ children }: { children: ReactNode }) => {
    const [slideOptions, setSlideOptions] = useState<SlideOptions>(
        defaultSlideOptions as SlideOptions
    )
    return (
        <SlideOptionsContext.Provider value={{ slideOptions, setSlideOptions }}>
            {children}
        </SlideOptionsContext.Provider>
    )
}
