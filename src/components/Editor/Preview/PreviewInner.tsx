import { RefObject, useEffect, useRef, useState } from 'react'

export default function PreviewInner({
    containerRef,
    children,
}: {
    containerRef: RefObject<HTMLDivElement>
    children: React.ReactNode
}) {
    const ref = useRef(null)

    // 自身のパディングを取得
    const [padding, setPadding] = useState(0)
    
    useEffect(() => {
        if (ref.current) {
            const padding = parseInt(window.getComputedStyle(ref.current).padding)
            setPadding(padding)
        }
    }, [])

    // スライド幅を動的に変更する
    const [slideWidth, setSlideWidth] = useState('100%')

    useEffect(() => {
        const observer = new ResizeObserver((entries) => {
            for (let entry of entries) {
                const previewWidth = entry.contentRect.width - padding
                const previewHeight = entry.contentRect.height - padding

                // プレビューからはみ出ない最大の幅
                const coverWidth = Math.floor((previewHeight * 16) / 9)
                setSlideWidth(previewWidth < coverWidth ? '100%' : `${coverWidth}px`)
            }
        })

        if (containerRef.current) {
            observer.observe(containerRef.current)
        }
        return () => observer.disconnect()
    }, [containerRef, padding])

    return (
        <div
            className="preview-inner flex items-center justify-center p-1"
            style={{ width: slideWidth }}
            ref={ref}
        >
            {children}
        </div>
    )
}
