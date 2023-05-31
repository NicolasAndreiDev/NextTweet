import { doc, getDoc, updateDoc, arrayUnion } from "firebase/firestore";
import { db } from "../../../firebase";

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
  async function handleNewComment() {
    if (text || selectedImage) {
      const userDocRef = doc(db, "users", userId);
      const userDoc = await getDoc(userDocRef);
      const userData = userDoc.data();

      if (userData && userData.posts) {
        const updatedPosts = userData.posts.map((post: any) => {
          if (post.id === id) {
            return {
              ...post,
              comments: [...(post.comments || []), { text, selectedImage }],
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
