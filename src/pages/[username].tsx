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
import { GetStaticPropsContext } from 'next';
import { ParsedUrlQuery } from 'querystring';

export async function getStaticProps(context: GetStaticPropsContext<ParsedUrlQuery>) {
    const users = await getUsers();
    const { params } = context;
    const username = params?.username;
  
    const user = users.find((user : {username: string}) => user.username === username);
  
    if (!user) {
      return {
        notFound: true,
      };
    }
  
    return {
      props: {
        user,
      },
    };
}
  
export async function getStaticPaths() {
    return {
      paths: [],
      fallback: true,
    };
}

export default function Username({user} : {user: {username: string, perfilImageUrl: string, bannerImageUrl: string}}) {
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
                    </InfoPadrao>
                    <List />
                </div>
            </div>
        </PrivateRoute>
  );
}