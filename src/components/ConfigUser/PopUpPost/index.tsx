import { IoClose } from 'react-icons/io5';
import { UserContext } from '@/providers/UserProvider';
import { useContext, useState } from 'react';
import styles from './PopUpPost.module.scss';
import NewText from '@/components/NewText';

export default function PopUpPost({ handleClose }: { handleClose: () => void }) {
    const { user } = useContext(UserContext);
    const [inputValue, setInputValue] = useState('');
    const [selectedImage, setSelectedImage] = useState("");
    const [selectEmoji, setSelectEmoji] = useState<string[]>([]);

    function handleEmojiSelect(emoji: any){
        const newInputValue = inputValue + emoji;
        setInputValue(newInputValue);
        setSelectEmoji([...selectEmoji, emoji]);
    };

    function handleChange(event: React.ChangeEvent<HTMLTextAreaElement>) {
        setInputValue(event.target.value);
        event.target.style.height = "auto";
        event.target.style.height = `${event.target.scrollHeight}px`;
    };

    return (
        <div className={styles.popUp}>
            <IoClose className={styles.icon} onClick={handleClose} />
            <img src={`${user?.perfilImageUrl}`} className={styles.fotoPerfil} />
            <div className={styles.box}>
                <textarea className={styles.boxText} placeholder={"What's happening?"} value={inputValue} onChange={handleChange} />
                {selectedImage ? <img src={selectedImage} className={styles.boxImage}/> : ''}
            </div>
            <NewText setSelectedEmoji={handleEmojiSelect} setSelectedImage={setSelectedImage} />
        </div>
    )
}