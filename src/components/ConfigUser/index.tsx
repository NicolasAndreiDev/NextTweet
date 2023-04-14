import styles from './ConfigUser.module.scss'
import Conta from './Conta'
import Links from './Links'
import NewPost from '../NewPost'

export default function ConfigUser() {
    return(
        <header className={styles.container}>
            <div className={styles.fixedHeader}>
                <Links />
                <NewPost className={styles.post}/>
                <div className={styles.fixedUser}>
                    <Conta />
                </div>
            </div>
        </header>
    )
}