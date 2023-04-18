import styles from './MobileComponents.module.scss'
import AccountInfo from './AccountInfo'
import { useEffect, useRef, useState } from 'react'
import Foco from '../Foco'

export default function MobileComponents() {
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
            <img src={'/images/foto_perfil.jpg'} alt={'fotoPerfil'} className={styles.image} onClick={handleClick}/>
            <div ref={menuRef}>
                {menu && <AccountInfo evento={() => setMenu(false)}/>}
            </div>
            {menu && <Foco color={'rgb(0, 0, 0, .4)'}/>}
        </div>
    )
}