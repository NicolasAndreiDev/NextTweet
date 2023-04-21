import styles from '@/styles/Padrao.module.scss'
import ConfigUser from "@/components/ConfigUser";
import InfoPadrao from "@/components/InfoPadrao";
import List from '@/components/List';
import NotificationsComponent from '@/components/NotificationsComponent';
import PrivateRoute from '@/utils/PrivateRoute';
import { UserListContext } from '@/providers/UserListProvider';
import { useContext } from 'react'

export default function Notifications() {
    const { usersList } = useContext(UserListContext)
    const ThreeUsers = usersList.slice(0, 3)
    return(
        <PrivateRoute>
            <div className={styles.container}>
                <ConfigUser />
                <div className={styles.direita}>
                <InfoPadrao>
                    <NotificationsComponent />
                </InfoPadrao>
                </div>
                <List listUsers={ThreeUsers}/>
            </div>
        </PrivateRoute>
    )
}