import styles from './Messages.module.scss'

export default function Messages({textoMe} : {textoMe: string}) {
    return(
        <div className={styles.container}>
            <div className={styles.they}>
                <p className={styles.texto}>Oi!</p>
            </div>
            <div className={styles.me}>
                {textoMe ? <p className={styles.texto}>{textoMe}</p> : ''}
            </div>
        </div>
    )
}