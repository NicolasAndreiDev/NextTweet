import styles from './FotoPerfil.module.scss'
import { useContext } from 'react'
import { UserContext } from '@/providers/userProvider'

export default function FotoPerfil() {
    const { foto } = useContext(UserContext)

    return(
        <div>
            <img src={foto ? foto : ''} className={styles.fotoPerfil} />
        </div>
    )
}