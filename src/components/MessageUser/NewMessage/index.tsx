import styles from './NewMessage.module.scss'
import { BsEmojiSmile } from "react-icons/bs";
import { SlPicture } from "react-icons/sl";
import { TbGif } from "react-icons/tb";
import { AiOutlineSend } from 'react-icons/ai'
import { useState } from 'react';

export default function NewMessage({setMessage, user}: {setMessage: (value: string) => void, user: string}) {
    const [value, setValue] = useState('')

    function handleChange(event: React.ChangeEvent<HTMLInputElement>) {
        setValue(event.target.value)
        setMessage(event.target.value)
    }

    return(
        <div className={styles.containerNew}>
            <div className={styles.linha}></div>
            <div className={styles.container}>
                <div className={styles.newMessage}>
                    <SlPicture className={styles.icon}/>
                    <TbGif className={styles.icon}/>
                    <BsEmojiSmile className={styles.icon}/>
                    <input type="text" placeholder="Start a new message" className={styles.input} value={value}  onChange={handleChange}/>
                    <button className={styles.button}>
                        <AiOutlineSend className={styles.icon}/>
                    </button>
                </div>
            </div>
        </div>
    )
}