import { KeyboardEvent, useCallback, useContext } from 'react'

import { PapersInfoContext } from '@/components/Context/PapersInfo'

// 論文やセッションのURLを入力するアドレスバー
export default function Addressbar() {
    const { setPapersInfo } = useContext(PapersInfoContext)

    // キーボードのEnterキーが押されたときに実行される関数
    const keyDownHandler = useCallback(
        async (e: KeyboardEvent<HTMLInputElement>) => {
            // only enter key pressed
            if (e.key !== 'Enter') return

            // fetch papers information from the inner api
            const url = e.currentTarget.value
            const query = new URLSearchParams({ url })
            const res = await fetch(`/api/paper/info?${query}`)
            const message = await res.json()

            // update the context for papers information
            setPapersInfo(message)
            console.log(message)
        },
        [setPapersInfo]
    )

    return (
        <div className="addressbar w-1/2 mx-auto">
            <input
                className="w-full p-1 border-2 rounded-md"
                type="text"
                placeholder="Enter url"
                onKeyDown={keyDownHandler}
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