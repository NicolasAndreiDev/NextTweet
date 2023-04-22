import NextMessage from "..";
import styles from './NextMessagePopUp.module.scss'

export function NextMessagePopUp({foto, username, onClick} : {foto: string, username: string,onClick: () => void}) {
    return(
        <div className={styles.container}>
            <NextMessage style={{display: 'flex'}} onClick={onClick} foto={foto} username={username}/>
        </div>
    )
}