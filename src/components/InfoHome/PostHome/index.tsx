import { useState } from "react";
import NewPost from "@/components/NewPost";
import Link from "next/link";
import { UserContext } from "@/providers/UserProvider";
import { useContext } from "react";
import styles from "./PostoHome.module.scss";
import { IoClose } from "react-icons/io5";
import NewText from "@/components/NewText";

export default function PostHome({ name }: { name?: string }) {
  const { user } = useContext(UserContext);
  const [ selectedImage, setSelectedImage ] = useState("");
  const [ inputValue, setInputValue ] = useState("");
  const [ selectEmoji, setSelectEmoji ] = useState<string[]>([])

  function handleEmojiSelect(emoji: any){
    const newInputValue = inputValue + emoji;
    setInputValue(newInputValue);
    setSelectEmoji([...selectEmoji, emoji]);
  };

  function handleChange(event: React.ChangeEvent<HTMLTextAreaElement>){
    setInputValue(event.target.value);
    event.target.style.height = "auto";
    event.target.style.height = `${event.target.scrollHeight}px`;
  };

  function handleClick() {
    setSelectedImage('')
    setInputValue('')
  }

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
          <NewText setSelectedEmoji={handleEmojiSelect} setSelectedImage={setSelectedImage}/>
          <div>
            <NewPost className={styles.publicar} imagem={selectedImage} text={inputValue} onClick={handleClick}>New post</NewPost>
          </div>
        </div>
      </div>
    </div>
  );
}
