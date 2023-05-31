import styles from './Messages.module.scss'

export default function Messages({textoMe, message} : {textoMe: string, message: string}) {
    return(
        <>
            <div className={styles.container}>
                <div className={styles.they}>
                    { message ? <p className={styles.texto}>{message}</p> : ''}
                </div>
                <div className={styles.me}>
                    { textoMe ? <p className={styles.texto}>{textoMe}</p> : ''}
                </div>
            </div>
        </>
    )
}