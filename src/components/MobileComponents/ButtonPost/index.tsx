import PostHome from '@/components/InfoHome/PostHome';
import styles from './ButtonPost.module.scss'
import { RiQuillPenLine } from "react-icons/ri";
import { useState } from 'react';
import { BiArrowBack } from 'react-icons/bi'

export default function ButtonPost() {
    const [popUp, setPopUp] = useState(false)

    function handleClick() {
        setPopUp(prev => !prev)
    }

    return(
        <>
            <button className={styles.button} onClick={handleClick}>
                <RiQuillPenLine className={styles.icon}/>
            </button>
            { popUp && 
            <div className={styles.popUp}>
                <BiArrowBack onClick={handleClick} className={styles.arrow}/>
                <PostHome/>
            </div>}
        </>
    )
}