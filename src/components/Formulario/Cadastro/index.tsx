import Form from "../Form";
import styles from './Cadastro.module.scss'

export default function Cadastro({onClick}: {onClick: () => void}) {
    return(
        <div className={styles.form}>
            <Form onClick={onClick} link={'cadastro'} text={'Já possui uma conta?'}>
                <label>Confirm Password</label>
                <input type={'password'} />
            </Form>
        </div>
    )
}