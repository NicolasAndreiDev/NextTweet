import { IoClose } from 'react-icons/io5'
import styles from './EditProfilePopUp.module.scss'
import { RiImageAddLine } from 'react-icons/ri'

export default function EditProfilePopUp({evento} : {evento: () => void}) {
    return(
        <div className={styles.container}>
            <div className={styles.top}>
                <div className={styles.esquerda}>
                    <IoClose onClick={evento} className={styles.icon}/>
                    <span className={styles.title}>Edit Profile</span>
                </div>
                <button className={styles.save}>Save</button>
            </div>
            <div className={styles.banner}>
                <label htmlFor={'bannerImage'} className={styles.bannerImage}>
                    <RiImageAddLine className={styles.icon}/>
                </label>
                <input id={'bannerImage'} type={'file'} className={styles.input} />
            </div>
            <div className={styles.photo}>
                <label htmlFor={'perfilImage'} className={styles.perfil}>
                    <RiImageAddLine className={styles.icon}/>
                </label>
                <input id={'perfilImage'} type={'file'} className={styles.input} />
            </div>
            <div className={styles.user}>
                <div className={styles.names}>
                    <label htmlFor={'name'} className={styles.text}>Name</label>
                    <input id={'name'} type={'text'} className={styles.input} autoComplete={'off'}/>
                </div>
                <div className={styles.names}>
                    <label htmlFor={'username'} className={styles.text}>Username</label>
                    <input id={'username'} type={'text'} className={styles.input} autoComplete={'off'}/>
                </div>
            </div>
        </div>
    )
}