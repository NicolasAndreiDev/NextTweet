import styles from './VerifiedComponent.module.scss'

export default function VerifiedComponent() {
    return(
        <div className={styles.container}>
            <img src={'/images/verified.png'} />
            <h2>Nothing to see here — yet</h2>
            <p className={styles.para}>Likes, mentions, Retweets, and a whole lot more — when it comes from a verified account, you’ll find it here. <a href="/" className={styles.link}>Learn more</a></p>
        </div>
    )
}