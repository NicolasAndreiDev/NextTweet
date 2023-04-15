import styles from './Links.module.scss'
import { useState } from 'react'
import { BiHomeAlt2 } from 'react-icons/bi'
import { RiHashtag } from 'react-icons/ri'
import { RiNotification2Line } from 'react-icons/ri'
import { HiOutlineMail } from 'react-icons/hi'
import { HiOutlineEllipsisHorizontalCircle } from 'react-icons/hi2'
import { AiOutlineUser } from 'react-icons/ai'
import Route from './PaginaRouter'
import MoreComponent from './MoreComponent'

export default function Links() {
    const [ popUp, setPopUp ] = useState<boolean>()

    function handleClick() {
        setPopUp(prev => !prev)
    }

    return(
        <>
        <div>
            <Route location={'/'} >
                <img src={'/images/logo.png'} alt={'Logo'} className={styles.logo}/>
            </Route>
        </div>
        <nav className={styles.nav}>
            <Route location={'/'}>
                <BiHomeAlt2 className={styles.icon}/>
                <span>Home</span>
            </Route>
            <Route location={'/explore'}>
                <RiHashtag className={styles.icon}/>
                <span>Explore</span>
            </Route>
            <Route location={'/notifications'}>
                <RiNotification2Line className={styles.icon}/>
                <span>Nofications</span>
            </Route>
            <Route location={'/messages'}>
                <HiOutlineMail className={styles.icon}/>
                <span>Messages</span>
            </Route>
            <Route location={'/profile'}>
                <AiOutlineUser className={styles.icon}/>
                <span>Profile</span>
            </Route>
            <div className={styles.more} onClick={handleClick}>
                <HiOutlineEllipsisHorizontalCircle className={styles.icon}/>
                <span>More</span>
                { popUp && <MoreComponent /> }
            </div>
        </nav>
        </>
    )
}