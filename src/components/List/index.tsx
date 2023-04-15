import styles from './List.module.scss'
import Users from '../Users'
import Search from '../Search'

export default function List({search = true, users = true}: {search?: boolean, users?: boolean}) {
    return(
        <aside className={styles.container}>
            <div className={styles.fixed}>
                { search && <Search />}
                { users && <Users />}
            </div>
        </aside>
    )
}