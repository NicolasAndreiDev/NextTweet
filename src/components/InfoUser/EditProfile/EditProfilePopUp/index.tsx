import { IoClose } from 'react-icons/io5'
import styles from './EditProfilePopUp.module.scss'
import { RiImageAddLine } from 'react-icons/ri'
import { getStorage, ref, uploadBytesResumable, getDownloadURL } from 'firebase/storage';
import { useEffect, useState } from 'react';
import { User, getAuth } from 'firebase/auth';

export default function EditProfilePopUp({evento} : {evento: () => void}) {
    const [perfilImage, setPerfilImage] = useState<File | null>(null);
    const [photoStyle, setPhotoStyle] = useState({});
    const [bannerImage, setBannerImage] = useState<File | null>(null);
    const [bannerStyle, setBannerStyle] = useState({});
    const [user, setUser] = useState<User | null>();

    useEffect(() => {
      const auth = getAuth();
      const unsubscribe = auth.onAuthStateChanged((user) => {
        setUser(user);
    });
  
      return unsubscribe;
    }, []);
    
    const handlePerfilImageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        event.target.files instanceof FileList ? setPerfilImage(event.target.files[0]) : null;

        const fileReader = new FileReader();
        fileReader.onload = () => {
        setPhotoStyle({ backgroundImage: `url(${fileReader.result})` });
        };
        event.target.files instanceof FileList ? fileReader.readAsDataURL(event.target.files[0]) : null;
    };
  
    const handleBannerImageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        event.target.files instanceof FileList ? setBannerImage(event.target.files[0]) : null;
      
        const fileReader = new FileReader();
        fileReader.onload = () => {
          setBannerStyle({ backgroundImage: `url(${fileReader.result})` });
        };
        event.target.files instanceof FileList ? fileReader.readAsDataURL(event.target.files[0]) : null;
    };

    const handleSave = async () => {
        if (!perfilImage && !bannerImage) {
          return;
        }

        const storage = getStorage();
        const userRef = ref(storage, `users/${user?.uid}`);

        if (perfilImage) {
          const perfilImageRef = ref(userRef, 'perfilImage');
          const perfilUploadTask = uploadBytesResumable(perfilImageRef, perfilImage);
          await perfilUploadTask;
        }
      
        if (bannerImage) {
          const bannerImageRef = ref(userRef, 'bannerImage');
          const bannerUploadTask = uploadBytesResumable(bannerImageRef, bannerImage);
          await bannerUploadTask;
        }
    };

    return(
        <div className={styles.container}>
            <div className={styles.top}>
                <div className={styles.esquerda}>
                    <IoClose onClick={evento} className={styles.icon}/>
                    <span className={styles.title}>Edit Profile</span>
                </div>
                <button className={styles.save} onClick={handleSave}>Save</button>
            </div>
            <div className={styles.banner} style={bannerStyle}>
                <label htmlFor={'bannerImage'} className={styles.bannerImage}>
                    <RiImageAddLine className={styles.icon}/>
                </label>
                <input id={'bannerImage'} type={'file'} className={styles.input} onChange={handleBannerImageChange}/>
            </div>
            <div className={styles.photo} style={photoStyle}>
                <label htmlFor={'perfilImage'} className={styles.perfil}>
                    <RiImageAddLine className={styles.icon}/>
                </label>
                <input id={'perfilImage'} type={'file'} className={styles.input} onChange={handlePerfilImageChange}/>
            </div>
            <div className={styles.user}>
                <div className={styles.names}>
                    <label htmlFor={'name'} className={styles.text}>Name</label>
                    <input id={'name'} type={'text'} className={styles.input} autoComplete={'off'}/>
                </div>
                <div className={styles.names}>
                    <label htmlFor={'username'} className={styles.text}>Username</label>
                    <input id={'username'} type={'text'} className={styles.input} autoComplete={'off'}/>
                </div>
            </div>
        </div>
    )
}