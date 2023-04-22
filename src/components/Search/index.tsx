import styles from './Search.module.scss'
import { FiSearch } from 'react-icons/fi'
import { useState, CSSProperties, useRef, useEffect  } from 'react'
import Dados from './Dados'

export default function Search({ DadosOn = true, style } : { DadosOn?: boolean, style?: CSSProperties}) {
    const [pesquisa, setPesquisa] = useState(false)
    const [value, setValue] = useState('')
    const DadosRef = useRef<HTMLDivElement>(null)

    useEffect(() => {
        function handleClickOutside(event: MouseEvent) {
          if (DadosRef.current && !DadosRef.current.contains(event.target as Element)) {
            setPesquisa(false);
          }
        }
        document.addEventListener('mousedown', handleClickOutside);
          return () => {
            document.removeEventListener('mousedown', handleClickOutside);
          };
    }, [DadosRef]);

    function mostrarDados() {
        setPesquisa(true)
    }

    function handleChange(event: React.ChangeEvent<HTMLInputElement>){
      setValue(event.target.value)
    }

    return(
        <>
            <div className={styles.pesquisa} style={style} onClick={mostrarDados}>
                <label htmlFor='pesquisa'>
                    <FiSearch className={styles.icon}/>
                </label>
                <input id='pesquisa' type="text" autoComplete='off' value={value} placeholder='Serch' onChange={handleChange}/>
            </div>
            <div ref={DadosRef}>
                { DadosOn && pesquisa && <Dados dados={value}/>}
            </div>
        </>
    )
}