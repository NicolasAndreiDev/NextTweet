import LinksMobile from '@/components/MobileComponents/LinksMobile';
import SearchMessage from '../SearchMessage';
import UserMessage from '../UserMessage';
import styles from './UsersListMessage.module.scss'
import HeaderPadrao from "@/components/HeaderPadrao";
import MobileComponents from '@/components/MobileComponents';
import { UserContext } from '@/providers/UserProvider';
import { useEffect, useContext, useState } from 'react';
import { getUsers } from '@/utils/getUsers';
import { NextMessagePopUp } from '../NextMessage/NextMessagePopUp';

interface User {
  userId: string,
  username: string,
  perfilImageUrl: string
}

export default function UsersListMessage({selectedUserProps} : {selectedUserProps: (user: User) => void}) {
  const { user } = useContext(UserContext)
  const [ nextMessagePopUp, setNextMessagePopUp] = useState(false)
  const [ users, setUsers] = useState<User[]>([])
  const [ selectedUser, setSelectedUser ] = useState<User>()

  useEffect(() => {
    const fetchUsers = async () => {
      if(user){
        const listFollowing = user.following ? user.following.map(userId => userId) : []
        const fetchedUsers = await getUsers()
        const listFollowingUsers = fetchedUsers.filter((user: User) => listFollowing.includes(user.userId))
        setUsers(listFollowingUsers)
      }
    }
    fetchUsers()
  }, [user])

  function handleClick(user: User){
    setSelectedUser(user)
    selectedUserProps(user)
    setNextMessagePopUp(true)
  }

  return(
    <div className={styles.containerUser}>
      <div className={styles.linha}></div>
      <HeaderPadrao>
        <div className={styles.message}>
          <MobileComponents />
          <span>Messages</span>
        </div>
        <SearchMessage/>
      </HeaderPadrao>
      <div className={styles.users}>
        { users.length > 0 ? users.map((user) => {
          return(
            <UserMessage key={user.userId} foto={user.perfilImageUrl} username={user.username} name={user.username} onClick={() => handleClick(user)}/>
          )
        }) : <p className={styles.noFollowing}>Follow someone so you can send a message</p>}
        <div className={styles.espaco}></div>
      </div>
      <div className={styles.linha2}></div>
      <LinksMobile />
      { nextMessagePopUp && (<NextMessagePopUp onClick={() => setNextMessagePopUp(false)} foto={selectedUser!.perfilImageUrl} username={selectedUser!.username} userId={selectedUser!.userId}/>)}
    </div>
  )
}
