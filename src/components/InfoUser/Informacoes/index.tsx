import styles from './Informacoes.module.scss'
import { MdOutlineDateRange } from "react-icons/md";

export default function Informacoes() {
    return(
        <>
            <div className={styles.infoUser}>
                <span className={styles.nome}>Nicolas</span>
                <span className={styles.username}>@Nicolas_AS</span>
            </div>
            <div className={styles.ingresso}>
                <MdOutlineDateRange className={styles.icon}/>
                <p>ingressou em fevereiro de 2023</p>
            </div>
            <div className={styles.social}>
                <div>
                    <div className={styles.number}>
                        <span>369</span>
                        <span>Seguindo</span>
                    </div>
                </div>
                <div>
                    <div className={styles.number}>
                        <span>550</span>
                        <span>Seguidores</span>
                    </div>
                </div>
            </div>
        </>
    )
}