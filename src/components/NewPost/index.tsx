import { db, auth } from '../../../firebase'
import { setDoc, doc, getDoc } from "firebase/firestore";
import { UserContext } from '@/providers/UserProvider';
import { useContext } from 'react'
import { format } from 'date-fns';

export default function NewPost({children, imagem, text, className}: {children: React.ReactNode, className: string, imagem: string, text: string}) {
    const { user } = useContext(UserContext)

    async function handlePost(username: string, perfilImageUrl: string | null) {
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
            username,
            perfilImageUrl,
            id: `${username}-${nextIndex}`,
            date: formattedDate,
            likes: like,
            timestamp,
            userId: currentUser.uid
        };
        const posts = userData?.posts ? [...userData.posts, post] : [post];
        await setDoc(userDocRef, { posts }, { merge: true });
    }

    return (
        <button className={className} onClick={() => handlePost(user?.username || '', user?.perfilImageUrl || null)}>
            {children}
        </button>
    );
}
