import { getUsers } from '@/utils/getUsers'
import styles from './Dados.module.scss'
import { useEffect, useState, useContext} from 'react'
import { UserContext } from '@/providers/UserProvider'

interface User{
    username: string,
    perfilImageUrl: string
}

export default function Dados({ dados }: { dados: string }) {
    const { user } = useContext(UserContext)
    const [users, setUsers] = useState<User[]>([])

    useEffect(() => {
        const fetchUsers = async () => {
        const fetchedUsers = await getUsers()
        setUsers(fetchedUsers)
        }
        fetchUsers()
    }, [])
    
    const filteredUsers = users.filter((user) => user.username.toLowerCase().includes(dados.toLowerCase()))
    const filteredNewUsers = filteredUsers.filter((users) => users.username !== user?.username)

    return (
        <div className={styles.container}>
        {!dados ? (<p>Try searching for people</p>) : filteredNewUsers.length === 0 ? ( <p>No users found</p>) 
        : ( filteredNewUsers.map((user) => (
                <div className={styles.users}>
                    <img src={user.perfilImageUrl} className={styles.images} />
                    <div className={styles.info}>
                    <span className={styles.name}>{user.username}</span>
                    <span className={styles.username}>@{user.username}</span>
                    </div>
                </div>
            ))
        )}
        </div>
    )
}
