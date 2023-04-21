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
import { UserContext } from '@/providers/UserProvider';
import { useContext } from 'react'
import { UserListContext } from '@/providers/UserListProvider';
import { getPosts } from '@/utils/getPosts';
import Post from '@/components/Post';

export async function getServerSideProps() {
    const userPost = await getPosts()
  
    return {
      props: { 
        userPost: userPost
      }
    }
}

export default function Profile({userPost} : {userPost: Array<{username: string}>}) {
    const { user } = useContext(UserContext)
    const { usersList } = useContext(UserListContext)
    const posts = userPost.filter((users) => users.username == user?.username)
    const ThreeUsers = usersList.slice(0, 3)

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
                        <Informacoes name={user?.username} username={user?.username} followers={[0]} following={user?.following ? user?.following.length : 0}/>
                        {posts.map((post: any) => {
                            return(
                                <Post key={post.userId} userId={post.userId} id={post.id} name={post.username} imagem={post.imagem} foto={post.perfilImageUrl} text={post.text} username={post.username} date={post.date} totalLike={post.likes}/>
                            )
                        })}
                    </InfoPadrao>
                    <List listUsers={ThreeUsers}/>
                </div>
            </div>
        </PrivateRoute>
    )
}