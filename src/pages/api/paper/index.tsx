import { fetchMetadataList } from '@lib/paperGuilds'
import { NextApiHandler } from 'next'
import { z } from 'zod'

const handler: NextApiHandler = async (req, res) => {
    if (req.method === 'GET') {
        // Validate query
        const querySchema = z.object({ url: z.string().url() })
        const parsedQuery = querySchema.safeParse(req.query)
        if (!parsedQuery.success) return res.status(400).json(parsedQuery.error)

        // Fetch data
        const { url } = parsedQuery.data
        const message = await fetchMetadataList(url)
        res.status(200).json(message)
    } else {
        res.status(400).json({ message: 'Only GET requests are allowed' })
    }
}

export default handler
