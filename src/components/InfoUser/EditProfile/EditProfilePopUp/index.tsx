import { IoClose } from 'react-icons/io5'
import styles from './EditProfilePopUp.module.scss'
import { RiImageAddLine } from 'react-icons/ri'
import { ref, uploadBytesResumable, getDownloadURL } from 'firebase/storage';
import { useEffect, useState, useContext } from 'react';
import { db, storage } from '../../../../../firebase';
import { User, getAuth } from 'firebase/auth';
import { UserContext } from '@/providers/UserProvider'
import { doc, setDoc } from 'firebase/firestore';
import { getUsers } from '@/utils/getUsers';

export default function EditProfilePopUp({evento} : {evento: () => void}) {
    const { user, updateUserInfo } = useContext(UserContext)
    const [perfilImage, setPerfilImage] = useState<File | null>();
    const [photoStyle, setPhotoStyle] = useState<{} | null>({backgroundImage: `url(${user?.perfilImageUrl})`});
    const [bannerImage, setBannerImage] = useState<File | null>();
    const [bannerStyle, setBannerStyle] = useState<{} | null>({backgroundImage: `url(${user?.bannerImageUrl})`});
    const [users, setUser] = useState<User | null>();
    const [username, setUsername] = useState('')
    const [name, setName] = useState('')
    const [erro, setErro] = useState(false)

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
        if (!perfilImage && !bannerImage && !name && !username) {
          return;
        }

        if(erro){
            return
        }

        const userRef = ref(storage, `users/${users?.uid}`);

        if (perfilImage) {
            const perfilImageRef = ref(userRef, 'perfilImage');
            const perfilUploadTask = uploadBytesResumable(perfilImageRef, perfilImage);
            await perfilUploadTask;
            const perfilImageUrl = await getDownloadURL(perfilImageRef);
            const userDocRef = doc(db, 'users', users!.uid);
            await setDoc(userDocRef, { perfilImageUrl }, { merge: true });
        }
      
        if (bannerImage) {
            const bannerImageRef = ref(userRef, 'bannerImage');
            const bannerUploadTask = uploadBytesResumable(bannerImageRef, bannerImage);
            await bannerUploadTask;
            const bannerImageUrl = await getDownloadURL(bannerImageRef);
            const userDocRef = doc(db, 'users', users!.uid);
            await setDoc(userDocRef, { bannerImageUrl }, { merge: true });
        }
        
        if(name){
            const userDocRef = doc(db, 'users', users!.uid);
            await setDoc(userDocRef, { name }, { merge: true });
        }

        if(username){
            const userDocRef = doc(db, 'users', users!.uid);
            await setDoc(userDocRef, { username }, { merge: true });
        }

        updateUserInfo();
    };

    async function checkIfUsernameExists(username: string) {
        const listUsers = await getUsers();
        const newListUsers = listUsers.filter((user: any) => user.username === username);
        return newListUsers.length > 0;
    }

    function handleChangeName(event: React.ChangeEvent<HTMLInputElement>){
        setName(event.target.value)
    }

    async function handleChangeUsername(event: React.ChangeEvent<HTMLInputElement>) {
        const username = event.target.value;
        const usernameExists = await checkIfUsernameExists(username);
        setErro(usernameExists);
        setUsername(username);
    }

    return(
        <div className={styles.container}>
            <div className={styles.top}>
                <div className={styles.esquerda}>
                    <IoClose onClick={evento} className={styles.icon}/>
                    <span className={styles.title}>Edit Profile</span>
                </div>
                <button className={styles.save} onClick={() => {handleSave(), evento()}}>Save</button>
            </div>
            <div className={styles.banner} style={bannerStyle ? bannerStyle : ''}>
                <label htmlFor={'bannerImage'} className={styles.bannerImage}>
                    <RiImageAddLine className={styles.icon}/>
                </label>
                <input id={'bannerImage'} type={'file'} className={styles.input} onChange={handleBannerImageChange}/>
            </div>
            <div className={styles.photo} style={photoStyle ? photoStyle : ''}>
                <label htmlFor={'perfilImage'} className={styles.perfil}>
                    <RiImageAddLine className={styles.icon}/>
                </label>
                <input id={'perfilImage'} type={'file'} className={styles.input} onChange={handlePerfilImageChange}/>
            </div>
            <div className={styles.user}>
                <div className={styles.names}>
                    <label htmlFor={'name'} className={styles.text}>Name</label>
                    <input id={'name'} type={'text'} className={styles.input} value={name} autoComplete={'off'} onChange={handleChangeName}/>
                </div>
                <div className={styles.names}>
                    <label htmlFor={'username'} className={styles.text}>Username</label>
                    <input id={'username'} type={'text'} className={styles.input} value={username} autoComplete={'off'} onChange={handleChangeUsername}/>
                    { erro && <span style={{color: 'red'}}>Username já está em uso</span>}
                </div>
            </div>
        </div>
    )
}