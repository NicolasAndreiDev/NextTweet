import HeaderBack from '../HeaderBack'
import AllUsers from './AllUsers'
import styles from './ShowMore.module.scss'

export default function ShowMore() {
    return(
        <>
            <HeaderBack local={'Connect'} style={{padding: '1.4rem 2rem'}}/>
            <div>
                <p className={styles.para}>Suggested for you</p>
                <AllUsers />
                <AllUsers />
                <AllUsers />
                <AllUsers />
                <AllUsers />
                <AllUsers />
                <AllUsers />
            </div>
        </>
    )
}