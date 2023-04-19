import { useState } from "react";
import { SlPicture } from "react-icons/sl";
import { TbGif } from "react-icons/tb";
import { BsEmojiSmile } from "react-icons/bs";
import NewPost from "@/components/NewPost";
import Link from "next/link";
import { UserContext } from "@/providers/userProvider";
import { useContext } from "react";
import styles from "./PostoHome.module.scss";

export default function PostHome({ name }: { name?: string }) {
  const { foto } = useContext(UserContext);
  const [inputValue, setInputValue] = useState("");

  const handleChange = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
    setInputValue(event.target.value);
    event.target.style.height = "auto";
    event.target.style.height = `${event.target.scrollHeight}px`;
  };

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
        <textarea maxLength={280} rows={1} placeholder={`What's happening?`} className={styles.input} value={inputValue} onChange={handleChange} style={{height: '2rem'}} />
      </div>
      <div className={styles.newPost}>
        <hr />
        <div className={styles.infoPost}>
          <div className={styles.icones}>
            <label htmlFor={'fotos'} style={{height: '1.6rem'}}>
                <SlPicture className={styles.icon} />
            </label>
            <input id={'fotos'} type={'file'} style={{display: 'none'}}/>
            <TbGif className={styles.icon} />
            <BsEmojiSmile className={styles.icon} />
          </div>
          <div>
            <NewPost className={styles.publicar}>New post</NewPost>
          </div>
        </div>
      </div>
    </div>
  );
}
