import styles from './Banner.module.scss'

export default function Banner({children}: {children: React.ReactNode}) {
    return(
        <div className={styles.bannerDiv}>
            <img src={'/images/banner.jpg'} alt={'Banner'} className={styles.banner}/>
            {children}
        </div>
    )
}