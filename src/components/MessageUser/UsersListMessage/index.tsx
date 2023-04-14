import SearchMessage from '../SearchMessage';
import UserMessage from '../UserMessage';
import styles from './UsersListMessage.module.scss'
import HeaderPadrao from "@/components/HeaderPadrao";

export default function UsersListMessage() {
    return(
        <div className={styles.containerUser}>
            <HeaderPadrao>
                <div className={styles.message}>
                    <span>Messages</span>
                </div>
                <SearchMessage />
            </HeaderPadrao>
            <div className={styles.users}>
                <UserMessage foto={'/images/luigi.jpg'} username={'Luigi_Tweet'} name={'Luigi'}/>
                <UserMessage foto={'/images/donkeykong2.jpg'} username={'Donkey_Kong'} name={'Donkey Kong'}/>
                <UserMessage foto={'/images/Toad.jpg'} username={'Toad_Tweet'} name={'Toad'}/>
                <UserMessage foto={'/images/bowser2.png'} username={'Bowser_Star'} name={'Bowser'}/>
            </div>
        </div>
    )
}