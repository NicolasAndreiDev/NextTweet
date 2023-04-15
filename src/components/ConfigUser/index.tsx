import styles from './ConfigUser.module.scss'
import Conta from './Conta'
import Links from './Links'
import NewPost from '../NewPost'
import { RiQuillPenLine } from 'react-icons/ri'

export default function ConfigUser() {

    return(
        <header className={styles.container}>
            <div className={styles.fixedHeader}>
                <Links /><NewPost className={styles.post}>
                    <span className={styles.New}>New post</span>
                    <RiQuillPenLine className={styles.icon}/> 
                </NewPost>
                <div className={styles.fixedUser}>
                    <Conta />
                </div>
            </div>
        </header>
    )
}