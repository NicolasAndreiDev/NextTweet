import styles from './Settings.module.scss'
import { BsGear } from 'react-icons/bs'
import { HiOutlinePaintBrush } from 'react-icons/hi2'

export default function Settings() {
    return(
        <div className={styles.container}>
            <div className={styles.box}></div>
            <button className={styles.buttons}>
                <BsGear className={styles.icon}/>
                <span>Settings and privacy</span>
            </button>
            <button className={styles.buttons}>
                <HiOutlinePaintBrush className={styles.icon}/>
                <span>Display</span>
            </button>
        </div>
    )
}