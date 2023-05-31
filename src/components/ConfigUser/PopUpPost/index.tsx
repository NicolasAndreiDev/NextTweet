import { IoClose } from 'react-icons/io5';
import { UserContext } from '@/providers/UserProvider';
import { useContext, useState } from 'react';
import styles from './PopUpPost.module.scss';
import NewText from '@/components/NewText';
import NewPost from '@/components/NewPost';
import { UserPostContext } from '@/providers/UserPostProvider';

export default function PopUpPost({ handleClose, onClick }: { handleClose: () => void, onClick: () => void }) {
    const { user } = useContext(UserContext);
    const { loader } = useContext(UserPostContext);
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

    function handleClick() {
        setInputValue('')
        setSelectedImage('')
    }

    return (
        <div className={styles.popUp}>
            { loader ? 
            <div className={styles.loader}>
                <div className={styles.load}></div>
            </div> : ''
            }
            <IoClose className={styles.icon} onClick={handleClose} />
            <div className={styles.user}>
                { user?.perfilImageUrl ? <img src={`${user?.perfilImageUrl}`} className={styles.fotoPerfil} /> : <div className={styles.imageDefault}></div>}
                <div className={styles.box}>
                    <textarea className={styles.box} placeholder={"What's happening?"} value={inputValue} onChange={handleChange}  rows={1} maxLength={300} />
                    {selectedImage && 
                    <div className={styles.selectImage}>
                        <IoClose className={styles.iconImage} onClick={() => setSelectedImage('')}/>
                        <img src={selectedImage} className={styles.boxImage}/>
                    </div>}
                </div>
            </div>
            <div className={styles.linha}></div>
            <div className={styles.bottom}>
                <NewText setSelectedEmoji={handleEmojiSelect} setSelectedImage={setSelectedImage} />
                <NewPost className={styles.button} imagem={selectedImage} onClick={() => {handleClick(), onClick()}} text={inputValue}>New Post</NewPost>
            </div>
        </div>
    )
}