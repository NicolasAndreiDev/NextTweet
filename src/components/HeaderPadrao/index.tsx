import { UserPostContext } from '@/providers/UserPostProvider';
import { useContext } from 'react';
import LinksMobile from '../MobileComponents/LinksMobile';
import styles from './HeaderPadrao.module.scss';

export default function HeaderPadrao({ children }: { children: React.ReactNode }) {
    const { loader } = useContext(UserPostContext);

    return (
        <div className={styles.header}>
            {children}
            <div className={styles.linha}></div>
            <LinksMobile />
            {loader ? <div className={styles.loader}></div> : ''}
        </div>
    )
}