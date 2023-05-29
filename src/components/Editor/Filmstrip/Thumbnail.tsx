import { Dispatch, SetStateAction, useCallback, useMemo } from 'react'

import Slide from '../Slide'

// スライド・サムネイル
export default function Thumbnail(props: {
    activeSlideNumber: number
    setActiveSlideNumber: Dispatch<SetStateAction<number>>
    slideNumber: number
}) {
    const { activeSlideNumber, setActiveSlideNumber, slideNumber } = props

    // クリックしたスライドをアクティブにする
    const clickHandler = useCallback(() => {
        setActiveSlideNumber(slideNumber)
    }, [setActiveSlideNumber, slideNumber])

    // アクティブなサムネイルの tailwind のクラス
    const activeClass = useMemo(() => {
        return activeSlideNumber === slideNumber ? 'border-sky-600' : ''
    }, [activeSlideNumber, slideNumber])

    return (
        <button
            className={`thumbnail w-full p-1 border-2 rounded-lg overflow-hidden ${activeClass}`}
            type="button"
            onClick={clickHandler}
        >
            <Slide slideNumber={slideNumber} />
        </button>
    )
}
