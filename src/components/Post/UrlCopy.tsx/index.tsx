import styles from './UrlCopy.module.scss'

export default function UrlCopy(){
    return(
        <div className={styles.copy}>
            <div className={styles.direct}></div>
            <p>Url Copiada</p>
        </div>
    )
}