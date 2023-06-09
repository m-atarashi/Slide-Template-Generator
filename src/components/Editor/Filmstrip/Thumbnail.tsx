import { PapersMetadataContext } from '@components/Context/PapersMetadata'
import { ThemeContext } from '@components/Context/Theme'
import Slide from '@components/Slide'
import { Dispatch, SetStateAction, useCallback, useContext } from 'react'

// スライド・サムネイル
export default function Thumbnail({
    slideIndex,
    activeSlideIndex,
    setActiveSlideIndex,
}: {
    slideIndex: number
    activeSlideIndex: number
    setActiveSlideIndex: Dispatch<SetStateAction<number>>
}) {
    const { papersMetadata } = useContext(PapersMetadataContext)
    const paperMetadata = papersMetadata[slideIndex]
    const { theme } = useContext(ThemeContext)

    // クリックしたスライドをアクティブにする
    const clickHandler = useCallback(
        (slideIndex: number) => setActiveSlideIndex(slideIndex),
        [setActiveSlideIndex]
    )

    // アクティブなサムネイルの tailwind のクラス
    const activeClass = activeSlideIndex === slideIndex ? 'border-sky-600' : ''

    return (
        <button
            className={`thumbnail w-full p-1 border-2 rounded-lg overflow-hidden ${activeClass}`}
            type="button"
            onClick={() => clickHandler(slideIndex)}
        >
            <Slide paperMetadata={paperMetadata} themeName={theme.name} />
        </button>
    )
}
