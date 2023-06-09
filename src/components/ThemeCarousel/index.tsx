import { dummy } from '@components/Context/PapersMetadata'
import { ThemeContext } from '@components/Context/Theme'
import Slide from '@components/Slide'
import { Theme } from '@lib/types'
import config from '@Themes/index.json'
import { Dispatch, SetStateAction, useCallback, useContext } from 'react'

export default function ThemeCarousel(props: {
    activeTheme: string
    setActiveTheme: Dispatch<SetStateAction<string>>
    themes: { [key: string]: Theme }
}) {
    return (
        <>
            <div className="themes flex w-full h-[100pt] min-h-[100pt] p-2 space-x-4 overflow-x-auto rounded-md  bg-slate-100">
                {Object.keys(config.themes).map((name) => (
                    <div key={name}>
                        <ThemeThumbnail name={name} {...props} />
                    </div>
                ))}
            </div>
        </>
    )
}

export function ThemeThumbnail(props: {
    name: string
    activeTheme: string
    setActiveTheme: Dispatch<SetStateAction<string>>
    themes: { [key: string]: Theme }
}) {
    const { name, activeTheme, setActiveTheme, themes } = props
    const { setTheme } = useContext(ThemeContext)

    // 選択中のサムネイルをハイライトするための Tailwind クラス
    const activeClass = activeTheme === name ? 'border-sky-600' : ''

    // サムネイルを選択するとテーマを有効にする
    const onClick = useCallback(
        (name: string) => {
            setActiveTheme(name)
            setTheme(themes[name])
        },
        [themes, setActiveTheme, setTheme]
    )

    return (
        <button
            className={`theme-thumbnail w-[150pt] p-1 border-2 rounded-lg overflow-hidden ${activeClass}`}
            type="button"
            onClick={() => onClick(name)}
        >
            <Slide paperMetadata={dummy[0]} themeName={name} />
        </button>
    )
}
