import { useState } from "react"
import { auth, db } from "../../../firebase"
import { setDoc, doc, getDoc } from "firebase/firestore"

export default function ButtonFollow({className, username, userId} : {className: string, username: string, userId: string}) {
    const [follow, setFollow] = useState(false)

    async function handleClick() {
        const currentUser = auth.currentUser
        if(currentUser){

            const PRINCIPAL = doc(db, 'users', currentUser?.uid);
            const SECUNDARIO = doc(db, 'users', userId)

            const PRINCIPALP = await getDoc(PRINCIPAL);
            const SECUNDARIOP = await getDoc(SECUNDARIO)

            const PRINCIPALD = PRINCIPALP.data();
            const SECUNDARIOD = SECUNDARIOP.data();

            const PRINCIPALN = PRINCIPALD?.username

            if(follow === false) {
                const following = PRINCIPALD?.following ? [...PRINCIPALD.following, username] : [username];
                await setDoc(PRINCIPAL, { following }, { merge: true });

                const followers = SECUNDARIOD?.followers ? [...SECUNDARIOD.followers, PRINCIPALN] : [PRINCIPALN];
                await setDoc(SECUNDARIO, { followers }, { merge: true });
            }else{
                const following = PRINCIPALD?.following?.filter((followingUser: any) => followingUser.username !== username);
                await setDoc(PRINCIPAL, { following: following }, { merge: true });
                
                const followers = SECUNDARIOD?.followers?.filter((followersUser: any) => followersUser !== PRINCIPALN);
                await setDoc(SECUNDARIO, { followers: followers }, { merge: true });
            }
            setFollow(prev => !prev)
        }
    }

    return(
        <button className={className} onClick={handleClick}>{follow ? 'Following' : 'Follow'}</button>
    )
}