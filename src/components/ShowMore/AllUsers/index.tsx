import ButtonFollow from '@/components/ButtonFollow'
import styles from './AllUsers.module.scss'
import { useRouter } from 'next/router'

export default function AllUsers({name, username, foto}: {name: string, username: string, foto: string | null} ) {
    const route = useRouter()

    function handleClick() {
        route.push(username)
    }

    return(
        <div className={styles.container}>
            <div onClick={handleClick} className={styles.element}>
                <div className={styles.user}>
                    { foto ? <img src={foto} alt={name} className={styles.image}/> : <div className={styles.imageDefault}></div>}
                    <div className={styles.userInfo}>
                        <span className={styles.nome}>{name}</span>
                        <span className={styles.username}>@{username}</span>
                    </div>
                </div>
            </div>
            <ButtonFollow className={styles.button}/>
        </div>
    )
}