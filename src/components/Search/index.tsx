import styles from './Search.module.scss'
import { FiSearch } from 'react-icons/fi'

export default function Search({...props}) {
    return(
        <form className={styles.pesquisa} {...props}>
            <label htmlFor='pesquisa'>
                <FiSearch className={styles.icon}/>
            </label>
            <input id='pesquisa' type="text" autoComplete='off' placeholder='Serch'/>
        </form>
    )
}