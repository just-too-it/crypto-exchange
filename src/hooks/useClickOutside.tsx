import React, { useEffect } from 'react';

export const useClickOutside = (ref: React.MutableRefObject<HTMLElement>, callback: (x: boolean) => void) => {
  const handleClick = (e: any) => {
    if (ref.current && !ref.current.contains(e.target)) {
      callback(false);
    }
  };

  useEffect(() => {
    document.addEventListener('mousedown', handleClick);
    return () => {
      document.removeEventListener('mousedown', handleClick);
    };
  }, []);
};
