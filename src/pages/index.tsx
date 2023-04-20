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

export default function Home({users, usersPost} : {users: Array<{username: string, perfilImageUrl: string}>, usersPost: []}) {
  console.log(usersPost)

  return (
    <PrivateRoute>
      <div className={styles.container}>
        <ConfigUser />
        <div className={styles.direita}>
          <InfoPadrao>
            <InfoHome />
            {usersPost.map((post: any) => {
              return(
                <Post username={post.username} name={post.username} imagem={post.imagem} text={post.text} foto={post.perfilImageUrl}/>
              )
            })}
          </InfoPadrao>
          <List listUsers={users}/>
        </div>
      </div>
    </PrivateRoute>
  )
}
