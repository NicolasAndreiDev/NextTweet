import styles from './ConfigUser.module.scss'
import Conta from './Conta'
import Links from './Links'
import { RiQuillPenLine } from 'react-icons/ri'
import PopUpPost from './PopUpPost'
import { useEffect, useRef, useState } from 'react'
import Foco from '../Foco'


export default function ConfigUser() {
    const [popUp, setPopUp] = useState(false);
    const PopUpRef = useRef<HTMLDivElement>(null)

    useEffect(() => {
        function handleClickOutside(event: MouseEvent) {
          if (PopUpRef.current && !PopUpRef.current.contains(event.target as Element)) {
            setPopUp(false);
          }
        }
        document.addEventListener('mousedown', handleClickOutside);
          return () => {
            document.removeEventListener('mousedown', handleClickOutside);
          };
    }, [PopUpRef]);

    function handleClick() {
        setPopUp(prev => !prev)
    }

    return(
        <>
        <header className={styles.container}>
            <div className={styles.fixedHeader}>
                <Links />
                <button className={styles.post} onClick={handleClick}>
                    <span className={styles.New}>New post</span>
                    <RiQuillPenLine className={styles.icon}/> 
                </button>
                <div className={styles.fixedUser}>
                    <Conta />
                </div>
            </div>
        </header>
        <div ref={PopUpRef}>
            {popUp && <PopUpPost handleClose={handleClick}/>}
        </div>
        {popUp && <Foco color='rgba(0,0,0, 0.4)'/>}
        </>
    )
}