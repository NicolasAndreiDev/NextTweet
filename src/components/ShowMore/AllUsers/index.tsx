import ButtonFollow from '@/components/ButtonFollow'
import styles from './AllUsers.module.scss'

export default function AllUsers() {
    return(
        <div className={styles.container}>
            <div className={styles.user}>
                <img src={'/images/luigi.jpg'} alt={'Luigi'} className={styles.image}/>
                <div className={styles.userInfo}>
                    <span className={styles.nome}>Luigi</span>
                    <span className={styles.username}>@Luigi_Tweet</span>
                </div>
            </div>
            <ButtonFollow className={styles.button}/>
        </div>
    )
}