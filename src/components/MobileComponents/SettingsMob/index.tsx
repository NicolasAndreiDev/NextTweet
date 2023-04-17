import { BsGear } from 'react-icons/bs'
import styles from './SettingsMob.module.scss'
import { HiOutlinePaintBrush } from 'react-icons/hi2'

export default function SettingsMob() {
    return(
        <div className={styles.settings}>
            <button className={styles.button}>
                <BsGear />
                <span>Settings and privacy</span>
            </button>
            <button className={styles.button}>
                <HiOutlinePaintBrush />
                <span>Display</span>
            </button>
        </div>
    )
}