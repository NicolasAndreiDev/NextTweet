import styles from '@/styles/Padrao.module.scss'
import ConfigUser from "@/components/ConfigUser";
import InfoPadrao from "@/components/InfoPadrao";
import List from '@/components/List';
import Search from '@/components/Search';
import NotificationsComponent from '@/components/NotificationsComponent';

export default function Notifications() {
    return(
        <div className={styles.container}>
            <ConfigUser />
            <div className={styles.direita}>
            <InfoPadrao>
                <NotificationsComponent />
            </InfoPadrao>
            </div>
            <List>
                <Search />
            </List>
        </div>
    )
}