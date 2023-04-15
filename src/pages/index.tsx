import ConfigUser from '@/components/ConfigUser'
import InfoHome from '@/components/InfoHome'
import InfoPadrao from '@/components/InfoPadrao'
import Post from '@/components/InfoUser/Post'
import List from '@/components/List'
import Search from '@/components/Search'
import styles from '@/styles/Padrao.module.scss'

export default function Home() {
  return (
    <div className={styles.container}>
      <ConfigUser />
      <div className={styles.direita}>
        <InfoPadrao>
          <InfoHome />
          <div className={styles.posts}>
            <Post />
            <Post />
            <Post />
          </div>
        </InfoPadrao>
        <List />
      </div>
    </div>
  )
}
