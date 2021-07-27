import styles from '../styles/Home.module.css'
import { useStore } from '../lib/store'
import RefreshIcon from './RefreshIcon'
import CopyIcon from './CopyIcon'

const Form = () => {
    const url = useStore(s => s.url)
    const idle = useStore(s => s.idle)

    const copyUrl = () => {
        navigator.clipboard.writeText(url)
    }

    const handleReset = e => {
        e.preventDefault()
        idle()
    }

    return (
        <form className={`${styles.form}`} onSubmit={handleReset}>
            <input
                className={styles.input}
                type="text"
                value={url}
                onClick={copyUrl}
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
