import HeaderBack from '../HeaderBack'
import AllUsers from './AllUsers'
import styles from './ShowMore.module.scss'

export default function ShowMore({users} : {users: Array<{username: string, perfilImageUrl: string, userId: string}>}) {
    return(
        <>
            <HeaderBack local={'Connect'} style={{padding: '1.4rem 2rem'}}/>
            <div>
                <p className={styles.para}>Suggested for you</p>
                {users.map(user => {
                    return(
                        <AllUsers key={user.username} name={user.username} username={user.username} foto={user.perfilImageUrl} userId={user.userId}/>
                    )
                })}
            </div>
        </>
    )
}