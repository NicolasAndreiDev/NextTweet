import styles from '@/styles/Padrao.module.scss'
import ConfigUser from "@/components/ConfigUser";
import MessageUser from '@/components/MessageUser';
import PrivateRoute from '@/utils/PrivateRoute';

export default function Messages() {
    return(
        <PrivateRoute>
            <div className={styles.container}>
                <ConfigUser />
                <div className={styles.direita}>
                <MessageUser />
                </div>
            </div>
        </PrivateRoute>
    )
}