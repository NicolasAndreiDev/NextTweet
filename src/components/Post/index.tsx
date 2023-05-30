import { AiOutlineComment } from 'react-icons/ai';
import styles from './Post.module.scss';
import { useState, useContext, useEffect, useRef } from 'react';
import { TbHeart } from 'react-icons/tb';
import { TbShare2 } from 'react-icons/tb';
import { doc, getDoc, updateDoc } from 'firebase/firestore';
import { db } from '../../../firebase';
import Link from 'next/link';
import { UserContext } from '@/providers/UserProvider';
import UrlCopy from './UrlCopy.tsx';
import { HiEllipsisHorizontal } from 'react-icons/hi2';
import DeletePost from './DeletePost';
import Foco from '../Foco';

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

export default function Post({
    name, 
    username, 
    foto, 
    imagem, 
    userId, 
    text, 
    date, 
    totalLike, 
    id, 
    linkAtivo = true, 
} : Props) {
    const { user } = useContext(UserContext);
    const [ like, setLike ] = useState(false);
    const [ copyUrl, setCopyUrl ] = useState(false);
    const [ popUp, setPopUp] = useState(false);
    const [ notExists, setNotExists ] = useState(true);
    const PopUpRef = useRef<HTMLDivElement>(null)

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

    function handleCopyUrl(){
        navigator.clipboard.writeText(`https://next-tweet.vercel.app/${username}/${id}`);
    };

    function handleSetCopyUrl() {
        setCopyUrl(true);
        setTimeout(() => {
          setCopyUrl(false);
        }, 1500);
    }
      
    function handleClick() {
        setPopUp(prev => !prev)
    }

    return(
        <div className={styles.container} style={notExists ? {} : {display: 'none'}}>
            { linkAtivo ? <Link href={`${username}/${id}`} className={styles.link}>
                <div className={styles.link}></div>
            </Link> : ''}
            <div className={styles.linha}/>
            <div className={styles.post}>
                <Link href={`/${user?.username == username ? 'profile' : username }`} style={{maxHeight: '4.8rem', zIndex: '1'}}>
                    { foto ? <img src={foto} alt={username} className={styles.image}/> : <div className={styles.imageDefault}></div>}
                </Link>
                <div className={styles.infoPubli}>
                    <div className={styles.user}>
                        <div className={styles.topInfo}>
                            <span className={styles.name}>{name}</span>
                            <span className={styles.username}>@{username}</span>
                            <span>·</span>
                            <span>{date}</span>
                        </div>
                        <div className={styles.opcoes} >
                            {user?.userId === userId ? <HiEllipsisHorizontal className={styles.icon} onClick={handleClick}/> : ''}
                            <div ref={PopUpRef}>
                                {popUp && <DeletePost postId={id} setNotExists={setNotExists}/>}
                            </div>
                            {popUp && <Foco color='transparent'/> }
                        </div>
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
                        <div className={styles.social_icon} onClick={() => {handleLike(), updateLikesCount()}} >
                            <TbHeart className={styles.icon} style={like ? {fill: 'rgb(249, 24, 128)', color: 'rgb(249, 24, 128)'} : {}}/>
                            <span style={like ? {color: 'rgb(249, 24, 128)'} : {}}>{like ? totalLike += 1 : totalLike}</span>
                        </div>
                        <div className={styles.social_icon} onClick={() => {handleCopyUrl(), handleSetCopyUrl()}}>
                            <TbShare2 className={styles.icon}/>
                            { copyUrl && <UrlCopy />}
                        </div>
                    </div>
                </div>
            </div>
            <div className={styles.linha}/>
        </div>
    )
}