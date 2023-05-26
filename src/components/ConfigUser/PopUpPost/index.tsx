import { IoClose } from 'react-icons/io5';
import { UserContext } from '@/providers/UserProvider';
import { useContext } from 'react';
import styles from './PopUpPost.module.scss';

export default function PopUpPost({handleClose}: {handleClose: () => void}) {
    const {user} = useContext(UserContext);

    return(
        <div className={styles.popUp}>
            <IoClose className={styles.icon} onClick={handleClose}/>
            <img src={`${user?.perfilImageUrl}`} className={styles.fotoPerfil} />
        </div>
    )
}