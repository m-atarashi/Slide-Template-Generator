import { PapersInfoContext } from '@components/Context/PapersInfo'
import { useContext } from 'react'

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
                          {paperInfo.authors?.join(', ')}
                          <br />
                          {paperInfo.affiliations}
                      </p>
                  ))
                : null}
        </>
    )
}
