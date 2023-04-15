import styles from './MoreComponent.module.scss'
import { RiFileList2Line } from 'react-icons/ri'
import { CgComment } from 'react-icons/cg'
import { MdKeyboardArrowDown } from 'react-icons/md'
import { useState } from 'react'
import Settings from '../Settings'


export default function MoreComponent() {
    const [settings, setSettings] = useState<boolean>()
    
    function handleClick() {
        setSettings(prev => !prev)
    }

    return(
        <div className={styles.moreComponent} style={settings ? {borderRadius: '2rem 2rem 0 0'} : {}}>
            <button className={styles.button}>
                <CgComment className={styles.icon}/>
                <span className={styles.type}>Topics</span>
            </button>
            <button className={styles.button}>
                <RiFileList2Line className={styles.icon}/>
                <span className={styles.type}>Lists</span>
            </button>
            <div className={styles.linha}></div>
            <button className={styles.button} onClick={handleClick} style={settings ? {borderRadius: '0'} : {}}>
                <span>Settings and Support</span>
                <MdKeyboardArrowDown className={styles.arrow} style={settings ? {rotate: ('-180deg')} : {}}/>
            </button>
            { settings && <Settings/> }
        </div>
    )
}