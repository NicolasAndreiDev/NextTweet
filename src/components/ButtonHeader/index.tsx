import { CSSProperties } from 'react';
import styles from './ButtonNotifications.module.scss';

interface Props {
  children: React.ReactNode
  names: string;
  checked: boolean;
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  style: CSSProperties;
};

export default function ButtonHeader({children, names, checked, style, onChange}: Props){
  return (
    <>
      <div className={styles.buttons}>
        <label htmlFor={names} className={styles.label} style={style}>{names}</label>
          {children}
      </div>
      <input type="radio" id={names} name="notifications" value={names} className={styles.button} checked={checked} onChange={onChange}/>
    </>
  );
};
