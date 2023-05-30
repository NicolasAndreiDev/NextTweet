import styles from './NewMessage.module.scss'
import { BsEmojiSmile } from "react-icons/bs";
import { SlPicture } from "react-icons/sl";
import { TbGif } from "react-icons/tb";
import { AiOutlineSend } from 'react-icons/ai'
import { useState } from 'react';
import NewText from '@/components/NewText';

export default function NewMessage({setMessage, user}: {setMessage: (value: string) => void, user: string}) {
    const [ value, setValue ] = useState('');
    const [ selectEmoji, setSelectEmoji] = useState<string[]>([]);
    const [ selectedImage, setSelectedImage] = useState('');

    function handleEmojiSelect(emoji: any){
        const newInputValue = value + emoji;
        setValue(newInputValue);
        setSelectEmoji([...selectEmoji, emoji]);
      };

    function handleChange(event: React.ChangeEvent<HTMLTextAreaElement>) {
        event.target.style.height = "auto";
        event.target.style.height = `${event.target.scrollHeight}px`;
        setValue(event.target.value)
        setMessage(event.target.value)
    }

    function handleClick() {
        setSelectedImage('')
        setValue('')
    }

    return(
        <div className={styles.containerNew}>
            <div className={styles.linha}></div>
            <div className={styles.container}>
                <div className={styles.newMessage}>
                    <NewText setSelectedEmoji={handleEmojiSelect} setSelectedImage={setSelectedImage} />
                    <div className={styles.box}>
                        <textarea placeholder="Start a new message" className={styles.input} value={value} onChange={handleChange} />
                        {selectedImage ? <img src={selectedImage} className={styles.boxImage} /> : ''}
                    </div>
                    <button className={styles.button} onClick={handleClick}>
                        <AiOutlineSend className={styles.icon}/>
                    </button>
                </div>
            </div>
        </div>
    )
}