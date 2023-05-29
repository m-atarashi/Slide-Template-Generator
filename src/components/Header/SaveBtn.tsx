import { useCallback, useContext } from 'react'

import { PapersInfoContext } from '@/components/Context/PapersInfo'
import { savePresentation } from '@/lib/savePresentation'

export default function SaveBtn() {
    const { papersInfo } = useContext(PapersInfoContext)

    const handleClick = useCallback(() => {
        savePresentation(papersInfo)
    }, [papersInfo])

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
