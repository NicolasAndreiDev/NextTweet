import ConfigUser from '@/components/ConfigUser'
import ExploreComponent from '@/components/ExploreComponent'
import InfoPadrao from '@/components/InfoPadrao'
import List from '@/components/List'
import styles from '@/styles/Padrao.module.scss'
import PrivateRoute from '@/utils/PrivateRoute'
import { getUsers } from '@/utils/getUsers'

export async function getServerSideProps() {
    const users = await getUsers()
    const list = users.slice(0, 3)
  
    return {
      props: { users: list }
    }
}


export default function Explore({users}: {users: Array<{username: string, perfilImageUrl: string}>}) {
    return(
        <PrivateRoute>
            <div className={styles.container}>
                <ConfigUser />
                <div className={styles.direita}>
                <InfoPadrao>
                    <ExploreComponent />
                </InfoPadrao>
                </div>
                <List search={false} listUsers={users}/>
            </div>
        </PrivateRoute>
    )
}