import Link from 'next/link'
import styles from './AccountInfo.module.scss'
import { IoClose } from 'react-icons/io5'

export default function AccountInfo({evento}: {evento: () => void}) {
    return(
        <div className={styles.container}>
            <div className={styles.top}>
                <span className={styles.title}>Account info</span>
                <IoClose onClick={evento} className={styles.icon}/>
            </div>
            <div className={styles.userInfo}>
                <Link href={'/profile'}>
                    <img src={'/images/foto_perfil.jpg'} alt={'userFoto'} className={styles.foto}/>
                </Link>
                <span>Nicolas</span>
                <span>@Nicolas_AS</span>
                <div>
                    <span>0 Following</span>
                    <span>0 Followers</span>
                </div>
            </div>
        </div>
    )
}