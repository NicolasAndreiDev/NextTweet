import styles from './DeletePost.module.scss';
import { RiDeleteBin5Line } from 'react-icons/ri';
import { db } from '../../../../firebase';
import { useContext } from 'react';
import { doc, getDoc, updateDoc } from 'firebase/firestore';
import { UserContext } from '../../../providers/UserProvider';


export default function DeletePost({ postId, setNotExists }: { postId: string, setNotExists: (value: boolean) => void}) {
    const { user, updateUserInfo } = useContext(UserContext);

    async function handleClick() {
        if (user) {
            const userDocRef = doc(db, 'users', user.userId);
            const userDoc = await getDoc(userDocRef)

            if (userDoc.exists()) {
                const newPosts = userDoc.data().posts
                const updatedPosts = newPosts.filter((postsIds: {id: string}) => postsIds.id !== postId)

                await updateDoc(userDocRef, {
                    posts: updatedPosts
                })
            }
            setNotExists(false);
            updateUserInfo();
        }
    }

    return (
        <div className={styles.popUp} onClick={handleClick}>
            <div className={styles.delete}>
                <RiDeleteBin5Line />
                <span>Delete</span>
            </div>
        </div>
    )
}