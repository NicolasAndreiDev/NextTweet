import styles from './FotoPerfil.module.scss'

export default function FotoPerfil() {
    return(
        <div>
            <img src={'/images/foto_perfil.jpg'} className={styles.fotoPerfil} />
        </div>
    )
}