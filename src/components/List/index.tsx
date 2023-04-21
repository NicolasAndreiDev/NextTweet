import styles from './List.module.scss'
import Users from '../Users'
import Search from '../Search'

export default function List({search = true, users = true, listUsers}: {search?: boolean, users?: boolean, listUsers?: Array<{username: string, perfilImageUrl: string, userId: string}>}) {
    return(
        <aside className={styles.container}>
            <div className={styles.fixed}>
                { search && <Search />}
                { users && <Users users={listUsers}/>}
            </div>
        </aside>
    )
}