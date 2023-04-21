import ConfigUser from "@/components/ConfigUser";
import HeaderBack from "@/components/HeaderBack";
import InfoPadrao from "@/components/InfoPadrao";
import Informacoes from "@/components/InfoUser/Informacoes";
import List from "@/components/List";
import PrivateRoute from "@/utils/PrivateRoute";
import styles from '@/styles/Padrao.module.scss';
import { getUsers } from "@/utils/getUsers";
import { GetServerSidePropsContext } from "next";
import { getPosts } from "@/utils/getPosts";
import { ParsedUrlQuery } from "querystring";
import Post from "@/components/Post";
import { useRouter } from "next/router";

export async function getServerSideProps(context: GetServerSidePropsContext<ParsedUrlQuery>) {
    const users = await getUsers()
    const posts = await getPosts()
    const list = users.slice(0, 3)
    const { params } = context;
    const post = params?.post
    const postPage = posts.find((posts: {id: string}) => posts.id === post)

    if (!postPage) {
        return {
          notFound: true,
        };
    }

    return {
        props: { 
            users: list,
            post: postPage
        }
    }
}

interface Props{
    username: string,
    imagem: string,
    text: string,
    perfilImageUrl: string,
    date: string,
    likes: number,
    id: string,
}

export default function PostPage({users, post} : {users: Array<{username: string, perfilImageUrl: string}>, post: Props}) {
    console.log(post)
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
                        <HeaderBack local={'Post'} style={{padding: '1.4rem 2rem'}}/>
                        <Post linkAtivo={false} name={post.username} username={post.username} foto={post.perfilImageUrl} imagem={post.imagem} text={post.text} date={post.date} totalLike={post.likes} id={post.id} />
                    </InfoPadrao>
                    <List listUsers={users}/>
                </div>
            </div>
        </PrivateRoute>
  );
}