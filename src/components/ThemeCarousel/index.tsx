import { ThemeContext } from '@components/Context/Theme'
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
            <div className="themes flex h-[100pt] p-2 space-x-4 overflow-x-auto rounded-md bg-orange-200">
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
            className={`theme-thumbnail w-[20pt] aspect-w-16 aspect-h-9 p-1 border-2 rounded-lg overflow-hidden ${activeClass}`}
            type="button"
            onClick={() => onClick(name)}
        >
            {name}
        </button>
    )
}
