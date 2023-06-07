import { PapersMetadataContextProvider } from '@components/Context/PapersMetadata'
import { SlideOptionsContextProvider } from '@components/Context/SlideOptions'
import Debug from '@components/Debug'
import Editor from '@components/Editor'
import Filmstrip from '@components/Editor/Filmstrip'
import Inspector from '@components/Editor/Inspector'
import Preview from '@components/Editor/Preview'
import Header from '@components/Header'
import Templates from '@components/Templates'
import { useState } from 'react'

export default function Index() {
    const [activeSlideNumber, setActiveSlideNumber] = useState(0)
    return (
        <PapersMetadataContextProvider>
            <SlideOptionsContextProvider>
                <Header />
                <Templates />
                <Editor>
                    <Filmstrip
                        activeSlideNumber={activeSlideNumber}
                        setActiveSlideNumber={setActiveSlideNumber}
                    />
                    <Preview slideNumber={activeSlideNumber} />
                    <Inspector />
                </Editor>
                <Debug /> {/* デバッグ用 */}
            </SlideOptionsContextProvider>
        </PapersMetadataContextProvider>
    )
}
