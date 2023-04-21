import ConfigUser from "@/components/ConfigUser";
import InfoPadrao from "@/components/InfoPadrao";
import List from "@/components/List";
import ShowMore from "@/components/ShowMore";
import styles from '@/styles/Padrao.module.scss';
import PrivateRoute from "@/utils/PrivateRoute";
import { UserListContext } from "@/providers/UserListProvider";
import { useContext } from 'react'

export default function Users() {
    const { usersList } = useContext(UserListContext)

    return (
        <PrivateRoute>
          <div className={styles.container}>
            <ConfigUser />
            <div className={styles.direita}>
              <InfoPadrao>
                <ShowMore users={usersList}/>
              </InfoPadrao>
              <List users={false}/>
            </div>
          </div>
        </PrivateRoute>
      )
}