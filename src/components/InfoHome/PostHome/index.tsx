import styles from './PostoHome.module.scss'
import { SlPicture } from 'react-icons/sl'
import { TbGif } from 'react-icons/tb'
import { BsEmojiSmile } from 'react-icons/bs'
import NewPost from '@/components/NewPost'
import Link from 'next/link'

export default function PostHome() {
    return(
        <>
            <div className={styles.post}>
                <Link href={'/profile'}>
                    <img src={'/images/foto_perfil.jpg'} alt={'foto_perfil'} className={styles.image}/>
                </Link>
                <input placeholder={`What's happening?`} className={styles.input}></input>
            </div>
            <div className={styles.newPost}>
                <hr/>
                <div className={styles.infoPost}>
                    <div className={styles.icones}>
                        <SlPicture className={styles.icon}/>
                        <TbGif className={styles.icon}/>
                        <BsEmojiSmile className={styles.icon}/>
                    </div>
                    <div>
                        <NewPost className={styles.publicar}/>
                    </div>
                </div>
            </div>
        </>
    )
}