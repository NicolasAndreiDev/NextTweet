import { FormEvent, useState } from "react";
import styles from './Login.module.scss'
import { auth } from "../../../../firebase";
import { signInWithEmailAndPassword } from "firebase/auth";
import Erro from "../Erro";

export default function Cadastro({onClick}: {onClick: () => void}) {
    const [emailValue, setEmail] = useState('')
    const [passwordValue, setPassword] = useState('')
    const [erro, setErro] = useState('')

    async function signInWithEmailPassword(email: string, password: string) {
        try {
          const userCredential = await signInWithEmailAndPassword(auth, email, password);
          const user = userCredential.user;
          console.log(`User with email ${user?.email} signed in successfully!`);
        } catch (error) {
          console.error("Error signing in:", error);
          setErro('Algo deu errado!')
        }
    }

    function handleSubmit(event: FormEvent){
        event.preventDefault()
        signInWithEmailPassword(emailValue, passwordValue)
    }
    
    function handleEmailChange(event: React.ChangeEvent<HTMLInputElement>) {
        setEmail(event.target.value);
        setErro('')
    }

    function handlePasswordChange(event: React.ChangeEvent<HTMLInputElement>) {
        setPassword(event.target.value);
        setErro('')
    }

    return(
        <div className={styles.container}>
            <form className={styles.form} onSubmit={handleSubmit}>
                <div className={styles.value}>
                    <label htmlFor={'emailLogin'}>E-mail</label>
                    <input id={'emailLogin'} type={'email'} autoComplete='off' onChange={handleEmailChange}/>
                </div>
                <div className={styles.value}>
                    <label htmlFor={'passwordLogin'}>Password</label>
                    <input id={'passwordLogin'} type={'password'} onChange={handlePasswordChange}/>
                </div>
                <button className={styles.button}>Login</button>
                {erro && <Erro>{erro}</Erro>}
                <div className={styles.link}>
                    <span onClick={onClick}>Não possui uma conta?</span>
                </div>
            </form>
        </div>
    )
}