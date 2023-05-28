import { NextApiHandler } from 'next'
import { z } from 'zod'

import fetchPapersInfo from '@/lib/paperGuilds'

const querySchema = z.object({
    url: z.string().url(),
})

const handler: NextApiHandler = async (req, res) => {
    if (req.method === 'GET') {
        // Validate query
        const parsedQuery = querySchema.safeParse(req.query)
        if (!parsedQuery.success) return res.status(400).json(parsedQuery.error)

        // Fetch data
        const { url } = parsedQuery.data
        const message = await fetchPapersInfo(url)

        res.status(200).json(message)
    } else {
        res.status(400).json({ message: 'Only GET requests are allowed' })
    }
}

export default handler