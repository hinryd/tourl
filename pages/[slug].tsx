import type { GetServerSideProps } from 'next'

interface Props {
    error: string
}

export const getServerSideProps: GetServerSideProps = async (ctx) => {
    const slug = encodeURIComponent(ctx.query.slug as string)
    const res = await fetch(`${process.env.PROD_URL}/api/${slug}`)
    const { error, data } = await res.json()

    if (!error) {
        ctx.res.setHeader('location', data)
        ctx.res.statusCode = 301
        ctx.res.end()
    }

    return {
        props: {
            error
        }
    }
}

const Slug = ({ error }: Props) => {
    return (
        <main>
            <h1>{error}</h1>
        </main>
    )
}

export default Slug
