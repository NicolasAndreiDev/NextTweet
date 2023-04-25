import styles from './FotoPerfil.module.scss'

export default function FotoPerfil({foto} : {foto?: string | null}) {

    return(
        <div>
            {foto ? <img src={foto} className={styles.fotoPerfil} /> : <div className={styles.fotoDefault}></div>}
        </div>
    )
}