import { useContext } from 'react'

import { PapersInfoContext } from '@/components/Context/PapersInfo'

export default function Slide(props: { slideNumber: number }) {
    const { papersInfo } = useContext(PapersInfoContext)
    const paperInfo = papersInfo[props.slideNumber]

    return (
        <div className="slide w-full aspect-w-16 aspect-h-9 bg-white">
            <div className="header">
                <div className="title">{paperInfo?.title}</div>
                <div className="authors">{paperInfo?.authors}</div>
                <div className="affils">{paperInfo?.affils}</div>
            </div>
        </div>
    )
}
