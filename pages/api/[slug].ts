import type { NextApiRequest, NextApiResponse } from 'next'
import db from '../../lib/db'

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
    const { slug } = req.query
    const isStr = (str: string | string[]): str is string => {
        return (str as string) !== undefined
    }
    const docRef = db.collection('tourl').doc('default')
    const doc = await docRef.get()
    const data = doc.data()

    if (doc.exists && data && isStr(slug)) {
        return res.status(200).json({
            error: null,
            data: data[slug]
        })
    } else {
        return res.status(404).json({
            error: 'Not found',
            data: null
        })
    }
}

export default handler
