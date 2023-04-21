import styles from './ConfigUser.module.scss'
import Conta from './Conta'
import Links from './Links'
import { RiQuillPenLine } from 'react-icons/ri'

export default function ConfigUser() {

    return(
        <header className={styles.container}>
            <div className={styles.fixedHeader}>
                <Links />
                <button className={styles.post}>
                    <span className={styles.New}>New post</span>
                    <RiQuillPenLine className={styles.icon}/> 
                </button>
                <div className={styles.fixedUser}>
                    <Conta />
                </div>
            </div>
        </header>
    )
}