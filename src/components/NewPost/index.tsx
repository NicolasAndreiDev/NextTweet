export default function NewPost({children, ...props}: {children: React.ReactNode, className: string}) {
    return(
        <button {...props}>{children}</button>
    )
}