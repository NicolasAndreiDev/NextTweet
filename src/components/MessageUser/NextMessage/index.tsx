import { IoClose } from 'react-icons/io5'
import Messages from '../Messages'
import NewMessage from '../NewMessage'
import styles from './NextMessage.module.scss'
import { AiOutlineInfoCircle } from 'react-icons/ai'
import { CSSProperties, useState } from 'react'
import { useRouter } from 'next/router'

export default function NextMessage({style, foto, username, onClick}: {style?: CSSProperties, foto: string, username: string, onClick?: () => void}) {
    const route = useRouter()
    const [message, setMessage] = useState('')
    
    return(
        <>
        { username ? 
        <div className={styles.containerNext} style={style}>
            <div className={styles.infoUser}>
                <div className={styles.user}>
                    {foto ? <img src={foto} alt={'users'} className={styles.imagemMenor} onClick={() => route.push(`${username}`)}/> : <div className={styles.imagemDefault}></div>}
                    <span className={styles.nome}>{username}</span>
                </div>
                <button className={styles.button}>
                    <AiOutlineInfoCircle className={styles.icon}/>
                    <IoClose className={styles.icon} onClick={onClick}/>
                </button>
            </div>
            <div className={styles.linha}></div>
            <div className={styles.messages}>
                <Messages textoMe={message}/>
            </div>
            <NewMessage setMessage={(value: string) => setMessage(value)} user={username}/>
        </div> : 
        <div className={styles.containerNextMessage}>
            <h2>Select a message</h2>
        </div>
        }
        </>
    )
}