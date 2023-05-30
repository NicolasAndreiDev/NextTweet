import { db, auth } from '../../../firebase';
import { setDoc, doc, getDoc } from "firebase/firestore";
import { UserContext } from '@/providers/UserProvider';
import { UserPostContext } from '@/providers/UserPostProvider';
import { useContext } from 'react';
import { format } from 'date-fns';

export default function NewPost({children, imagem, text, className, onClick}: {
    children: React.ReactNode, 
    className: string, 
    imagem: string, 
    text: string
    onClick: () => void
}) {
    const {user, updateUserInfo} = useContext(UserContext)
    const {setPost, setLoader} = useContext(UserPostContext);

    async function handlePost() {
        if(text === '' && imagem === '') {
            return
        } else {
            setLoader(true);
            const currentDate = new Date();
            const timestamp = currentDate.getTime(); 
            const like: number | null = null
            const currentUser = auth.currentUser;
            if (!currentUser) return;
            const userDocRef = doc(db, 'users', currentUser.uid);
            const userDoc = await getDoc(userDocRef);
            const userData = userDoc.data();
            let nextIndex = 0;
            if (userData?.posts) {
                nextIndex = userData.posts.length;
            }
            const formattedDate = format(currentDate, 'MMM d');
            const post = {
                imagem,
                text,
                id: `${user!.username}-${nextIndex}`,
                date: formattedDate,
                likes: like,
                timestamp,
                userId: currentUser.uid
            };
            setPost(post.id)
            const posts = userData?.posts ? [...userData.posts, post] : [post];
            await setDoc(userDocRef, { posts }, { merge: true }).then(() => updateUserInfo())   
        }
    }

    return (
        <button className={className} onClick={() => {handlePost(), onClick()}}>
            {children}
        </button>
    );
}
