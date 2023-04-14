import styles from './HeaderPadrao.module.scss'

export default function HeaderPadrao({children}: {children: React.ReactNode}) {
    return(
        <div className={styles.header}>
            {children}
            <div className={styles.linha}></div>
        </div>
    )
}