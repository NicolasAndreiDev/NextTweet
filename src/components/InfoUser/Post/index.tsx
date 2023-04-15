import { AiOutlineComment } from 'react-icons/ai'
import styles from './Post.module.scss'
import { useState } from 'react'
import { TbHeart } from 'react-icons/tb'
import { TbShare2 } from 'react-icons/tb'

export default function Post() {
    const [like, setLike] = useState(false)
    const [totalLike, setTotalLike] = useState<number>(4072)

    function handleLike() {
        setLike(prev => !prev)
        if(!like === false) {
            setTotalLike(prev => prev - 1)
        } else {
            setTotalLike(prev => prev + 1)
        }
    }

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
                        <div className={styles.social_icon} onClick={handleLike}>
                            <TbHeart className={styles.icon} style={like ? {fill: 'rgb(249, 24, 128)', color: 'rgb(249, 24, 128)'} : {}}/>
                            <span style={like ? {color: 'rgb(249, 24, 128)'} : {}}>{totalLike}</span>
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