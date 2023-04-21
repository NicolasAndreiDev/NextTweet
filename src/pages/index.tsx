import ConfigUser from '@/components/ConfigUser'
import InfoHome from '@/components/InfoHome'
import InfoPadrao from '@/components/InfoPadrao'
import List from '@/components/List'
import Post from '@/components/Post'
import styles from '@/styles/Padrao.module.scss'
import PrivateRoute from '@/utils/PrivateRoute'
import { getPosts } from '@/utils/getPosts'
import { getUsers } from '@/utils/getUsers'

export async function getServerSideProps() {
  const users = await getUsers()
  const usersPost = await getPosts()
  const list = users.slice(0, 3)

  return {
    props: { users: list, usersPost }
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

export default function Home({users, usersPost} : {users: Array<{username: string, perfilImageUrl: string}>, usersPost: Array<Props>}) {
  return (
    <PrivateRoute>
      <div className={styles.container}>
        <ConfigUser />
        <div className={styles.direita}>
          <InfoPadrao>
            <InfoHome />
            {usersPost.map((post: any) => {
              return(
                <Post key={post.id} id={post.id} username={post.username} name={post.username} imagem={post.imagem} text={post.text} foto={post.perfilImageUrl} date={post.date} totalLike={post.likes}/>
              )
            })}
          </InfoPadrao>
          <List listUsers={users}/>
        </div>
      </div>
    </PrivateRoute>
  )
}
