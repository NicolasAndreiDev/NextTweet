import styles from './InfoHome.module.scss'
import ButtonHeader from '@/components/ButtonHeader'
import { useRef, useState} from 'react'
import PostHome from './PostHome';
import HeaderPadrao from '../HeaderPadrao';

export default function InfoHome() {
    const [selectedOption, setSelectedOption] = useState('For you');
    const contentRef = useRef(null);

  const handleOptionChange = (event: React.ChangeEvent<HTMLInputElement>)=> {
    setSelectedOption(event.target.value);
  };

  const renderContent = () => {
    if (selectedOption === 'For you') {
      return <div><PostHome /></div>;
    }
    if (selectedOption === 'Following') {
      return <div></div>;
    }
  };

    return(
        <>  
            <HeaderPadrao>
                <div className={styles.title}>
                    <span>Home</span>
                </div>
                <div className={styles.buttons}>
                    <ButtonHeader names={'For you'} onChange={handleOptionChange} checked={selectedOption === 'For you'} style={selectedOption === 'For you' ? {fontWeight: 'bold'} : {}}>
                        {selectedOption == 'For you' ? <div className={styles.select}></div> : ''}
                    </ButtonHeader>
                    <ButtonHeader names={'Following'} onChange={handleOptionChange} checked={selectedOption === 'Following'} style={selectedOption === 'Following' ? {fontWeight: 'bold'} : {}}>
                        {selectedOption == 'Following' ? <div className={styles.select}></div> : ''}
                    </ButtonHeader>
                </div>
            </HeaderPadrao>
            <div ref={contentRef}>
                {renderContent()}
            </div>
        </>
    )
}