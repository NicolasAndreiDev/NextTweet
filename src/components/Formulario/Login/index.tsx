import Form from "../Form";
import styles from './Login.module.scss'

interface Props{
    onClick: () => void,
}

export default function Login({onClick}: Props) {
    return(
        <div className={styles.form}>
            <Form onClick={onClick} link={'login'} text={'Não possui uma conta?'} />
        </div>
    )
}