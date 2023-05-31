import NextMessage from "..";
import styles from './NextMessagePopUp.module.scss'

export function NextMessagePopUp({foto, username, userId, onClick} : {foto: string, username: string,onClick: () => void, userId: string}) {
    return(
        <div className={styles.container}>
            <NextMessage style={{display: 'flex'}} onClick={onClick} foto={foto} username={username} userId={userId}/>
        </div>
    )
}