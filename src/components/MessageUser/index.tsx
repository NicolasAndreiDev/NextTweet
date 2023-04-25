import { useState } from 'react'
import styles from './MessageUser.module.scss'
import NextMessage from './NextMessage'
import UsersListMessage from './UsersListMessage'

export default function MessageUser() {
    const [user, setUser] = useState<{username: string, perfilImageUrl: string}>()

    return(
        <div className={styles.containerMessage}>
            <UsersListMessage selectedUserProps={(user) => setUser(user)}/>
            <NextMessage username={user ? user.username : ''} foto={ user? user.perfilImageUrl : ''}/>
        </div>
    )
}