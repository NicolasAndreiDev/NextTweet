import styles from '@/styles/Padrao.module.scss'
import ConfigUser from "@/components/ConfigUser";
import List from "@/components/List";
import Post from '@/components/Post';
import FotoPerfil from '@/components/InfoUser/FotoPerfil';
import Banner from '@/components/InfoUser/Banner';
import Informacoes from '@/components/InfoUser/Informacoes';
import InfoPadrao from '@/components/InfoPadrao';
import HeaderBack from '@/components/HeaderBack';
import EditProfile from '@/components/InfoUser/EditProfile';
import PrivateRoute from '@/utils/PrivateRoute';
import { UserContext } from '@/providers/userProvider';
import { useContext } from 'react'
import { getUsers } from '@/utils/getUsers';

export async function getServerSideProps() {
    const user = await getUsers()
    const list = user.slice(0, 3)

    return {
        props: { users: list}
    }
}

export default function Profile({users} : {users: Array<{username: string, perfilImageUrl: string}>}) {
    const { user } = useContext(UserContext)

    return(
        <PrivateRoute>
            <div className={styles.container}>
                <ConfigUser />
                <div className={styles.direita}>
                    <InfoPadrao>
                        <HeaderBack local={user?.username} posts={'3 posts'}/>
                        <Banner bannerImage={user?.bannerImageUrl}>
                            <FotoPerfil foto={user?.perfilImageUrl}/>
                        </Banner>
                        <EditProfile />
                        <Informacoes name={user?.username} username={user?.username}/>
                    </InfoPadrao>
                    <List listUsers={users}/>
                </div>
            </div>
        </PrivateRoute>
    )
}