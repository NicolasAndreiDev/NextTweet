import { FormEvent, useState } from "react";
import styles from './Login.module.scss'
import { auth } from "../../../../firebase";
import { signInWithEmailAndPassword } from "firebase/auth";
import Erro from "../Erro";
import { useRouter } from "next/router";

interface FormValues {
    emailLogin: string;
    passwordLogin: string;
}

export default function Cadastro({onClick}: {onClick: () => void}) {
    const route = useRouter()
    const [erro, setErro] = useState('')
    const [values, setValues] = useState<FormValues>({ emailLogin: '', passwordLogin: '' });
  
    function handleChange(event: React.ChangeEvent<HTMLInputElement>) {
        const { name, value } = event.target;
        setValues((prevValues) => ({ ...prevValues, [name]: value }));
    }

    async function signInWithEmailPassword(email: string, password: string) {
        try {
          await signInWithEmailAndPassword(auth, email, password);
          route.push('/')
        } catch (error) {
          setErro('Algo deu errado!')
        }
    }

    function handleSubmit(event: FormEvent){
        event.preventDefault()
        signInWithEmailPassword(values.emailLogin, values.passwordLogin)
    }

    return(
        <div className={styles.container}>
            <form className={styles.form} onSubmit={handleSubmit}>
                <div className={styles.value}>
                    <label htmlFor={'emailLogin'}>E-mail</label>
                    <input id={'emailLogin'} type={'email'} value={values.emailLogin} name={'emailLogin'} autoComplete='off' onChange={handleChange}/>
                </div>
                <div className={styles.value}>
                    <label htmlFor={'passwordLogin'}>Password</label>
                    <input id={'passwordLogin'} type={'password'} name={'passwordLogin'} value={values.passwordLogin} onChange={handleChange}/>
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