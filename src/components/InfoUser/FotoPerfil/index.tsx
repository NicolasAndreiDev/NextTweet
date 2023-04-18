import styles from './FotoPerfil.module.scss'

export default function FotoPerfil({foto} : {foto: string}) {
    return(
        <div>
            <img src={foto} className={styles.fotoPerfil} />
        </div>
    )
}