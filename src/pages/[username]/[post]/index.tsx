import ConfigUser from "@/components/ConfigUser";
import HeaderBack from "@/components/HeaderBack";
import InfoPadrao from "@/components/InfoPadrao";
import List from "@/components/List";
import PrivateRoute from "@/utils/PrivateRoute";
import styles from '@/styles/Padrao.module.scss';
import { GetServerSidePropsContext } from "next";
import { getPosts } from "@/utils/getPosts";
import { ParsedUrlQuery } from "querystring";
import Post from "@/components/Post";
import { useContext } from 'react';
import { UserListContext } from "@/providers/UserListProvider";
import { useRouter } from "next/router";

export async function getServerSideProps(context: GetServerSidePropsContext<ParsedUrlQuery>) {
    const posts = await getPosts()
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
    userId: string,
    comments: [{}]
}

export default function PostPage({ post } : { post: Props }) {
    const { usersList } = useContext(UserListContext)
    const ThreeUsers = usersList.slice(0, 3)
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
                        <Post linkAtivo={false} userId={post.userId} name={post.username} username={post.username} foto={post.perfilImageUrl} imagem={post.imagem} text={post.text} date={post.date} totalLike={post.likes} id={post.id} comments={post.comments?.length}/>
                        {post.comments.map((comment: any) => {
                            return(
                                <Post id={comment.id} userId={post.userId} name={comment.name} username={comment.username} foto={comment.perfilImageUrl} imagem={comment.imagem} text={comment.text} date={comment.date} totalLike={comment.likes} />
                            )
                        })}
                    </InfoPadrao>
                    <List listUsers={ThreeUsers}/>
                </div>
            </div>
        </PrivateRoute>
  );
}