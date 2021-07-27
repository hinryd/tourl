import type { FormEvent, ChangeEvent, MouseEvent } from 'react'
import styles from '../styles/Home.module.css'
import isAbsoluteUrl from 'is-absolute-url'
import { useStore } from '../lib/store'
import SubmitIcon from './SubmitIcon'

type JsonResponse = { error: string; data: string }

const Form = () => {
    const store = useStore()

    const onSubmit = (e: FormEvent) => {
        e.preventDefault()
        isAbsoluteUrl(store.url) ? shorten(store.url) : store.error()
    }
    const onChange = (e: ChangeEvent<HTMLInputElement>) => {
        if (store.appState === 'success') store.idle()
        store.setUrl(e.target.value)
    }

    const onClick = async (e: MouseEvent) => {
        e.preventDefault()
        navigator.clipboard.writeText(store.url)
    }

    const shorten = async (url: string) => {
        store.loading()

        const res = await fetch('/api/new', {
            method: 'POST',
            body: url
        })
        const { error, data } = (await res.json()) as JsonResponse

        console.log(error, data)

        if (error) {
            store.error()
            store.setUrl(error)
        } else {
            store.success()
            store.setUrl(data)
        }
    }

    return (
        <form
            className={`${styles.form} ${
                store.appState === 'error' ? styles.error : ''
            }`}
            onSubmit={onSubmit}
        >
            <input
                className={styles.input}
                type="text"
                placeholder="Insert URL here 👋"
                value={store.url}
                onChange={onChange}
                disabled={store.appState === 'loading'}
            />
            <button
                className={styles.button}
                type="submit"
                disabled={store.appState === 'loading'}
            >
                <SubmitIcon />
            </button>
        </form>
    )
}

export default Form
