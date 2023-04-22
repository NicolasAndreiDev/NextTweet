import { AiOutlineComment } from 'react-icons/ai'
import styles from './Post.module.scss'
import { useState, useContext } from 'react'
import { TbHeart } from 'react-icons/tb'
import { TbShare2 } from 'react-icons/tb'
import { doc, getDoc, updateDoc } from 'firebase/firestore'
import { db } from '../../../firebase'
import Link from 'next/link'
import { UserContext } from '@/providers/UserProvider'

interface Props{
    name: string,
    username: string,
    date: string,
    foto?: string,
    imagem?: string,
    totalLike: number,
    text: string,
    id: string,
    linkAtivo?: boolean,
    userId: string,
}

export default function Post({name, username, foto, imagem, userId, text, date, totalLike, id, linkAtivo = true} : Props) {
    const { user } = useContext(UserContext)
    const [ like, setLike ] = useState(false)

    async function updateLikesCount() {
        const userDocRef = doc(db, 'users', userId);
        const userDoc = await getDoc(userDocRef);
        
        if (userDoc.exists()) {
          const posts = userDoc.data().posts;
          const postIndex = posts.findIndex((post: {id: string}) => post.id === id);
      
          if (postIndex !== -1) {
            const updatedPosts = [...posts];
            if(totalLike == 1) {
                updatedPosts[postIndex] = {...updatedPosts[postIndex], likes: like ? null : totalLike + 1};
            } else {
                updatedPosts[postIndex] = {...updatedPosts[postIndex], likes: like ? totalLike - 1 : totalLike + 1};
            }
            await updateDoc(userDocRef, { posts: updatedPosts });
          }
        }
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
                    { foto ? <img src={foto} alt={username} className={styles.image}/> : <div className={styles.imageDefault}></div>}
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
                    </Link> :  <div className={styles.publi}> <p>{text}</p> { imagem ? <img src={imagem} alt={'postImage'} className={styles.fotoPubli} /> : '' } </div>}
                    <div className={styles.social}>
                            <div className={styles.social_icon}>
                                { linkAtivo ? <Link href={`${username}/${id}`} className={styles.newLink}>
                                    <AiOutlineComment className={styles.icon}/>
                                    <span>1</span>
                                </Link> : <> <AiOutlineComment className={styles.icon}/> <span>1</span> </>}
                            </div>
                        <div className={styles.social_icon} onClick={() => {handleLike(), updateLikesCount()}}>
                            <TbHeart className={styles.icon} style={like ? {fill: 'rgb(249, 24, 128)', color: 'rgb(249, 24, 128)'} : {}}/>
                            <span style={like ? {color: 'rgb(249, 24, 128)'} : {}}>{like ? totalLike += 1 : totalLike}</span>
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