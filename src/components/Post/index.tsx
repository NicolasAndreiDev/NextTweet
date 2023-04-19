import { AiOutlineComment } from 'react-icons/ai'
import styles from './Post.module.scss'
import { useState } from 'react'
import { TbHeart } from 'react-icons/tb'
import { TbShare2 } from 'react-icons/tb'

interface Props{
    name: string | null,
    username: string | null,
    foto: string | null,
    imagem?: string,
}

export default function Post({name, username, foto, imagem} : Props) {
    const [like, setLike] = useState(false)
    const [totalLike, setTotalLike] = useState(4072)

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
                { foto ? <img src={foto} alt={'users'} className={styles.image}/> : <div className={styles.imageDefault}></div>}
                <div className={styles.infoPubli}>
                    <div className={styles.user}>
                        <span className={styles.name}>{name}</span>
                        <span className={styles.username}>{username}</span>
                        <span>·</span>
                        <span>Fev 4</span>
                    </div>
                    <div className={styles.publi}>
                        <p>Even after the 4th viewing The Super Mario Bros. Movie is still wonderful. What an endearing film 😊 #TheSuperMarioBrosMovie</p>
                        <img src={imagem} alt={'postImage'} className={styles.fotoPubli}/>
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