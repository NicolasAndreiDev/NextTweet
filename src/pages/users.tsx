import ConfigUser from "@/components/ConfigUser";
import InfoPadrao from "@/components/InfoPadrao";
import List from "@/components/List";
import ShowMore from "@/components/ShowMore";
import styles from '@/styles/Padrao.module.scss';
import PrivateRoute from "@/utils/PrivateRoute";
import { getUsers } from "@/utils/getUsers";

export async function getServerSideProps() {
  const users = await getUsers();
  
  return {
    props: { users },
  };
}

export default function Users({users} : {users: Array<{username: string, perfilImageUrl: string}>}) {
    return (
        <PrivateRoute>
          <div className={styles.container}>
            <ConfigUser />
            <div className={styles.direita}>
              <InfoPadrao>
                <ShowMore users={users}/>
              </InfoPadrao>
              <List users={false}/>
            </div>
          </div>
        </PrivateRoute>
      )
}