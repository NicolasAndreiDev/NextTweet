import styles from './MoreComponent.module.scss'
import { RiFileList2Line } from 'react-icons/ri'
import { CgComment } from 'react-icons/cg'

export default function MoreComponent() {
    return(
        <div className={styles.moreComponent}>
            <button className={styles.button}>
                <CgComment className={styles.icon}/>
                <span className={styles.type}>Topics</span>
            </button>
            <button className={styles.button}>
                <RiFileList2Line className={styles.icon}/>
                <span className={styles.type}>Lists</span>
            </button>
            <div className={styles.linha}></div>
            <button className={styles.button}>Settings and Support</button>
        </div>
    )
}