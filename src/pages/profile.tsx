import styles from '@/styles/Padrao.module.scss'
import ConfigUser from "@/components/ConfigUser";
import List from "@/components/List";
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
import { getPosts } from '@/utils/getPosts';
import Post from '@/components/Post';

export async function getServerSideProps() {
    const userPost = await getPosts()
    const users = await getUsers()
    const list = users.slice(0, 3)
  
    return {
      props: { 
        users: list,
        userPost: userPost
      }
    }
}

export default function Profile({users, userPost} : {users: Array<{username: string, perfilImageUrl: string}>, userPost: Array<{}>}) {
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
                        {userPost.map((post: any) => {
                            return(
                                <Post key={post.id} id={post.id} name={post.username} imagem={post.imagem} foto={post.perfilImageUrl} text={post.text} username={post.username} date={post.date} totalLike={post.likes}/>
                            )
                        })}
                    </InfoPadrao>
                    <List listUsers={users}/>
                </div>
            </div>
        </PrivateRoute>
    )
}