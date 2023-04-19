import { FormEvent, useState } from "react";
import styles from './Cadastro.module.scss';
import { auth, db } from "../../../../firebase";
import { createUserWithEmailAndPassword} from "firebase/auth";
import Erro from "../Erro";
import { useRouter } from "next/router";
import { AiOutlineLoading3Quarters } from "react-icons/ai";
import { doc, setDoc } from "firebase/firestore";

interface FormValues {
    emailCadastro: string,
    username: string,
    passwordCadastro: string,
    confirmPassword: string,
}

export default function Cadastro({onClick}: {onClick: () => void}) {
    const route = useRouter()
    const [erro, setErro] = useState('')
    const [values, setValues] = useState<FormValues>({emailCadastro: '', username: '', passwordCadastro: '', confirmPassword: ''})
    const [load, setLoad] = useState(false)

    async function createUser(email: string, password: string) {

        if(values.emailCadastro.length == 0 || values.username.length == 0 || values.passwordCadastro.length == 0 || values.confirmPassword.length == 0) {
            return setErro('Preencha todos os campos!')
        }
        
        if(values.passwordCadastro.length <= 5){
            return setErro('A senha deve ter pelo menos 6 caracteres!')
        }

        if(values.passwordCadastro !== values.confirmPassword){
            return setErro('As senhas são diferentes!')
        } 

        try {
            setLoad(true);
            const { user } = await createUserWithEmailAndPassword(auth, email, password);
            await setDoc(doc(db, "users", user.uid), {email: values.emailCadastro, username: values.username});
            route.push('/')
        } catch (error) {
            console.log(error)
            setErro('Algo deu errado!')
            setLoad(false)
        }
    }

    function handleChange(event: React.ChangeEvent<HTMLInputElement>) {
        const { name, value } = event.target;
        setValues((prevValues) => ({ ...prevValues, [name]: value }));
        setErro('')
    }

    function handleSubmit(event: FormEvent) {
        event.preventDefault();
        createUser(values.emailCadastro, values.passwordCadastro);
    }

    return(
        <div className={styles.container}>
            <form className={styles.form} onSubmit={handleSubmit}>
                <div className={styles.value}>
                    <label htmlFor={'emailCadastro'}>E-mail</label>
                    <input id={'emailCadastro'} type={'email'} autoComplete='off' name={'emailCadastro'} value={values.emailCadastro} onChange={handleChange} />
                </div>
                <div className={styles.value}>
                    <label htmlFor={'usernameCadastro'}>Username</label>
                    <input id={'usernameCadastro'} type={'text'} autoComplete='off' name={'username'} value={values.username} onChange={handleChange}/>
                </div>
                <div className={styles.value}>
                    <label htmlFor={'passwordCadastro'}>Password</label>
                    <input id={'passwordCadastro'} type={'password'} name={'passwordCadastro'} value={values.passwordCadastro} onChange={handleChange} />
                </div>
                <div className={styles.value}>
                    <label htmlFor={'confirmPasswordCadastro'}>Confirm Password</label>
                    <input id={'confirmPasswordCadastro'} type={'password'} name={'confirmPassword'} value={values.confirmPassword} onChange={handleChange}/>
                </div>
                <button className={styles.button}>
                    {load ? <AiOutlineLoading3Quarters className={styles.load}/> : 'Cadastro'}
                </button>
                {erro && <Erro>{erro}</Erro>}
                <div className={styles.link}>
                    <span onClick={onClick}>Já possui uma conta?</span>
                </div>
            </form>
        </div>
    )
}
