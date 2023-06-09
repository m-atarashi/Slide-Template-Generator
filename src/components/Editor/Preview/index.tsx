import { PapersMetadataContext } from '@components/Context/PapersMetadata'
import { ThemeContext } from '@components/Context/Theme'
import Slide from '@components/Slide'
import { useContext, useRef } from 'react'

import PreviewInner from './PreviewInner'

export default function Preview(props: { slideIndex: number }) {
    const { papersMetadata } = useContext(PapersMetadataContext)
    const paperMetadata = papersMetadata[props.slideIndex]
    const { theme } = useContext(ThemeContext)

    const ref = useRef<HTMLDivElement>(null)

    return (
        <div className="preview flex-grow h-full m-1 p-1 bg-white">
            <div
                className="frame flex items-center justify-center w-full h-full border-[1px] rounded-md bg-slate-100"
                ref={ref}
            >
                <PreviewInner containerRef={ref}>
                    <Slide paperMetadata={paperMetadata} themeName={theme.name} />
                </PreviewInner>
            </div>
        </div>
    )
}
