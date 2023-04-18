import { FormEvent, useState } from "react";
import styles from './Cadastro.module.scss';
import { auth } from "../../../../firebase";
import { createUserWithEmailAndPassword} from "firebase/auth";
import Erro from "../Erro";

export default function Cadastro({onClick}: {onClick: () => void}) {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [erro, setErro] = useState('')

    async function createUser(email: string, password: string) {
        try {
            const userCredential = await createUserWithEmailAndPassword(auth, email, password);
            const user = userCredential.user;
            console.log(`User with email ${user?.email} signed up successfully!`);
        } catch (error) {
            console.error("Error signing up:", error);
            setErro('Algo deu errado!')
        }
    }

    function handleSubmit(event: FormEvent) {
        event.preventDefault();
        createUser(email, password);
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
                    <label htmlFor={'emailCadastro'}>E-mail</label>
                    <input id={'emailCadastro'} type={'email'} autoComplete='off' value={email} onChange={handleEmailChange} />
                </div>
                <div className={styles.value}>
                    <label htmlFor={'passwordCadastro'}>Password</label>
                    <input id={'passwordCadastro'} type={'password'} value={password} onChange={handlePasswordChange} />
                </div>
                <div className={styles.value}>
                    <label htmlFor={'confirmPasswordCadastro'}>Confirm Password</label>
                    <input id={'confirmPasswordCadastro'} type={'password'} />
                </div>
                <button className={styles.button}>Cadastro</button>
                {erro && <Erro>{erro}</Erro>}
                <div className={styles.link}>
                    <span onClick={onClick}>Já possui uma conta?</span>
                </div>
            </form>
        </div>
    )
}
