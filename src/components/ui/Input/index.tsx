import React, { FC, useEffect, useState } from 'react';

import styles from './Input.module.scss'

interface InputProps {
  label: string;
  data?: string;
  setData?: (x: string) => void;
}
export const Input: FC<InputProps> = ({ label, data, setData }) => {
  const [value, setValue] = useState('');

  const handleInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    setValue(e.target.value);
  };

  useEffect(() => {
    if (data && setData) {
      setData(data);
    }
  }, [data, setData]);

  return (
      <label className={styles.label}>
        {label}
        <input type="test" onChange={(e) => handleInput(e)} value={value} className={styles.input}/>
      </label>
  );
};
