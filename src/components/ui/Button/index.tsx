import React, { ButtonHTMLAttributes, FC } from 'react';
import clsx from 'clsx';

import styles from './Button.module.scss';

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  className?: string;
  disabled?: boolean;
}

export const Button: FC<ButtonProps> = (props) => {
  const { className, children, disabled, type = 'button', ...otherProps } = props;
  return (
    <button type={type} className={clsx(styles.button, className)} disabled={disabled} {...otherProps}>
      {children}
    </button>
  );
};
