import styles from './PopUp.module.scss'

export default function PopUp({...props}) {
    return(
        <div className={styles.container} tabIndex={-1} {...props}>
            <button className={styles.button}>Add an exist account</button>
            <button className={styles.button}>Logout</button>
            <div className={styles.decoration}></div>
        </div>
    )
}