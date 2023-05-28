import { useEffect, useState } from 'react'

export default function SlideContainer({ children }: { children: React.ReactNode }) {
    const [slideSize, setSlideSize] = useState({ w: 0, h: 0 })

    useEffect(() => {
        // スライドのサイズを更新する関数
        const updateSlideSize = () => {
            // プレビューの大きさ
            const container = document.querySelector('.preview-container .frame')
            const containerRect = container?.getBoundingClientRect()
            const containerWidth = containerRect?.width ?? 0
            const containerHeight = containerRect?.height ?? 0

            // スライドの大きさ
            let slideWidth = Math.min(containerWidth, (containerHeight * 16) / 9)
            let slideHeight = Math.min(containerHeight, (containerWidth * 9) / 16)
            slideWidth = Math.floor(slideWidth)
            slideHeight = Math.floor(slideHeight)

            setSlideSize({ w: slideWidth, h: slideHeight })
        }

        // 初回レンダリング時に計算を行う
        updateSlideSize()

        // リサイズイベントハンドラとして登録・解除する
        window.addEventListener('resize', updateSlideSize)
        return () => {
            window.removeEventListener('resize', updateSlideSize)
        }
    }, [])

    return (
        <div
            className="flex items-center justify-center p-1"
            style={{ width: `${slideSize.w}px`, height: `${slideSize.h}px` }}
        >
            {children}
        </div>
    )
}
