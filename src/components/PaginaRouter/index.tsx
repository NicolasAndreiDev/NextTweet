import { useRouter } from "next/router"
import Link from "next/link"

export default function Route({children, location, ...props}: {children: React.ReactNode, location: string}) {
    const page = useRouter()

    return(
        <Link href={`${location}`} style={page.asPath == `${location}` ? {color: 'rgb(68, 180, 235)', fontWeight: 'bold'} : {color: 'rgb(15, 20, 25)'}} {...props}>
            {children}
        </Link>
    )
}