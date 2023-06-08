import { PapersMetadataContext } from '@components/Context/PapersMetadata'
import { KeyboardEvent, useCallback, useContext } from 'react'

// 論文やセッションのURLを入力するアドレスバー
export default function Addressbar() {
    const { setPapersMetadata } = useContext(PapersMetadataContext)

    const onKeyDown = useCallback(
        async (e: KeyboardEvent<HTMLInputElement>) => {
            if (e.key !== 'Enter') return

            // fetch papers information from the inner api
            const url = e.currentTarget.value
            const query = new URLSearchParams({ url })
            
            const res = await fetch(`/api/paper?${query}`)
            const message = await res.json()

            setPapersMetadata(message)
            console.log(message)
        },
        [setPapersMetadata]
    )

    return (
        <div className="addressbar w-1/2 mx-auto">
            <input
                className="w-full p-1 border-2 rounded-md"
                type="text"
                placeholder="Enter url"
                onKeyDown={onKeyDown}
            />
            <Description />
        </div>
    )
}

// アドレスバーの下に表示される説明文
function Description() {
    return (
        <div className="description text-zinc-400">
            <p>e.g. https://pgl.js/*/sessions/* </p>
        </div>
    )
}
