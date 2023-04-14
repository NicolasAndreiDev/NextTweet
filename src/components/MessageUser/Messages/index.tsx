import styles from './Messages.module.scss'

export default function Messages() {
    return(
        <div className={styles.container}>
            <div className={styles.they}>
                <p className={styles.texto}>Nicolas?</p>
            </div>
            <div className={styles.me}>
                <p className={styles.texto}>Luigi?</p>
            </div>
        </div>
    )
}