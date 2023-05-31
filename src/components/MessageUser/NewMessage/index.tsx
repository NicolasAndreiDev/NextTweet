import styles from './NewMessage.module.scss'
import { AiOutlineSend } from 'react-icons/ai'
import { useContext, useState } from 'react';
import NewText from '@/components/NewText';
import { ref, update, push, child } from 'firebase/database';
import { database } from '../../../../firebase';
import { UserContext } from '@/providers/UserProvider';

export default function NewMessage({ userId }: { userId: string }) {
    const { user } = useContext(UserContext)
    const [value, setValue] = useState('');
    const [selectEmoji, setSelectEmoji] = useState<string[]>([]);
    const [selectedImage, setSelectedImage] = useState('');

    function handleEmojiSelect(emoji: any) {
        const newInputValue = value + emoji;
        setValue(newInputValue);
        setSelectEmoji([...selectEmoji, emoji]);
    };

    function handleChange(event: React.ChangeEvent<HTMLTextAreaElement>) {
        event.target.style.height = "auto";
        event.target.style.height = `${event.target.scrollHeight}px`;
        setValue(event.target.value)
    }

    function handleClick() {
        if (user?.userId) {
          const senderRef = ref(database, 'users/' + user.userId);
          const messageData = {
            text: value,
            image: selectedImage,
          };
      
          const senderMessageRef = push(child(senderRef, 'messages'), messageData);
          const messageId = senderMessageRef.key;
      
          if (messageId) {
            const updates: { [key: string]: any } = {};
            updates['/users/' + user.userId + '/messages/' + messageId] = {
              ...messageData,
              id: messageId,
              sender: user.userId,
              recipient: userId,
            };
            updates['/users/' + userId + '/messages/' + messageId] = {
              ...messageData,
              id: messageId,
              sender: user.userId,
              recipient: userId,
            };
      
            update(ref(database), updates);
          }
      
          setSelectedImage('');
          setValue('');
        }
      }
      

    return (
        <div className={styles.containerNew}>
            <div className={styles.linha}></div>
            <div className={styles.container}>
                <div className={styles.newMessage}>
                    <NewText setSelectedEmoji={handleEmojiSelect} setSelectedImage={setSelectedImage} />
                    <div className={styles.box}>
                        <textarea placeholder={"Start a new message"} rows={1} maxLength={300} className={styles.boxText} value={value} onChange={handleChange} />
                        {selectedImage ? <img src={selectedImage} className={styles.boxImage} /> : ''}
                    </div>
                    <button className={styles.button} onClick={handleClick}>
                        <AiOutlineSend className={styles.icon} />
                    </button>
                </div>
            </div>
        </div>
    )
}