import { doc, getDoc, updateDoc } from "firebase/firestore";
import { db } from "../../../firebase";
import { useContext } from 'react'
import { UserContext } from "@/providers/UserProvider";
import { format } from "date-fns";

type CommentProps = {
    text: string;
    selectedImage: string;
    className: string;
    userId: string;
    id: string;
    onClick: () => void;
};

export default function NewComment({
    className,
    text,
    selectedImage,
    userId,
    id,
    onClick,
}: CommentProps) {
    const { user } = useContext(UserContext);

    async function handleNewComment() {
        if (text || selectedImage) {
            const userDocRef = doc(db, "users", userId);
            const userDoc = await getDoc(userDocRef);
            const userData = userDoc.data();
            const currentDate = new Date();

            if (userData && userData.posts) {
                const formattedDate = format(currentDate, 'MMM d');
                const updatedPosts = userData.posts.map((post: any) => {
                    if (post.id === id) {
                        return {
                            ...post,
                            comments: [...(post.comments || []), {
                                text,
                                imagem: selectedImage,
                                perfilImageUrl: user?.perfilImageUrl,
                                username: user?.username,
                                name: user?.name,
                                date: formattedDate
                            }],
                        };
                    }
                    return post;
                });

                await updateDoc(userDocRef, {
                    posts: updatedPosts,
                });
            }
        }
    }

    return (
        <button className={className} onClick={() => { handleNewComment(); onClick(); }}>
            Reply
        </button>
    );
}
