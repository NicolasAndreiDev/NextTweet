import styles from './NewText.module.scss';
import { TbGif } from 'react-icons/tb';
import { SlPicture } from "react-icons/sl";
import { BsEmojiSmile } from 'react-icons/bs';
import GifPicker from 'gif-picker-react';
import Picker from '@emoji-mart/react'
import data from '@emoji-mart/data'
import { useEffect, useRef, useState } from 'react';

export default function NewText({setSelectedEmoji, setSelectedImage}: {setSelectedEmoji: (value: string[]) => void, setSelectedImage: (value: string) => void}) {
    const [ showEmojiPicker, setShowEmojiPicker ] = useState(false);
    const [ showGif, setShowGif ] = useState(false)
    const PopUpRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        function handleClickOutside(event: MouseEvent) {
          if (PopUpRef.current && !PopUpRef.current.contains(event.target as Element)) {
            setShowEmojiPicker(false);
            setShowGif(false);
          }
        }
        document.addEventListener('mousedown', handleClickOutside);
          return () => {
            document.removeEventListener('mousedown', handleClickOutside);
          };
      }, [PopUpRef]);
    

    function handleImageChange(e: React.ChangeEvent<HTMLInputElement>) {
        if (e.target.files && e.target.files.length > 0) {
            const reader = new FileReader();
            reader.onload = (event) => {
              if (event.target) {
                setSelectedImage(event.target.result as string);
              }
            };
            reader.readAsDataURL(e.target.files[0]);
          }
    };

    function handleEmojiClick(){
      setShowEmojiPicker(!showEmojiPicker)
      setShowGif(false)
    };
    
    function handleGif(){
      setShowGif(!showGif)
      setShowEmojiPicker(false)
    };

    function handleEmojiSelect(emoji: any){
        setSelectedEmoji(emoji.native);
    };

    return (
        <div className={styles.icones}>
            <div className={styles.boxImage}>
                <label htmlFor={'fotos'} style={{ height: '1.6rem' }}>
                    <SlPicture className={styles.icon} />
                </label>
                <input id={'fotos'} type={'file'} style={{ display: 'none' }} onChange={handleImageChange} />
            </div>
            <div className={styles.boxIcon}>
                <TbGif className={styles.icon} onClick={handleGif} />
                <div className={styles.newPosition}>
                    {showGif && <GifPicker tenorApiKey={"AIzaSyC7s5VYl9fGswdBnsWCzvZSJ6grcroXVSg"} onGifClick={(item: any) => setSelectedImage(item.url)} />}
                </div>
            </div>
            <div className={styles.boxIcon}>
                <BsEmojiSmile className={styles.icon} onClick={handleEmojiClick} />
                <div className={styles.newPosition} >
                    {showEmojiPicker && <Picker previewPosition={'none'} position={'bottom'} data={data} emojiSize={20} emojiButtonSize={30} theme={'light'} onEmojiSelect={handleEmojiSelect} />}
                </div>
            </div>
        </div>
    )
}