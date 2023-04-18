import styles from '@/styles/Padrao.module.scss'
import ConfigUser from "@/components/ConfigUser";
import List from "@/components/List";
import Post from '@/components/Post';
import FotoPerfil from '@/components/InfoUser/FotoPerfil';
import Banner from '@/components/InfoUser/Banner';
import Informacoes from '@/components/InfoUser/Informacoes';
import InfoPadrao from '@/components/InfoPadrao';
import HeaderBack from '@/components/HeaderBack';
import EditProfile from '@/components/InfoUser/EditProfile';
import PrivateRoute from '@/utils/PrivateRoute';

export default function Profile() {
    return(
        <PrivateRoute>
            <div className={styles.container}>
                <ConfigUser />
                <div className={styles.direita}>
                    <InfoPadrao>
                        <HeaderBack local={'Nicolas'} posts={'3 posts'}/>
                        <Banner>
                            <FotoPerfil foto={'/images/foto_perfil.jpg'}/>
                        </Banner>
                        <EditProfile />
                        <Informacoes />
                        <div>
                        <Post name={'Nicolas'} username={'Nicolas_AS'} foto={'/images/foto_perfil.jpg'} imagem={'/images/banner.jpg'}/>
                        <Post name={'Nicolas'} username={'Nicolas_AS'} foto={'/images/foto_perfil.jpg'} imagem={'/images/banner.jpg'}/>
                        <Post name={'Nicolas'} username={'Nicolas_AS'} foto={'/images/foto_perfil.jpg'} imagem={'/images/banner.jpg'}/>
                        </div>
                    </InfoPadrao>
                    <List />
                </div>
            </div>
        </PrivateRoute>
    )
}