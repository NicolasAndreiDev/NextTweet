import ConfigUser from '@/components/ConfigUser'
import InfoHome from '@/components/InfoHome'
import InfoPadrao from '@/components/InfoPadrao'
import List from '@/components/List'
import Post from '@/components/Post'
import styles from '@/styles/Padrao.module.scss'
import PrivateRoute from '@/utils/PrivateRoute'
import { getPosts } from '@/utils/getPosts'
import { UserListContext } from '@/providers/UserListProvider'
import { useContext } from 'react'

export async function getServerSideProps() {
  const usersPost = await getPosts()

  return {
    props: { 
      usersPost 
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
}

export default function Home({usersPost} : {usersPost: Array<Props>}) {
  const { usersList } = useContext(UserListContext) 
  const ThreeUsers = usersList.slice(0, 3)
  return (
    <PrivateRoute>
      <div className={styles.container}>
        <ConfigUser />
        <div className={styles.direita}>
          <InfoPadrao>
            <InfoHome />
            {usersPost.map((post: any) => {
              return(
                <Post key={post.userId} userId={post.userId} id={post.id} username={post.username} name={post.username} imagem={post.imagem} text={post.text} foto={post.perfilImageUrl} date={post.date} totalLike={post.likes}/>
              )
            })}
          </InfoPadrao>
          <List listUsers={ThreeUsers}/>
        </div>
      </div>
    </PrivateRoute>
  )
}
