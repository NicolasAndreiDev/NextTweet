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
import Post from '@/components/Post';

export async function getServerSideProps(context: GetServerSidePropsContext<ParsedUrlQuery>) {
    const users = await getUsers();
    const userPost = await getPosts()
    const userslist = users.slice(0, 3)
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
        users: userslist,
        userPost: post
      },
    };
}

export default function Username({user, users, userPost} : {user: {username: string, perfilImageUrl: string, bannerImageUrl: string}, users: Array<{username: string, perfilImageUrl: string}>, userPost: Array<{}>}) {
    console.log(userPost)
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
                        </Banner>
                        <Informacoes name={user.username} username={user.username}/>
                        {userPost.map((post: any) => {
                          return(
                            <Post name={post.username} username={post.username} foto={post.perfilImageUrl} imagem={post.imagem} text={post.text}/>
                          )
                        })}
                    </InfoPadrao>
                    <List listUsers={users}/>
                </div>
            </div>
        </PrivateRoute>
  );
}