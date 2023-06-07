import { PapersMetadataContext } from '@components/Context/PapersMetadata'
import Thumbnail from '@components/Editor/Filmstrip/Thumbnail'
import { Dispatch, SetStateAction } from 'react'
import { useContext } from 'react'

// 左側のスライド・サムネイル一覧
export default function Filmstrip(props: {
    activeSlideNumber: number
    setActiveSlideNumber: Dispatch<SetStateAction<number>>
}) {
    const { papersMetadata } = useContext(PapersMetadataContext)
    return (
        <>
            <div className="filmstrip w-[12%] flex-col p-2 space-y-4 overflow-y-scroll rounded-md">
                {papersMetadata.map((_, index) => (
                    <div key={index}>
                        <Thumbnail slideNumber={index} {...props} />
                    </div>
                ))}
            </div>
        </>
    )
}
