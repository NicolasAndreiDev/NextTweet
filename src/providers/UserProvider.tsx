import { createContext, useState, useEffect } from "react";
import { auth, db } from "../../firebase";
import { doc, getDoc } from "firebase/firestore";

type UserContextType = {
  user: {userId:string, username: string, perfilImageUrl: string, bannerImageUrl: string, following: string[], likes: string[], posts: string[]} | null;
};

export const UserContext = createContext<UserContextType>({
  user: null,
});

  
export function UserProvider({ children }: {children: React.ReactNode}) {
  const [user, setUser] = useState<{userId: string,username: string, perfilImageUrl: string, bannerImageUrl: string, following: string[], likes: string[], posts: string[]} | null>(null);

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged(async (user) => {
      if (user) {
          const userDocRef = doc(db, "users", user.uid);
          const userDocSnap = await getDoc(userDocRef);
          const userData = userDocSnap.data() ?? {};
          setUser({
              userId: userData?.userId,
              username: userData?.username,
              perfilImageUrl: userData?.perfilImageUrl,
              bannerImageUrl: userData?.bannerImageUrl,
              following: userData?.following,
              posts: userData?.posts,
              likes: userData?.likes
          });
      }
    });
    return unsubscribe;
  }, []);  

return (
  <UserContext.Provider value={{ user }}>
    {children}
  </UserContext.Provider>
);
}
