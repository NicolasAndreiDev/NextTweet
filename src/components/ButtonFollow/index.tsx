import { useState, useEffect } from "react"
import { auth, db } from "../../../firebase"
import { setDoc, doc, getDoc } from "firebase/firestore"
import { getUsers } from "@/utils/getUsers"

export default function ButtonFollow({className, userId} : {className: string, username: string, userId: string}) {
    const [follow, setFollow] = useState(false)
    const currentUser = auth.currentUser

    useEffect(() => {
        if (currentUser) {
          const checkIfFollows = async () => {
            const listFollow = await getUsers();
            const followedUsers = listFollow.find((user: any) => user.userId === currentUser?.uid)?.following;
            setFollow(followedUsers?.includes(userId) || false);
          }
          checkIfFollows();
        }
      }, [currentUser?.uid, userId]);

    async function handleClick() {
        if(currentUser){  

            const PRINCIPAL = doc(db, 'users', currentUser.uid);
            const SECUNDARIO = doc(db, 'users', userId)

            const PRINCIPALP = await getDoc(PRINCIPAL);
            const SECUNDARIOP = await getDoc(SECUNDARIO)

            const PRINCIPALD = PRINCIPALP.data();
            const SECUNDARIOD = SECUNDARIOP.data();

            if(!follow) {
                const following = PRINCIPALD?.following ? [...PRINCIPALD.following, userId] : [userId];
                await setDoc(PRINCIPAL, { following }, { merge: true });

                const followers = SECUNDARIOD?.followers ? [...SECUNDARIOD.followers, currentUser.uid] : [currentUser.uid];
                await setDoc(SECUNDARIO, { followers }, { merge: true });
            }else{
                const following = PRINCIPALD?.following?.filter((followingUser: any) => followingUser !== userId);
                await setDoc(PRINCIPAL, { following: following }, { merge: true });
                
                const followers = SECUNDARIOD?.followers?.filter((followersUser: any) => followersUser !== currentUser.uid);
                await setDoc(SECUNDARIO, { followers: followers }, { merge: true });
            }
            setFollow(prev => !prev)
        }
    }

    return(
        <button className={className} onClick={() => handleClick()}>{follow ? 'Following' : 'Follow'}</button>
    )
}