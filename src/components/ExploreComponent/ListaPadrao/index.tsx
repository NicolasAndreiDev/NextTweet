import styles from './ListaPadrao.module.scss';
import { HiEllipsisHorizontal } from 'react-icons/hi2'

export default function ListaPadrao({lista}: {lista: Array<{type:string ,title: string, posts: string}>}) {

    return(
        <>
            {lista.map((item, index) => {
            return(
                <div className={styles.lista} key={index}>
                    <span className={styles.type}>{item.type}</span>
                    <span className={styles.title}>{item.title}</span>
                    <span className={styles.posts}>{item.posts}</span>
                    <HiEllipsisHorizontal className={styles.icon}/>
                </div>
            )
        })}
        </>
    )
}