import { FormEvent, useContext, useState } from "react";
import styles from './Login.module.scss'
import { auth } from "../../../../firebase";
import { signInWithEmailAndPassword } from "firebase/auth";
import Erro from "../Erro";
import { useRouter } from "next/router";
import { AiOutlineLoading3Quarters } from "react-icons/ai";

interface FormValues {
    emailLogin: string;
    passwordLogin: string;
}

export default function Cadastro({onClick}: {onClick: () => void}) {
    const route = useRouter()
    const [erro, setErro] = useState('')
    const [values, setValues] = useState<FormValues>({ emailLogin: '', passwordLogin: '' });
    const [load, setLoad] = useState(false)
  
    function handleChange(event: React.ChangeEvent<HTMLInputElement>) {
        const { name, value } = event.target;
        setValues((prevValues) => ({ ...prevValues, [name]: value }));
        setErro('')
    }

    async function signInWithEmailPassword(email: string, password: string) {
        try {
            setLoad(true)
            await signInWithEmailAndPassword(auth, email, password);
            route.push('/')
        } catch (error) {
            setErro('Algo deu errado!')
            setLoad(false)
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
                    <input id={'passwordLogin'} type={'password'} name={'passwordLogin'} autoComplete={"current-password"} value={values.passwordLogin} onChange={handleChange}/>
                </div>
                <button className={styles.button}>
                    {load ? <AiOutlineLoading3Quarters className={styles.load}/> : 'Login'}
                </button>
                {erro && <Erro>{erro}</Erro>}
                <div className={styles.link}>
                    <span onClick={onClick}>Não possui uma conta?</span>
                </div>
            </form>
        </div>
    )
}