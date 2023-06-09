import ThemeComponents from '@components/Themes'
import Defalut from '@components/Themes/Default'
import { PaperMetadata } from '@lib/types'
import React, { useEffect, useRef, useState } from 'react'

export default function Slide({
    paperMetadata,
    themeName,
}: {
    paperMetadata: PaperMetadata
    themeName: string
}) {
    // テーマ名に対応するコンポーネントを取得する
    const ThemeComponent = ThemeComponents[themeName] ?? Defalut

    // スケールを動的に変更する
    const [scale, setScale] = useState(1)
    const ref = useRef<HTMLDivElement>(null)

    useEffect(() => {
        const observer = new ResizeObserver((entries) => {
            for (let entry of entries) {
                setScale(entry.contentRect.width / 1020)
            }
        })

        if (ref.current) {
            observer.observe(ref.current)
        }
        return () => observer.disconnect()
    }, [])

    return (
        <div className="slide w-full aspect-w-16 aspect-h-9 bg-white" ref={ref}>
            <ThemeComponent paperMetadata={paperMetadata} scale={scale} />
        </div>
    )
}
