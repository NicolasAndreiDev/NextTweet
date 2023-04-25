import styles from './Conta.module.scss';
import { HiEllipsisHorizontal } from 'react-icons/hi2';
import { useState, useEffect, useRef } from 'react';
import PopUp from './PopUp';
import { useContext } from 'react';
import { UserContext } from '@/providers/UserProvider';

export default function Conta() {
    const { user } = useContext(UserContext)
    const [conta, setConta] = useState<boolean>()
    const PopUpRef = useRef<HTMLDivElement>(null)

    useEffect(() => {
        function handleClickOutside(event: MouseEvent) {
          if (PopUpRef.current && !PopUpRef.current.contains(event.target as Element)) {
            setConta(false);
          }
        }
        document.addEventListener('mousedown', handleClickOutside);
          return () => {
            document.removeEventListener('mousedown', handleClickOutside);
          };
    }, [PopUpRef]);

    function handleClick() {
        setConta(prev => !prev)
    }

    return(
        <>
            <div className={styles.conta} onClick={handleClick}>
                <div className={styles.conta__user}>
                    { user?.perfilImageUrl ? <img src={user.perfilImageUrl} alt={'foto_perfil'} className={styles.imagem}/> : <div className={styles.imagemDefault}></div>}
                    <div className={styles.user}>
                        <span>{user?.username}</span>
                        <span>@{user?.username}</span>
                    </div>
                </div>
                <HiEllipsisHorizontal className={styles.icon}/>
            </div>
            <div ref={PopUpRef}>
                {conta && <PopUp />}
            </div>
        </>
    )
}