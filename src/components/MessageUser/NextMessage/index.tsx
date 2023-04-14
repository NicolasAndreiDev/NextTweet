import Messages from '../Messages'
import NewMessage from '../NewMessage'
import styles from './NextMessage.module.scss'
import { AiOutlineInfoCircle } from 'react-icons/ai'

export default function NextMessage() {
    return(
        <div className={styles.containerNext}>
            <div className={styles.infoUser}>
                <div className={styles.user}>
                    <img src={'/images/luigi.jpg'} alt={'users'} className={styles.imagemMenor}/>
                    <span className={styles.nome}>Luigi</span>
                </div>
                <button className={styles.button}>
                    <AiOutlineInfoCircle className={styles.icon}/>
                </button>
            </div>
            <div className={styles.linha}></div>
            <div className={styles.messages}>
                <Messages />
            </div>
            <NewMessage />
        </div>
    )
}