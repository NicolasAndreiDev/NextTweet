import { db } from '../../firebase';
import { collection, getDocs, query } from 'firebase/firestore';

export async function getPosts() {
  const usersRef = collection(db, 'users');
  const usersQuery = query(usersRef);
  const querySnapshot = await getDocs(usersQuery);
  const usersPosts: any = [];

  querySnapshot.forEach((doc) => {
    const user = doc.data();
    if (user.posts) {
      user.posts.forEach((post: any) => {
        const postWithUserInfo = {
          ...post, 
          username: user.username, 
          perfilImageUrl: user.perfilImageUrl ? user.perfilImageUrl : ''
        };
        usersPosts.push(postWithUserInfo);
      });
    }
  });
  
  usersPosts.sort((a: any, b: any) => b.timestamp - a.timestamp);

  return usersPosts;
}