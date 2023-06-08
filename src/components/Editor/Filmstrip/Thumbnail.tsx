import { Dispatch, SetStateAction, useCallback } from 'react'

import Slide from '../Slide'

// スライド・サムネイル
export default function Thumbnail(props: {
    slideIndex: number
    activeSlideIndex: number
    setActiveSlideIndex: Dispatch<SetStateAction<number>>
}) {
    const { slideIndex, activeSlideIndex, setActiveSlideIndex } = props

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
            <Slide slideIndex={slideIndex} />
        </button>
    )
}
