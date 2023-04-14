import { FiSearch } from 'react-icons/fi'
import styles from './SearchMessage.module.scss'

export default function SearchMessage() {
    return(
        <div className={styles.searchMessage}>
            <label htmlFor="serchMessage" className={styles.labelSearch}>
                <FiSearch className={styles.icon}/>
            </label>
            <input id="serchMessage" type="text" className={styles.inputTexto} placeholder='Search Direct Messages'/>
        </div>
    )
}