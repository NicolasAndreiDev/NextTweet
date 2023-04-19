import { db } from '../../firebase';
import { collection, getDocs, query } from 'firebase/firestore';

export async function getUsers() {
    const usersRef = collection(db, 'users');
    const usersQuery = query(usersRef);
    const querySnapshot = await getDocs(usersQuery);
    const users: any = [];

    querySnapshot.forEach((doc) => {
    const user = doc.data();
    users.push(user);
    });

    return users;
}