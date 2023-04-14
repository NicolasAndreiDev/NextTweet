import { HiEllipsisHorizontal } from 'react-icons/hi2'
import styles from './UserMessage.module.scss'

interface UserMessageProps{
    foto: string,
    name: string,
    username: string,
}

export default function UserMessage({foto, name, username}: UserMessageProps) {
    return(
        <div className={styles.container}>
            <div className={styles.containerUserMessage}>
                <img src={foto} alt={'users'} className={styles.imagem}/>
                <span className={styles.nome}>{name}</span>
                <span className={styles.username}>@{username}</span>
            </div>
            <HiEllipsisHorizontal className={styles.icon}/>
        </div>
    )
}