import ConfigUser from "@/components/ConfigUser";
import InfoPadrao from "@/components/InfoPadrao";
import Search from "@/components/Search";
import ShowMore from "@/components/ShowMore";
import styles from '@/styles/Padrao.module.scss';

export default function Users() {
    return (
        <div className={styles.container}>
          <ConfigUser />
          <div className={styles.direita}>
            <InfoPadrao>
              <ShowMore />
            </InfoPadrao>
            <Search style={{marginLeft: '3.2rem', marginTop: '.8rem'}}/>
          </div>
        </div>
      )
}