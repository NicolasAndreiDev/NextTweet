import LinksMobile from '@/components/MobileComponents/LinksMobile';
import SearchMessage from '../SearchMessage';
import UserMessage from '../UserMessage';
import styles from './UsersListMessage.module.scss'
import HeaderPadrao from "@/components/HeaderPadrao";
import MobileComponents from '@/components/MobileComponents';

export default function UsersListMessage() {
    return(
        <div className={styles.containerUser}>
            <div className={styles.linha}></div>
            <HeaderPadrao>
                <div className={styles.message}>
                    <MobileComponents />
                    <span>Messages</span>
                </div>
                <SearchMessage/>
            </HeaderPadrao>
            <div className={styles.users}>
                <UserMessage foto={'/images/luigi.jpg'} username={'Luigi_Tweet'} name={'Luigi'}/>
                <UserMessage foto={'/images/donkeykong2.jpg'} username={'Donkey_Kong'} name={'Donkey Kong'}/>
                <UserMessage foto={'/images/Toad.jpg'} username={'Toad_Tweet'} name={'Toad'}/>
                <div className={styles.espaco}></div>
            </div>
            <div className={styles.linha2}></div>
            <LinksMobile />
        </div>
    )
}