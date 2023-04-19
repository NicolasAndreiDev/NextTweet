import { createContext, useState, useEffect } from "react";
import { auth, db, storage } from "../../firebase";
import { doc, getDoc } from "firebase/firestore";
import { ref, getDownloadURL } from "firebase/storage";

type UserContextType = {
    user: string | null;
    foto: string | null;
    banner: string | null;
    setFoto: React.Dispatch<React.SetStateAction<string | null>>
    setBanner: React.Dispatch<React.SetStateAction<string | null>>
};
  
export const UserContext = createContext<UserContextType>({
    user: null,
    foto: null,
    banner: null,
    setFoto: () => {},
    setBanner: () => {},
});
  
export function UserProvider({ children }: {children: React.ReactNode}) {
    const [user, setUser] = useState<string | null>(null);
    const [foto, setFoto] = useState<string | null>(null)
    const [banner, setBanner] = useState<string | null>(null)

    useEffect(() => {
      const unsubscribe = auth.onAuthStateChanged(async (user) => {
        if (user) {
            const userDocRef = doc(db, "users", user.uid);
            const userDocSnap = await getDoc(userDocRef);
            const userData = userDocSnap.data() ?? {};
            const storageRef = ref(storage, `users/${user.uid}/perfilImage`);
            const storageRefBanner = ref(storage, `users/${user.uid}/bannerImage`)
            try {
              const urlFoto = await getDownloadURL(storageRef)
              setFoto(urlFoto)
            } catch {
              setFoto(null)
            }
            try {
              const urlBanner = await getDownloadURL(storageRefBanner)
              setBanner(urlBanner)
            } catch {
              setBanner(null)
            }
            setUser(userData?.username);
        }
      });
      return unsubscribe;
    }, []);
    

  return (
    <UserContext.Provider value={{ user, foto, banner, setFoto, setBanner }}>
      {children}
    </UserContext.Provider>
  );
}