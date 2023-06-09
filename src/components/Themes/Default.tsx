import { enumerateAffils, enumerateAuthors } from '@lib/parseAffiliation'
import propsToStyle from '@lib/propsToStyle'
import { PaperMetadata } from '@lib/types'
import theme from '@Themes/default.json'

export default function Default({
    paperMetadata,
    scale,
    extendedTheme,
}: {
    paperMetadata: PaperMetadata
    scale: number
    extendedTheme?: any
}) {
    if (extendedTheme) {
        const theme = { ...theme, ...extendedTheme }
    }
    return (
        <>
            <div className="header" style={propsToStyle(theme.header.general, scale)}>
                <div className="container max-w-full">
                    <Title title={paperMetadata.title} doi={paperMetadata.doi} scale={scale} />
                    <Author
                        authors={paperMetadata.authors}
                        affils={paperMetadata.affiliations}
                        scale={scale}
                    />
                    <Affil affils={paperMetadata?.affiliations} scale={scale} />
                </div>
            </div>
        </>
    )
}

function Title(props: { title: string; doi?: string; scale: number }) {
    const { title: titleProps } = theme.header
    const style = propsToStyle(titleProps, props.scale, { hyperlink: props.doi ?? '' })

    return (
        <>
            {titleProps?.hyperlink?.url && props.doi ? (
                <a className="title" style={style} href={props.doi} target="_blank">
                    {props.title}
                </a>
            ) : (
                <p className="title" style={style}>
                    {props.title}
                </p>
            )}
        </>
    )
}

function Author(props: { authors: string[]; affils: string[][]; scale: number }) {
    const enumeration = enumerateAuthors(props.authors ?? [], props.affils ?? [])
    const style = propsToStyle(theme.header.author, props.scale)

    return (
        <p className="authors" style={style}>
            {enumeration.map(({ author, refs }, i) => (
                <span key={i}>
                    {author}
                    <sup>{refs.join(', ')}</sup>
                    {i < enumeration.length - 1 ? ', ' : ''}
                </span>
            ))}
        </p>
    )
}

function Affil(props: { affils: string[][]; scale: number }) {
    const enumeration = enumerateAffils(props.affils)
    const style = propsToStyle(theme.header.affiliation, props.scale)

    return (
        <p className="affiliation" style={style}>
            {enumeration.map((affil, i) => (
                <span key={i}>
                    <sup>{i + 1}</sup>
                    {affil}
                    {i < enumeration.length - 1 ? ', ' : ''}
                </span>
            ))}
        </p>
    )
}
