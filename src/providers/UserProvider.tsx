import { createContext, useState, useEffect, useCallback } from "react";
import { auth, db } from "../../firebase";
import { doc, getDoc } from "firebase/firestore";
import { getPosts } from "@/utils/getPosts";

type UserContextType = {
  user: {
    userId:string, 
    username: string, 
    perfilImageUrl: string | null, 
    bannerImageUrl: string, 
    following: string[], 
    name: string,
    posts: [{}] | null,
  } | null;
  updateUserInfo: () => void
};

export const UserContext = createContext<UserContextType>({
  user: null,
  updateUserInfo: () => {},
});

  
export function UserProvider({ children }: {children: React.ReactNode}) {
  const [user, setUser] = useState<{
    userId: string,
    username: string, 
    perfilImageUrl: string | null, 
    bannerImageUrl: string, 
    following: string[], 
    name: string, posts: [{}]} | null>(null);

  const updateUserInfo = useCallback(() => {
    const unsubscribe = auth.onAuthStateChanged(async (userg) => {
    if (userg) {
        const userDocRef = doc(db, "users", userg.uid);
        const userDocSnap = await getDoc(userDocRef);
        const userData = userDocSnap.data() ?? {};
        const newPost = await getPosts();
        const postsUser = newPost.filter((users: {userId: string}) => users.userId == user?.userId)
        setUser({
            userId: userData?.userId,
            username: userData?.username,
            name: userData?.name,
            perfilImageUrl: userData?.perfilImageUrl,
            bannerImageUrl: userData?.bannerImageUrl,
            following: userData?.following,
            posts: postsUser,
        });
    }
  });
    return unsubscribe;
  }, [])
 
  useEffect(() => {
    updateUserInfo()
  }, [updateUserInfo]);  

return (
  <UserContext.Provider value={{ user, updateUserInfo }}>
    {children}
  </UserContext.Provider>
);
}
