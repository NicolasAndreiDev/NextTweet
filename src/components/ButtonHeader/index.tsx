import { CSSProperties } from 'react';
import styles from './ButtonNotifications.module.scss';

interface ButtonHeaderProps {
  children: React.ReactNode
  names: string;
  checked: boolean;
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  style: CSSProperties;
};

export default function ButtonHeader({children, names, checked, style, onChange}: ButtonHeaderProps){
  
  function handleWindow() {
    window.scrollTo({top: 0})
  } 

  return (
    <>
      <div className={styles.buttons}>
        <label htmlFor={names} className={styles.label} style={style}>{names}</label>
          {children}
      </div>
      <input type="radio" id={names} name="notifications" value={names} className={styles.button} checked={checked} onChange={onChange} onClick={handleWindow}/>
    </>
  );
};
