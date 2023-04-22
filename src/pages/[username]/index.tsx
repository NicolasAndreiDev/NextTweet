import { getUsers } from '@/utils/getUsers';
import styles from '@/styles/Padrao.module.scss';
import ConfigUser from '@/components/ConfigUser';
import List from '@/components/List';
import FotoPerfil from '@/components/InfoUser/FotoPerfil';
import Banner from '@/components/InfoUser/Banner';
import Informacoes from '@/components/InfoUser/Informacoes';
import InfoPadrao from '@/components/InfoPadrao';
import HeaderBack from '@/components/HeaderBack';
import PrivateRoute from '@/utils/PrivateRoute';
import { useRouter } from 'next/router';
import { GetServerSidePropsContext } from 'next';
import { ParsedUrlQuery } from 'querystring';
import { getPosts } from '@/utils/getPosts';
import { UserListContext } from '@/providers/UserListProvider';
import { useContext, useState, useEffect, ChangeEvent } from 'react';
import Post from '@/components/Post';
import ButtonFollow from '@/components/ButtonFollow';

export async function getServerSideProps(context: GetServerSidePropsContext<ParsedUrlQuery>) {
    const users = await getUsers();
    const userPost = await getPosts()
    const { params } = context;
    const username = params?.username;
  
    const user = users.find((user : {username: string}) => user.username === username);
    const post = userPost.filter((user : { username: string}) => user.username === username)

    if (!user) {
      return {
        notFound: true,
      };
    }
  
    return {
      props: {
        user,
        userPost: post
      },
    };
}

interface Props{
    username: string,
    imagem: string,
    text: string,
    perfilImageUrl: string,
    date: string,
    likes: number,
    id: string,
    userId: string,
}

export default function Username({user, userPost} : {user: {username: string, perfilImageUrl: string, bannerImageUrl: string, userId: string, following: [], followers: []}, userPost: Array<Props>}) {
    const { usersList } = useContext(UserListContext)
    const [followers, setFollowers] = useState(user.followers.length);
    const ThreeUsersAnd = usersList.filter((listUser) => listUser.username !== user.username)
    const ThreeUsers = ThreeUsersAnd.slice(0, 3)
    const router = useRouter();
    if (router.isFallback) {
        return <div></div>;
    }

    return (
        <PrivateRoute>
            <div className={styles.container}>
                <ConfigUser />
                <div className={styles.direita}>
                    <InfoPadrao>
                        <HeaderBack local={user.username} posts={'3 posts'} />
                        <Banner bannerImage={user.bannerImageUrl}>
                            <FotoPerfil foto={user.perfilImageUrl}/>
                            <ButtonFollow className={styles.buttonFollowPageComponent} username={user.username} userId={user.userId}/>
                        </Banner>
                        <Informacoes name={user.username} username={user.username} followers={user.followers ? followers : 0} following={user.following ? user.following.length : 0}/>
                        {userPost.map((post: any) => {
                          return(
                            <Post key={post.userId} name={post.username} userId={post.userId} username={post.username} foto={post.perfilImageUrl} imagem={post.imagem} text={post.text} date={post.date} totalLike={post.likes} id={post.id}/>
                          )
                        })}
                    </InfoPadrao>
                    <List listUsers={ThreeUsers}/>
                </div>
            </div>
        </PrivateRoute>
  );
}