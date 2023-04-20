import { useState } from "react";
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


export default function PostHome({ name }: { name?: string }) {
  const { foto } = useContext(UserContext);
  const [ focus, setFocus] = useState(false);
  const [ selectedImage, setSelectedImage ] = useState("");
  const [ showEmojiPicker, setShowEmojiPicker ] = useState(false);
  const [ selectEmoji, setSelectEmoji ] = useState(null)
  const [ content, setContent ] = useState('');

  const handleEmojiClick = () => {
    setShowEmojiPicker(!showEmojiPicker);
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
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

  const handleContentChange = (e: React.ChangeEvent<HTMLDivElement>) => {
    setContent(e.currentTarget.innerHTML);
  };

  const placeholder = 'What\'s happening?';

  return (
    <div className={name}>
      <div className={styles.post}>
        <Link href={"/profile"} className={styles.link}>
          {foto ? (
            <img src={foto} alt={"foto_perfil"} className={styles.image} />
          ) : (
            <div className={styles.imageDefault}></div>
          )}
        </Link>
        <div contentEditable={'true'} className={styles.box}>
          {selectedImage && <img contentEditable={'false'} src={selectedImage} alt={'imagemSelect'} className={styles.imageSelect} />}
        </div>
      </div>
      <div className={styles.newPost}>
        <hr />
        <div className={styles.infoPost}>
          <div className={styles.icones}>
            <label htmlFor={'fotos'} style={{height: '1.6rem'}}>
                <SlPicture className={styles.icon} />
            </label>
            <input id={'fotos'} type={'file'} style={{display: 'none'}} onChange={handleImageChange}/>
            <TbGif className={styles.icon} />
            <BsEmojiSmile className={styles.icon} onClick={handleEmojiClick} />
              {showEmojiPicker && 
              (<div style={{position: 'absolute', top: '25rem', height: '10rem', width: '10rem'}}>
                <Picker previewPosition={'none'} position={'bottom'} data={data} emojiSize={20} emojiButtonSize={30} theme={'light'} onEmojiSelect={console.log}/>
              </div>)}
          </div>
          <div>
            <NewPost className={styles.publicar}>New post</NewPost>
          </div>
        </div>
      </div>
    </div>
  );
}
