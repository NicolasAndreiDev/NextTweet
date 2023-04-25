import { useEffect, useRef, useState } from 'react'
import styles from './EditProfile.module.scss'
import EditProfilePopUp from './EditProfilePopUp'
import Foco from '@/components/Foco'

export default function EditProfile() {
    const PopUpRef = useRef<HTMLDivElement>(null)
    const [popUp, setPopUp] = useState(false)

    function handleClick() {
        setPopUp(prev => !prev)
    }

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

    return(
        <>
            <button className={styles.button} onClick={handleClick}>Edit Profile</button>
            <div ref={PopUpRef}>
                {popUp && <EditProfilePopUp evento={handleClick}/>}
            </div>
            {popUp && <Foco color={'rgb(0, 0, 0, .4)'}/>}
        </>
    )
}