import { PapersMetadataContext } from '@components/Context/PapersMetadata'
import { SlideOptionsContext } from '@components/Context/SlideOptions'
import save from '@lib/presentation'
import { useCallback, useContext } from 'react'

export default function SaveBtn() {
    const { papersMetadata } = useContext(PapersMetadataContext)
    const { slideOptions, setSlideOptions } = useContext(SlideOptionsContext)

    const handleClick = useCallback(async () => {
        await save(papersMetadata, slideOptions)
    }, [papersMetadata, slideOptions])

    return (
        <>
            <button
                className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded w-16 h-16"
                onClick={handleClick}
            >
                Save
            </button>
        </>
    )
}
