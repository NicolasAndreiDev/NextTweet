import { AiOutlineComment } from 'react-icons/ai'
import styles from './Post.module.scss'
import { BiHeart } from 'react-icons/bi'
import { TbShare2 } from 'react-icons/tb'

export default function Post() {
    return(
        <div className={styles.container}>
            <div className={styles.linha}/>
            <div className={styles.post}>
                <img src={'/images/foto_perfil.jpg'} alt={'users'} className={styles.image}/>
                <div className={styles.infoPubli}>
                    <div className={styles.user}>
                        <span>Nicolas</span>
                        <span>@Nicolas_AS</span>
                        <span>·</span>
                        <span>Fev 4, 2023</span>
                    </div>
                    <div className={styles.publi}>
                        <p>Even after the 4th viewing The Super Mario Bros. Movie is still wonderful. What an endearing film 😊 #TheSuperMarioBrosMovie</p>
                        <img src={'/images/banner.jpg'} alt={'postImage'} className={styles.fotoPubli}/>
                    </div>
                    <div className={styles.social}>
                        <div className={styles.social_icon}>
                            <AiOutlineComment className={styles.icon}/>
                            <span>325</span>
                        </div>
                        <div className={styles.social_icon}>
                            <BiHeart className={styles.icon}/>
                            <span>4072</span>
                        </div>
                        <div className={styles.social_icon}>
                            <TbShare2 className={styles.icon}/>
                        </div>
                    </div>
                </div>
            </div>
            <div className={styles.linha}/>
        </div>
    )
}