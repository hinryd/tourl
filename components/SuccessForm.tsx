import type { FormEvent } from 'react'
import styles from '../styles/Home.module.css'
import { useStore } from '../lib/store'
import RefreshIcon from './RefreshIcon'
import CopyIcon from './CopyIcon'

const Form = () => {
    const url = useStore(s => s.url)
    const setUrl = useStore(s => s.setUrl)
    const idle = useStore(s => s.idle)

    const copyUrl = (e: FormEvent) => {
        e.preventDefault()
        navigator.clipboard.writeText(url)
    }

    const handleReset = (e: FormEvent) => {
        e.preventDefault()
        idle()
        setUrl('')
    }

    return (
        <form className={styles.form} onSubmit={handleReset}>
            <input
                className={`${styles.input} ${styles.copy}`}
                type="text"
                value={url}
                onClick={copyUrl}
                readOnly
            />
            <button className={styles.copy} onClick={copyUrl}>
                <CopyIcon />
            </button>
            <button
                className={`${styles.button} ${styles.success}`}
                type="submit"
            >
                <RefreshIcon />
            </button>
        </form>
    )
}

export default Form
