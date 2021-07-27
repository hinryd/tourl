import { useState } from 'react'
import type { FormEvent, ChangeEvent, MouseEvent } from 'react'
import styles from '../styles/Home.module.css'
import isAbsoluteUrl from 'is-absolute-url'
import SubmitIcon from '../components/SubmitIcon'
import CopyIcon from '../components/CopyIcon'
import TickIcon from '../components/TickIcon'

type SubmitState = 'idle' | 'loading' | 'error' | 'success'
type JsonResponse = { error: string; data: string }

const Home = () => {
    const [url, setUrl] = useState<string>('')
    const [submitState, setSubmitState] = useState<SubmitState>('idle')

    const onChange = (e: ChangeEvent<HTMLInputElement>) => {
        if (submitState === 'success') setSubmitState('idle')
        setUrl(e.target.value)
    }

    const onClick = async (e: MouseEvent) => {
        e.preventDefault()
        navigator.clipboard.writeText(url)
    }

    const onSubmit = (e: FormEvent) => {
        e.preventDefault()
        isAbsoluteUrl(url) ? shorten(url) : setSubmitState('error')
    }

    const shorten = async (url: string) => {
        setSubmitState('loading')

        const res = await fetch('/api/new', {
            method: 'POST',
            body: url
        })
        const { error, data } = (await res.json()) as JsonResponse

        console.log(error, data)

        if (error) {
            setSubmitState('error')
            setUrl(error)
        } else {
            setSubmitState('success')
            setUrl(data)
        }
    }

    return (
        <main className={styles.main}>
            <div className={styles.container}>
                <h2 className={styles.message}>
                    Shorten your URL with Tourl 😎
                </h2>
                <form
                    className={`${styles.form} ${
                        submitState === 'error' ? styles.error : ''
                    }`}
                    onSubmit={onSubmit}
                >
                    <input
                        className={styles.input}
                        type="text"
                        placeholder="Insert URL here 👋"
                        value={url}
                        onChange={onChange}
                        disabled={submitState === 'loading'}
                    ></input>
                    {submitState === 'success' ? (
                        <>
                            <button className={styles.copy} onClick={onClick}>
                                <CopyIcon />
                            </button>
                            <button
                                className={`${styles.button} ${styles.success}`}
                                disabled
                            >
                                <TickIcon />
                            </button>
                        </>
                    ) : (
                        <button
                            className={styles.button}
                            type="submit"
                            disabled={submitState === 'loading'}
                        >
                            <SubmitIcon />
                        </button>
                    )}
                </form>
            </div>
        </main>
    )
}

export default Home
