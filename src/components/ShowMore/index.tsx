import HeaderBack from '../HeaderBack'
import AllUsers from './AllUsers'
import styles from './ShowMore.module.scss'

export default function ShowMore() {
    return(
        <>
            <HeaderBack local={'Connect'} style={{padding: '1.4rem 2rem'}}/>
            <div>
                <AllUsers />
            </div>
        </>
    )
}