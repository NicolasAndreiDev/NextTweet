import { createContext, useState, useEffect, useContext } from 'react'
import { getUsers } from '@/utils/getUsers';
import { UserContext } from './UserProvider';

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
  const { user } = useContext(UserContext);
  const [usersList, setUsersList] = useState<User[]>([])
    
  useEffect(() => {
    if(user && user.username) {
    const listUsers = async () => {
      const users = await getUsers();
      const newList = users.filter((users: {username: string}) => users.username !== user.username);
      setUsersList(newList)
      }
     listUsers()
    }
  }, [user]);

  return(
    <UserListContext.Provider value={{ usersList }}>
      {children}
    </UserListContext.Provider>
  )
}