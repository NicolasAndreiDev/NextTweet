import styles from '@/styles/Padrao.module.scss'
import ConfigUser from "@/components/ConfigUser";
import MessageUser from '@/components/MessageUser';

export default function Messages() {
    return(
        <div className={styles.container}>
            <ConfigUser />
            <div className={styles.direita}>
            <MessageUser />
            </div>
        </div>
    )
}