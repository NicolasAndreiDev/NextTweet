export default function Foco({color} : {color: string}) {
    return(
        <div style={{height: '100vh', backgroundColor: `${color}`, width: '100%', zIndex: '101', position: 'fixed', top: '0', left: '0'}}></div>
    )
}