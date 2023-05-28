import { useContext } from 'react'

import { PapersInfoContext } from '@/components/Context/PapersInfo'

// 論文情報のデバッグ表示
export default function Debug() {
    const { papersInfo } = useContext(PapersInfoContext)
    return (
        <>
            <p>{papersInfo?.length} papers found</p>
            {papersInfo?.length > 0
                ? papersInfo.map((paperInfo) => (
                      <p key={paperInfo.title}>
                          {paperInfo.title}
                          <br />
                          {paperInfo.authors.join(', ')}
                          <br />
                          {paperInfo.affils}
                      </p>
                  ))
                : null}
        </>
    )
}
