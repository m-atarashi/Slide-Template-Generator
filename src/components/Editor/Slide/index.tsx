import { PapersMetadataContext } from '@components/Context/PapersMetadata'
import { ThemeContext } from '@components/Context/Theme'
import { enumerateAffils, enumerateAuthors } from '@lib/parseAffiliation'
import propsToStyle from '@lib/propsToStyle'
import { useContext, useEffect, useState } from 'react'

export default function Slide(props: { slideIndex: number }) {
    const { papersMetadata } = useContext(PapersMetadataContext)
    const paperMetadata = papersMetadata[props.slideIndex]

    const { theme } = useContext(ThemeContext)
    const { header } = theme

    return (
        <div className="slide w-full aspect-w-16 aspect-h-9 bg-white">
            <div className="header" style={propsToStyle(header.general, 1)}>
                <Title title={paperMetadata?.title} doi={paperMetadata?.doi} />
                <Author authors={paperMetadata?.authors} affils={paperMetadata?.affiliations} />
                <Affil affils={paperMetadata?.affiliations} />
            </div>
        </div>
    )
}

function Title(props: { title: string; doi?: string }) {
    const { theme } = useContext(ThemeContext)
    const { title: titleProps, titleLink } = theme.header
    const style = {
        ...propsToStyle(titleProps, 1),
        textDecoration: `${titleLink === 'underline' ? 'underline' : ''}`,
    }

    return (
        <a className="title" style={style} href={titleLink ? props.doi : ''} target="_blank">
            {props.title}
        </a>
    )
}

function Author(props: { authors: string[]; affils: string[][] }) {
    const { theme } = useContext(ThemeContext)
    const style = propsToStyle(theme.header.author, 1)

    const [enumeration, setEnumeration] = useState<{ author: string; refs: number[] }[]>([])
    useEffect(
        () => setEnumeration(enumerateAuthors(props.authors, props.affils)),
        [props.authors, props.affils]
    )

    return (
        <p className="authors" style={style}>
            {enumeration.map(({ author, refs }, i) => (
                <>
                    {author}
                    <sup>{refs.join(', ')}</sup>
                    {i < enumeration.length - 1 ? ', ' : ''}
                </>
            ))}
        </p>
    )
}

function Affil(props: { affils: string[][] }) {
    const { theme } = useContext(ThemeContext)
    const style = propsToStyle(theme.header.affiliation, 1)

    const [enumeration, setEnumeration] = useState<string[]>([])
    useEffect(() => setEnumeration(enumerateAffils(props.affils)), [props.affils])

    return (
        <p className="affiliation" style={style}>
            {enumeration.map((affil, i) => (
                <>
                    <sup>{i + 1}</sup>
                    {affil}
                    {i < enumeration.length - 1 ? ', ' : ''}
                </>
            ))}
        </p>
    )
}
