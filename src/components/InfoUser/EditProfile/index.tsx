import { useState } from 'react'
import styles from './EditProfile.module.scss'
import EditProfilePopUp from './EditProfilePopUp'
import Foco from '@/components/Foco'

export default function EditProfile() {
    const [popUp, setPopUp] = useState(false)

    function handleClick() {
        setPopUp(prev => !prev)
    }

    return(
        <>
            <button className={styles.button} onClick={handleClick}>Edit Profile</button>
            {popUp && <EditProfilePopUp evento={handleClick}/>}
            {popUp && <Foco color={'rgb(0, 0, 0, .4)'}/>}
        </>
    )
}