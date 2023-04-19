import styles from './Banner.module.scss'

export default function Banner({children, bannerImage}: {children: React.ReactNode, bannerImage?: string | null}) {

    return(
        <div className={styles.bannerDiv}>
            {bannerImage ? <img src={bannerImage} alt={'Banner'} className={styles.banner}/> : <div className={styles.bannerDefault}></div>}
            {children}
        </div>
    )
}