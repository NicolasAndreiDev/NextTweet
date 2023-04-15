import styles from './ListaPadrao.module.scss';
import { HiEllipsisHorizontal } from 'react-icons/hi2'

export default function ListaPadrao({lista, existe = true}: {lista: Array<{type:string ,title: string, posts: string}>, existe?: boolean}) {

    return(
        <>
            {lista.map(item => {
            return(
                <div className={styles.lista}>
                    <span className={styles.type}>{item.type}</span>
                    <span className={styles.title}>{item.title}</span>
                    <span className={styles.posts}>{item.posts}</span>
                    <HiEllipsisHorizontal className={styles.icon}/>
                </div>
            )
        })}
        { existe && <div className={styles.espaco}></div>}
        </>
    )
}