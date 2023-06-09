import { PapersMetadataContextProvider } from '@components/Context/PapersMetadata'
import { ThemeContextProvider } from '@components/Context/Theme'
import Debug from '@components/Debug'
import Editor from '@components/Editor'
import Filmstrip from '@components/Editor/Filmstrip'
import Inspector from '@components/Editor/Inspector'
import Preview from '@components/Editor/Preview'
import Header from '@components/Header'
import ThemeCarousel from '@components/ThemeCarousel'
import { Theme } from '@lib/types'
import config from '@Themes/index.json'
import fs from 'fs'
import { useState } from 'react'

export default function Index(props: { themes: { [key: string]: Theme } }) {
    const [activeSlideIndex, setActiveSlideIndex] = useState(0) // 現在のページ番号
    const [activeTheme, setActiveTheme] = useState('Default') // 現在のスライドのテーマ

    return (
        <PapersMetadataContextProvider>
            <ThemeContextProvider>
                <Header />
                <ThemeCarousel
                    activeTheme={activeTheme}
                    setActiveTheme={setActiveTheme}
                    themes={props.themes}
                />
                <Editor>
                    <Filmstrip
                        activeSlideIndex={activeSlideIndex}
                        setActiveSlideIndex={setActiveSlideIndex}
                    />
                    <Preview slideIndex={activeSlideIndex} />
                    <Inspector />
                </Editor>
                {/* <Debug /> デバッグ用 */}
            </ThemeContextProvider>
        </PapersMetadataContextProvider>
    )
}

export async function getStaticProps() {
    const themes = loadThemes()
    return { props: { themes } }
}

// すべてのスライドテーマの PptxGenJs 用の設定ファイルを読み込む
const loadThemes = () => {
    const themes: { [key: string]: Theme } = {}

    Object.entries(config.themes).forEach(([name, theme]) => {
        const path = `./public/Themes/${theme.path}`
        const data = fs.readFileSync(path, 'utf-8')
        themes[name] = JSON.parse(data)
    })

    // 継承
    Object.entries(themes).forEach(([name, theme]) => {
        themes[name] = { ...themes[theme.extends], ...theme }
    })
    return themes
}
