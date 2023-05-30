import { createContext, useEffect, useState, useContext } from "react";
import { db } from "../../firebase";
import { doc, getDoc } from "firebase/firestore";
import { UserContext } from "./UserProvider";

type PostProps = {
  posts: any[],
  post: string,
  loader: boolean,
  setLoader: (value: boolean) => void,
  setPost: (newPost: string) => void,
  setPosts: (newPosts: any[]) => void,
};

export const UserPostContext = createContext<PostProps>({
  posts: [],
  post: "",
  setPost: () => {},
  setPosts: () => {},
  setLoader: () => {},
  loader: false,
});

export const UserPostProvider = ({ children }: { children: React.ReactNode }) => {
  const { user } = useContext(UserContext);
  const [ posts, setPosts ] = useState<any[]>([]);
  const [ loader, setLoader ] = useState(false);
  const [ post, setPost ] = useState("");

  useEffect(() => {
    const unsubscribe = async () => {
      if (user) {
        const userDoc = doc(db, "users", user.userId);
        const userDocSnap = await getDoc(userDoc);
        const userData = userDocSnap.data() ?? {};
        const newPost = userData.posts.filter((Allposts: { id: string }) => Allposts.id === post);
        if (newPost) {
          setPosts((prev: any[]) => [
            {
              userId: newPost[0]?.userId,
              id: post,
              username: user.username,
              name: user.name,
              imagem: newPost[0]?.imagem,
              text: newPost[0]?.text,
              date: newPost[0]?.date,
              likes: newPost[0]?.likes,
              perfilImageUrl: user.perfilImageUrl,
            },
            ...prev,
          ]);
        }
      }
    };
    setTimeout(() => {
      unsubscribe()
      setLoader(false)
    }, 600)
  }, [post]);

  return (
    <UserPostContext.Provider value={{ post, posts, loader, setPost, setPosts, setLoader }}>
      {children}
    </UserPostContext.Provider>
  );
};
