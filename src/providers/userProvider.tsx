import { createContext, useState, useEffect } from "react";
import { auth, db } from "../../firebase";
import { doc, getDoc } from "firebase/firestore";

type UserContextType = {
  user: {username: string, perfilImageUrl: string, bannerImageUrl: string} | null;
};

export const UserContext = createContext<UserContextType>({
  user: null,
});

  
export function UserProvider({ children }: {children: React.ReactNode}) {
  const [user, setUser] = useState<{username: string, perfilImageUrl: string, bannerImageUrl: string} | null>(null);

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged(async (user) => {
      if (user) {
          const userDocRef = doc(db, "users", user.uid);
          const userDocSnap = await getDoc(userDocRef);
          const userData = userDocSnap.data() ?? {};
          setUser({
              username: userData?.username,
              perfilImageUrl: userData?.perfilImageUrl,
              bannerImageUrl: userData?.bannerImageUrl
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