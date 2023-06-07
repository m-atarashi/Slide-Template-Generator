import { PapersMetadataContext } from '@components/Context/PapersMetadata'
import { useContext } from 'react'

// 論文情報のデバッグ表示
export default function Debug() {
    const { papersMetadata } = useContext(PapersMetadataContext)
    return (
        <>
            <p>{papersMetadata?.length} papers found</p>
            {papersMetadata?.length > 0
                ? papersMetadata.map(({ title, authors, affiliations }) => (
                      <p key={title}>
                          {title}
                          <br />
                          {authors?.join(', ')}
                          <br />
                          {affiliations}
                      </p>
                  ))
                : null}
        </>
    )
}
