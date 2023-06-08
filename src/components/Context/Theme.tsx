import { Theme } from '@lib/types'
import defaultTheme from '@Themes/default.json'
import { createContext, ReactNode, useState } from 'react'

interface ThemeContext {
    theme: Theme
    setTheme: (theme: Theme) => void
}
export const ThemeContext = createContext<ThemeContext>({} as ThemeContext)

// _index.tsx で使用する Provider
export const ThemeContextProvider = ({ children }: { children: ReactNode }) => {
    const [theme, setTheme] = useState<Theme>(defaultTheme as Theme)
    return <ThemeContext.Provider value={{ theme, setTheme }}>{children}</ThemeContext.Provider>
}
