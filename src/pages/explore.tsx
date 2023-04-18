import ConfigUser from '@/components/ConfigUser'
import ExploreComponent from '@/components/ExploreComponent'
import HeaderPadrao from '@/components/HeaderPadrao'
import InfoPadrao from '@/components/InfoPadrao'
import Post from '@/components/Post'
import List from '@/components/List'
import Search from '@/components/Search'
import styles from '@/styles/Padrao.module.scss'
import PrivateRoute from '@/utils/PrivateRoute'

export default function Explore() {
    return(
        <PrivateRoute>
            <div className={styles.container}>
                <ConfigUser />
                <div className={styles.direita}>
                <InfoPadrao>
                    <ExploreComponent />
                </InfoPadrao>
                </div>
                <List search={false}/>
            </div>
        </PrivateRoute>
    )
}