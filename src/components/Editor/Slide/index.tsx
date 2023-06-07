import { PapersMetadataContext } from '@components/Context/PapersMetadata'
import { useContext } from 'react'

export default function Slide(props: { slideNumber: number }) {
    const { papersMetadata } = useContext(PapersMetadataContext)
    const paperMetadata = papersMetadata[props.slideNumber]

    return (
        <div className="slide w-full aspect-w-16 aspect-h-9 bg-white">
            <div className="header">
                <div className="title">{paperMetadata?.title}</div>
                <div className="authors">{paperMetadata?.authors}</div>
                <div className="affiliations">{paperMetadata?.affiliations}</div>
            </div>
        </div>
    )
}
