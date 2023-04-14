import styles from './MessageUser.module.scss'
import NextMessage from './NextMessage'
import UsersListMessage from './UsersListMessage'

export default function MessageUser() {
    return(
        <div className={styles.containerMessage}>
            <UsersListMessage />
            <NextMessage />
        </div>
    )
}