import { AiOutlineComment } from 'react-icons/ai'
import styles from './Post.module.scss'
import { useState } from 'react'
import { TbHeart } from 'react-icons/tb'
import { TbShare2 } from 'react-icons/tb'
import { doc, setDoc } from 'firebase/firestore'
import { db } from '../../../firebase'
import Link from 'next/link'

interface Props{
    name: string,
    username: string,
    date: string,
    foto?: string,
    imagem?: string,
    totalLike: number,
    text: string,
    id: string,
    linkAtivo?: boolean
}

export default function Post({name, username, foto, imagem, text, date, totalLike, id, linkAtivo = true} : Props) {
    const [ like, setLike ] = useState(false)
    
    async function updateLikesCount(likes: number) {
        const postDocRef = doc(db, 'posts');
        await setDoc(postDocRef, { likes: likes }, { merge: true });
    }

    function handleLike() {
        setLike(prev => !prev)
    }

    return(
        <div className={styles.container}>
            { linkAtivo ? <Link href={`${username}/${id}`} className={styles.link}>
                <div className={styles.link}></div>
            </Link> : ''}
            <div className={styles.linha}/>
            <div className={styles.post}>
                <Link href={`/${username}`} style={{maxHeight: '4.8rem', zIndex: '1'}}>
                    { foto ? <img src={foto} alt={'users'} className={styles.image}/> : <div className={styles.imageDefault}></div>}
                </Link>
                <div className={styles.infoPubli}>
                    <div className={styles.user}>
                        <span className={styles.name}>{name}</span>
                        <span className={styles.username}>@{username}</span>
                        <span>·</span>
                        <span>{date}</span>
                    </div>
                    { linkAtivo ? <Link href={`${username}/${id}`} className={styles.newPubli}>
                        <div className={styles.publi}>
                            <p>{text}</p>
                            { imagem ? <img src={imagem} alt={'postImage'} className={styles.fotoPubli}/> : '' }
                        </div>
                    </Link> :  <div className={styles.publi}> <p>{text}</p> { imagem ? <img src={imagem} alt={'postImage'} className={styles.fotoPubli}/> : '' } </div>}
                    <div className={styles.social}>
                            <div className={styles.social_icon}>
                                { linkAtivo ? <Link href={`${username}/${id}`} className={styles.newLink}>
                                    <AiOutlineComment className={styles.icon}/>
                                    <span>1</span>
                                </Link> : <> <AiOutlineComment className={styles.icon}/> <span>1</span> </>}
                            </div>
                        <div className={styles.social_icon} onClick={() => {handleLike(), updateLikesCount}}>
                            <TbHeart className={styles.icon} style={like ? {fill: 'rgb(249, 24, 128)', color: 'rgb(249, 24, 128)'} : {}}/>
                            <span style={like ? {color: 'rgb(249, 24, 128)'} : {}}>{like ? + 1 : totalLike}</span>
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