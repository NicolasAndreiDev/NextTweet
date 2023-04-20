import styles from './InfoPadrao.module.scss'

export default function InfoPadrao({children}: {children: React.ReactNode}) {

return (
    <>
      <main className={styles.container}>
        {children}
        <div className={styles.espaco}></div>
      </main>
    </>
  )
}
