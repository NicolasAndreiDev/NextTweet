import styles from '@/styles/Padrao.module.scss'
import ConfigUser from "@/components/ConfigUser";
import List from "@/components/List";
import Post from '@/components/InfoUser/Post';
import FotoPerfil from '@/components/InfoUser/FotoPerfil';
import Banner from '@/components/InfoUser/Banner';
import Informacoes from '@/components/InfoUser/Informacoes';
import InfoPadrao from '@/components/InfoPadrao';
import Search from '@/components/Search';
import HeaderBack from '@/components/HeaderBack';

export default function Profile() {
    return(
        <div className={styles.container}>
            <ConfigUser />
            <div className={styles.direita}>
                <InfoPadrao>
                    <HeaderBack local={'Nicolas'} posts={'3 posts'}/>
                    <Banner>
                        <FotoPerfil/>
                    </Banner>
                    <Informacoes />
                    <div>
                        <Post />
                        <Post />
                        <Post />
                    </div>
                </InfoPadrao>
                <List>
                    <Search />
                </List>
            </div>
        </div>
    )
}