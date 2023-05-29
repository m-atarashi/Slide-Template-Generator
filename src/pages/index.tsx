import { useState } from 'react'

import { PapersInfoContextProvider } from '@/components/Context/PapersInfo'
import { SlideOptionsContextProvider } from '@/components/Context/SlideOptions'
import Debug from '@/components/Debug'
import Editor from '@/components/Editor'
import Filmstrip from '@/components/Editor/Filmstrip'
import Inspector from '@/components/Editor/Inspector'
import Preview from '@/components/Editor/Preview'
import Header from '@/components/Header'
import Templates from '@/components/Templates'

export default function Index() {
    const [activeSlideNumber, setActiveSlideNumber] = useState(0)
    return (
        <PapersInfoContextProvider>
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
        </PapersInfoContextProvider>
    )
}
