import { FormEvent } from 'react';
import styles from './Form.module.scss'

interface Props{
    onClick: () => void,
    link: string,
    text: string,
    children?: React.ReactNode
}

export default function Form({onClick, link, children, text}: Props) {

    function handleSubmit(e: FormEvent<HTMLFormElement>) {
        e.preventDefault()
    }

    return(
        <div>
            <form className={styles.form} onSubmit={handleSubmit}>
                <div className={styles.value}>
                    <label htmlFor={'usernameLogin'}>Username</label>
                    <input id={'usernameLogin'} type={'text'} autoComplete='off'/>
                </div>
                <div className={styles.value}>
                    <label htmlFor={'passwordLogin'}>Password</label>
                    <input id={'passwordLogin'} type={'password'}/>
                </div>
                <div className={styles.value}>
                    {children}
                </div>
                <button className={styles.button}>{link}</button>
                <div className={styles.link}>
                    <span onClick={onClick}>{text}</span>
                </div>
            </form>
        </div>
    )
}