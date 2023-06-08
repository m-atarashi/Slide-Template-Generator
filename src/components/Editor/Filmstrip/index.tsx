import { PapersMetadataContext } from '@components/Context/PapersMetadata'
import Thumbnail from '@components/Editor/Filmstrip/Thumbnail'
import { Dispatch, SetStateAction } from 'react'
import { useContext } from 'react'

// ページを選択するためのUI
export default function Filmstrip(props: {
    activeSlideIndex: number
    setActiveSlideIndex: Dispatch<SetStateAction<number>>
}) {
    const { papersMetadata } = useContext(PapersMetadataContext)
    return (
        <>
            <div className="filmstrip w-[150pt] min-w-[150pt] h-full flex-col p-2 space-y-4 overflow-y-scroll rounded-md">
                {papersMetadata.map((_, index) => (
                    <div key={index}>
                        <Thumbnail slideIndex={index} {...props} />
                    </div>
                ))}
            </div>
        </>
    )
}
