import type { NextApiRequest, NextApiResponse } from 'next'
import { createHash } from 'crypto'
import db from '../../lib/db'

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
    const url = req.body
    const docRef = db.collection('tourl').doc('default')
    const digest = createHash('md5').update(url).digest('hex')
    const dbRes = await docRef.set({ [digest]: url }, { merge: true })

    if (dbRes) {
        return res.status(200).json({
            error: null,
            data: digest
        })
    } else {
        return res.status(404).json({
            error: 'Not found',
            data: null
        })
    }
}

export default handler
