import { useState } from "react"

export default function ButtonFollow({...props}) {
    const [follow, setFollow] = useState(false)

    function handleClick() {
        setFollow(prevent => !prevent)
    }

    return(
        <button {...props} onClick={handleClick}>{follow ? 'Following' : 'Follow'}</button>
    )
}