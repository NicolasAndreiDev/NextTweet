import styles from './FormularioLogin.module.scss'
import Cadastro from "./Cadastro";
import Login from "./Login";
import { useState } from 'react';

export default function FormularioLogin() {
    const [move, setMove] = useState(false)

    function handleClick() {
        setMove(prev => !prev)
    }

    return(
        <div className={styles.autenticacao}>
            <div className={styles.divisor} style={move ? {transform: 'translateX(100%)'} : {transform: 'translateX(0)'}}>
                <img src={'/images/logoBranca.png'} alt={'logo'} className={styles.image}/>
            </div>
            {move ? <Cadastro onClick={handleClick}/> : <Login onClick={handleClick}/>}
            <div className={styles.divisorMob}>
                <img src={'/images/logoBranca.png'} alt={'logo'} className={styles.image}/>
            </div>
        </div>
    )
}