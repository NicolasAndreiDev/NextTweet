import styles from './MobileComponents.module.scss'
import AccountInfo from './AccountInfo'
import { useEffect, useRef, useState, useContext } from 'react'
import Foco from '../Foco'
import { UserContext } from '@/providers/userProvider'

export default function MobileComponents() {
  const {foto} = useContext(UserContext)
    const menuRef = useRef<HTMLDivElement>(null)
    const [menu, setMenu] = useState<boolean>()
    
    useEffect(() => {
        function handleClickOutside(event: MouseEvent) {
          if (menuRef.current && !menuRef.current.contains(event.target as Element)) {
            setMenu(false);
          }
        }
        document.addEventListener('mousedown', handleClickOutside);
          return () => {
            document.removeEventListener('mousedown', handleClickOutside);
          };
      }, [menuRef]);

    function handleClick() {
        setMenu(true)
    }

    return(
        <div className={styles.menu}>
            { foto ? <img src={foto} alt={'fotoPerfil'} className={styles.image} onClick={handleClick}/> : <div className={styles.imageDefault} onClick={handleClick}></div>}
            <div ref={menuRef}>
                {menu && <AccountInfo evento={() => setMenu(false)}/>}
            </div>
            {menu && <Foco color={'rgb(0, 0, 0, .4)'}/>}
        </div>
    )
}