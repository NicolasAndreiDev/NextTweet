import { useContext, useState } from 'react';
import styles from './Comments.module.scss';
import { UserContext } from '@/providers/UserProvider';
import { IoClose } from 'react-icons/io5';
import NewText from '@/components/NewText';
import { UserPostContext } from '@/providers/UserPostProvider';
import NewComment from '@/components/NewComment';

type CommmetsProps = {
    perfilImageUrl?: string,
    text?: string,
    imagem?: string,
    username: string,
    userId: string,
    name: string,
    date: string,
    id: string,
    handleClose: () => void
}

export default function Comments({ perfilImageUrl, text, imagem, username, name, userId, id, date, handleClose }: CommmetsProps) {
    const { user } = useContext(UserContext);
    const { loader } = useContext(UserPostContext);
    const [inputValue, setInputValue] = useState('');
    const [selectedImages, setSelectedImages] = useState("");
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
        setSelectedImages('')
    }

    return (
        <div className={styles.newComment}>
            <IoClose className={styles.icon} onClick={handleClose} />
            <div className={styles.userPost}>
                <div className={styles.userLinha}>
                    <img src={perfilImageUrl} className={styles.postFoto} />
                    <div className={styles.linha1}></div>
                </div>
                <div className={styles.userInfo}>
                    <div className={styles.userInfoDados}>
                        <span className={styles.name}>{name}</span>
                        <span className={styles.username}>@{username}</span>
                        <span className={styles.date}>·</span>
                        <span className={styles.date}>{date}</span>
                    </div>
                    <div>
                        <p className={styles.text}>{text} {imagem}</p>
                    </div>
                    <span className={styles.replyUser}>Reply to @{username}</span>
                </div>
            </div>
            <div className={styles.box}>
                <div className={styles.boxUserImage}>{user?.perfilImageUrl ? <img src={user?.perfilImageUrl} className={styles.fotoUser} /> : <div className={styles.imagemDefault}></div>}</div>
                <textarea placeholder={'Post your reply!'} className={styles.boxText} value={inputValue} onChange={handleChange} rows={1} maxLength={300}/>
                {selectedImages ? <img src={selectedImages}/> : ''}
            </div>
            <div className={styles.linha}></div>
            <div className={styles.bottom}>
                <NewText setSelectedEmoji={handleEmojiSelect} setSelectedImage={setSelectedImages}/>
                <NewComment id={id} text={inputValue} selectedImage={selectedImages} className={styles.reply} onClick={handleClick} userId={userId}/>
            </div>
        </div>
    )
}