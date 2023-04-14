import Link from 'next/link'
import styles from './Users.module.scss'
import ThreeUsers from './ThreeUsers'

export default function Users() {
    return(
        <div className={styles.cardList}>
            <p className={styles.para}>Who to follow</p>
            <ThreeUsers />
            <ThreeUsers />
            <ThreeUsers />
            <Link href={'/users'} className={styles.show}>
                <span>Show More</span>
            </Link>
        </div>
    )
}