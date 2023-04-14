import styles from './Conta.module.scss'
import { HiEllipsisHorizontal } from 'react-icons/hi2'

export default function Conta() {
    return(
        <div className={styles.conta}>
            <div className={styles.conta__user}>
                <img src={'/images/foto_perfil.jpg'} alt={'foto_perfil'} className={styles.imagem}/>
                <div className={styles.user}>
                    <span>Nicolas</span>
                    <span>@Nicolas_AS</span>
                </div>
            </div>
            <HiEllipsisHorizontal className={styles.icon}/>
        </div>
    )
}