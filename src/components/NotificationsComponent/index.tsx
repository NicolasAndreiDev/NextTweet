import { useState, useRef } from 'react';
import styles from './NotificationsComponent.module.scss';
import HeaderPadrao from '../HeaderPadrao';
import ButtonHeader from '../ButtonHeader';

export default function NotificationsComponent() {
  const [selectedOption, setSelectedOption] = useState('For you');
  const contentRef = useRef(null);

  const handleOptionChange = (event: React.ChangeEvent<HTMLInputElement>)=> {
    setSelectedOption(event.target.value);
  };

  const renderContent = () => {
    if (selectedOption === 'For you') {
      return (
        <div>
            <img src={'/images/logo.png'} alt={'logo'}/>
        </div>
      )
    }
    if (selectedOption === 'Verified') {
      return <div>Verified</div>;
    }
    if (selectedOption === 'Mentions') {
      return <div>Mentions</div>;
    }
  };

  return (
    <>
        <HeaderPadrao>
            <div className={styles.title}>Notifications</div>
            <div className={styles.buttons}>
                <ButtonHeader names={'For you'} onChange={handleOptionChange} checked={selectedOption === 'For you'} style={selectedOption === 'For you' ? {fontWeight: 'bold'} : {}}>
                    {selectedOption == 'For you' ? <div className={styles.select}></div> : ''}
                </ButtonHeader>
                <ButtonHeader names={'Verified'} onChange={handleOptionChange} checked={selectedOption === 'Verified'} style={selectedOption === 'Verified' ? {fontWeight: 'bold'} : {}}>
                    {selectedOption == 'Verified' ? <div className={styles.select}></div> : ''}
                </ButtonHeader>
                <ButtonHeader names={'Mentions'} onChange={handleOptionChange} checked={selectedOption === 'Mentions'} style={selectedOption === 'Mentions' ? {fontWeight: 'bold'} : {}}>
                    {selectedOption == 'Mentions' ? <div className={styles.select}></div> : ''}
                </ButtonHeader>
            </div>
        </HeaderPadrao>
        <div ref={contentRef}>
            {renderContent()}
        </div>
    </>
  );
}
