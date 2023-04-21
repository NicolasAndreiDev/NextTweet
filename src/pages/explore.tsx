import ConfigUser from '@/components/ConfigUser'
import ExploreComponent from '@/components/ExploreComponent'
import InfoPadrao from '@/components/InfoPadrao'
import List from '@/components/List'
import styles from '@/styles/Padrao.module.scss'
import PrivateRoute from '@/utils/PrivateRoute'
import { useContext } from 'react'
import { UserListContext } from '@/providers/UserListProvider'

export default function Explore() {
    const { usersList } = useContext(UserListContext)
    const ThreeUsers = usersList.slice(0, 3)
    return(
        <PrivateRoute>
            <div className={styles.container}>
                <ConfigUser />
                <div className={styles.direita}>
                <InfoPadrao>
                    <ExploreComponent />
                </InfoPadrao>
                </div>
                <List search={false} listUsers={ThreeUsers}/>
            </div>
        </PrivateRoute>
    )
}