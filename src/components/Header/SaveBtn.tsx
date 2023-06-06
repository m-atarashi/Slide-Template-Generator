import { PapersInfoContext } from '@components/Context/PapersInfo'
import save from '@lib/presentation'
import { useCallback, useContext } from 'react'

export default function SaveBtn() {
    const { papersInfo } = useContext(PapersInfoContext)

    const handleClick = useCallback(() => {
        save(papersInfo)
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
