import { db, auth } from '../../../firebase'
import { setDoc, doc, getDoc } from "firebase/firestore";
import { UserContext } from "@/providers/userProvider";
import { useContext } from 'react'

export default function NewPost({children, imagem, text, className}: {children: React.ReactNode, className: string, imagem: string, text: string}) {
    const { user } = useContext(UserContext)

    async function handlePost(username: string, perfilImageUrl: string) {
        const currentUser = auth.currentUser;
        if (currentUser) {
          const userDocRef = doc(db, 'users', currentUser.uid);
          const userDoc = await getDoc(userDocRef);
          const userData = userDoc.data();
          const posts = userData?.posts ? [...userData.posts, { imagem, text, username, perfilImageUrl }] : [{ imagem, text, username, perfilImageUrl}];
          await setDoc(userDocRef, { posts: posts }, { merge: true });
        }
      }
    
    return(
        <>
            <button className={className} onClick={() => handlePost(user!.username, user!.perfilImageUrl)}> {children} </button>
        </>
    )
}
