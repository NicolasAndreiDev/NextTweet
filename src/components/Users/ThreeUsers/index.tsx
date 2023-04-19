import ButtonFollow from '@/components/ButtonFollow'
import styles from './ThreeUsers.module.scss'
import { useRouter } from 'next/router'

export default function ThreeUsers({foto, username}: {foto: string, username: string}) {
    const route = useRouter()

    function handleClick() {
        route.push(username)
    }

    return(
        <div className={styles.users} onClick={handleClick}>
            <div className={styles.usersInfo}>
                { foto ? <img src={foto} alt={username} className={styles.image}/> : <div className={styles.imageDefault}></div>}
                <div className={styles.social}>
                    <span className={styles.name}>{username}</span>
                    <span className={styles.username}>@{username}</span>
                </div>
            </div>
            <ButtonFollow className={styles.follow}/>
        </div>
    )
}