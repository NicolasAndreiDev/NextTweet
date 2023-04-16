import { FiSearch } from 'react-icons/fi'
import styles from './LinksMobile.module.scss'
import Route from "@/components/PaginaRouter"
import { HiOutlineMail } from 'react-icons/hi'
import { RiNotification2Line } from 'react-icons/ri'
import { BiHomeAlt2 } from 'react-icons/bi'

export default function LinksMobile() {
    return(
        <div className={styles.links}>
            <div className={styles.linha}></div>
            <Route location={'/'}>
                <BiHomeAlt2 className={styles.icon}/>
            </Route>
            <Route location={'/explore'}>
                <FiSearch className={styles.icon}/>
            </Route>
            <Route location={'/notifications'}>
                <RiNotification2Line className={styles.icon}/>
            </Route>
            <Route location={'/messages'}>
                <HiOutlineMail className={styles.icon}/> 
            </Route>
        </div>
    )
}