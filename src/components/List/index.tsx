import styles from './List.module.scss'
import Users from '../Users'

export default function List({children}: {children?: React.ReactNode}) {
    return(
        <aside className={styles.container}>
            <div className={styles.fixed}>
                {children}
                <Users />
            </div>
        </aside>
    )
}