import type { NextApiRequest, NextApiResponse } from 'next'
import { createHash } from 'crypto'
import db from '../../lib/db'

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
    const url = req.body
    const docRef = db.collection('tourl').doc('default')
    const key = createHash('sha1').update(url).digest('base64').slice(0, 8)
    const dbRes = await docRef.set({ [key]: url }, { merge: true })

    if (dbRes) {
        return res.status(200).json({
            error: null,
            data: `${process.env.PROD_URL}/${key}`
        })
    } else {
        return res.status(404).json({
            error: 'Not found',
            data: null
        })
    }
}

export default handler
