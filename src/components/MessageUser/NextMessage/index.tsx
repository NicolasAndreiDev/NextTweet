import { IoClose } from 'react-icons/io5';
import Messages from '../Messages';
import NewMessage from '../NewMessage';
import styles from './NextMessage.module.scss';
import { AiOutlineInfoCircle } from 'react-icons/ai';
import { CSSProperties, useContext, useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import { onValue, ref } from 'firebase/database';
import { database } from '../../../../firebase';
import { UserContext } from '@/providers/UserProvider';

export default function NextMessage({
    style,
    foto,
    username,
    userId,
    onClick,
}: {
    style?: CSSProperties;
    foto: string;
    username: string;
    onClick?: () => void;
    userId: string;
}) {
    const { user } = useContext(UserContext);
    const route = useRouter();
    const [allMessages, setAllMessages] = useState([]);

    useEffect(() => {
        const messagesRef = ref(database, `users/${user?.userId}/messages`);

        const unsubscribe = onValue(messagesRef, (snapshot) => {
            const messagesData = snapshot.val();
            if (messagesData) {
                const messagesArray: any = Object.values(messagesData);
                setAllMessages(messagesArray);
            }
        });
        return () => {
            unsubscribe();
        };
    }, [userId]);

    return (
        <>
            {username ? (
                <div className={styles.containerNext} style={style}>
                    <div className={styles.infoUser}>
                        <div className={styles.user}>
                            {foto ? (
                                <img
                                    src={foto}
                                    alt={'users'}
                                    className={styles.imagemMenor}
                                    onClick={() => route.push(`${username}`)}
                                />
                            ) : (
                                <div className={styles.imagemDefault}></div>
                            )}
                            <span className={styles.nome}>{username}</span>
                        </div>
                        <button className={styles.button}>
                            <AiOutlineInfoCircle className={styles.icon} />
                            <IoClose className={styles.icon} onClick={onClick} />
                        </button>
                    </div>
                    <div className={styles.linha}></div>
                    <div className={styles.messages}>
                        {allMessages.map((message: any) => {
                            return (
                                <Messages
                                    key={message.id}
                                    textoMe={message.recipient == userId ? message?.text || message?.image : null}
                                    message={message.sender == userId ? message?.text || message?.image : null}
                                />
                            )
                        })}
                    </div>
                    <NewMessage userId={userId} />
                </div>
            ) : (
                <div className={styles.containerNextMessage}>
                    <h2>Select a message</h2>
                </div>
            )}
        </>
    );
}
