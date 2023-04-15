import ButtonFollow from '@/components/ButtonFollow'
import styles from './ThreeUsers.module.scss'

export default function ThreeUsers() {
    return(
        <div className={styles.users}>
            <div className={styles.usersInfo}>
                <img src={'/images/foto_perfil.jpg'} alt={'users'} className={styles.image}/>
                <div className={styles.social}>
                    <span className={styles.name}>Nicolas</span>
                    <span className={styles.username}>@Nicolas_AS</span>
                </div>
            </div>
            <ButtonFollow className={styles.follow}/>
        </div>
    )
}