import styles from './ThreeUsers.module.scss'

export default function ThreeUsers() {
    return(
        <div className={styles.users}>
            <div className={styles.usersInfo}>
                <img src={'/images/foto_perfil.jpg'} alt={'users'} className={styles.image}/>
                <div className={styles.social}>
                    <span>Nicolas</span>
                    <span>@Nicolas_AS</span>
                </div>
            </div>
            <button className={styles.follow}>Follow</button>
        </div>
    )
}