import { getAuth, signOut } from 'firebase/auth';
import styles from './PopUp.module.scss';

export default function PopUp({...props}) {
    const auth = getAuth();

    function handleLogout(){
      signOut(auth);
    }

    return(
        <div className={styles.container} {...props}>
            <button className={styles.button}>Add an exist account</button>
            <button className={styles.button} onClick={handleLogout}>Logout</button>
            <div className={styles.decoration}></div>
        </div>
    )
}
