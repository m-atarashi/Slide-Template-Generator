import { Dispatch, SetStateAction } from 'react'
import { useContext } from 'react'

import { PapersInfoContext } from '@/components/Context/PapersInfo'
import Thumbnail from '@/components/Editor/Filmstrip/Thumbnail'

// 左側のスライド・サムネイル一覧
export default function Filmstrip(props: {
    activeSlideNumber: number
    setActiveSlideNumber: Dispatch<SetStateAction<number>>
}) {
    const { papersInfo } = useContext(PapersInfoContext)
    return (
        <>
            <div className="filmstrip w-[12%] flex-col p-2 space-y-4 overflow-y-scroll rounded-md">
                {papersInfo.map((_, index) => (
                    <div key={index}>
                        <Thumbnail slideNumber={index} {...props} />
                    </div>
                ))}
            </div>
        </>
    )
}
