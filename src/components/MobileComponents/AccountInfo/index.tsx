import Link from 'next/link'
import styles from './AccountInfo.module.scss'
import { IoClose } from 'react-icons/io5'
import { AiOutlineUser, AiOutlineUserAdd } from 'react-icons/ai'
import { BiLogOutCircle } from 'react-icons/bi'
import { MdKeyboardArrowDown } from 'react-icons/md'
import { useState } from 'react'
import SettingsMob from '../SettingsMob'
import { CgComment } from 'react-icons/cg'
import { RiFileList2Line } from 'react-icons/ri'

export default function AccountInfo({evento}: {evento: () => void}) {
    const [settings, setSettings] = useState<boolean>()
    const num = 0
 
    function handleClick() {
        setSettings(prev => !prev)
    }

    return(
        <div className={styles.container}>
            <div className={styles.top}>
                <span className={styles.title}>Account info</span>
                <IoClose onClick={evento} className={styles.icon}/>
            </div>
            <div className={styles.userInfo}>
                <Link href={'/profile'} className={styles.home}>
                    <img src={'/images/foto_perfil.jpg'} alt={'userFoto'} className={styles.foto}/>
                </Link>
                <div>
                    <span className={styles.name}>Nicolas</span>
                    <span className={styles.username}>@Nicolas_AS</span>
                </div>
                <div className={styles.seguidores}>
                    <Link href={'/'} className={styles.flwing}>
                        <span>{num}</span> 
                        <span>Following</span>
                    </Link>
                    <Link href={'/'} className={styles.flwers}>
                        <span>{num}</span> 
                        <span>Followers</span>
                    </Link>
                </div>
            </div>
            <Link href={'/profile'} className={styles.link}>
                <AiOutlineUser className={styles.icon}/>
                <span>Profile</span>
            </Link>
            <button className={styles.button}>
                <CgComment className={styles.icon}/>
                <span>Topics</span>
            </button>
            <button className={styles.button}>
                <RiFileList2Line className={styles.icon}/>
                <span>List</span>
            </button>
            <button className={styles.button}>
                <AiOutlineUserAdd className={styles.icon}/>
                <span>Add an exist account</span>
            </button>
            <button className={styles.buttonLogout}>
                <BiLogOutCircle className={styles.icon}/>
                <span>Logout</span>
            </button>
            <div className={styles.linha}></div>
            <button className={styles.settings} onClick={handleClick}>
                <span>Settings and Support</span>
                <MdKeyboardArrowDown className={styles.icon} style={settings ? {rotate: ('-180deg')} : {}}/>
                { settings && <SettingsMob />}
            </button>
        </div>
    )
}