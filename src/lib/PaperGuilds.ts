import axios from 'axios'
import { parseHTML } from 'linkedom'

// 与えられた URL がセッションページかどうかを検証する
export const validateSessionPage = (url: string) => {
    const regex = RegExp('^https://pgl.jp/seminars/.+/sessions/[a-fA-F0-9]{24}$')
    if (regex.test(url) === false) {
        throw new Error('Invalid URL')
    }
}

// URL から会議の名称を取得する
export const getConferenceName = (url: string) => {
    validateSessionPage(url)

    const regex = RegExp('^https://pgl\\.jp/seminars/(.+?)/sessions/.+$')
    const match = url.match(regex)
    if (match === null) throw new Error('Invalid URL')

    return match[1]
}

// セッションの題目を静的なスクレイピングにより取得する
export const fetchSessionName = async (url: string) => {
    validateSessionPage(url)

    const response = await axios.get(url)
    const { document } = parseHTML(response.data)

    const selector = 'div.main h1.header'
    let sessionName = document.querySelector(selector)?.textContent ?? ''

    // セッション番号を削除する
    sessionName = sessionName.split('. ').splice(1).join('')
    return sessionName
}

// Get a list of metadata of papers in a session page
export const getMetadata = async (url: string) => {
    validateSessionPage(url)

    // プログラムのJSON ファイルを読み込む
    const conferenceName = getConferenceName(url)
    const program = await import(`../../public/data/programs/${conferenceName}.json`)

    // セッション名からセッションの情報を全探索する。各論文の ID が含まれる
    const sessionName = await fetchSessionName(url)
    const session = program.sessions.find((e: any) => e.name === sessionName)

    // 論文の ID から論文情報を全探索する
    const papers = session.contentIds.map((contentId: number) =>
        program.contents.find((paper: any) => paper.id === contentId)
    )

    const metadataList = []
    for (const paper of papers) {
        const authors: string[] = paper.authors.map((author: any) => {
            const person = program.people.find((person: any) => person.id === author.personId)
            return person.firstName + ' ' + person.lastName
        })

        const affiliations: string[][] = paper.authors.map((author: any) => {
            const institutions: string[] = author.affiliations.map(
                (affil: any) => affil.institution
            )
            // 同じ所属情報が複数登録されている場合がある
            return [...new Set(institutions)]
        })

        const doi: string = paper.addons.doi.url ?? ''
        const award: string = paper.award ?? ''

        metadataList.push({ title: paper.title as string, authors, affiliations, award, doi })
    }
    return metadataList
}
