import styles from './Links.module.scss'
import { useEffect, useRef, useState } from 'react'
import { BiHomeAlt2 } from 'react-icons/bi'
import { RiHashtag } from 'react-icons/ri'
import { RiNotification2Line } from 'react-icons/ri'
import { HiOutlineMail } from 'react-icons/hi'
import { HiOutlineEllipsisHorizontalCircle } from 'react-icons/hi2'
import { AiOutlineUser } from 'react-icons/ai'
import Route from './PaginaRouter'
import MoreComponent from './MoreComponent'

export default function Links() {
    const PopUpRef = useRef<HTMLDivElement>(null)
    const [ popUp, setPopUp ] = useState<boolean>()

    useEffect(() => {
        function handleClickOutside(event: MouseEvent) {
          if (PopUpRef.current && !PopUpRef.current.contains(event.target as Element)) {
            setPopUp(false);
          }
        }
        document.addEventListener('mousedown', handleClickOutside);
          return () => {
            document.removeEventListener('mousedown', handleClickOutside);
          };
    }, [PopUpRef]);

    function handleClick() {
        setPopUp(true)
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
            </div>
            <div ref={PopUpRef}>
                { popUp && <MoreComponent /> }
            </div>
        </nav>
        </>
    )
}