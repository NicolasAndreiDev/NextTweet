import Link from 'next/link'
import styles from './Users.module.scss'
import ThreeUsers from './ThreeUsers'

export default function Users({users} : {users?: Array<{username: string, perfilImageUrl: string}>}) {
    return(
        <div className={styles.cardList}>
            <p className={styles.para}>Who to follow</p>
            {users ? users.map((user) => {
                return(
                    <ThreeUsers username={user.username} foto={user.perfilImageUrl}/>
                )
            }) : ''}
            <Link href={'/users'} className={styles.show}>
                <span>Show More</span>
            </Link>
        </div>
    )
}