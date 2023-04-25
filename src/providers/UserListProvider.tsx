import { createContext, useState, useEffect } from 'react'
import { auth } from '../../firebase';
import { getUsers } from '@/utils/getUsers';

type User = {
    username: string;
    perfilImageUrl: string;
    userId: string
}
  
type UserListContextType = {
    usersList: User[];
}
  
export const UserListContext = createContext<UserListContextType>({
    usersList: [],
})
  

export function UserListProvider({children}: {children: React.ReactNode}) {
    const [usersList, setUsersList] = useState<User[]>([])
    
  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged(async (user) => {
      if (user) {
        const loggedInUserId = auth.currentUser?.email;
        const users = await getUsers();
        const newList = users.filter((user: {email: string}) => user.email !== loggedInUserId);
        setUsersList(newList)
      }
    });
    return unsubscribe;
  }, []);

    return(
        <UserListContext.Provider value={{ usersList }}>
            {children}
        </UserListContext.Provider>
    )
}