import styles from './HeaderBack.module.scss'
import { BiArrowBack } from 'react-icons/bi'
import { useRouter } from 'next/router'
import { CSSProperties } from 'react'

interface HeaderBackProps {
    local: string,
    posts?: string,
    style?: CSSProperties
}

export default function HeaderBack({local, posts, style}: HeaderBackProps) {
    const route = useRouter()

    function handleBack() {
        return route.back()
    }

    return(
        <div className={styles.voltar} style={style}>
            <BiArrowBack className={styles.icon} onClick={handleBack}/>
            <div className={styles.userPost}>
                <span className={styles.nome}>{local}</span>
                <span className={styles.posts}>{posts}</span>
            </div>
        </div>
    )
}