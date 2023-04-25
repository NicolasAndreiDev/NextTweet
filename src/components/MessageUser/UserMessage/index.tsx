import { HiEllipsisHorizontal } from 'react-icons/hi2'
import styles from './UserMessage.module.scss'

interface UserMessageProps{
    foto: string,
    name: string,
    username: string,
    onClick: () => void
}

export default function UserMessage({foto, name, username, onClick}: UserMessageProps) {
    return(
        <div className={styles.container} onClick={onClick}>
            <div className={styles.containerUserMessage}>
                { foto ? <img src={foto} alt={'users'} className={styles.imagem}/> : <div className={styles.defaultImage}></div>}
                <span className={styles.nome}>{name}</span>
                <span className={styles.username}>@{username}</span>
            </div>
            <HiEllipsisHorizontal className={styles.icon}/>
        </div>
    )
}