import styles from './AllComponents.module.scss'

export default function AllComponent() {
    return(
        <div className={styles.container}>
            <img src={'/images/logo.png'} className={styles.imagem}/>
            <p>There was a login to your account @Nicolas_AS from a new device on 12 de fev. de 2023. Review it now.</p>
            <div className={styles.linha}></div>
        </div>
    )
}