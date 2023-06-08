import { PapersMetadataContext } from '@components/Context/PapersMetadata'
import { ThemeContext } from '@components/Context/Theme'
import save from '@lib/presentation'
import { useCallback, useContext } from 'react'

export default function SaveBtn() {
    const { papersMetadata } = useContext(PapersMetadataContext)
    const { theme } = useContext(ThemeContext)

    const onClick = useCallback(async () => {
        await save(papersMetadata, theme)
    }, [papersMetadata, theme])

    return (
        <>
            <button
                className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded w-16 h-16"
                onClick={onClick}
            >
                Save
            </button>
        </>
    )
}
