import styles from './Banner.module.scss'
import { UserContext } from '@/providers/userProvider'
import { useContext } from 'react'

export default function Banner({children}: {children: React.ReactNode}) {
    const {banner} = useContext(UserContext)

    return(
        <div className={styles.bannerDiv}>
            {banner ? <img src={banner} alt={'Banner'} className={styles.banner}/> : <div className={styles.bannerDefault}></div>}
            {children}
        </div>
    )
}