import { useEffect, useState } from 'react'
import { useRouter } from 'next/router'
import { auth } from '../../firebase';

const PrivateRoute = ({ children }: { children: React.ReactNode }) => {
  const router = useRouter();
  const [auths, setAuth] = useState(false)

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user) => {
      if (!user) {
        router.push('/login');
      } else {
        setAuth(true);
      }
    });

    return unsubscribe;
  }, [router]);

  return auths ? <>{children}</> : null;
};

export default PrivateRoute;