import { use, useEffect, useRef, useState } from "react";
import { SlPicture } from "react-icons/sl";
import { TbGif } from "react-icons/tb";
import { BsEmojiSmile } from "react-icons/bs";
import NewPost from "@/components/NewPost";
import Link from "next/link";
import { UserContext } from "@/providers/userProvider";
import { useContext } from "react";
import styles from "./PostoHome.module.scss";
import data from '@emoji-mart/data'
import Picker from '@emoji-mart/react'
import GifPicker from 'gif-picker-react';
import { IoClose } from "react-icons/io5";

export default function PostHome({ name }: { name?: string }) {
  const PopUpRef = useRef<HTMLDivElement>(null)
  const { user } = useContext(UserContext);
  const [ selectedImage, setSelectedImage ] = useState("");
  const [ showEmojiPicker, setShowEmojiPicker ] = useState(false);
  const [ inputValue, setInputValue ] = useState("");
  const [ selectEmoji, setSelectEmoji ] = useState<string[]>([])
  const [ showGif, setShowGif ] = useState(false)

  function handleEmojiClick(){
    setShowEmojiPicker(!showEmojiPicker);
  };

  function handleGif(){
    setShowGif(!showGif)
  }

  function handleEmojiSelect(emoji: any){
    const newInputValue = inputValue + emoji.native;
    setInputValue(newInputValue);
    setSelectEmoji([...selectEmoji, emoji.native]);
  };

  function handleImageChange(e: React.ChangeEvent<HTMLInputElement>){
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

  function handleChange(event: React.ChangeEvent<HTMLTextAreaElement>){
    setInputValue(event.target.value);
    event.target.style.height = "auto";
    event.target.style.height = `${event.target.scrollHeight}px`;
  };

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

  return (
    <div className={name}>
      <div className={styles.post}>
        <Link href={"/profile"} className={styles.link}>
          {user?.perfilImageUrl ? (
            <img src={user.perfilImageUrl} alt={"foto_perfil"} className={styles.image} />
          ) : (
            <div className={styles.imageDefault}></div>
          )}
        </Link>
        <div className={styles.box}>
          <textarea className={styles.box} rows={1} maxLength={300} value={inputValue} onChange={handleChange} placeholder={`What's happening?`}/>
          {selectedImage && 
          <div className={styles.newImage}>
            <IoClose className={styles.icon} onClick={() => setSelectedImage('')}/>
            <img src={selectedImage} alt={'imagemSelect'} className={styles.imageSelect}/>
          </div>
          }
        </div>
      </div>
      <div className={styles.newPost}>
        <hr />
        <div className={styles.infoPost}>
          <div className={styles.icones}>
            <div className={styles.boxImage}>
              <label htmlFor={'fotos'} style={{height: '1.6rem'}}>
                  <SlPicture className={styles.icon} />
              </label>
              <input id={'fotos'} type={'file'} style={{display: 'none'}} onChange={handleImageChange}/>
            </div>
            <div className={styles.boxIcon}>
              <TbGif className={styles.icon} onClick={handleGif}/>
              <div className={styles.newPosition}>
                { showGif && <GifPicker tenorApiKey={"AIzaSyC7s5VYl9fGswdBnsWCzvZSJ6grcroXVSg"} onGifClick={(item: any) => setSelectedImage(item.url)}/>}
              </div>
            </div>
            <div className={styles.boxIcon}>
              <BsEmojiSmile className={styles.icon} onClick={handleEmojiClick} />
              <div className={styles.newPosition} >
                {showEmojiPicker && <Picker previewPosition={'none'} position={'bottom'} data={data} emojiSize={20} emojiButtonSize={30} theme={'light'} onEmojiSelect={handleEmojiSelect}/>}
              </div>
            </div>
          </div>
          <div>
            <NewPost className={styles.publicar} imagem={selectedImage} text={inputValue}>New post</NewPost>
          </div>
        </div>
      </div>
    </div>
  );
}
