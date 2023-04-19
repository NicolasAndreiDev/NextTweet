import styles from './Informacoes.module.scss'
import { MdOutlineDateRange } from "react-icons/md";
import { UserContext } from '@/providers/userProvider';
import { useContext } from 'react'

export default function Informacoes() {
    const { user } = useContext(UserContext)

    return(
        <>
            <div className={styles.infoUser}>
                <span className={styles.nome}>{user}</span>
                <span className={styles.username}>@{user}</span>
            </div>
            <div className={styles.ingresso}>
                <MdOutlineDateRange className={styles.icon}/>
                <p>ingressou em fevereiro de 2023</p>
            </div>
            <div className={styles.social}>
                <div>
                    <div className={styles.number}>
                        <span>0</span>
                        <span>Seguindo</span>
                    </div>
                </div>
                <div>
                    <div className={styles.number}>
                        <span>0</span>
                        <span>Seguidores</span>
                    </div>
                </div>
            </div>
        </>
    )
}