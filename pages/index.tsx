import styles from '../styles/Home.module.css'
import { useStore } from '../lib/store'
import SuccessForm from '../components/SuccessForm'
import Form from '../components/Form'

const Home = () => {
    const appState = useStore(s => s.appState)
    return (
        <main className={styles.main}>
            <div className={styles.container}>
                <h2 className={styles.message}>
                    Shorten your URL with Tourl 😎
                </h2>
                {appState === 'success' ? <SuccessForm /> : <Form />}
            </div>
        </main>
    )
}

export default Home
