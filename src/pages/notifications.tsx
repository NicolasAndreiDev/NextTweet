import styles from '@/styles/Padrao.module.scss'
import ConfigUser from "@/components/ConfigUser";
import InfoPadrao from "@/components/InfoPadrao";
import List from '@/components/List';
import Search from '@/components/Search';
import NotificationsComponent from '@/components/NotificationsComponent';
import PrivateRoute from '@/utils/PrivateRoute';
import { getUsers } from '@/utils/getUsers';

export async function getServerSideProps() {
    const users = await getUsers()
    const list = users.slice(0, 3)
  
    return {
      props: { users: list }
    }
}

export default function Notifications({users} : {users: Array<{username: string, perfilImageUrl: string}>}) {
    return(
        <PrivateRoute>
            <div className={styles.container}>
                <ConfigUser />
                <div className={styles.direita}>
                <InfoPadrao>
                    <NotificationsComponent />
                </InfoPadrao>
                </div>
                <List listUsers={users}/>
            </div>
        </PrivateRoute>
    )
}