import { useEffect, useState } from 'react'

export default function SlideContainer({ children }: { children: React.ReactNode }) {
    const [slideWidth, setSlideWidth] = useState('100%')

    // スライドのサイズを更新処理をリサイズイベントハンドラとして登録する
    useEffect(() => {
        const updateSlideSize = () => {
            // プレビューの幅と高さ
            const preview = document.querySelector('.preview .frame')
            const DOMRect = preview?.getBoundingClientRect()
            let previewWidth = DOMRect?.width ?? 0
            let previewHeight = DOMRect?.height ?? 0

            // コンテナ要素のパディングを引く
            const slideContainer = document.querySelector('.slide-container') as Element
            const padding = window.getComputedStyle(slideContainer).padding
            previewWidth -= parseInt(padding)
            previewHeight -= parseInt(padding)

            // プレビューの高さに合わせた16:9の幅
            const width = Math.floor((previewHeight * 16) / 9)
            // プレビューからはみ出る場合はプレビューの幅に合わせる
            if (previewWidth < width) setSlideWidth('100%')
            else setSlideWidth(`${width}px`)
        }

        // 初回レンダリング
        updateSlideSize()

        window.addEventListener('resize', updateSlideSize)
        return () => window.removeEventListener('resize', updateSlideSize)
    }, [])

    return (
        <div
            className="slide-container flex items-center justify-center p-1"
            style={{ width: slideWidth }}
        >
            {children}
        </div>
    )
}
